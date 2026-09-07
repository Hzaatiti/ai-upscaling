<!--
  layout: end
  Closing slide. Mirrors the section layout, deep violet, serif display title
 , for symmetry with the section dividers.

  Slots:
    - default : markdown title (e.g. `# Thanks!`)
    - meta    : contact / repo link

  Don't wrap the default slot in an <h1>; let the markdown's `#` produce it.
-->
<template>
  <div class="slidev-layout nyu-end">
    <NyuLogo class="nyu-end__logo" white />

    <div class="nyu-end__title">
      <slot>
        <h1>Thank you.</h1>
      </slot>
    </div>

    <hr class="nyu-end__rule" />

    <div class="nyu-end__meta">
      <slot name="meta" />
    </div>
  </div>
</template>

<style scoped>
.nyu-end {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: var(--nyuad-deep-violet);
  padding: var(--s-7) var(--s-8);

  /* Locally rebind the semantic color tokens so the entire subtree (headings,
     paragraphs, lists, links, code) inherits light-on-violet treatment without
     needing per-element overrides. */
  --fg1:      var(--white);
  --fg2:      var(--violet-200);
  --fg3:      var(--violet-300);
  --link:     var(--gold);
  --link-hover: #E8B946;
  --bg2:      var(--violet-800);
  --hairline: var(--violet-700);
  --border:   var(--violet-600);
  color: var(--fg1);
}

.nyu-end__logo { margin-bottom: var(--s-6); }

.nyu-end__title :deep(h1),
.nyu-end__title h1 {
  font-family: var(--font-serif);
  font-size: var(--t-display);
  font-weight: 700;
  line-height: var(--lh-tight);
  letter-spacing: -0.01em;
  color: var(--white);
  text-transform: none;
  margin: 0;
}

.nyu-end__rule {
  border: 0;
  border-top: 1px solid var(--violet-700);
  margin: var(--s-6) 0 var(--s-4);
}

.nyu-end__meta {
  font-family: var(--font-sans);
  font-size: var(--t-small);
  color: var(--violet-200);
  line-height: var(--lh-normal);
}
.nyu-end__meta :deep(a) {
  color: var(--gold);
  text-decoration: underline;
}
.nyu-end__meta :deep(p) { margin: 0.2em 0; color: var(--violet-200); }
</style>
