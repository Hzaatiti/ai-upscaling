# AGENTS.md

Guidance for AI coding agents working in this repo. Read this first when you start a task here, it captures conventions, file boundaries, and gotchas that aren't obvious from the file tree alone.

Repo URL: `github.com/Hzaatiti/ai-upscaling`.

---

## What this repo is

The home of an **NYU upscaling workshop series** maintained by Hadi Zaatiti and Sam. Each workshop is a Slidev deck under `workshops/NN-name/`. The visual identity lives **in this same repo** under `theme/`, packaged as `slidev-theme-nyu` and consumed by every deck through a relative `file:` dependency.

This is a **pnpm workspace**. Each workshop is its own package with its own `package.json`. The root `pnpm-workspace.yaml` declares `workshops/*` as workspace packages. The theme is not a workspace package; it is plain folder linked via `file:`.

---

## Theme wiring (the most important thing to understand)

Each workshop's `package.json` depends on the Slidev theme via:

```json
"slidev-theme-nyu": "file:../../theme"
```

With pnpm, `file:` on a local directory creates a **symlink** rather than copying files. Layout on disk:

```
<repo root>/
├── theme/               # slidev-theme-nyu: layouts, components, styles, brand
└── workshops/
    └── NN-name/         # each deck links to ../../theme
```

**Consequences:**

- Edit anything in `theme/` (layouts, components, CSS tokens), every workshop dev server picks it up on the next reload. No reinstall.
- One commit can change the theme and the decks together; CI rebuilds everything on push.
- When you make a breaking change in the theme (rename a layout, remove a component slot), grep `workshops/` for usages before committing.

The scaffold script (`scripts/new-workshop.mjs`) **aborts early** if `theme/` is missing. Don't remove that check.

---

## File layout

```
.
├── AGENTS.md                # this file
├── README.md                # human-facing entry point
├── CONTRIBUTING.md          # editorial conventions
├── package.json             # pnpm workspace root + shortcut scripts
├── pnpm-workspace.yaml      # lists "workshops/*"
├── theme/                   # slidev-theme-nyu (see theme/README.md)
│   ├── layouts/  components/  styles/  setup/  public/brand/
│   └── example.md           # minimal deck exercising every layout/component
├── scripts/
│   ├── new-workshop.mjs     # scaffold script, creates a new workshop folder
│   └── ci-build.mjs         # builds the combined Pages site / release artifacts
├── .github/workflows/       # deploy-pages.yml, release.yml
└── workshops/
    ├── AGENTS.md            # slide-authoring conventions (read this if editing a deck)
    └── NN-name/             # one folder per workshop
        ├── slides.md
        ├── package.json
        ├── README.md
        ├── components/  public/  snippets/  exercises/
        └── scripts/         # optional per-deck build-time data scripts
```

`workshops/NN-name/` is the convention. `NN` is two-digit zero-padded (`01`, `02`, ...). `name` is kebab-case, lowercase.

---

## Hard rules

These are non-negotiable unless you have a strong reason and the user has agreed:

1. **Keep theme changes and deck changes cleanly separated in intent.** Theme-level changes (colors, layouts, components used by more than one deck) go in `theme/`. Per-deck overrides go in `workshops/NN-name/style.css` or that deck's `components/`. Don't push workshop-specific styling into the theme.
2. **Don't duplicate brand assets.** The canonical logo lives at `theme/public/brand/nyuad-logo.png`. The scaffold script copies it into each workshop's `public/brand/`, that is the only intended mirror (Slidev needs it in the deck's `public/` to serve at `/brand/*`).
3. **Don't commit `node_modules/`, `dist/`, `release/`, `slides-export.pdf`, or any build artifacts.** The `.gitignore` already covers these; if you find yourself adding one, ask why.
4. **Don't break the `workshops/NN-name/` naming convention.** The scaffold script, `ci-build.mjs` auto-discovery, and shortcut aliases (`dev:01`, etc.) depend on it.
5. **Workshop folders use `file:../../theme`, never `workspace:*` or `link:`.** The theme isn't a workspace package (so `workspace:*` won't resolve), and `link:` is a pnpm-only protocol that npm rejects with `EUNSUPPORTEDPROTOCOL`. `file:` symlinks correctly under both tools.
6. **No em dashes (`—`, U+2014) and no en dashes (`–`, U+2013) in any generated content.** Slides, READMEs, code comments, commit messages, scaffolded `package.json` descriptions, all of it. Use a period, comma, semicolon, parentheses, or a regular hyphen (`-`) instead. Long dashes are one of the strongest LLM-generated-text tells; their presence makes institutional copy read as AI output. Quoting source material that contains them is fine; producing new text with them is not.
7. **Commits belong to the human maintainers.** Never add AI co-author or `Generated-by` trailers to commit messages, and don't commit on the user's behalf unless they explicitly asked.

---

## Commands you'll use

| Command | What it does |
|---------|--------------|
| `pnpm install` | Reads every workshop's `package.json`, downloads dependencies, creates the `file:` symlink to `theme/`. Run after cloning, after pulling, after adding a workshop. |
| `pnpm new-workshop <slug>` | Runs `scripts/new-workshop.mjs <slug>`. Picks the next workshop number and creates `workshops/NN-<slug>/`. |
| `pnpm --filter ./workshops/NN-name dev` | Starts Slidev dev server at `http://localhost:3030` for that workshop. Hot-reloads. |
| `pnpm --filter ./workshops/NN-name build` | Produces a static site in `workshops/NN-name/dist/`. |
| `pnpm --filter ./workshops/NN-name build -- --base ./` | Same, but with relative asset paths, needed if the user wants to open `dist/index.html` directly (see "Gotchas"). |
| `pnpm --filter ./workshops/NN-name export` | Produces a PDF `workshops/NN-name/slides-export.pdf`. Needs Chromium once: `pnpm exec playwright install chromium` from the root. |
| `pnpm dev:01` / `build:01` / `export:01` / `export:01:pptx` / `data:01` | Shortcuts for the above, defined in the root `package.json`. Only exist for workshop 01 right now. |
| `pnpm build:site` / `pnpm preview:site` / `pnpm build:release` | Run the CI build locally; see "Publishing and CI" below. |

`--filter ./workshops/NN-name` means "run this command in that one package only". Without it, pnpm would try to run the command in every workspace package at once (almost never what you want).

`--` separates pnpm's flags from flags passed through to the underlying script. `pnpm ... build -- --base ./` passes `--base ./` to `slidev build`.

---

## Gotchas (these have bitten us, don't repeat them)

### Build outputs look blank when opened directly

`pnpm build` produces `dist/index.html` with **absolute** asset paths (`/_assets/foo.js`). When opened via `file:///` or hosted at a non-root URL, every asset 404s and the page renders blank. Fixes:

- **Preview locally:** `npx serve workshops/NN-name/dist`, prints a URL, open that.
- **Build with relative paths:** add `-- --base ./` to the build command.
- **Build for a specific path:** add `-- --base /subdir/` (e.g. `--base /ai-upscaling/01-slidev/` for GitHub Pages).

### npm doesn't understand `workspace:*` or `link:`

If a user runs `npm install` instead of `pnpm install` on a package that uses those protocols, they'll see `EUNSUPPORTEDPROTOCOL` errors. This repo uses `file:` exactly so both tools work, but the workspace as a whole is set up around pnpm; mixing in npm leaves a broken `package-lock.json` next to the right `pnpm-lock.yaml`. Direct users to pnpm.

### Windows symlink permission errors

pnpm's symlinks require Developer Mode (Settings > Privacy & Security > For Developers) or running the terminal as administrator. Errors look like `EPERM: operation not permitted, symlink`. Tell users about this, there's no workaround in our config.

### Slidev `<<< @/path` imports break for `.md` files

The snippet-import syntax works for `.ts`, `.js`, `.vue`, `.yml` (wraps them in a fenced code block) but inlines the raw content of `.md` files, leaking their `---` and `::slot::` markers into the host slide and breaking the MDC/Shiki pipeline. **For markdown examples, inline them as literal code blocks instead.** This is documented in `workshops/AGENTS.md` too.

### Stale `pnpm-lock.yaml` after structural changes

When the workspace structure changes (packages added/removed, dependency protocols changed), the lockfile can hold stale entries. Symptom: `pnpm install` complains or installs partially. Fix: delete `pnpm-lock.yaml` and re-run `pnpm install`. The lockfile regenerates.

### Slidev version is pinned to ^0.49.0

Slidev v52.x had a Windows path-resolution bug with themes consumed via `file:`. Don't bump `@slidev/cli` / `@slidev/types` majors without testing `pnpm dev:01` on Windows.

### Theme internals gotchas

Slidev demotes a second `<h1>` inside a slide, scoped CSS doesn't reach slot content, and setup files need `@slidev/types` for typing. Details and design-system rules live in `theme/README.md`; check it before editing `theme/`.

---

## Build-time data pattern

Workshop 01's "repo stats" slide is rendered from `workshops/01-slidev/stats.json`, generated by `workshops/01-slidev/scripts/repo-stats.mjs` (run via `pnpm data:01`). The script scans this repository (decks, markdown lines, Vue components, design tokens) and fails soft: if it can't count something, it writes zeros rather than breaking the build. The JSON is committed so the deck builds without running the script. If you change the repo structure significantly, re-run `pnpm data:01` and commit the refreshed JSON. Use the same pattern (script writes JSON at build time, component imports it) for any future data-driven slide.

---

## When you're done with a task

- Run `pnpm install` if you added/removed packages or workshops.
- Run `pnpm --filter ./workshops/01-slidev dev` and click through the deck, does it still render? Did anything regress visually?
- If you touched the scaffold script, smoke-test it: `pnpm new-workshop smoke-test`, verify the generated `package.json` has `file:../../theme`, clean up with `rm -rf workshops/NN-smoke-test`.
- Update `README.md` if you changed user-facing behavior (commands, structure, gotchas).
- Update this `AGENTS.md` if you discovered a new gotcha or rule worth remembering.

---

## Publishing and CI

The workshop site is published to GitHub Pages automatically. Key facts for agents:

- `scripts/ci-build.mjs` builds every `workshops/NN-*` deck. `--mode pages` writes the combined `dist/` (landing page, per-deck SPA, `slides.pdf`, `slides.pptx`, `404.html`, `.nojekyll`); `--mode release` writes per-deck `<NN-slug>.pdf`, `<NN-slug>.pptx`, and `<NN-slug>-html.zip`. Both exports are best-effort and can be skipped with `--no-pdf` / `--no-pptx`. It auto-discovers workshops, so adding a deck needs no workflow change.
- `.github/workflows/deploy-pages.yml` runs on push to `main` and on manual `workflow_dispatch`. Single checkout (the theme is in-repo), installs with `--no-frozen-lockfile`, installs Playwright Chromium for PDF/PPTX export, then builds and deploys.
- `.github/workflows/release.yml` runs on tags `v*` and attaches the per-deck PDF, PPTX, and html.zip to a GitHub Release.
- pnpm version is pinned in the workflows (`version: 9`).
- Decks must set `routerMode: hash` in headmatter. GitHub Pages has no per-folder 404 fallback, so history-mode deep links (e.g. `/01-slidev/2`) return 404 on refresh; hash mode keeps the slide index after `#`. The `new-workshop` scaffold sets this automatically.
- One-time setup on GitHub: Settings > Pages > Source = GitHub Actions.
- Live site: https://hzaatiti.github.io/ai-upscaling/

---

## Reference docs

- [`README.md`](README.md), human-facing entry point. Walkthroughs, command reference, deploy.
- [`CONTRIBUTING.md`](CONTRIBUTING.md), editorial conventions, "where does this change belong" decisions.
- [`workshops/AGENTS.md`](workshops/AGENTS.md), slide-authoring conventions, frontmatter, layouts, snippets, fit-to-canvas rules.
- [`theme/README.md`](theme/README.md), theme reference: layouts, components, tokens, design rules.
- [`scripts/new-workshop.mjs`](scripts/new-workshop.mjs), read this if you need to change how workshops are scaffolded.
