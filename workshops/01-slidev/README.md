# Workshop 01, AI-Assisted Presentations with Slidev

From Prompt to Polished Deck. Presented by Hadi Zaatiti and Samuel A. Prieto.

## Run locally

```bash
pnpm --filter ./workshops/01-slidev dev
```

Opens http://localhost:3030. Presenter view (speaker notes, next-slide preview): http://localhost:3030/presenter.

## Build / export

```bash
pnpm --filter ./workshops/01-slidev build       # static site -> dist/
pnpm --filter ./workshops/01-slidev export      # PDF (needs playwright-chromium once)
pnpm --filter ./workshops/01-slidev export:pptx # PowerPoint
```

## Refresh the live-data slide

```bash
pnpm --filter ./workshops/01-slidev data        # regenerates stats.json from the repo
```

## Structure

- `slides.md`, the deck (edit this)
- `snippets/`, code samples shown in the deck
- `public/img/`, workshop-specific images
- `public/brand/`, NYU Abu Dhabi lockup (mirrored from `theme/public/brand/`)
- `exercises/`, hands-on exercises that pair with the deck
- `components/`, workshop-specific Vue components (`RepoStats`, `LeastSquaresDemo`)
- `scripts/repo-stats.mjs`, generates `stats.json` at build time
- `setup/mermaid.ts`, enables clickable Mermaid nodes

See `theme/README.md` for the full theme reference (layouts, components, tokens).
