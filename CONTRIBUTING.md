# Contributing

A short guide for adding to the workshop series.

## Editorial conventions

- **One slide, one idea.** If a slide is doing two things, split it.
- **Code samples should be runnable.** Put long examples in `snippets/` and import them with Slidev's `<<< @/snippets/file.ts` syntax so they stay copy-pasteable and lintable.
- **Speaker notes go in HTML comments** at the bottom of a slide, after the content:
  ```md
  ---

  # My slide

  Body content.

  <!--
  Speaker notes here. The audience won't see this; the presenter will.
  -->
  ```
- **Images** live in the deck's `public/img/` folder and are referenced as `/img/file.png`. The brand lockup lives in `theme/public/brand/` and is mirrored into each deck's `public/brand/` by the scaffold script.
- **Don't hard-code colors**, use the CSS variables defined in `theme/styles/tokens.css` (`--nyu-color-accent`, etc.). That's how re-skinning works.
- **No em dashes or en dashes** in any content, including commit messages. Use a period, comma, semicolon, parentheses, or a regular hyphen instead. See `AGENTS.md` for the reasoning.

## Repo conventions

- Workshops are numbered `NN-kebab-name`, two-digit prefix, zero-padded.
- Commit messages: short imperative present-tense, e.g. `add export-to-pdf section to ws01`.
- One PR per workshop change; theme changes that affect multiple workshops should call that out in the PR description.

## Local development

```bash
pnpm install                                       # once
pnpm --filter ./workshops/01-slidev dev            # run a deck
pnpm --filter ./workshops/01-slidev build          # static build
pnpm --filter ./workshops/01-slidev export         # PDF export
pnpm --filter ./workshops/01-slidev export:pptx    # PowerPoint export
```

## When to touch the theme vs. a workshop

The Slidev theme lives **in this repo** at `theme/`. Decide where a change belongs:

- Brand changes (colors, fonts, logo): edit `theme/styles/tokens.css`, `theme/components/`, or the assets under `theme/public/brand/`.
- New layout used by multiple workshops: add it to `theme/layouts/`.
- Workshop-specific tweaks: keep them in `workshops/NN-.../components/` or a local `style.css` in the workshop folder. Do **not** push workshop-specific things into the theme.

Theme changes propagate to every workshop instantly via the `file:../../theme` dependency, no install step required.
