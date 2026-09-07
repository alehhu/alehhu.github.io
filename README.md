# alehhu.github.io

Sito personale di Alessandro Hu — homepage, blog e progetti, generato come HTML statico e pubblicato su GitHub Pages.

## Struttura

- `content/` — sorgenti markdown (home, CV, `posts/`, `portfolio/`, `drafts/`)
- `templates/` — template EJS (`layout`, `home`, `post`, `list`, `page`)
- `assets/` — CSS, immagini, PDF, copiati così come sono nell'output
- `admin/` — generatore statico (`build.js`) ed editor locale (`server.js`)

Nessun Jekyll/Ruby: la build è un unico script Node.

## Sviluppo

```sh
npm install
npm run build   # genera _site/
npx serve _site # anteprima statica locale
```

## Scrivere/gestire i post

```sh
npm run admin
```

Apre un editor locale su `http://127.0.0.1:4000` (mai esposto oltre localhost) con anteprima live e supporto a formule matematiche (`$...$`, `$$...$$`). Scrive direttamente in `content/posts/` (o `content/drafts/` per le bozze). La pubblicazione (`git add && git commit && git push`) resta un passo manuale.

## Deploy

Push su `main`/`master` fa partire `.github/workflows/pages-deploy.yml`, che builda con Node e pubblica su GitHub Pages.
