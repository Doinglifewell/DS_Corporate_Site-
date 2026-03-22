# DeStore Platform — Theme & Colour Guide

**Last updated:** 17 March 2026  
**Status:** LOCKED — applies to all platform pages

---

## System overview

Every page supports two themes: **dark** (default) and **light**. The platform shell controls the toggle and propagates it to all iframe pages via `postMessage`. Each page listens for the message and applies the theme by toggling a class on `<html>`.

---

## How it works

### 1. Platform shell (index.html)
The shell has a toggle button in the topbar. When clicked:
```js
const theme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
document.documentElement.dataset.theme = theme;
localStorage.setItem('ds_theme', theme);
// Propagate to iframe
document.getElementById('frame').contentWindow.postMessage({type:'ds-theme', theme}, '*');
```

### 2. Every iframe page
Each page includes a listener at the top of its `<script>`:
```js
// Theme: listen for parent toggle
window.addEventListener('message', e => {
  if (e.data?.type === 'ds-theme') {
    document.documentElement.dataset.theme = e.data.theme;
  }
});
// Theme: check localStorage on load
const saved = localStorage.getItem('ds_theme');
if (saved) document.documentElement.dataset.theme = saved;
```

### 3. CSS variables
Every page uses the same CSS variable set. The variables change based on `[data-theme="light"]` on the `<html>` element.

---

## CSS Variable Reference

### Dark theme (default — no data-theme attribute needed)

```css
:root {
  /* Backgrounds */
  --bg:       #0a0a0d;    /* Page background */
  --d1:       #0d0d10;    /* Topbar / deep surface */
  --d2:       #141418;    /* Card / section background */
  --d3:       #1c1c22;    /* Input / nested surface */
  --d4:       #202128;    /* Hover / tertiary surface */

  /* Borders */
  --border:   #222230;    /* Default border */
  --border2:  #2e2f3a;    /* Stronger border / hover */

  /* Text */
  --text:     #f0f0f5;    /* Primary text */
  --text2:    #a0a0b0;    /* Secondary text */
  --text3:    #666678;    /* Muted / hint text */

  /* Brand (unchanged between themes) */
  --royal:    #321B68;
  --orchid:   #6A14DB;
  --violet:   #B354F1;

  /* Semantic */
  --green:    #28B79D;
  --green2:   #2FB457;
  --orange:   #FF9F46;
  --red:      #e74c3c;
  --blue:     #3b82f6;
}
```

### Light theme

```css
[data-theme="light"] {
  /* Backgrounds */
  --bg:       #f5f5f8;    /* Page background */
  --d1:       #ffffff;    /* Topbar / deep surface */
  --d2:       #ffffff;    /* Card / section background */
  --d3:       #f0f0f4;    /* Input / nested surface */
  --d4:       #e8e8ee;    /* Hover / tertiary surface */

  /* Borders */
  --border:   #e0e0e8;    /* Default border */
  --border2:  #d0d0da;    /* Stronger border / hover */

  /* Text */
  --text:     #1a1a22;    /* Primary text */
  --text2:    #555566;    /* Secondary text */
  --text3:    #888898;    /* Muted / hint text */

  /* Brand (same) */
  --royal:    #321B68;
  --orchid:   #6A14DB;
  --violet:   #B354F1;

  /* Semantic (slightly adjusted for light bg contrast) */
  --green:    #1a9a82;
  --green2:   #229a48;
  --orange:   #e08830;
  --red:      #d44332;
  --blue:     #2563eb;
}
```

---

## Colour usage rules

### DO

| What | Use | Example |
|------|-----|---------|
| Page background | `var(--bg)` | `background: var(--bg)` |
| Card / panel | `var(--d2)` | `background: var(--d2)` |
| Input fields | `var(--d3)` | `background: var(--d3)` |
| Hover states | `var(--d4)` | `background: var(--d4)` |
| Primary text | `var(--text)` | `color: var(--text)` |
| Secondary text | `var(--text2)` | `color: var(--text2)` |
| Muted text | `var(--text3)` | `color: var(--text3)` |
| Default border | `var(--border)` | `border: 1px solid var(--border)` |
| Strong border | `var(--border2)` | `border: 1px solid var(--border2)` |
| Brand accent | `var(--orchid)` | `background: var(--orchid)` |
| Success | `var(--green)` | `color: var(--green)` |
| Warning | `var(--orange)` | `color: var(--orange)` |
| Danger | `var(--red)` | `color: var(--red)` |
| Info | `var(--blue)` | `color: var(--blue)` |

### DO NOT

- **Never hardcode hex colours** — `color: #f0f0f5` will be invisible on a light background. Always use `var(--text)`.
- **Never use `black` or `white`** — use `var(--text)` and `var(--d2)` instead.
- **Never set `background: #0d0d10`** — use `var(--d1)`.
- **Never use opacity for text colour** — `color: rgba(255,255,255,.5)` breaks in light mode. Use `var(--text3)` instead.

### Semi-transparent overlays (theme-safe)

When you need transparent overlays on brand colours:

```css
/* DO — works in both themes */
background: rgba(106, 20, 219, 0.08);   /* orchid at 8% */
background: rgba(40, 183, 157, 0.1);    /* green at 10% */
background: rgba(255, 159, 70, 0.1);    /* orange at 10% */

/* These are safe because they're on brand colours, not black/white */
```

### Status badges

```css
/* Draft */
background: rgba(from var(--text3) r g b / 0.1);
color: var(--text3);

/* Pending Review */
background: rgba(from var(--orange) r g b / 0.1);
color: var(--orange);

/* Approved */
background: rgba(from var(--blue) r g b / 0.1);
color: var(--blue);

/* Live */
background: rgba(from var(--green2) r g b / 0.1);
color: var(--green2);

/* Fallback for browsers without relative colour syntax: */
.badge.draft    { background: rgba(102,102,120,.1); color: var(--text3); }
.badge.pending  { background: rgba(255,159,70,.1);  color: var(--orange); }
.badge.approved { background: rgba(59,130,246,.1);   color: var(--blue); }
.badge.live     { background: rgba(47,180,87,.1);    color: var(--green2); }
```

---

## Contrast requirements

All text must meet WCAG AA contrast (4.5:1 for body, 3:1 for large text).

| Element | Dark mode | Light mode | Notes |
|---------|-----------|------------|-------|
| Primary text on bg | #f0f0f5 on #0a0a0d = 18.4:1 | #1a1a22 on #f5f5f8 = 15.8:1 | Exceeds AAA |
| Secondary text on bg | #a0a0b0 on #0a0a0d = 8.2:1 | #555566 on #f5f5f8 = 7.1:1 | Exceeds AA |
| Muted text on bg | #666678 on #0a0a0d = 4.5:1 | #888898 on #f5f5f8 = 3.5:1 | AA body / AA large |
| Green on bg | #28B79D on #0a0a0d = 8.5:1 | #1a9a82 on #f5f5f8 = 4.5:1 | Meets AA |
| Orange on bg | #FF9F46 on #0a0a0d = 9.2:1 | #e08830 on #f5f5f8 = 4.5:1 | Meets AA |
| Orchid on bg | #6A14DB on #0a0a0d = 3.1:1 | #6A14DB on #f5f5f8 = 4.6:1 | AA large in dark, AA in light |

**Note:** `--orchid` (#6A14DB) is borderline in dark mode for small text. Use `--violet` (#B354F1, 5.1:1) for body text on dark backgrounds. Use `--orchid` only for large headings, buttons, and filled backgrounds where it has white text on top.

---

## Theme toggle in topbar

The toggle is a sun/moon icon in the topbar right section:

```html
<button class="tb-theme" onclick="toggleTheme()" title="Toggle theme">
  <svg class="theme-dark-icon" width="16" height="16" ...><!-- moon --></svg>
  <svg class="theme-light-icon" width="16" height="16" ...><!-- sun --></svg>
</button>
```

```css
.tb-theme { /* button styles */ }
[data-theme="light"] .theme-dark-icon { display: none; }
[data-theme="light"] .theme-light-icon { display: inline; }
:root:not([data-theme="light"]) .theme-light-icon { display: none; }
```

---

## Adding a new page

Every new HTML page in the platform must include:

### 1. CSS variables (in `<style>`)

```css
:root {
  --bg:#0a0a0d;--d1:#0d0d10;--d2:#141418;--d3:#1c1c22;--d4:#202128;
  --border:#222230;--border2:#2e2f3a;
  --text:#f0f0f5;--text2:#a0a0b0;--text3:#666678;
  --royal:#321B68;--orchid:#6A14DB;--violet:#B354F1;
  --green:#28B79D;--green2:#2FB457;--orange:#FF9F46;--red:#e74c3c;--blue:#3b82f6;
}
[data-theme="light"] {
  --bg:#f5f5f8;--d1:#ffffff;--d2:#ffffff;--d3:#f0f0f4;--d4:#e8e8ee;
  --border:#e0e0e8;--border2:#d0d0da;
  --text:#1a1a22;--text2:#555566;--text3:#888898;
  --green:#1a9a82;--green2:#229a48;--orange:#e08830;--red:#d44332;--blue:#2563eb;
}
```

### 2. Theme listener (in `<script>`)

```js
window.addEventListener('message', e => {
  if (e.data?.type === 'ds-theme') document.documentElement.dataset.theme = e.data.theme;
});
const _t = localStorage.getItem('ds_theme');
if (_t) document.documentElement.dataset.theme = _t;
```

### 3. Use only CSS variables for all colours

No hardcoded hex values. No `color: white`. No `background: #141418`.

---

## Conic gradient border (brand element)

The rotating conic-gradient border works in both themes. It uses brand colours which don't change between themes:

```css
@property --angle { syntax: "<angle>"; initial-value: 0deg; inherits: false; }
@keyframes spin { to { --angle: 360deg; } }

.card::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: 17px;
  padding: 1px;
  background: conic-gradient(from var(--angle), transparent 25%, var(--orchid) 50%, var(--violet) 75%, transparent 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  animation: spin 3s linear infinite;
  pointer-events: none;
}
```

This is safe because it uses `var(--orchid)` and `var(--violet)` which are the same in both themes.

---

## Checklist for theme compliance

Before merging any new page:

- [ ] CSS variables block includes both `:root` and `[data-theme="light"]`
- [ ] Theme listener script is present
- [ ] Zero hardcoded hex colours in CSS (search for `#` in style rules)
- [ ] Zero uses of `color: white`, `color: black`, `background: white`, `background: black`
- [ ] Zero uses of `rgba(255,255,255,...)` or `rgba(0,0,0,...)`
- [ ] Lucide icons use `stroke="currentColor"` (auto-adapts)
- [ ] Semi-transparent overlays use brand colour RGB values, not black/white
- [ ] Tested in both dark and light mode
- [ ] Text meets WCAG AA contrast in both themes
