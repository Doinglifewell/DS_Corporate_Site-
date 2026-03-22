# DeStore Platform — Icon Standard

**Last updated:** 16 March 2026
**Status:** LOCKED — applies to all platform UI

---

## Rule: Lucide SVG icons only. No emojis.

All platform UI uses **Lucide** icons exclusively. Emojis are banned from the platform interface — they render inconsistently across operating systems, look unprofessional, and signal "prototype" to brands paying for a production tool.

**Source:** https://lucide.dev
**License:** ISC (MIT-compatible, free for commercial use)
**Format:** Inline SVG, `stroke="currentColor"`, stroke-width 1.5

---

## Where this applies

- Sidebar navigation (rail icons + sidebar items)
- Page headers and section titles
- Button labels and action items
- Form field labels
- Status indicators
- Tab labels
- Mobile navigation
- Any new page or component added to the platform

## Where emojis ARE allowed

- **Clippy character** — Clippy's personality uses emojis in chat responses (poo throw, money gun, mood reactions). This is the character, not the platform UI.
- **Consumer-facing result screens** — Circular action buttons (♻️ Recycle, 🎁 Gift) are consumer-facing, not platform UI. Brands can choose to use emojis in their result screens.
- **Quick action chips** in mobile chat — these are conversational, not navigation.

---

## Icon specifications

### Rail icons (icon rail on far left)
- Size: `width="16" height="16"`
- ViewBox: `0 0 24 24`
- Stroke: `currentColor`
- Stroke-width: `1.5`
- Stroke-linecap: `round`
- Stroke-linejoin: `round`
- Fill: `none`

### Sidebar icons (next to nav item labels)
- Size: `width="15" height="15"`
- All other properties same as rail

### In-page icons (section headers, buttons, etc.)
- Size: `width="16" height="16"` (standard) or `width="14" height="14"` (compact)
- All other properties same as rail

### Social media icons
- Size: `width="14" height="14"`
- Fill: `currentColor` (not stroke — these are brand logos, not Lucide)
- Use official SVG paths from brand resources (Instagram, X/Twitter, Facebook, LinkedIn, TikTok, YouTube)

---

## Icon mapping — full reference

### Rail navigation

| Section | Icon name | Lucide ID |
|---------|-----------|-----------|
| DPP Pipeline | file-check | `file-check` |
| Toolbox & Templates | wrench | `wrench` |
| Product Library | package | `package` |
| Analytics | bar-chart-2 | `bar-chart-2` |
| Platform Admin | settings | `settings` |
| Extras | zap | `zap` |

### Sidebar items

| Page | Icon name | Lucide ID |
|------|-----------|-----------|
| GS1 Smart Label | tag | `tag` |
| ESPR DPP | shield-check | `shield-check` |
| AI DPP Builder | message-square | `message-square` |
| Draft DPPs | file-edit | `file-edit` |
| Collection Creator | folder-plus | `folder-plus` |
| QR Designer | qr-code | `qr-code` |
| Label Exporter | tag | `tag` |
| Result Screen Builder | smartphone | `smartphone` |
| Screen Templates | layout-template | `layout` |
| Collections | package | `package` |
| Product Page | box | `archive` |
| Scan Dashboard | activity | `activity` |
| Connect Domain | globe | `globe` |
| Brand Assets | paintbrush | `paintbrush` |
| Roles & Permissions | lock | `lock` |
| Brand Team | users | `users` |
| Webmaster Admin | shield | `shield` |
| Roadmap | map | `map` |
| Clippy | paperclip | `paperclip` |
| Webinar Series | book-open | `book-open` |

---

## Implementation pattern

### HTML inline SVG (preferred)

```html
<svg width="15" height="15" viewBox="0 0 24 24" fill="none" 
     stroke="currentColor" stroke-width="1.5" 
     stroke-linecap="round" stroke-linejoin="round">
  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
  <line x1="7" y1="7" x2="7.01" y2="7"/>
</svg>
```

### Why inline SVG (not icon font, not img tags)

- **currentColor inheritance** — icons automatically match text colour. Active sidebar items turn violet, inactive stay grey. No extra CSS.
- **No network requests** — no font file to download, no CDN dependency.
- **Crisp at any size** — SVG scales perfectly. No blur at 15px.
- **Tree-shakeable** — only the icons we use are in the HTML. An icon font loads 1000+ icons.
- **Works offline** — no external dependencies.

### Container styling

The icon container (`.sb-icon` for sidebar, `.rail-btn` for rail) must use flexbox centering:

```css
.sb-icon {
  flex-shrink: 0;
  width: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

Do NOT use `font-size` or `text-align: center` — those are for text/emoji, not SVG.

---

## Colour behaviour

| State | Icon colour | How it works |
|-------|-------------|--------------|
| Default / inactive | `var(--text3)` #666678 | Inherits from parent text colour |
| Hover | `var(--text2)` #a0a0b0 | Parent hover changes `color` |
| Active / selected | `var(--violet)` #B354F1 | `.active` class on parent changes `color` |

No need to set `stroke` or `fill` colours on the SVG itself — `currentColor` handles everything.

---

## Adding a new icon

1. Go to https://lucide.dev
2. Search for the icon you need
3. Click the icon → Copy SVG
4. Paste inline where needed
5. Set `width` and `height` per the spec above
6. Ensure `fill="none"` and `stroke="currentColor"`
7. Remove any `class` attribute Lucide adds

---

## Do NOT

- Use emoji anywhere in platform UI
- Use an icon font (Font Awesome, Material Icons, etc.)
- Use `<img>` tags for icons
- Use different stroke widths (always 1.5)
- Use filled icons (always stroke-based, `fill="none"`)
- Hardcode colours on SVG elements (use `currentColor`)
- Use icons larger than 16px in navigation
- Mix icon libraries (Lucide only)
