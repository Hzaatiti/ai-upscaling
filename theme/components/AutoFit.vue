<!--
  AutoFit: scales its slotted content DOWN so a slide never overflows the fixed
  Slidev canvas. It never scales up, and if it cannot measure (no height yet) it
  leaves content at 1x, so wrapping is always safe. Use it as a safety net around
  a slide body that risks overflowing:

    <AutoFit>

    # A dense slide

    ...lots of content...

    </AutoFit>

  Prefer authoring within the slide budget first (see workshops/AGENTS.md); reach
  for AutoFit when content is genuinely variable or borderline. Note: scaling
  shrinks everything uniformly, including text, so don't rely on it to cram in
  unlimited content, a 0.6x slide is hard to read from the back of a room.
-->
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'

const outer = ref<HTMLElement | null>(null)
const inner = ref<HTMLElement | null>(null)
const scale = ref(1)
let ro: ResizeObserver | null = null

function fit() {
  const o = outer.value
  const i = inner.value
  if (!o || !i) return
  // offsetHeight is the pre-transform layout height, so reading it while a
  // scale is applied is stable and does not cause a ResizeObserver loop.
  const availH = o.clientHeight
  const needH = i.offsetHeight
  if (!availH || !needH) return
  scale.value = Math.min(1, availH / needH)
}

onMounted(() => {
  nextTick(fit)
  ro = new ResizeObserver(() => fit())
  if (outer.value) ro.observe(outer.value)
  if (inner.value) ro.observe(inner.value)
  window.addEventListener('resize', fit)
})
onBeforeUnmount(() => {
  ro?.disconnect()
  window.removeEventListener('resize', fit)
})
</script>

<template>
  <div ref="outer" class="autofit">
    <div ref="inner" class="autofit__inner" :style="{ transform: `scale(${scale})` }">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.autofit {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.autofit__inner {
  transform-origin: top left;
  width: 100%;
}
</style>
