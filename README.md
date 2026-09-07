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

This is the single command for local work: pulls the latest changes (best-effort, never destructive), installs/updates dependencies only if needed, then starts the admin editor at `http://127.0.0.1:4000` and a live-reloading preview of the site at `http://127.0.0.1:4000/preview/` (both open automatically). The editor (never exposed beyond localhost) has a live preview and math support (`$...$`, `$$...$$`), and lets you insert images by button, drag & drop, or pasting from the clipboard. Manages blog posts (`content/posts/`, with `content/drafts/` for unpublished ones), portfolio entries (`content/portfolio/`), and the Home/CV pages (`content/home.md`, `content/cv.md`). The `/preview/` tab auto-refreshes on every change, whether made through the editor or by hand-editing files. Publishing (`git add && git commit && git push`) stays a manual step.

## Deploy

Pushing to `main`/`master` triggers `.github/workflows/pages-deploy.yml`, which builds with Node and publishes to GitHub Pages.
