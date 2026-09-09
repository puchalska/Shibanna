# Anna & Shib — wedding site

A one-page wedding site for **Anna & Shib**, Sambalpur, India, 17–20 December 2026.
Built from the Figma "Wedding" file. Next.js (static export) → GitHub Pages.

## Develop

```bash
npm install
npm run dev          # http://localhost:3000
```

## Build

```bash
npm run build        # static site in ./out
```

## Content

All copy and structure lives in [`src/lib/site.ts`](src/lib/site.ts) — edit that
file to change dates, the schedule, cards, or the "What to wear" section.
Images are in [`public/figma/`](public/figma/).

## Deploy

Pushing to `main` triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
which builds and publishes to GitHub Pages. The workflow injects
`NEXT_PUBLIC_BASE_PATH=/<repo>` so assets resolve under the project-site URL.
For a private repo, GitHub Pages requires a paid GitHub plan.

## Structure

| Path | What |
| --- | --- |
| `src/app/page.tsx` | Section order |
| `src/app/globals.css` | Palette + duotone / deckle-edge helpers |
| `src/components/` | Hero, Invitation, Story, Schedule, WhatToWear, Footer |
| `src/lib/site.ts` | All editable content |
| `src/lib/asset.ts` | Base-path helper for `/public` URLs |
