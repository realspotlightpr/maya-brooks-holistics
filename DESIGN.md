# DESIGN.md

> Calm, capable, and beautifully human: a warm editorial wellness experience that makes the next step feel obvious.

## 1. Visual Theme & Atmosphere

**Style**: Warm Editorial Wellness (Cream Editorial + Organic Natural)
**Keywords**: warm, reassuring, legible, tactile, mature, spacious, photographic, optimistic
**Tone**: calm confidence with human warmth — NOT clinical, aggressive, neon, gym-bro, or luxury-fashion aloof
**Feel**: a beautifully edited Sunday wellness magazine that has been translated into a simple, useful plan.

**Interaction Tier**: L2 — fluid interaction
**Dependencies**: vanilla CSS and JavaScript only; IntersectionObserver and requestAnimationFrame

## 2. Color Palette & Roles

```css
:root {
  --bg: #f6f1e8;
  --surface: #fffdf8;
  --surface-alt: #e7eee5;
  --surface-warm: #efd8c9;
  --surface-hover: #f9f5ed;
  --border: #d8d3c9;
  --border-hover: #a9b8aa;
  --text: #17372b;
  --text-secondary: #52655b;
  --text-tertiary: #77847c;
  --accent: #cf684e;
  --accent-hover: #b9543d;
  --accent-soft: #f3dfd6;
  --forest: #17372b;
  --sage: #98ad98;
  --white: #ffffff;
  --bg-rgb: 246, 241, 232;
  --surface-rgb: 255, 253, 248;
  --accent-rgb: 207, 104, 78;
  --forest-rgb: 23, 55, 43;
  --success: #557a5b;
  --error: #a64035;
  --warning: #a97432;
}
```

**Color Rules:**
- All CSS colors must use variables; no component-level hardcoded colors.
- Forest carries trust and text; terracotta is reserved for conversion and emphasis.
- Alternate warm and botanical sections to make long-form reading easy.
- Never place body text on a busy part of a photograph.

## 3. Typography Rules

**Font Stack:**
```css
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Source+Sans+3:wght@400;500;600;700&display=swap');
```

| Role | Font | Size | Weight | Line Height | Letter Spacing |
|---|---|---:|---:|---:|---:|
| Hero H1 | Fraunces | clamp(3.4rem, 6vw, 5.8rem) | 600 | .98 | -.045em |
| Section H2 | Fraunces | clamp(2.5rem, 4vw, 4.25rem) | 600 | 1.02 | -.035em |
| H3 | Fraunces | 1.65rem | 600 | 1.15 | -.02em |
| Body | Source Sans 3 | 1.05rem | 400 | 1.7 | 0 |
| Label | Source Sans 3 | .75rem | 700 | 1.3 | .14em |
| Utility | Source Sans 3 | .88rem | 600 | 1.4 | 0 |

**Typography Rules:**
- Reading copy is capped at 65 characters per line.
- Headings use sentence case, never all-caps except short labels.
- Hero stays under four lines on desktop and five lines on small phones.
- **Never use**: Impact, Arial Black, Montserrat, Poppins, decorative script fonts.

**Text Decoration:**
- Hero H1: no gradient and no shadow; emphasis uses italic Fraunces and accent color.
- Section H2: no gradient or shadow.
- Labels may use a short accent rule; paragraphs receive no decoration.

## 4. Component Stylings

### Buttons
```css
.button { background:var(--accent);color:var(--white);border:1px solid var(--accent);min-height:56px;border-radius:999px;transition:transform .2s ease,background .2s ease,box-shadow .2s ease; }
.button:hover { background:var(--accent-hover);box-shadow:0 12px 30px rgba(var(--accent-rgb),.22);transform:translateY(-2px); }
.button:active { transform:translateY(0) scale(.98); }
.button:focus-visible { outline:3px solid rgba(var(--accent-rgb),.28);outline-offset:3px; }
.button[aria-disabled='true'],.button:disabled { opacity:.48;pointer-events:none; }
```

### Cards
```css
.card { background:var(--surface);border:1px solid var(--border);border-radius:24px;transition:transform .3s ease,border-color .3s ease,box-shadow .3s ease; }
.card:hover { transform:translateY(-4px);border-color:var(--border-hover);box-shadow:0 20px 50px rgba(var(--forest-rgb),.09); }
.card:focus-within { outline:3px solid rgba(var(--accent-rgb),.22);outline-offset:3px; }
```

### Navigation
```css
.nav { background:transparent;border-bottom:1px solid transparent;transition:background .3s ease,border-color .3s ease,box-shadow .3s ease; }
.nav.scrolled { background:rgba(var(--surface-rgb),.92);border-color:var(--border);box-shadow:0 4px 24px rgba(var(--forest-rgb),.06); }
.nav a:hover { color:var(--accent); }
.nav a:focus-visible { outline:2px solid var(--accent);outline-offset:5px; }
```

### Links
```css
.text-link { color:var(--forest);text-decoration-color:var(--accent);text-underline-offset:5px;transition:color .2s ease; }
.text-link:hover { color:var(--accent-hover); }
.text-link:focus-visible { outline:2px solid var(--accent);outline-offset:4px; }
```

### Tags / Badges
```css
.tag { border:1px solid var(--border);border-radius:999px;background:var(--surface);color:var(--text-secondary);padding:8px 12px;font-size:.78rem;font-weight:600; }
```

### Tabs / Method Selector
```css
.method-tab { background:transparent;color:var(--text-secondary);border:0;border-bottom:2px solid var(--border);min-height:48px;transition:color .2s ease,border-color .2s ease; }
.method-tab:hover,.method-tab[aria-selected='true'] { color:var(--text);border-color:var(--accent); }
.method-tab:focus-visible { outline:2px solid var(--accent);outline-offset:3px; }
.method-tab:disabled { opacity:.45; }
```

## 5. Layout Principles

**Container:**
- Maximum width: 1200px
- Desktop padding: 32px; mobile padding: 20px
- Narrow reading width: 720px

**Spacing Scale:**
- Desktop section padding: 104–128px
- Mobile section padding: 72–88px
- Component gap: 24–36px
- Card internal padding: 28–40px

**Grid:**
```css
.split { display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(48px,7vw,104px);align-items:center; }
.feature-layout { display:grid;grid-template-columns:1.15fr .85fr;grid-template-rows:auto auto;gap:24px; }
```

## 6. Depth & Elevation

| Level | Treatment | Use |
|---|---|---|
| Flat | no shadow, thin border | copy groups, navigation items |
| Subtle | `0 12px 36px rgba(var(--forest-rgb), .07)` | small floating labels |
| Elevated | `0 28px 70px rgba(var(--forest-rgb), .14)` | guide cover and hero photograph |
| Focus | outline using translucent accent | keyboard focus and selected states |

## 7. Animation & Interaction

**Motion Philosophy**: soft editorial pacing; movement guides reading and never delays it.
**Tier**: L2

### Dependencies
No external animation dependency.

### Entrance Animation
```css
.hero-word { opacity:0;transform:translateY(24px);animation:wordIn .7s cubic-bezier(.16,1,.3,1) forwards; }
@keyframes wordIn { to { opacity:1;transform:none; } }
.reveal { opacity:0;transform:translateY(22px);transition:opacity .7s cubic-bezier(.16,1,.3,1),transform .7s cubic-bezier(.16,1,.3,1); }
.reveal.in-view { opacity:1;transform:none; }
```

### Scroll Behavior
IntersectionObserver activates `.reveal`, `.float-title`, and body copy. The hero photograph uses requestAnimationFrame for a maximum 14px parallax shift. Navigation gains `.scrolled` after 24px.

### Hover & Focus States
Buttons lift by 2px, image frames scale their image to 1.025, and method tabs animate their underline. All interactive elements expose a visible focus ring.

### Special Effects
- Hero SplitText-style word entrance.
- Section ScrollFloat-style title entrance.
- Body ScrollReveal-style line entrance.
- Magnet-style CTA movement on fine pointers only.
- Interactive three-part method selector.
- Static Grainient-style radial background with a slow, low-opacity drift.
- A tiny “No restart required” note rotates level on hover as the subtle visual joke.

### Reduced Motion
```css
@media (prefers-reduced-motion:reduce) {
  *,*::before,*::after { animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;scroll-behavior:auto!important; }
  .hero-word,.reveal,.float-title { opacity:1!important;transform:none!important; }
}
```

## 8. Do's and Don'ts

### Do
- Use Maya’s face and everyday imagery as the primary emotional anchor.
- Keep one idea and one decision per section.
- Use plain language that respects a mature audience.
- Repeat the checkout action after each major objection is resolved.
- Maintain honest wellness and AI-persona disclosures.
- Make mobile reading order intentional rather than mechanically stacked.

### Don't
- ❌ Do not use giant headlines that occupy most of the viewport.
- ❌ Do not place pale text over busy photography.
- ❌ Do not use dark green as the background for most of the page.
- ❌ Do not build a wall of equal cards.
- ❌ Do not fabricate testimonials, ratings, client counts, or scarcity.
- ❌ Do not promise a specific amount of weight loss.
- ❌ Do not use gradients on text.
- ❌ Do not use glassmorphism, neon glows, or tech-product styling.
- ❌ Do not animate every element or hijack scrolling.
- ❌ Do not hide the price or subscription status.

## 9. Responsive Behavior

| Name | Width | Key Changes |
|---|---:|---|
| Desktop | > 1024px | two-column hero, wider editorial sequence, full navigation |
| Tablet | 641–1024px | simplified two-column hero, stacked feature groups |
| Mobile | ≤ 640px | image-first hero, single-column story, horizontal method tabs, fixed bottom CTA |

**Touch Targets:** minimum 48×48px
**Collapsing Strategy:** navigation links collapse; CTA remains visible; grids reorder around the purchase journey; nonessential decorative layers are removed below 640px.

```css
@media (max-width:640px) {
  .split,.feature-layout { grid-template-columns:1fr; }
  .nav-links { display:none; }
  .button { width:100%;min-height:56px; }
  body { overflow-x:hidden;padding-bottom:78px; }
}
```
