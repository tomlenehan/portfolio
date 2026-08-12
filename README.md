# Tom Lenehan Portfolio

Modern React/Vite portfolio site for Tom Lenehan, highlighting the personal
projects Brand Bounty, LawCrawl, Question Politics, and the technical range
behind them.

## Local Development

```bash
npm install
npm run dev
```

The app runs at http://localhost:5173.

## Production Build

```bash
npm run build
npm run preview
```

## Docker

```bash
docker compose up --build
```

The container serves the built site at http://localhost:8088. To use another
host port:

```bash
PORT=8090 docker compose up --build
```

## Render

This repo includes a Render Blueprint at `render.yaml`. Render auto-detects
that filename from the repository root.

The static site settings are:

- Build Command: `npm ci && npm run build`
- Publish Directory: `dist`
- Node version: `22.22.3` from `.node-version`

`dist` is generated output and is intentionally excluded from Git. Render must
run the build command above for every deployment so the generated `index.html`,
JavaScript, and CSS asset names always match.

`render.yml` is included as a matching convenience copy if you choose a custom
Blueprint path in Render.

## Stack

- React + Vite
- Framer Motion
- React Scroll Parallax
- Lucide React icons
- Docker + nginx static serving
