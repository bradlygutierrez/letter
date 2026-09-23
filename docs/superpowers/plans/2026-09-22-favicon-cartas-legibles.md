# Favicon romántico y cartas legibles Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an editable romantic envelope favicon and format the `letters` data so every card is easy to read and rewrite.

**Architecture:** Keep the favicon as a standalone SVG linked from `index.html`. Preserve the existing `letters` array and runtime behavior in `script.js`, changing only its formatting into expanded multiline objects.

**Tech Stack:** HTML5, SVG, vanilla JavaScript, Node static checks.

---

### Task 1: Add the romantic envelope favicon

**Files:**
- Create: `favicon.svg`
- Modify: `index.html`
- Modify: `tests/check-collage.mjs`

- [ ] **Step 1: Add a failing favicon check**

Extend `tests/check-collage.mjs` to require `favicon.svg`, verify the HTML link, and check that the SVG contains an envelope and heart:

```js
const faviconUrl = new URL("../favicon.svg", import.meta.url);
assert(existsSync(faviconUrl), "falta favicon.svg");
const favicon = readFileSync(faviconUrl, "utf8");
assert(html.includes('<link rel="icon" type="image/svg+xml" href="favicon.svg" />'), "index.html debe enlazar favicon.svg");
assert(favicon.includes('aria-label="Sobre romántico"'), "el favicon debe identificar el sobre romántico");
```

- [ ] **Step 2: Run the test and confirm the expected failure**

Run:

```bash
node tests/check-collage.mjs
```

Expected: failure with `falta favicon.svg`.

- [ ] **Step 3: Create the SVG and link it**

Create `favicon.svg` with this compact square icon:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="Sobre romántico">
  <rect width="64" height="64" rx="14" fill="#f8efe4" />
  <path d="M10 20h44v30H10z" fill="#e7a6ad" />
  <path d="M10 20l22 18 22-18" fill="#f5c9c2" />
  <path d="M10 50l17-16 5 4 5-4 17 16" fill="#d98e9b" />
  <path d="M32 43c-7-4-9-8-6-11 2-2 5-1 6 1 1-2 4-3 6-1 3 3 1 7-6 11z" fill="#7a3d4f" />
</svg>
```

Add this line after the theme-color meta tag in `index.html`:

```html
<link rel="icon" type="image/svg+xml" href="favicon.svg" />
```

- [ ] **Step 4: Verify and commit the favicon**

Run:

```bash
node tests/check-collage.mjs
```

Expected: `check-collage: OK`.

Commit:

```bash
git add favicon.svg index.html tests/check-collage.mjs
git commit -m "feat: add romantic envelope favicon"
```

### Task 2: Expand the letter data for easy editing

**Files:**
- Modify: `script.js`
- Modify: `tests/check-collage.mjs`

- [ ] **Step 1: Add structural assertions for the existing data**

Assert that `script.js` still contains three `theme`, three `title`, three `signature`, six image paths, and six paragraph strings after formatting.

- [ ] **Step 2: Format every letter object**

Rewrite only the `letters` declaration so every object uses the same expanded shape as this first record:

```js
{
  theme: "Una verdad sencilla",
  title: "Lo que amo de vos",
  images: [
    "images/Fotos Nosotros Juntos/WhatsApp Image 2026-09-22 at 10.02.16 PM.jpeg",
    "images/Fotos Nosotros Juntos/WhatsApp Image 2026-09-22 at 10.02.28 PM.jpeg",
  ],
  fallback: "Todo lo lindo de vos",
  paragraphs: [
    "Amo la forma en que hacés que los días comunes se sientan especiales. Amo tu risa, tu manera de mirar el mundo y esa ternura que aparece incluso cuando no te das cuenta.",
    "En tu cumpleaños quiero recordarte que sos una persona inmensa, de esas que dejan luz donde pasan. Gracias por existir y por dejarme acompañarte en este camino.",
  ],
  signature: "Con todo mi amor,\nTu tito",
},
```

Keep every existing value byte-for-byte equivalent.

- [ ] **Step 3: Verify syntax, behavior checks, and diff quality**

Run:

```bash
node --check script.js
node tests/check-collage.mjs
git diff --check
```

Expected: valid syntax, `check-collage: OK`, and no whitespace errors.

- [ ] **Step 4: Commit the readable data formatting**

```bash
git add script.js tests/check-collage.mjs
git commit -m "refactor: format letter content for editing"
```
