const fs = require("fs");
const matter = require("gray-matter");
const { marked } = require("marked");

// Math blocks ($...$ and $$...$$) are pulled out before Markdown parsing and
// re-inserted afterwards, so Markdown never sees LaTeX syntax (e.g. "_" for
// subscripts) and mangles it. KaTeX's client-side auto-render then picks the
// restored $...$/$$...$$ delimiters back up in the final HTML.
const MATH_TOKEN_RE = /@@MATHBLOCK(\d+)@@/g;

function protectMath(src) {
  const blocks = [];
  let out = src.replace(/\$\$([\s\S]+?)\$\$/g, (_, expr) => {
    blocks.push({ display: true, expr });
    return `@@MATHBLOCK${blocks.length - 1}@@`;
  });
  out = out.replace(/\$([^\n$]+?)\$/g, (_, expr) => {
    blocks.push({ display: false, expr });
    return `@@MATHBLOCK${blocks.length - 1}@@`;
  });
  return { out, blocks };
}

function restoreMath(html, blocks) {
  return html.replace(MATH_TOKEN_RE, (_, idxStr) => {
    const block = blocks[Number(idxStr)];
    if (!block) return "";
    const escaped = block.expr
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    return block.display ? `$$${escaped}$$` : `$${escaped}$`;
  });
}

function renderMarkdown(src) {
  const { out, blocks } = protectMath(src);
  const html = marked.parse(out);
  return restoreMath(html, blocks);
}

function readContentFile(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return { frontmatter: data, body: content, html: renderMarkdown(content) };
}

function slugify(title) {
  return String(title)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

module.exports = { renderMarkdown, readContentFile, slugify, protectMath, restoreMath };
