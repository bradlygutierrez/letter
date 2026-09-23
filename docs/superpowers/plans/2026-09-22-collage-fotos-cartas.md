# Collage de fotos y cabeceras para las cartas Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the current single-image letter experience into a mobile-first birthday page with a baby-photo collage on the landing view and two couple photos in every opened letter.

**Architecture:** Keep the dependency-free single-page structure in `index.html`. Add a semantic decorative collage above the intro, extend each letter record with two local image paths, and render a two-image gallery inside the existing letter view. Use CSS media queries and `clamp()` to fix the narrow mobile composition without changing the envelope navigation model.

**Tech Stack:** HTML5, inline CSS, vanilla JavaScript, local JPEG assets.

---

### Task 1: Add the landing collage markup and styles

**Files:**
- Modify: `index.html` in the landing section and `<style>` block

- [ ] **Step 1: Add the collage block above the intro title**

Insert a `<figure class="photo-collage" aria-label="Recuerdos de bebé">` before `.intro`, with one featured image and five decorative images. Use the exact local filenames from `images/Fotos Daiara Bebe/`, URL-encoded as needed for spaces and parentheses. Keep decorative images `alt=""` so screen readers skip them.

- [ ] **Step 2: Define the mobile-first collage layout**

Add a fixed-but-fluid mobile composition using `height: clamp(150px, 42vw, 250px)`, CSS grid positioning, rounded image frames, subtle rotations, and `object-fit: cover`. Keep the collage `max-width` below the intro width and add bottom spacing so it does not collide with the title.

- [ ] **Step 3: Add the larger viewport adjustment**

Inside the existing `@media (min-width: 760px)` block, increase the collage height and scale the featured image slightly while keeping the title and cards below it.

- [ ] **Step 4: Verify the collage paths and accessibility markup**

Run:

```bash
rg -n "photo-collage|Fotos%20Daiara%20Bebe|alt=\"\"" index.html
```

Expected: one collage block, six baby-photo references, and decorative empty alt attributes.

- [ ] **Step 5: Commit the landing collage**

```bash
git add index.html
git commit -m "feat: add baby photo collage to landing page"
```

### Task 2: Replace each letter photo with a two-image gallery

**Files:**
- Modify: `index.html` in `.letter-photo` markup, styles, and the `letters` array

- [ ] **Step 1: Change the letter photo markup to two image slots**

Replace the single `#letterImage` element with a `.letter-photo-grid` containing `#letterImageOne` and `#letterImageTwo`. Keep a shared fallback layer for the case where both photos fail, and preserve the existing fallback text.

- [ ] **Step 2: Style the gallery for mobile and desktop**

Use a two-column grid with a fixed visual height based on `aspect-ratio: 16 / 8`, `min-height: 132px`, `overflow: hidden`, and `object-fit: cover`. Give each image its own rounded corners and a warm fallback background. At narrow widths, prevent the gallery from becoming too tall by using `height: clamp(132px, 36vw, 220px)`.

- [ ] **Step 3: Add two couple-photo paths per letter record**

Update `letters` so each object has an `images` array with two exact paths from `images/Fotos Nosotros Juntos/`. Use a distinct pair for each card where possible and reuse the remaining photo only when necessary.

- [ ] **Step 4: Render both image slots and handle failures independently**

Replace `renderLetter(index)` with logic that sets both `src` and `alt` values, clears `hidden`, hides the shared fallback, and tracks image errors. Show the fallback only if both images fail; if one fails, hide only that slot so the surviving photo remains visible.

- [ ] **Step 5: Verify the letter data and behavior wiring**

Run:

```bash
rg -n "letterImageOne|letterImageTwo|Fotos%20Nosotros%20Juntos|images: \[|addEventListener\(\"error\"" index.html
```

Expected: two image slots, six couple-photo references, three `images` arrays, and error handling for both slots.

- [ ] **Step 6: Commit the two-image letter galleries**

```bash
git add index.html
git commit -m "feat: add paired photos to each letter"
```

### Task 3: Repair the mobile-first composition

**Files:**
- Modify: `index.html` responsive CSS only

- [ ] **Step 1: Reduce the mobile intro and card footprint**

Set the default `.site-shell` padding to a compact mobile value, reduce `.landing-view` minimum height so the collage and first card can appear naturally in one scroll, and reduce `.envelope-card` minimum height to a compact range while retaining readable text and a 44px-plus touch target.

- [ ] **Step 2: Prevent title and card content collisions**

Use `font-size: clamp(...)`, a controlled `max-width` for `.envelope-label`, and consistent bottom padding on `.envelope-content`. Ensure the decorative envelope shapes stay behind text and do not intercept pointer events.

- [ ] **Step 3: Tune the opened letter for narrow screens**

Reduce `.letter-card` outer padding and `.letter-inner` horizontal padding for widths below 380px. Keep the back button full-height enough to tap, and keep the letter copy measure readable without horizontal overflow.

- [ ] **Step 4: Preserve desktop layout at 760px and above**

Keep the existing three-column envelope grid for larger viewports, increase spacing only where the collage needs it, and verify the letter gallery remains balanced at desktop width.

- [ ] **Step 5: Verify responsive selectors and motion fallback**

Run:

```bash
rg -n "@media|prefers-reduced-motion|envelope-grid|letter-photo-grid|clamp\(" index.html
```

Expected: mobile defaults, desktop breakpoint rules, and reduced-motion support are all present.

- [ ] **Step 6: Commit the mobile layout repair**

```bash
git add index.html
git commit -m "fix: improve mobile-first letter layout"
```

### Task 4: Run end-to-end static and manual verification

**Files:**
- Verify: `index.html`
- Verify: `images/Fotos Daiara Bebe/`
- Verify: `images/Fotos Nosotros Juntos/`

- [ ] **Step 1: Confirm all referenced local assets exist**

Run:

```bash
find "images/Fotos Daiara Bebe" -type f -iname '*.jpeg' | wc -l
find "images/Fotos Nosotros Juntos" -type f -iname '*.jpeg' | wc -l
```

Expected: six baby JPEGs and five couple JPEGs.

- [ ] **Step 2: Confirm no stale placeholder image paths remain**

Run:

```bash
rg -n "images/carta-|https?://|TODO|TBD|undefined" index.html
```

Expected: no `images/carta-*` paths, remote image URLs, or placeholder markers.

- [ ] **Step 3: Exercise all three envelope flows**

Open `index.html` in a browser. At a narrow mobile viewport, confirm the collage appears above the title, each envelope opens its matching letter, each letter shows two couple photos, the back button returns to the landing view, and focus returns to the selected envelope.

- [ ] **Step 4: Check narrow and desktop layout**

Verify at approximately 320px, 390px, and 1280px widths. Confirm no horizontal scrolling, no clipped text, no distorted photos, and a three-column envelope grid on desktop.

- [ ] **Step 5: Check keyboard and reduced-motion behavior**

Tab to an envelope, activate it with Enter, press Escape to return, then emulate `prefers-reduced-motion: reduce` and confirm state changes still work without large movement.

- [ ] **Step 6: Commit the verified final state**

```bash
git add index.html images
git commit -m "chore: verify photo collage experience"
```
