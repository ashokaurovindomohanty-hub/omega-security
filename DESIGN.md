# Design Brief: OMEGA SECURITY

**Tone:** Maximalist sci-fi/fantasy showcase with chiaroscuro drama—immersive, theatrical, living security intelligence.

**Differentiation:** Central glowing female AI face as CSS/SVG portrait with radiant halo + seven animated neon-blue security feature panels + live threat counters + King's Eye world map + NNN Protocol injection animation + boot sequence entrance effect.

## Palette

| Token | OKLCH | Usage |
|-------|-------|-------|
| background | 0.08 0 0 | Deep near-black (#0a0e27) – primary surface |
| foreground | 0.92 0 0 | Off-white – text and glyphs |
| primary | 0.68 0.21 220 | Cyan neon (#00BFFF) – dominant accent, glows |
| secondary | 0.54 0.24 265 | Electric blue (#1E90FF) – secondary accent |
| card | 0.12 0.008 270 | Deep navy card backdrop with blue tint |
| muted | 0.18 0.005 270 | Dark navy – muted elements, subtle backgrounds |
| border | 0.22 0.012 265 | Electric blue stroke for card edges |
| destructive | 0.55 0.22 25 | Red-orange – warning/threat alerts |
| accent | 0.68 0.21 220 | Cyan – button highlights, active states |

## Typography

| Role | Font | Scale | Weight |
|------|------|-------|--------|
| Display/Headings | Fraunces (serif) | 2.5–3.5rem | 600–700 |
| Body | Figtree (sans) | 0.875–1rem | 400–500 |
| Monospace | GeistMono | 0.75–0.875rem | 500 |

## Elevation & Depth

- **Hero/Central AI Face:** Layered CSS/SVG gradients with radiant glow halo, centered focal point
- **Feature Cards:** `glow-cyan` class with animated pulse, 12px rounded corners, deep inset shadows
- **Backdrop:** Chiaroscuro radial gradients simulating dramatic light/shadow contrasts
- **Borders:** 1–2px electric blue strokes with soft blur for neon effect

## Structural Zones

| Zone | Treatment | Purpose |
|------|-----------|---------|
| Header/Status Bar | Dark navy card (`bg-card`) with cyan text glow + live counters | System status display |
| Central Focus | CSS/SVG AI portrait with animated halo + pulsing border | Dramatic focal point |
| Feature Grid | Seven animated neon-blue panels arranged radially or grid | Interactive security features |
| World Map | SVG canvas with threat ping animations + global status | Threat intelligence display |
| Footer/Input | Command input box with cyan glow, respond overlay | User interaction zone |

## Spacing & Rhythm

- **Macro:** 3rem gaps between feature sections
- **Micro:** 1rem padding inside cards, 0.5rem between elements
- **Dense:** Monospace stat counters use tighter line-height for information density

## Component Patterns

- **Animated Cards:** `bg-card glow-cyan animate-glow` with hover scale-up
- **Text Glows:** `text-glow` on headings, threat labels, command responses
- **Scan Lines:** `.scan-line` animation overlay on full-page load (entrance effect)
- **Pulsing Elements:** `animate-pulse` on threat counters, shield status
- **Rotating Rings:** `animate-rotate` on shield icons, quantum bit spinners

## Motion & Interaction

- **Entrance:** Page load triggers sweeping scan-line animation + glitching text transition → full dashboard reveal (500ms)
- **Card Activation:** Click feature panel → `animate-glow` + scale pulse (300ms)
- **Threat Update:** Counter increment animation + destructive color flash
- **Hover:** Card lifts with enhanced glow, shadow deepens
- **Continuous:** Background chiaroscuro layers fade subtly; particle effects simulate ambient threat activity

## Constraints

- **No generic defaults:** All colors use OKLCH tokens, no Bootstrap blue
- **Neon discipline:** Glow effects use 40–60% opacity; never full saturation
- **Chiaroscuro integrity:** Light/shadow contrast enforced through backgrounds, not text changes
- **Animation pace:** 2–8s cycles; nothing faster than 1s (avoids jitter; maintains drama)
- **Text contrast:** AA+ verified on #0a0e27 background with 0.92 L foreground

## Signature Detail

**Radiant AI Halo:** Central portrait renders as concentric glowing circles + layered gradient mask + subtle particle emitters radiating outward. The halo breathes (pulse animation, 3s cycle), surrounded by rotating ring (accent blue). On threat alert, the halo intensifies and the rings rotate faster—visual feedback of OMEGA's heightened alert state.
