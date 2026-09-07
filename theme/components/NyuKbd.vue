<!--
  NyuKbd, keyboard key chip. <NyuKbd>Cmd</NyuKbd> <NyuKbd>K</NyuKbd>
-->
<template>
  <kbd class="nyu-kbd"><slot /></kbd>
</template>

<style scoped>
.nyu-kbd {
  display: inline-block;
  font-family: var(--font-mono);
  font-size: 0.78em;
  padding: 0.05em 0.45em;
  border: 1px solid var(--hairline);
  border-bottom-width: 2px;
  border-radius: var(--r-1);
  background: var(--bg1);
  color: var(--fg1);
  vertical-align: 1px;
  margin: 0 0.1em;
}
</style>
