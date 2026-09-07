#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const ejs = require("ejs");
const { readContentFile } = require("./lib/render");

const ROOT = path.join(__dirname, "..");
const CONTENT = path.join(ROOT, "content");
const TEMPLATES = path.join(ROOT, "templates");
const ASSETS = path.join(ROOT, "assets");
const OUT = path.join(ROOT, "_site");

const SITE = {
  title: "Alessandro Hu",
  description: "Personal site of Alessandro Hu — notes on math, quantum computing, and engineering.",
  url: "https://alehhu.github.io",
  author: "Alessandro Hu",
  email: "alessandro.hu999@gmail.com",
  github: "alehhu",
  linkedin: "alessandrohu",
};

function readTemplate(name) {
  return fs.readFileSync(path.join(TEMPLATES, name), "utf8");
}

function renderPage(templateName, locals) {
  const body = ejs.render(
    readTemplate(templateName),
    { site: SITE, ...locals },
    { filename: path.join(TEMPLATES, templateName) }
  );
  return ejs.render(
    readTemplate("layout.ejs"),
    { site: SITE, body, ...locals },
    { filename: path.join(TEMPLATES, "layout.ejs") }
  );
}

function writeFile(relPath, contents) {
  const full = path.join(OUT, relPath);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, contents);
}

function listMarkdownFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".md")).sort();
}

function loadCollection(dir, urlPrefix) {
  return listMarkdownFiles(dir)
    .map((filename) => {
      const filePath = path.join(dir, filename);
      const { frontmatter, html } = readContentFile(filePath);
      const dateMatch = filename.match(/^(\d{4}-\d{2}-\d{2})-(.+)\.md$/);
      const slug = dateMatch ? dateMatch[2] : filename.replace(/\.md$/, "");
      const date = frontmatter.date
        ? new Date(frontmatter.date)
        : dateMatch
        ? new Date(dateMatch[1])
        : new Date();
      return {
        title: frontmatter.title || slug,
        excerpt: frontmatter.excerpt || "",
        tags: frontmatter.tags || [],
        date,
        slug,
        url: `${urlPrefix}${slug}/`,
        html,
      };
    })
    .sort((a, b) => b.date - a.date);
}

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

function escapeXml(s) {
  return String(s).replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
}

function buildFeed(posts) {
  const items = posts
    .map(
      (p) => `
  <item>
    <title>${escapeXml(p.title)}</title>
    <link>${SITE.url}${p.url}</link>
    <guid>${SITE.url}${p.url}</guid>
    <pubDate>${p.date.toUTCString()}</pubDate>
    <description>${escapeXml(p.excerpt)}</description>
  </item>`
    )
    .join("");
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel>
  <title>${escapeXml(SITE.title)}</title>
  <link>${SITE.url}</link>
  <description>${escapeXml(SITE.description)}</description>${items}
</channel></rss>
`;
}

function buildSitemap(urls) {
  const entries = urls.map((u) => `  <url><loc>${SITE.url}/${u}</loc></url>`).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;
}

function build() {
  fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(OUT, { recursive: true });

  const posts = loadCollection(path.join(CONTENT, "posts"), "/blog/");
  const portfolio = loadCollection(path.join(CONTENT, "portfolio"), "/progetti/");

  const home = readContentFile(path.join(CONTENT, "home.md"));
  writeFile("index.html", renderPage("home.ejs", { page: home.frontmatter, content: home.html }));

  const cv = readContentFile(path.join(CONTENT, "cv.md"));
  writeFile("cv/index.html", renderPage("page.ejs", { page: cv.frontmatter, content: cv.html }));

  writeFile(
    "blog/index.html",
    renderPage("list.ejs", { page: { title: "Blog" }, items: posts })
  );
  for (const post of posts) {
    writeFile(`blog/${post.slug}/index.html`, renderPage("post.ejs", { page: post, content: post.html }));
  }

  writeFile(
    "progetti/index.html",
    renderPage("list.ejs", { page: { title: "Progetti" }, items: portfolio })
  );
  for (const item of portfolio) {
    writeFile(`progetti/${item.slug}/index.html`, renderPage("post.ejs", { page: item, content: item.html }));
  }

  writeFile("feed.xml", buildFeed(posts));
  const urls = [
    "",
    "blog/",
    "progetti/",
    "cv/",
    ...posts.map((p) => p.url.slice(1)),
    ...portfolio.map((p) => p.url.slice(1)),
  ];
  writeFile("sitemap.xml", buildSitemap(urls));

  copyDir(ASSETS, path.join(OUT, "assets"));
  writeFile(".nojekyll", "");

  console.log(`Built ${posts.length} post(s), ${portfolio.length} project(s) -> ${OUT}`);
}

if (require.main === module) {
  build();
}

module.exports = { build };
