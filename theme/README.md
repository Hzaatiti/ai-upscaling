# slidev-theme-nyu

The Slidev theme for the NYU upscaling workshop series. It bundles the layouts, components, fonts, and colors that give every deck in this repo the same look. The theme lives in this folder (`theme/`) and each workshop under `workshops/` consumes it via a `file:../../theme` dependency, which installs as a symlink: edit the theme, and every deck picks the change up on the next reload.

The visual identity is built on the NYU brand: NYU Violet (#57068C), a deep-violet chrome color, restrained gold accents, serif display type (Source Serif 4) with a sans body (Inter).

---

## Preview the theme on its own

`example.md` in this folder demonstrates every layout and component side by side. Treat it as the theme's living manual. To run it:

```bash
cd theme
npm install        # one-time, installs Slidev for the demo deck
npx slidev example.md --open
```

(The workshops themselves do not need this install; `pnpm install` at the repo root wires the theme into each workshop automatically.)

---

## Layouts (set with `layout: <name>` in slide frontmatter)

| Name | Use it for | Slots |
|------|-----------|-------|
| `cover` | Title slide of the deck | `eyebrow` (small label above title), `meta` (presenters / date below title) |
| `section` | Full-bleed deep-violet divider between major parts | `number` (e.g. "PART 01"), `subtitle` (lede paragraph) |
| `default` | Everyday content slide with the footer | none |
| `two-cols-header` | Header row spanning both columns, then two columns underneath | `left`, `right` |
| `end` | Closing thanks / contact slide (deep violet) | `meta` |

Example using `cover`:

```md
---
layout: cover
---

# My Workshop Title

::eyebrow::
<span class="nyu-tag nyu-tag--accent">Workshop 02</span>

::meta::
Your Name · New York University
12 May 2026
```

## Components (auto-imported, use directly in `.md`)

- `<NyuCallout label="Tip" tone="violet|accent|sand">body</NyuCallout>`, labeled note box. Hairline border, eyebrow-styled label.
- `<NyuKbd>K</NyuKbd>`, keyboard key chip.
- `<NyuLogo />`, NYU Abu Dhabi lockup with an optional wordmark line. Pass `white` for dark backgrounds, `minimal` to hide the wordmark.
- `<AutoFit>...</AutoFit>`, scales its content down so a slide body cannot overflow the fixed canvas. A safety net, not a license to cram.

## Utility classes

- `.nyu-eyebrow`, uppercase tracked violet label.
- `.nyu-tag`, violet pill. Variants: `.nyu-tag--accent` (gold outline), `.nyu-tag--ghost` (violet outline).

## CSS tokens

`styles/tokens.css` defines the whole palette and scale. Highlights:

- Brand: `--nyu-violet`, `--nyuad-deep-violet`, `--violet-900` through `--violet-050`, `--gold`, `--sand`.
- Semantic roles: `--fg1/--fg2/--fg3`, `--bg1/--bg2/--bg3`, `--hairline`, `--border`, `--link`.
- Aliases used by components: `--nyu-color-violet`, `--nyu-color-accent`, `--nyu-font-sans`, `--nyu-font-mono`, `--nyu-radius`, and friends.
- Type scale `--t-*`, spacing scale `--s-*` (4px base), radii `--r-*` (squared by design), motion `--dur-*` / `--ease-*`.

To re-skin, edit Section 1 of `tokens.css` (the canonical tokens); the aliases in Section 2 follow automatically. Per-deck one-off overrides belong in that deck's `style.css`, not here.

Dark mode: Slidev toggles `.dark` on `<html>`; the theme rebinds the semantic tokens to a deep-violet treatment so the brand stays recognizable.

## Design-language rules baked in

- Hairlines, not drop shadows. Squared corners (max 4px), except pills.
- Display and H1 are serif; H2 is all-caps tracked sans.
- Gold is reserved for editorial highlights; use sparingly.
- Dark layouts (`section`, `end`) rebind `--fg1/--fg2/--hairline` locally so all children inherit light-on-violet colors automatically. Follow the same pattern when adding a dark layout; never hard-code `color` per element.

## File layout

```
theme/
├── package.json          # name: slidev-theme-nyu
├── example.md            # demo deck exercising every layout/component
├── layouts/              # cover, section, default, two-cols-header, end
├── components/           # NyuCallout, NyuFooter, NyuKbd, NyuLogo, AutoFit
├── styles/               # index.ts -> tokens.css + layout.css
├── setup/main.ts         # Slidev app setup hook (kept minimal)
└── public/brand/         # nyuad-logo.png
```
