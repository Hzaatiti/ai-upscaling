---
# This is the template's own demo deck. It documents every layout and component
# so theme users can see what is available. Workshops should NOT edit this file;
# instead, copy the patterns into their own slides.md.
theme: ./
title: NYU Slidev Theme, Demo
info: |
  Demonstration of the `slidev-theme-nyu` theme.

  Layouts, components, and color tokens used across the NYU upscaling workshop series.
author: NYU Upscaling Workshops
highlighter: shiki
lineNumbers: false
drawings:
  persist: false
transition: fade
mdc: true
layout: cover
---

# NYU Slidev Theme

::eyebrow::
<span class="nyu-tag nyu-tag--accent">Demo · v0.1</span>

::meta::
New York University
12 May 2026

---
layout: section
---

::number::
PART 01

# Layouts

::subtitle::
Four reusable slide shapes, pick the one that fits the idea.

---
layout: default
---

# The default layout

Everyday slides use `layout: default`. You get a body slot and a footer with the deck title, author, and page number.

- Bullets render with accent markers
- `inline code` gets a soft warm background
- [Links](https://sli.dev) inherit the brand color

<NyuCallout label="Tip">
Speaker notes go inside an HTML comment under the slide content. See the source of this file.
</NyuCallout>

<!--
This is what speaker notes look like. They show up in the presenter view but
not the audience view. Use them liberally, your future self will thank you.
-->

---
layout: two-cols-header
---

# Two columns with a shared header

::left::

### Left column

Use this layout when you want to compare or contrast two things side by side.

- Item A
- Item B
- Item C

::right::

### Right column

The header spans both columns. The columns share a vertical rule by default.

```ts
// Code blocks render the same in either column
const sum = (a: number, b: number) => a + b
```

---
layout: section
---

::number::
PART 02

# Components

::subtitle::
Auto-imported Vue components ready to drop into any slide.

---

# Components: callouts and chips

A `<NyuCallout>` for emphasis:

<NyuCallout label="Watch out" tone="accent">
Don't commit `node_modules` to git. The <code>.gitignore</code> in this repo already excludes it.
</NyuCallout>

Keyboard shortcuts with `<NyuKbd>`:

Press <NyuKbd>Cmd</NyuKbd> + <NyuKbd>K</NyuKbd> in the Slidev UI to open the slide navigator.

Inline brand tags: <span class="nyu-tag">Required</span> &nbsp; <span class="nyu-tag nyu-tag--accent">Optional</span>

---

# Code samples

```ts {monaco}
// Slidev highlights with Shiki by default. Add `{monaco}` to make a block editable.
function greet(name: string) {
  return `Hello, ${name}!`
}

console.log(greet('NYU'))
```

Line highlighting works too:

```ts {2-3}
function fib(n: number): number {
  if (n < 2) return n
  return fib(n - 1) + fib(n - 2)
}
```

---
layout: end
---

# Thanks!

::meta::
Repo: github.com/Hzaatiti/ai-upscaling
Maintainers: Hadi Zaatiti and Samuel A. Prieto
