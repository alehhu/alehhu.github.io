const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const { build } = require("./build");
const { slugify } = require("./lib/render");
const openBrowser = require("./lib/open");

const ROOT = path.join(__dirname, "..");
const CONTENT_DIR = path.join(ROOT, "content");
const TEMPLATES_DIR = path.join(ROOT, "templates");
const ASSETS_DIR = path.join(ROOT, "assets");
const IMAGES_DIR = path.join(ASSETS_DIR, "images");
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
const ALLOWED_IMAGE_EXT = [".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg"];

const app = express();
app.use(express.json());

// Editor UI
app.use(express.static(path.join(__dirname, "public")));

// Local live preview of the generated site: HTML pages get a small
// live-reload snippet injected (see /api/live-reload below) so the tab
// refreshes itself whenever content/templates/assets change, from the
// admin UI or from hand-editing files directly. Non-HTML files (css,
// images, pdfs...) fall through to a plain static file server.
const LIVE_RELOAD_SCRIPT = `
<script>
(function () {
  var es = new EventSource("/api/live-reload");
  es.onmessage = function () { location.reload(); };
})();
</script>`;

app.get(/^\/preview(\/.*)?$/, (req, res, next) => {
  let reqPath = req.path.slice("/preview".length) || "/";
  if (reqPath.endsWith("/")) reqPath += "index.html";
  if (path.extname(reqPath) !== ".html") return next();
  const filePath = path.join(SITE_DIR, reqPath);
  if (!filePath.startsWith(SITE_DIR)) return res.status(400).end();
  fs.readFile(filePath, "utf8", (err, html) => {
    if (err) return next();
    // The built pages use root-absolute links (href="/blog/", src="/assets/...")
    // since that's correct once deployed at the real site root. Under this local
    // preview they're served at /preview/..., so rewrite those links to match —
    // otherwise every link/image on the page 404s against the admin server root.
    const rewritten = html.replace(/(href|src)="\//g, '$1="/preview/');
    res.type("html").send(rewritten.replace("</body>", `${LIVE_RELOAD_SCRIPT}</body>`));
  });
});
app.use("/preview", express.static(SITE_DIR));

// Live-reload channel: the preview page listens on this and reloads
// whenever the site is rebuilt (see rebuild() / notifyLiveReload() below).
const liveReloadClients = [];
app.get("/api/live-reload", (req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });
  res.write("\n");
  liveReloadClients.push(res);
  req.on("close", () => {
    const idx = liveReloadClients.indexOf(res);
    if (idx !== -1) liveReloadClients.splice(idx, 1);
  });
});

function notifyLiveReload() {
  liveReloadClients.forEach((res) => res.write("data: reload\n\n"));
}

// Serve assets/ at the same absolute path they'll have on the published
// site (/assets/...), so images inserted while writing show up immediately
// in the editor's live preview too, without needing a full rebuild.
app.use("/assets", express.static(ASSETS_DIR));

// Vendored editor libraries served straight from node_modules (fully offline, no CDN)
app.use("/vendor/codemirror", express.static(path.join(ROOT, "node_modules", "codemirror")));
app.use("/vendor/katex", express.static(path.join(ROOT, "node_modules", "katex", "dist")));
app.use("/vendor/marked", express.static(path.join(ROOT, "node_modules", "marked", "lib")));

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

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
    notifyLiveReload();
  } catch (err) {
    console.error("Build failed:", err.message);
  }
}

// Watch content/templates/assets so edits made outside the admin UI (e.g.
// hand-editing a .md file, or dropping in an image) also trigger a rebuild
// and a live-reload of the /preview tab.
let watchTimer = null;
function scheduleRebuild() {
  clearTimeout(watchTimer);
  watchTimer = setTimeout(rebuild, 150);
}
for (const dir of [CONTENT_DIR, TEMPLATES_DIR, ASSETS_DIR]) {
  if (fs.existsSync(dir)) {
    try {
      fs.watch(dir, { recursive: true }, scheduleRebuild);
    } catch (err) {
      console.warn(`Could not watch ${dir} for changes: ${err.message}`);
    }
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
    res.json({ ok: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Upload an image, save it into assets/images/, return its site-relative path.
app.post("/api/assets/images", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "no file uploaded" });

  const ext = path.extname(req.file.originalname || "").toLowerCase();
  if (!ALLOWED_IMAGE_EXT.includes(ext)) {
    return res.status(400).json({ error: `unsupported image type: ${ext || "unknown"}` });
  }

  const base =
    path
      .basename(req.file.originalname || "image", ext)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "image";

  fs.mkdirSync(IMAGES_DIR, { recursive: true });
  let filename = `${base}${ext}`;
  let counter = 1;
  while (fs.existsSync(path.join(IMAGES_DIR, filename))) {
    filename = `${base}-${counter}${ext}`;
    counter += 1;
  }

  fs.writeFileSync(path.join(IMAGES_DIR, filename), req.file.buffer);
  res.json({ path: `/assets/images/${filename}`, alt: base.replace(/-/g, " ") });
});

rebuild();
app.listen(PORT, "127.0.0.1", () => {
  const base = `http://127.0.0.1:${PORT}`;
  console.log(`Admin editor running at ${base} (bound to localhost only)`);
  console.log(`Live site preview at ${base}/preview/ (auto-reloads on every change)`);
  openBrowser(`${base}/`);
  openBrowser(`${base}/preview/`);
});
