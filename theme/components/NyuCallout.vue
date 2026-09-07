<!--
  NyuCallout, labeled note box.
  Hairline border + light surface, no colored left-border accent (the design
  system explicitly avoids that trope). Label rendered as an eyebrow.

  Tones:
    - violet (default): eyebrow in violet
    - accent           : eyebrow in gold; reserved for editorial highlights
    - sand             : sand-colored background for editorial / quote-style notes
-->
<template>
  <aside class="nyu-callout" :class="`nyu-callout--${tone}`">
    <div class="nyu-callout__label nyu-eyebrow" v-if="label">{{ label }}</div>
    <div class="nyu-callout__body"><slot /></div>
  </aside>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  label?: string
  tone?: 'violet' | 'accent' | 'sand'
}>(), {
  tone: 'violet',
})
</script>

<style scoped>
.nyu-callout {
  background: var(--bg2);
  border: 1px solid var(--hairline);
  border-radius: var(--r-2);
  padding: var(--s-4) var(--s-5);
  margin: var(--s-3) 0;
}

.nyu-callout--sand {
  background: var(--sand);
  border-color: rgba(201, 154, 30, 0.25);
}

.nyu-callout__label {
  margin-bottom: var(--s-2);
}
.nyu-callout--accent .nyu-callout__label { color: var(--gold); }
.nyu-callout--sand   .nyu-callout__label { color: var(--ink-700); }

.nyu-callout__body {
  font-size: var(--t-body);
  color: var(--fg1);
}
.nyu-callout__body :deep(p:last-child) { margin-bottom: 0; }
.nyu-callout__body :deep(code) { background: var(--white); }
</style>
