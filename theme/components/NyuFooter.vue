<!--
  NyuFooter, slim hairline footer on content slides.
  Eyebrow label on the left (deck title in all-caps tracked sans), tabular
  mono page number on the right. No decorative dots, design language is
  restrained.
-->
<template>
  <div class="nyu-footer">
    <div class="nyu-footer__left nyu-eyebrow">{{ deckTitle }}</div>
    <div class="nyu-footer__right">
      <span v-if="author" class="nyu-footer__author">{{ author }}</span>
      <span class="nyu-footer__sep" v-if="author">·</span>
      <span class="nyu-footer__page">{{ $slidev.nav.currentPage }} / {{ $slidev.nav.total }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { configs } from '@slidev/client'
import { computed } from 'vue'

const cfg = configs as Record<string, any>
const deckTitle = computed(() => cfg.title || 'NYU Workshop')
const author = computed(() => cfg.author || '')
</script>

<style scoped>
.nyu-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--s-3);
  border-top: 1px solid var(--hairline);
  font-family: var(--font-sans);
  font-size: var(--t-caption);
  color: var(--fg3);
}

.nyu-footer__left {
  /* inherits .nyu-eyebrow styling, uppercase tracked sans, violet */
}

.nyu-footer__right { display: flex; align-items: center; gap: var(--s-2); }

.nyu-footer__author {
  font-weight: 500;
  color: var(--fg2);
}

.nyu-footer__sep { opacity: 0.4; }

.nyu-footer__page {
  font-family: var(--font-mono);
  font-variant-numeric: tabular-nums;
  color: var(--fg2);
}
</style>
