# AI Upscaling Workshop Series

A repository holding an **NYU upscaling workshop series**. One folder per workshop. Every workshop is a [Slidev](https://sli.dev) presentation that uses the shared NYU theme vendored in this repo at [`theme/`](theme/).

Maintained by **Hadi Zaatiti** and **Sam**.

---

## Table of contents

- [What's in this repo](#whats-in-this-repo)
- [Prerequisites, set up your machine](#prerequisites-set-up-your-machine), one-time, do this first
- [First time you clone this repo](#first-time-you-clone-this-repo), install dependencies
- [Run a workshop locally](#run-a-workshop-locally)
- [Start a new workshop](#start-a-new-workshop), one command, all set
- [What you can use in your slides](#what-you-can-use-in-your-slides), layouts, components, frontmatter
- [Export to PDF or static site](#export-to-pdf-or-static-site)
- [Publish all decks (GitHub Pages + Releases)](#publish-all-decks-github-pages--releases), the CI pipeline
- [How theme changes propagate](#how-theme-changes-propagate), the file: mechanism explained
- [Workshops index](#workshops-index)
- [Command reference](#command-reference), every command, what it does
- [For AI agents](#for-ai-agents), `AGENTS.md` files and what's in them

---

## What's in this repo

```
.
├── theme/                    # slidev-theme-nyu, the shared look-and-feel (layouts, components, tokens)
├── workshops/
│   └── 01-slidev/            # Workshop 01, "AI-Assisted Presentations with Slidev"
├── scripts/
│   ├── new-workshop.mjs      # Scaffolds a new minimal workshop folder
│   └── ci-build.mjs          # Builds the combined Pages site / release artifacts
├── .github/workflows/        # deploy-pages.yml (Pages), release.yml (tagged Releases)
├── pnpm-workspace.yaml
├── package.json
├── CONTRIBUTING.md
└── README.md
```

The look-and-feel (layouts, components, fonts, colors) lives **inside this repo** in `theme/`, packaged as `slidev-theme-nyu`. Each workshop's `package.json` declares a `file:../../theme` dependency on that folder, which means pnpm creates a symlink and the theme is loaded from disk. No publish step, no second repo.

---

## Prerequisites, set up your machine

You need three things installed once (skip whichever you already have):

**1. Node.js 18 or newer.** Get it from [nodejs.org](https://nodejs.org/) or use a version manager like `fnm` / `nvm`. Verify with:

```bash
node --version
```

> Prints something like `v20.10.0`. If you see "command not found", Node isn't installed (or isn't on your PATH).

**2. pnpm 9 or newer.** After Node is installed:

```bash
npm install -g pnpm
```

> `npm` is the package manager that ships with Node. `install -g` means "install globally" (available everywhere on your machine, not just in one project). After this, the `pnpm` command works in any terminal. Verify with `pnpm --version`.

**3. git.** Verify with `git --version`. On Windows, [git-scm.com](https://git-scm.com/) provides the installer.

That's it. The theme ships inside the repo, so there is nothing else to clone.

---

## First time you clone this repo

```bash
git clone https://github.com/Hzaatiti/ai-upscaling.git
cd ai-upscaling
pnpm install
```

> `pnpm install` reads each workshop's `package.json`, sees the line `"slidev-theme-nyu": "file:../../theme"`, and creates a symlink under `node_modules/` pointing back at the `theme/` folder at the repo root. It also downloads Slidev itself and every other dependency. First run takes 1-2 minutes; subsequent runs are seconds. (`file:` rather than `link:` so the package.json also works under plain `npm install`, `link:` is a pnpm-only protocol that npm rejects.)

When it finishes, every workshop is wired up and ready to run.

> **Windows note:** pnpm uses symlinks. On Windows, symlinks need either **Developer Mode** turned on (Settings > Privacy & security > For developers > "Developer Mode") or the terminal running as administrator. If you see `EPERM: operation not permitted, symlink` errors, this is why.

---

## Run a workshop locally

```bash
pnpm --filter ./workshops/01-slidev dev
```

> Breaks down as: `pnpm` (the package manager) `--filter ./workshops/01-slidev` (only do this for the package in that folder) `dev` (run the script named "dev" defined in that package's `package.json`). The "dev" script is `slidev --open`, which starts a local web server and opens your browser to it. This is the **authoring mode**, edits to `slides.md` and components hot-reload in the browser as you save. The server stays running until you press `Ctrl-C`.

After a few seconds Slidev prints:

```
  Slidev v0.49.x

  >  Local:   http://localhost:3030/
```

Open that URL. For the **presenter view** (speaker notes, next-slide preview, timer): open `http://localhost:3030/presenter` in a second browser tab.

There's a shorter form for workshop 01 specifically:

```bash
pnpm dev:01
```

> Same as `pnpm --filter ./workshops/01-slidev dev`. The shortcut is defined in the root `package.json` under `scripts`. If you add more workshops and want shortcuts for them, add `dev:02`, `dev:03`, etc. entries there.

---

## Start a new workshop

```bash
pnpm new-workshop git-basics
```

> Runs `node scripts/new-workshop.mjs git-basics`. The script picks the next workshop number (looks at existing folder names in `workshops/`, finds the highest, adds one), creates a folder `workshops/NN-git-basics/`, generates a minimal `slides.md`, generates a `package.json` already wired to the in-repo theme, and copies the NYUAD logo from `theme/public/brand/`. Replace `git-basics` with whatever topic name you want, it has to be lowercase letters, digits, and hyphens.

What the script does step by step:

1. Scans `workshops/` to find the highest existing number, then picks the next one (`02`, `03`, ...).
2. Creates `workshops/NN-<slug>/` with:
   - `package.json` already pointing at the in-repo theme via `file:../../theme`.
   - A minimal `slides.md`, cover + outline + one section + end. Replace with your content.
   - `public/brand/nyuad-logo.png` copied from `theme/public/brand/` so `<NyuLogo />` resolves.
   - `snippets/`, `components/`, `public/img/`, `exercises/` scaffolded with placeholders.
   - A short `README.md` for the workshop.
3. Prints the next two commands to run.

After scaffolding:

```bash
pnpm install
```

> Re-runs the install step. You need this because there's now a new package (the new workshop) that pnpm hasn't seen yet. It registers the new folder in the workspace and creates its `node_modules/` symlinks.

```bash
pnpm --filter ./workshops/02-git-basics dev
```

> Same dev-server command as before, but pointed at your new workshop. Open `http://localhost:3030` and you'll see the starter slides.

Then open `workshops/02-git-basics/slides.md` in your editor and start writing.

---

## What you can use in your slides

`slides.md` is the entire deck. The top of the file is YAML "frontmatter", settings for the whole deck:

```yaml
---
theme: nyu                              # always, pulls in the NYU look
title: Your Workshop Title              # shows in the browser tab + footer
author: Your Name                       # shows in the footer
info: |
  One-paragraph description.
  Appears in the presenter view and PDF metadata.
highlighter: shiki                      # how code blocks are syntax-highlighted
lineNumbers: false                      # turn line numbers in code blocks on/off
drawings: { persist: false }            # drawings reset between sessions
transition: fade                        # slide-to-slide animation
mdc: true                               # enable :: slot :: markers
layout: cover                           # the first slide is the cover
---
```

Slides are separated by `---` on a line by itself. Each slide can have its own frontmatter to override the layout:

```md
---
layout: section
---

::number::
PART 01

# Section title here
```

### Available layouts

| Name | Use it for | Slot names |
|------|-----------|------------|
| `cover` | Title slide | `eyebrow`, `meta` |
| `section` | Full-bleed divider between major parts | `number`, `subtitle` |
| `default` | Everyday content slide |, |
| `two-cols-header` | Header + two columns underneath | `left`, `right` |
| `end` | Closing thanks/contact slide | `meta` |

### Available components (use them directly in `.md`)

- `<NyuCallout label="Tip" tone="violet|accent|sand">body</NyuCallout>`, labeled note box.
- `<NyuKbd>K</NyuKbd>`, keyboard key chip.
- `<NyuLogo />`, NYUAD lockup (pass `white` for dark backgrounds).

For the full reference (every layout slot, every component prop, every CSS variable you can override), see [`theme/README.md`](theme/README.md). Workshop 01's `slides.md` is also a worked example using all of them.

---

## Export to PDF or static site

From the repo root:

```bash
pnpm --filter ./workshops/01-slidev build
```

> Runs the `build` script in workshop 01's `package.json`, which is `slidev build`. Takes your deck and produces a self-contained **static website** in `workshops/01-slidev/dist/`. The `dist/` folder contains HTML, CSS, JS, fonts, and images, everything needed to serve the deck from any web host (Netlify, GitHub Pages, S3, a corporate NGINX). The folder is self-contained: no Slidev or Node.js needed at the host end.

> **Gotcha, `dist/index.html` looks blank if you open it directly.** Slidev's default build assumes the site lives at the root of a domain (`/`), so it writes asset paths as absolute (`/_assets/...`). When you open `index.html` from `file:///` on your computer, the browser can't resolve those paths and renders nothing. Two workarounds:
> - **Preview locally with a web server:** `npx serve workshops/01-slidev/dist`. It prints a URL like `http://localhost:3000`, open that and the deck loads correctly.
> - **Build with relative paths so the file works opened directly:** `pnpm --filter ./workshops/01-slidev build -- --base ./`. The `-- --base ./` passes the `--base ./` flag through to `slidev build`. With relative paths, `dist/index.html` works when double-clicked or when hosted at a non-root URL.
>
> When deploying to GitHub Pages, the repo's `deploy-pages.yml` workflow already passes the right `--base` for you.

```bash
pnpm --filter ./workshops/01-slidev export
```

> Runs `slidev export`. Produces a single file `workshops/01-slidev/slides-export.pdf` with one slide per page. Use it for email follow-ups or any "give me one file" request.

PDF export needs a headless Chromium browser installed first. One-time setup from the repo root:

```bash
pnpm install
pnpm exec playwright install chromium
```

> The root `package.json` already lists `playwright-chromium` as a devDependency, and the second command downloads the actual browser binary (~150 MB). After this finishes, `pnpm export:01` works without further setup.

Modes summary:

| Command | Output | Use when |
|---------|--------|----------|
| `... dev` | A live web server at `http://localhost:3030` | Authoring. Hot-reloads on save. |
| `... build` | A folder `dist/` you upload to a web host | Publishing the deck as a website. |
| `... export` | A single PDF | Emailing or attaching one file. |
| `... export:pptx` | A single PowerPoint (`.pptx`) | When someone needs editable PowerPoint slides. |

> `slidev export --format pptx` puts each slide in as an image (so the text isn't editable), with the speaker notes carried over per slide. Needs the same Chromium as PDF export.

There are also shorthand aliases in the root `package.json` for workshop 01: `pnpm dev:01`, `pnpm build:01`, `pnpm export:01`, `pnpm export:01:pptx`, `pnpm data:01`. Same commands, less typing.

---

## Publish all decks (GitHub Pages + Releases)

**Live site: https://hzaatiti.github.io/ai-upscaling/**, landing page with every workshop; each deck lives at `.../<NN-slug>/` with `slides.pdf` and `slides.pptx` beside it.

Two GitHub Actions workflows publish every workshop automatically. They live in `.github/workflows/` and both build through `scripts/ci-build.mjs`, which auto-discovers every `workshops/NN-*` folder, you never edit the workflow when you add a workshop.

**`deploy-pages.yml`, on every push to `main`.** Builds the combined site and deploys it to GitHub Pages:

- Landing page at the site root listing every workshop.
- Each deck served at `https://hzaatiti.github.io/ai-upscaling/<NN-slug>/` (correct `--base` set automatically).
- Downloadable `slides.pdf` and `slides.pptx` beside each deck, plus a `404.html` fallback so deep-link refreshes don't break.

**`release.yml`, on a version tag (`v*`).** Builds a versioned archive and attaches it to a GitHub Release: per workshop, `<NN-slug>.pdf`, `<NN-slug>.pptx`, and `<NN-slug>-html.zip` (an offline-openable copy of the slides, built with `--base ./`). Cut one with:

```bash
git tag v2026.09 && git push origin v2026.09
```

**So where do the downloads live?** The live HTML slides and current PDF + PowerPoint are on Pages (always matching `main`); immutable, versioned PDF + PPTX + offline-HTML bundles are attached to each tagged Release. Pages = "the latest", Releases = "the edition we delivered on this date".

**One setup step before the first run:** in the repo on GitHub, **Settings > Pages > Build and deployment > Source = GitHub Actions**. That's it; the theme is in-repo, so no cross-repo tokens are needed.

You can run the same builds locally:

```bash
pnpm build:site       # combined Pages site -> dist/ (needs Chromium for PDF+PPTX)
pnpm preview:site     # same, but skips PDF+PPTX (faster); then: npx serve dist
pnpm build:release    # per-deck PDF + PPTX + html.zip -> release/
```

---

## How theme changes propagate

Each workshop's `package.json` lists the theme as:

```json
"slidev-theme-nyu": "file:../../theme"
```

With pnpm, `file:` on a local directory creates a **symlink** from `node_modules/slidev-theme-nyu` to the actual folder `theme/` at the repo root. The consequences:

- Edit anything inside `theme/` (a layout, a component, `tokens.css`), save it, and **every workshop dev server picks it up on the next reload**. No reinstall step.
- The link is local-only, pnpm doesn't copy files, it points at them.
- One commit can change the theme and every deck together, and CI rebuilds everything on push.

This is what you want during active design: one brand, propagated everywhere.

### Freezing a workshop you've delivered

If you've already given workshop 01 and don't want a future theme change to alter what attendees saw:

- **The PDF / static build you shipped is already frozen.** `slidev export` captures the theme state at the moment you built it. Re-running it would pick up theme changes; the previously generated file does not.
- **Tag the commit.** Run `git tag ws01-delivered-2026-09-15`. To rebuild later: `git checkout ws01-delivered-2026-09-15 && pnpm install && pnpm --filter ./workshops/01-slidev build`. Because the theme lives in the same repo, one tag freezes both the deck and its look.
- **Releases do this for you.** Every `v*` tag attaches immutable PDF + PPTX + offline HTML to a GitHub Release.

---

## Workshops index

| # | Title | Status | Links |
|---|-------|--------|-------|
| 01 | AI-Assisted Presentations with Slidev: From Prompt to Polished Deck | Draft | [slides](https://hzaatiti.github.io/ai-upscaling/01-slidev/) · [PDF](https://hzaatiti.github.io/ai-upscaling/01-slidev/slides.pdf) · [PPTX](https://hzaatiti.github.io/ai-upscaling/01-slidev/slides.pptx) |

When you add a new workshop, add it to this table. Its links follow the pattern `https://hzaatiti.github.io/ai-upscaling/<NN-slug>/` (live slides), `.../<NN-slug>/slides.pdf` (PDF), and `.../<NN-slug>/slides.pptx` (PowerPoint).

---

## Command reference

Every command this repo uses, in one place. Run them from the repo root unless noted otherwise.

| Command | What it does |
|---------|--------------|
| `pnpm install` | Reads every `package.json` in the workspace, downloads dependencies, creates `node_modules/` and the `file:` symlink to `theme/`. Run after cloning, after pulling new changes, after adding a workshop. |
| `pnpm new-workshop <slug>` | Scaffolds `workshops/NN-<slug>/` with a minimal Slidev deck. Picks the next number automatically. After running it, run `pnpm install` to register the new package. |
| `pnpm --filter ./workshops/NN-<name> dev` | Starts the Slidev dev server for that workshop at `http://localhost:3030`. Stays running; Ctrl-C to stop. |
| `pnpm --filter ./workshops/NN-<name> build` | Generates a static website in `workshops/NN-<name>/dist/`. Upload that folder to any web host. |
| `pnpm --filter ./workshops/NN-<name> export` | Generates a PDF at `workshops/NN-<name>/slides-export.pdf` (one slide per page). |
| `pnpm dev:01` | Shortcut for `pnpm --filter ./workshops/01-slidev dev`. Defined in the root `package.json`. |
| `pnpm build:01` | Shortcut for `pnpm --filter ./workshops/01-slidev build`. |
| `pnpm export:01` | Shortcut for `pnpm --filter ./workshops/01-slidev export`. |
| `pnpm export:01:pptx` | Shortcut for the PowerPoint export. |
| `pnpm data:01` | Regenerates `workshops/01-slidev/stats.json` (the numbers shown on the "repo stats" slide) by scanning this repo. |
| `pnpm build:site` / `pnpm preview:site` / `pnpm build:release` | Local versions of what CI does; see the publishing section above. |
| `git tag <tag-name>` | Marks the current commit with a label. Useful for snapshotting a delivered workshop. |

### The flag explanations

- `--filter ./workshops/NN-<name>`, pnpm only runs the command inside that one folder. Without this flag, pnpm would try to run the command in every workspace package at once.
- `-D` (or `--save-dev`), install the package as a devDependency rather than a regular dependency. devDependencies aren't installed when someone consumes your package via npm, but they are installed locally, fine for tools used only during development/build.
- `-g` (or `--global`), install the package globally (available everywhere on your machine, not just in one project). Used during one-time pnpm install (`npm install -g pnpm`).

---

## For AI agents

If you're an AI coding agent (Claude Code, Cursor, etc.) or you're working in this repo with one, read these first:

- [`AGENTS.md`](AGENTS.md), repo-level rules: the vendored theme and `file:` protocol, hard rules (including "no em dashes"), gotchas (`--base ./`, npm vs pnpm, Windows symlinks), commands, publishing.
- [`workshops/AGENTS.md`](workshops/AGENTS.md), slide-authoring conventions: frontmatter, layouts, snippets (and the `<<<` import gotcha for `.md` files), speaker notes, fit-to-canvas rules, dark-background contrast, test checklist.
- [`theme/README.md`](theme/README.md), the theme reference: every layout slot, component prop, and design token.

These files cover everything an agent needs to know to work productively in this repo. Update them when you discover a new gotcha, that's how the institutional memory grows.

---

## License

NYU workshop materials by Hadi Zaatiti and Sam. Ask the maintainers before redistributing.
