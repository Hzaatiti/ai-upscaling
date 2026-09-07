#!/usr/bin/env node
/*
 * scripts/repo-stats.mjs
 *
 * Counts a few facts about THIS repository and writes them to ../stats.json,
 * which the <RepoStats /> slide component renders. This is the workshop's
 * worked example of the "bake data at build time" pattern:
 *
 *   Node script -> committed JSON -> Vue component imports the JSON.
 *
 * No credentials, no network, and nothing fetched at runtime in the published
 * deck. Run it with `npm run data` (or `pnpm --filter ./workshops/01-slidev data`)
 * and commit the refreshed stats.json.
 *
 * Fails soft: any error leaves the existing stats.json untouched so a build
 * never breaks because of this script.
 */

import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs'
import { dirname, join, resolve, extname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const workshopDir = resolve(__dirname, '..')          // workshops/01-slidev
const repoRoot = resolve(workshopDir, '..', '..')     // repo root

const SKIP_DIRS = new Set(['node_modules', 'dist', '.git', '.release-tmp', 'release'])

function* walk(dir) {
  let entries
  try {
    entries = readdirSync(dir, { withFileTypes: true })
  } catch {
    return
  }
  for (const e of entries) {
    if (e.isDirectory()) {
      if (SKIP_DIRS.has(e.name)) continue
      yield* walk(join(dir, e.name))
    } else if (e.isFile()) {
      yield join(dir, e.name)
    }
  }
}

function countLines(file) {
  try {
    return readFileSync(file, 'utf8').split('\n').length
  } catch {
    return 0
  }
}

try {
  // Decks: workshops/NN-* folders.
  const decks = readdirSync(join(repoRoot, 'workshops'), { withFileTypes: true })
    .filter((d) => d.isDirectory() && /^\d+-/.test(d.name)).length

  // Walk once, tally Markdown lines and Vue components across the repo.
  let markdownLines = 0
  let vueComponents = 0
  for (const f of walk(repoRoot)) {
    const ext = extname(f)
    if (ext === '.md') markdownLines += countLines(f)
    else if (ext === '.vue') vueComponents += 1
  }

  // Design tokens: CSS custom properties defined in the theme's tokens.css.
  const tokensCss = readFileSync(join(repoRoot, 'theme', 'styles', 'tokens.css'), 'utf8')
  const designTokens = new Set(
    [...tokensCss.matchAll(/^\s*(--[a-z0-9-]+)\s*:/gim)].map((m) => m[1]),
  ).size

  const stats = {
    source: 'repo-stats.mjs',
    generatedAt: new Date().toISOString(),
    decks,
    markdownLines,
    vueComponents,
    designTokens,
  }

  const out = join(workshopDir, 'stats.json')
  writeFileSync(out, JSON.stringify(stats, null, 2) + '\n')
  console.log(`Wrote ${out}`)
  console.log(stats)
} catch (err) {
  console.warn(`repo-stats failed soft, keeping existing stats.json: ${err.message}`)
}
