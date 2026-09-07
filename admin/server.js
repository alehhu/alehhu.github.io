const express = require("express");
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const { build } = require("./build");
const { slugify } = require("./lib/render");
const openBrowser = require("./lib/open");

const ROOT = path.join(__dirname, "..");
const CONTENT_DIR = path.join(ROOT, "content");
const DIRS = {
  posts: path.join(CONTENT_DIR, "posts"),
  portfolio: path.join(CONTENT_DIR, "portfolio"),
  drafts: path.join(CONTENT_DIR, "drafts"),
};
// Singleton pages (not a collection): edited in place, no date/tags/draft state.
const PAGES = {
  home: path.join(CONTENT_DIR, "home.md"),
  cv: path.join(CONTENT_DIR, "cv.md"),
};
const SITE_DIR = path.join(ROOT, "_site");
const PORT = 4000;

const app = express();
app.use(express.json());

// Editor UI
app.use(express.static(path.join(__dirname, "public")));

// Local live preview of the generated site
app.use("/preview", express.static(SITE_DIR));

// Vendored editor libraries served straight from node_modules (fully offline, no CDN)
app.use("/vendor/codemirror", express.static(path.join(ROOT, "node_modules", "codemirror")));
app.use("/vendor/katex", express.static(path.join(ROOT, "node_modules", "katex", "dist")));
app.use("/vendor/marked", express.static(path.join(ROOT, "node_modules", "marked", "lib")));

function isValidFilename(name) {
  return typeof name === "string" && /^[a-zA-Z0-9._-]+\.md$/.test(name) && !name.includes("..");
}

function dirFor(collection) {
  if (!DIRS[collection]) throw new Error(`invalid collection: ${collection}`);
  return DIRS[collection];
}

function listFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
}

function readPost(dir, filename) {
  const raw = fs.readFileSync(path.join(dir, filename), "utf8");
  const { data, content } = matter(raw);
  return { frontmatter: data, body: content };
}

function writePost(dir, filename, frontmatter, body) {
  fs.mkdirSync(dir, { recursive: true });
  const file = matter.stringify(body || "", frontmatter || {});
  fs.writeFileSync(path.join(dir, filename), file);
}

function rebuild() {
  try {
    build();
  } catch (err) {
    console.error("Build failed:", err.message);
  }
}

// List posts (optionally including drafts) for a given collection
app.get("/api/posts", (req, res) => {
  const collection = req.query.collection || "posts";
  const includeDrafts = req.query.include_drafts === "true";
  try {
    const dir = dirFor(collection);
    const items = listFiles(dir).map((filename) => {
      const { frontmatter } = readPost(dir, filename);
      return { filename, collection, draft: false, ...frontmatter };
    });
    if (includeDrafts && collection === "posts") {
      const draftItems = listFiles(DIRS.drafts).map((filename) => {
        const { frontmatter } = readPost(DIRS.drafts, filename);
        return { filename, collection, draft: true, ...frontmatter };
      });
      items.push(...draftItems);
    }
    res.json(items);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Read one post
app.get("/api/posts/:filename", (req, res) => {
  const { filename } = req.params;
  if (!isValidFilename(filename)) return res.status(400).json({ error: "invalid filename" });
  const collection = req.query.collection || "posts";
  const draft = req.query.draft === "true";
  try {
    const dir = draft ? DIRS.drafts : dirFor(collection);
    const full = path.join(dir, filename);
    if (!fs.existsSync(full)) return res.status(404).json({ error: "not found" });
    res.json(readPost(dir, filename));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Create a new post
app.post("/api/posts", (req, res) => {
  const { title, date, tags, excerpt, draft, body, collection } = req.body;
  if (!title || !body) return res.status(400).json({ error: "title and body are required" });
  try {
    const col = collection || "posts";
    const slug = slugify(title);
    if (!slug) return res.status(400).json({ error: "title produced an empty slug" });
    const dateStr = date || new Date().toISOString().slice(0, 10);
    const filename = draft ? `${slug}.md` : `${dateStr}-${slug}.md`;
    const dir = draft ? DIRS.drafts : dirFor(col);
    const full = path.join(dir, filename);
    if (fs.existsSync(full)) return res.status(409).json({ error: "a file with this name already exists" });
    const frontmatter = { title, date: dateStr };
    if (tags && tags.length) frontmatter.tags = tags;
    if (excerpt) frontmatter.excerpt = excerpt;
    writePost(dir, filename, frontmatter, body);
    rebuild();
    res.json({ filename });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Overwrite an existing post
app.put("/api/posts/:filename", (req, res) => {
  const { filename } = req.params;
  if (!isValidFilename(filename)) return res.status(400).json({ error: "invalid filename" });
  const { frontmatter, body, draft, collection } = req.body;
  try {
    const col = collection || "posts";
    const dir = draft ? DIRS.drafts : dirFor(col);
    if (!fs.existsSync(path.join(dir, filename))) return res.status(404).json({ error: "not found" });
    writePost(dir, filename, frontmatter, body);
    rebuild();
    res.json({ ok: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a post
app.delete("/api/posts/:filename", (req, res) => {
  const { filename } = req.params;
  if (!isValidFilename(filename)) return res.status(400).json({ error: "invalid filename" });
  const collection = req.query.collection || "posts";
  const draft = req.query.draft === "true";
  try {
    const dir = draft ? DIRS.drafts : dirFor(collection);
    const full = path.join(dir, filename);
    if (!fs.existsSync(full)) return res.status(404).json({ error: "not found" });
    fs.unlinkSync(full);
    rebuild();
    res.json({ ok: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Move a post between content/posts and content/drafts (publish / unpublish)
app.post("/api/posts/:filename/move", (req, res) => {
  const { filename } = req.params;
  if (!isValidFilename(filename)) return res.status(400).json({ error: "invalid filename" });
  const to = req.body.to === "drafts" ? "drafts" : "posts";
  const from = to === "drafts" ? DIRS.posts : DIRS.drafts;
  const dir = to === "drafts" ? DIRS.drafts : DIRS.posts;
  try {
    const srcFull = path.join(from, filename);
    if (!fs.existsSync(srcFull)) return res.status(404).json({ error: "not found" });
    const { frontmatter, body } = readPost(from, filename);
    let newFilename = filename;
    if (to === "posts" && !/^\d{4}-\d{2}-\d{2}-/.test(filename)) {
      const dateStr = frontmatter.date || new Date().toISOString().slice(0, 10);
      frontmatter.date = frontmatter.date || dateStr;
      newFilename = `${dateStr}-${filename}`;
    } else if (to === "drafts") {
      newFilename = filename.replace(/^\d{4}-\d{2}-\d{2}-/, "");
    }
    writePost(dir, newFilename, frontmatter, body);
    fs.unlinkSync(srcFull);
    rebuild();
    res.json({ filename: newFilename });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Read a singleton page (home, cv)
app.get("/api/pages/:name", (req, res) => {
  const file = PAGES[req.params.name];
  if (!file) return res.status(404).json({ error: "unknown page" });
  if (!fs.existsSync(file)) return res.status(404).json({ error: "not found" });
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  res.json({ frontmatter: data, body: content });
});

// Overwrite a singleton page (home, cv)
app.put("/api/pages/:name", (req, res) => {
  const file = PAGES[req.params.name];
  if (!file) return res.status(404).json({ error: "unknown page" });
  const { frontmatter, body } = req.body;
  try {
    fs.writeFileSync(file, matter.stringify(body || "", frontmatter || {}));
    rebuild();
    res.json({ ok: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

rebuild();
app.listen(PORT, "127.0.0.1", () => {
  const url = `http://127.0.0.1:${PORT}`;
  console.log(`Admin editor running at ${url} (bound to localhost only)`);
  openBrowser(url);
});
