<!--
  Official NYUAD SVG lockup, used unchanged as an alpha mask.
  Color the original silhouette violet on light surfaces and white on dark
  surfaces. The transparent torch remains visible inside its surrounding box.
-->
<template>
  <div class="nyu-logo" :class="{ 'nyu-logo--white': white }">
    <span
      class="nyu-logo__img"
      role="img"
      aria-label="NYU Abu Dhabi"
      :style="{ maskImage: `url(${resolvedSrc})`, WebkitMaskImage: `url(${resolvedSrc})` }"
    />
    <div class="nyu-logo__sub" v-if="!minimal">NYU Workshop</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  /** Render as white (for dark/violet backgrounds) */
  white?: boolean
  /** Hide the sublabel */
  minimal?: boolean
  /** Override the logo path. Default points to the bundled brand asset. */
  src?: string
}>(), {
  src: 'brand/nyuad-logo.svg',
})

// Prefix Vite's base URL so the asset resolves whether the deck is served at
// the domain root (PDF export, local preview) OR under a sub-path (GitHub
// Pages project sites, e.g. /repo/NN-slug/). A bare "/brand/..." would point
// at the domain root and 404 on a sub-path deploy.
const resolvedSrc = computed(() => {
  const s = props.src
  if (/^(https?:|data:|blob:)/.test(s)) return s          // leave full URLs alone
  const base = import.meta.env.BASE_URL || '/'             // always ends with "/"
  return base + s.replace(/^\//, '')                       // join, dropping any leading slash
})
</script>

<style scoped>
.nyu-logo {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--s-2);
}

.nyu-logo__img {
  height: 32px;
  aspect-ratio: 277.4 / 69.6;
  display: block;
  background-color: var(--nyu-logo-color, var(--nyu-violet));
  mask-size: contain;
  mask-position: center;
  mask-repeat: no-repeat;
  -webkit-mask-size: contain;
  -webkit-mask-position: center;
  -webkit-mask-repeat: no-repeat;
}

.nyu-logo__sub {
  font-family: var(--font-sans);
  font-size: var(--t-eyebrow);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: var(--tracked);
  color: var(--fg2);
}

.nyu-logo--white,
:global(html.dark .nyu-logo) { --nyu-logo-color: var(--white); }

.nyu-logo--white .nyu-logo__sub { color: var(--violet-200); }
</style>
