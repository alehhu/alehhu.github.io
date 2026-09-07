# alehhu.github.io

Personal site of Alessandro Hu — homepage, blog and projects, generated as static HTML and published on GitHub Pages.

## Structure

- `content/` — markdown sources (home, CV, `posts/`, `portfolio/`, `drafts/`)
- `templates/` — EJS templates (`layout`, `home`, `post`, `list`, `page`)
- `assets/` — CSS, images, PDFs, copied as-is into the output
- `admin/` — static site generator (`build.js`) and local editor (`server.js`)

No Jekyll/Ruby: the build is a single Node script.

## Development

```sh
npm install
npm run build   # generates _site/
npx serve _site # local static preview
```

## Writing/managing content

```sh
npm run admin
```

Opens a local editor at `http://127.0.0.1:4000` (never exposed beyond localhost) with a live preview and math support (`$...$`, `$$...$$`). Manages blog posts (`content/posts/`, with `content/drafts/` for unpublished ones), portfolio entries (`content/portfolio/`), and the Home/CV pages (`content/home.md`, `content/cv.md`). Publishing (`git add && git commit && git push`) stays a manual step.

## Deploy

Pushing to `main`/`master` triggers `.github/workflows/pages-deploy.yml`, which builds with Node and publishes to GitHub Pages.
