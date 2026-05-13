# Animated CSS grain background — design

**Status:** approved
**Scope:** engineer mode (`/`) — Selected Works section + whole page bg
**Files touched:** `index.html`, `src/styles/concrete.css`, `src/styles/perso.css`

## Problem

The engineer-mode visual is too "lisse" (flat, sterile). The existing palette is
already named "Berghain / concrete" in `theme.css` and there's a faint 0.045
opacity grid via `body::after`, but the result reads as a tidy Behance template,
not a textured space. The Selected Works section in particular feels like four
clean cards in a column.

## Decision

Add one new visual layer: an **animated CSS grain** (SVG `feTurbulence` encoded
as a data-URI, no JS, no assets, ~1 KB), plus a very subtle CRT scanline pass.
**No layout, typography, or component change.**

Validated mockup at `.superpowers/brainstorm/.../grain-locked-fixed.html`.

## Final values

| Var              | Value | Notes                                             |
| ---------------- | ----- | ------------------------------------------------- |
| grain opacity    | 0.60  | High — assumes overlay blend mode brings it down  |
| grain speed      | 4s    | Slow drift, not flicker — calmer than a real CRT  |
| grain blend      | multiply | Only darkens — no washed-out highlights        |
| scanline opacity | 0.13  | Just-perceptible darkening band pattern           |
| scanline blend   | multiply |                                                |

## Implementation

### DOM (index.html, NOT App.tsx)

Inject **once** as a sibling of `#root`, inside `<body>`:

```html
<body>
  <div class="bg-fx" aria-hidden="true">
    <div class="bg-fx-grain"></div>
    <div class="bg-fx-scanlines"></div>
  </div>
  <div id="root"></div>
  ...
</body>
```

**Why outside `#root`:** `#root` has `z-index: 1` which creates a new stacking
context. `mix-blend-mode: overlay` only blends with the backdrop inside the
same stacking context, so if `.bg-fx` lived inside `#root` it would blend
against the (transparent) `#root` background — grain renders washed-out white.
Placing `.bg-fx` as a body-level sibling puts it in body's stacking context,
where it blends against the dark `var(--bg)` + radial gradients. Also keeps
the grain visually *behind* the figures rather than over them.

Why a dedicated element rather than a body pseudo-element:
- `body::after` is already used for the static grid
- `body::before` is already used in perso mode for the tile grid
- A dedicated element gives us two children with independent
  `mix-blend-mode` (which can't be done with one pseudo).

### CSS (concrete.css, appended)

```css
.bg-fx {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;            /* below #root (z-index: 1) — grain stays in background */
  overflow: hidden;
}

.bg-fx-grain {
  position: absolute;
  /* Oversized + offset: edges stay outside the viewport for all keyframe values.
     300% layer with -100% offset and translates capped at ±15% → bulletproof. */
  top: -100%;
  left: -100%;
  width: 300%;
  height: 300%;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='320' height='320'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='1 0 0 0 0  1 0 0 0 0  1 0 0 0 0  0 0 0 0 1'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
  background-size: 320px 320px;
  mix-blend-mode: multiply;
  opacity: 0.6;
  animation: bg-fx-grain-shift 4s steps(8) infinite;
}

@keyframes bg-fx-grain-shift {
  0%   { transform: translate(0, 0); }
  12%  { transform: translate(-3%, -5%); }
  25%  { transform: translate(-8%, 3%); }
  37%  { transform: translate(5%, -12%); }
  50%  { transform: translate(-3%, 12%); }
  62%  { transform: translate(-8%, 5%); }
  75%  { transform: translate(8%, 0%); }
  87%  { transform: translate(0%, 8%); }
  100% { transform: translate(0, 0); }
}

.bg-fx-scanlines {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.18) 0px,
    rgba(0, 0, 0, 0.18) 1px,
    transparent 1px,
    transparent 3px
  );
  mix-blend-mode: multiply;
  opacity: 0.13;
}
```

### Mode gating

`.bg-fx` lives in the default (engineer) DOM; perso mode is supposed to look
fully different (white tiles, arcade). Disable in perso via:

```css
body[data-mode="perso"] .bg-fx { display: none; }
```

Following the existing pattern already used for `body::after` (grid).

### Reduced motion

Respect users with vestibular issues / battery savers:

```css
@media (prefers-reduced-motion: reduce) {
  .bg-fx-grain { animation: none; }
}
```

The grain stays as a static texture, only the drift stops.

## Out of scope

Explicitly **not** doing in this change:

- Re-layouting the Selected Works section (no multi-column, no asymmetry)
- Changing the figure frames (no removal of browser/iPhone chrome)
- Changing typography, captions, FIG. labels
- Touching perso mode
- Adding any reference-style "Berghain" elements (giant FIG numerals, callouts,
  blueprint cotes, terminal motif). Considered as moods A/B/C/D in
  brainstorming; user picked "just the grain".

If any of these come back as desired later, they're a separate spec.

## Risks & mitigations

- **Mobile perf**: `mix-blend-mode` on an oversized animated element can be
  expensive on low-end devices. Mitigation: `steps(8)` (only 8 frames per
  cycle, not 60fps interpolation), single layer, GPU-friendly translate-only
  animation. Acceptable.
- **Caption readability over grain**: `.bg-fx` is at z-index 0 (body level)
  and `#root` is at z-index 1, so all figures and captions paint cleanly on
  top of the grain. Grain is wallpaper, not foreground film.
- **Mode flicker on /perso → /**: `data-mode` flips on route change. Grain
  reappears on transition out of perso. Acceptable.
