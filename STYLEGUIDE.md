# Aevum — Build Styleguide (for section authors)

Dark-luxury bespoke watch landing page. Read this **and** `src/app/globals.css`,
`src/lib/site.ts`, `src/lib/watch-config.ts` before writing any component.

## Stack (already installed — DO NOT add packages)
- Next.js 16 (App Router, RSC by default), React 19, TypeScript
- Tailwind CSS v4 (CSS-based config via `@theme` in `globals.css`)
- `motion/react` (the Motion library, formerly Framer Motion) — import `{ motion, useScroll, useSpring, useReducedMotion, AnimatePresence, useMotionValue, useTransform, useMotionTemplate }` from `"motion/react"`
- `three`, `@react-three/fiber` (v9), `@react-three/drei` (v10)
- `@phosphor-icons/react` — import named icons, e.g. `import { GearFine } from "@phosphor-icons/react/dist/ssr/GearFine"` (use the `/ssr/` path for server-safe icons; standard import is fine in client components). Use **one** weight consistently: `"regular"` or `"duotone"`. Standardize strokeWidth via the `weight` prop, not hand-drawn paths.

## Folder map
```
src/app/{layout,page,globals.css}.tsx|.css   # layout & root already built — DON'T edit
src/lib/{cn,site,watch-config}.ts             # cn(), all content, configurator schema
src/components/ui/{Button,Section,Reveal,Eyebrow,GlassPanel}.tsx  # shared primitives — DON'T edit, just import
src/components/effects/{AmbientBackground,Particles,Grain,ScrollProgress,Loader}.tsx
src/components/Logo.tsx
src/components/three/WatchScene.tsx           # 3D watch (you build this)
src/components/sections/*.tsx                  # one file per section (you build these)
```
Import alias: `@/` → `src/`.

## Design tokens (from globals.css `@theme`) — use these utilities
- Surfaces: `bg-ink` `bg-ink-2` `bg-ink-3` `bg-ink-4`
- Text: `text-bone` (primary off-white) · `text-mist` (secondary gray) · `text-faint`
- Accent: `text-gold` `text-gold-bright` `bg-gold` `border-gold` · bronze: `text-bronze`
- Lines: `border-line` (`rgba(255,255,255,0.08)`), `border-line-2` (0.14). Opacity modifiers work on hex tokens: `bg-gold/10`, `text-gold/70`.
- Fonts: headings inherit `font-display` (Outfit) automatically via `h1..h5`; force with `font-display`. Body is Manrope by default.
- Radii: **cards/panels/images = `rounded-[24px]`** (or `rounded-3xl`); **buttons/pills = `rounded-full`**; **form inputs = `rounded-2xl`**. This is the locked shape system — follow it everywhere.
- Easing helper class: `ease-[cubic-bezier(0.16,1,0.3,1)]`.
- Component classes available: `.shell` (1280px container), `.glass`, `.glass-strong`, `.text-gold-gradient`, `.hairline`, `.border-glow` (animated gold border on hover — add to a `relative` element), `.shimmer`, `.perspective`, `.preserve-3d`.
- Animations: `animate-float`, `animate-float-slow`, `animate-drift`, `animate-spin-slow`, `animate-shimmer`, `animate-pulse-glow`.

## Shared primitives API (import, don't reinvent)
```ts
import { Button } from "@/components/ui/Button";      // <Button href variant size>primary/secondary/ghost</Button>
import { Section } from "@/components/ui/Section";    // <Section id className container?> ... </Section> (adds .shell + py)
import { Reveal } from "@/components/ui/Reveal";       // <Reveal delay y as amount> scroll-reveal; reduced-motion aware
import { Eyebrow } from "@/components/ui/Eyebrow";     // tiny gold label — SEE EYEBROW CAP RULE
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Logo } from "@/components/Logo";
import { Particles } from "@/components/effects/Particles";
```

## Content data (from site.ts) — import, don't hardcode copy
`brand`, `navLinks`, `hero`, `processSteps`, `materials`, `features`, `faqs`, `testimonials`, `galleryShots`, `galleryUrl(seed,h,w)`. Configurator data is in `watch-config.ts`: `configGroups`, `defaultConfig`, `deriveParams(config)`, type `WatchParams`.

## Images (no image-gen tool available — use these, do NOT hand-draw SVG illustrations)
- Photography: `galleryUrl(seed, h, w)` returns a grayscale `picsum.photos` URL. Use `next/image` with explicit width/height and `alt`.
- Avatars: `https://i.pravatar.cc/160?img=<n>` (n = 1..70) OR `picsum` seed. Provide alt.
- Material swatches: use the `swatch` CSS string from `materials[i].swatch` as an inline `style={{ background }}` — these are procedural finishes, not illustrations.
- The watch itself is real R3F — never fake it with a div/SVG.

## Animation rules (MANDATORY)
- Reveal-on-scroll: wrap blocks in `<Reveal>` (or `motion.*` with `whileInView`, `viewport={{ once: true, amount: 0.25 }}`, ease `[0.16,1,0.3,1]`). Stagger children with `delay={i*0.06}`.
- **Never** `window.addEventListener("scroll", …)` or store scroll/pointer position in `useState`. Use `useScroll`, `useMotionValue`, `useTransform`, `useSpring` from `motion/react`, or `IntersectionObserver`.
- Hover: CSS `transition` + `hover:` utilities + `active:translate-y-[1px]` for tactile press. For magnetic/tilt use `useMotionValue` outside render.
- Animate only `transform` and `opacity`. Add `will-change-transform` only on elements that actually animate.
- Every motion above intensity 3 must respect `useReducedMotion()` (Reveal already does).

## HARD RULES (a section failing any of these is not done)
1. **Zero em-dashes.** No `—` or `–` anywhere (headlines, body, labels, alt, attribution). Use a hyphen `-`, a period, a comma, or restructure. Date/number ranges use a hyphen.
2. **One accent.** Gold is THE accent, used identically everywhere. Bronze only as a sibling metal tint in gradients. No second accent color, no blue/teal/purple CTAs.
3. **Theme lock.** The whole page is dark. Never render a light-background section.
4. **Eyebrow cap.** At most 1 `Eyebrow` per 3 sections. Hero already uses one. Prefer NO eyebrow and let the headline stand alone. If you must label a section, that label replaces the eyebrow, not adds to it.
5. **No duplicate CTA intent.** "Start Designing" = go to configurator. "Book Consultation" = go to contact. Don't invent synonyms ("Let's talk", "Get in touch").
6. **Button contrast.** Gold buttons use dark text (`text-ink`) — already set. Secondary/ghost must pass WCAG AA on the dark bg.
7. **Quotes ≤ 3 lines.** Real typographic quotes. Attribution: name + role/location, no em-dash.
8. **Realistic data only.** Use the names/quotes/locations in site.ts. No "John Doe", no fake-precise specs you invented, no Acme/Nexus.
9. **Responsive.** Every multi-column layout must collapse to single column under `md` (`<768px`). Use `min-h-[100dvh]`, never `h-screen`. Container via `.shell`.
10. **Accessibility.** Semantic HTML (`<section>`, `<nav>`, `<form>`, `<button>`, `<ul>`). All images need `alt`. Form labels above inputs (never placeholder-as-label). Focus states are global. Accordions/carousels/modals keyboard-operable.
11. **No hand-rolled SVG icons.** Use Phosphor. A small geometric logo/mark is the only exception.
12. **Don't edit shared files or config.** Don't run install/dev/build. Only create your assigned section file(s).

## z-index scale (stick to it)
`-z-10` mesh bg · `z-0` pointer glow · `z-10` page content (sections are `relative`) · `z-50` sticky navbar · `z-[70]` grain · `z-[80]` scroll bar · `z-[90]` lightbox/modal · `z-[100]` loader.

## WatchScene contract (3D authors MUST match this exactly)
```tsx
// src/components/three/WatchScene.tsx  — "use client"
export type WatchSceneProps = {
  params?: WatchParams;               // from watch-config.ts; omit to use default
  mode?: "hero" | "configurator";     // hero: auto-rotate, ambient; configurator: OrbitControls, responds to params
  className?: string;
};
export function WatchScene({ params, mode = "hero", className }: WatchSceneProps): React.ReactElement;
```
- `<Canvas>` from `@react-three/fiber`. Add `<Suspense>`. Camera ~ `[0,0,6]`.
- Build the watch from primitives: case (cylinder/torus), bezel ring, dial disc, crystal (transparent sphere section), hour indices/hands (thin boxes), crown, lugs, strap (two curved bands). Reuse `drei` helpers (`Float`, `Environment preset="studio"` or a custom light rig, `ContactShadows`, `OrbitControls` for configurator mode).
- Material colors come from `params` (caseColor, bezelColor, dialColor, lumeColor, strapColor). Use `meshStandardMaterial` / `meshPhysicalMaterial`. **Smoothly lerp** material colors toward target params in `useFrame` (THREE.Color.lerp) so changes animate, not snap. Lume uses `emissive` + `emissiveIntensity`.
- `mode==="hero"`: gentle auto-rotation (`useFrame` rotate group.y) + `<Float>`. `mode==="configurator"`: `<OrbitControls enablePan={false} enableZoom={false} />`, no auto-spin, but keep a slow idle tilt.
- Honor reduced motion: if reduced, stop auto-rotation/idle spin.
- Keep geometry low-poly; the watch should read as premium at a glance.

## Section build assignments (your scope)
| Section | File | Section id | Notes |
|---|---|---|---|
| Navbar | `sections/Navbar.tsx` | — | sticky, transparent→glass on scroll (useScroll/useMotionValueEvent), mobile hamburger menu, Logo left, links center, "Book Consultation" CTA right. height ≤ 72px. |
| Hero | `sections/Hero.tsx` | `top` | split: left text (eyebrow, big `Create Your / Dream Watch` headline with gold gradient on "Dream", ≤20-word sub, two CTAs); right `<WatchScene mode="hero" />` in a glass stage with Particles + gold glow. `min-h-[100dvh]`. |
| Process | `sections/Process.tsx` | `process` | 4 cards from `processSteps`, `.border-glow`, hover lift, Phosphor icon, big ghost index number, connector hairline. |
| Configurator | `sections/Configurator.tsx` | `configurator` | holds `config` state (defaultConfig), left option panel (all 14 `configGroups`, selectable chips), center `<WatchScene mode="configurator" params={deriveParams(config)} />`, right/below live spec readout + "Book this design" → #contact. Animate chip selection + watch color transitions. |
| Materials | `sections/Materials.tsx` | `materials` | 7 cards, procedural swatch bg, hover zoom + name reveal, gentle float. |
| Features | `sections/Features.tsx` | `features` | 7 features, **bento/asymmetric** (NOT 3 equal columns), Phosphor duotone icons. |
| Gallery | `sections/Gallery.tsx` | `gallery` | CSS-columns masonry of `galleryShots`, hover zoom + overlay, click opens lightbox modal (z-[90], keyboard Esc + focus trap-lite, prev/next). |
| Testimonials | `sections/Testimonials.tsx` | `testimonials` | auto-advancing carousel, star rating (filled gold), avatar, quote ≤3 lines, name + location. Pause on hover, reduced-motion → static. |
| FAQ | `sections/Faq.tsx` | `faq` | animated accordion (height auto via Motion `AnimatePresence`/`layout`), one open at a time, keyboard accessible. |
| Contact | `sections/Contact.tsx` | `contact` | premium form: Name, Email, Phone, Budget (select), Preferred Style (select), Inspiration Upload (file input), Message. Label above input, helper text, success state on submit (no backend — preventDefault + show thank-you). Large gold CTA "Request Your Consultation". |
| Footer | `sections/Footer.tsx` | — | Logo + tagline, social icons (Phosphor brand-ish: InstagramLogo, etc.), newsletter input, legal links row, copyright. No version stamps. |

Every section default-exports its component. Each section renders its own `<Section id=…>` wrapper (or its own layout for hero/navbar/footer). Pull copy from `site.ts`.

## Acceptance — each section must
- typecheck (strict), import only from `@/…` and installed packages,
- be fully responsive (single column < md),
- honor reduced motion,
- pass the hard rules above,
- contain zero em-dashes.
