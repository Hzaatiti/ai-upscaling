<!--
  layout: default
  Everyday content slide. White surface, body slot, hairline footer.
-->
<template>
  <div class="slidev-layout nyu-default">
    <div class="nyu-default__body">
      <slot />
    </div>
    <NyuFooter />
  </div>
</template>

<style scoped>
.nyu-default {
  /* Claim the full slide. Without height: 100%, the flex column collapses to
     content height and the footer flows mid-slide instead of being pushed to
     the bottom. Slidev's .slidev-layout rule sometimes sets height but isn't
     reliable across versions, so set it explicitly here. */
  height: 100%;
  min-height: 100%;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: var(--bg1);
  padding: var(--s-6) var(--s-7) var(--s-4);
}

.nyu-default__body {
  /* flex: 1 1 0 makes the body expand to fill available vertical space, which
     pushes the footer to the bottom of the layout. min-height: 0 lets the
     body shrink when its content overflows rather than refusing. */
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  gap: var(--s-3);
  min-height: 0;
}
</style>
