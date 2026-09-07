<!--
  RepoStats: headline KPI cards from stats.json, which is generated at build
  time by scripts/repo-stats.mjs (it scans THIS repository and counts things).
  Numbers count up on mount. Pure display, no runtime network call, so the
  published static site ships plain JSON and nothing else.

  This demonstrates the "bake data at build time" pattern: a Node script
  writes JSON, the component imports the JSON, Vite inlines it.
-->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import stats from '../stats.json'

const s = stats as Record<string, any>

const cards = [
  { label: 'Workshop decks in this repo', value: s.decks ?? 0 },
  { label: 'Lines of Markdown authored', value: s.markdownLines ?? 0 },
  { label: 'Vue components', value: s.vueComponents ?? 0 },
  { label: 'Design tokens in the theme', value: s.designTokens ?? 0 },
]

const display = ref(cards.map(() => 0))
const fmt = (n: number) => Math.round(n).toLocaleString()

onMounted(() => {
  const dur = 900
  const t0 = performance.now()
  function tick(now: number) {
    const p = Math.min(1, (now - t0) / dur)
    const e = 1 - Math.pow(1 - p, 3) // easeOutCubic
    display.value = cards.map((c) => c.value * e)
    if (p < 1) requestAnimationFrame(tick)
    else display.value = cards.map((c) => c.value)
  }
  requestAnimationFrame(tick)
})

const generated = String(s.generatedAt || '').slice(0, 10)
</script>

<template>
  <div class="kpi">
    <div class="kpi__grid">
      <div v-for="(c, i) in cards" :key="c.label" class="kpi__card">
        <div class="kpi__value">{{ fmt(display[i]) }}</div>
        <div class="kpi__label">{{ c.label }}</div>
      </div>
    </div>
    <div class="kpi__foot">
      Counted from this repository by scripts/repo-stats.mjs<span v-if="generated"> · generated {{ generated }}</span>
    </div>
  </div>
</template>

<style scoped>
.kpi {
  margin-top: var(--s-4);
}
.kpi__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--s-4);
}
.kpi__card {
  border: 1px solid var(--hairline);
  border-left: 4px solid var(--nyu-color-violet);
  border-radius: var(--r-3);
  background: var(--bg2);
  padding: var(--s-5);
}
.kpi__value {
  font-family: var(--font-serif);
  font-size: 42px;
  line-height: 1.05;
  color: var(--fg1);
  font-variant-numeric: tabular-nums;
}
.kpi__label {
  margin-top: var(--s-2);
  font-size: var(--t-small);
  color: var(--fg2);
}
.kpi__foot {
  margin-top: var(--s-5);
  font-size: var(--t-caption);
  color: var(--fg3);
}
</style>
