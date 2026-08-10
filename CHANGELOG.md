# Changelog

All notable changes to this project are documented here.

## [Unreleased]

### Fixed

- **Hero rendered two forged ribbons at once.** The static SVG fallback stayed mounted underneath the alpha-transparent WebGL canvas, so both objects were visible on every capable device. The fallback now fades out once the forge scene reports ready.
- **Hero pointer tracking re-rendered the WebGL subtree at event rate.** Pointer position moved from React state to motion values read inside `useFrame`, removing 60–120 renders per second. The forge frameloop now also parks when the hero scrolls out of view.
- **In-page navigation landed under the fixed header.** Added `scroll-margin-top` to the anchored sections.
- **Noise overlays were stretched, not tiled.** The viewBox-only grain SVGs had no `background-size`, so a single texture spanned the whole viewport and read as blur. Both now tile.
- **Hero kicker was styled as body copy.** `.hero-copy p` also matched the `.section-kicker` paragraph, overriding its size and colour; scoped with `:not(.section-kicker)`.
- **Process step state was inconsistent.** The active class used `index <= active` while ARIA used equality, and hovering a step fought the scroll position for control. Pointer intent now suspends scroll-driven updates.

### Accessibility

- Replaced invalid markup: `<h3>` and `<p>` were nested inside `<button>` in the material stages. Both steppers are now semantic (`<article>` list and `<ol>`/`<li>`) with pointer sync as a progressive enhancement, and the misleading `aria-pressed` toggles are gone.
- Raised failing text contrast. Inactive material stages measured roughly 2.1:1 and process steps roughly 2.5:1 against their backgrounds; opacity dimming was replaced with colour steps measuring 4.8–6.9:1, and a scrim keeps the material reading column off the animated backdrop.
- Reduced-motion users no longer see six of seven process steps permanently dimmed, and the eight-stage backdrop and specimen no longer hard-cut on scroll.
- Focus rings were white and effectively invisible on the four light sections; replaced with a 2px ember ring that clears 3:1 on light and 5:1 on dark.
- Mobile navigation gained Escape-to-close, focus return to the toggle, a focus trap, and closes on resize past the breakpoint. Its styles moved out of the media query so a resize while open cannot strand an unstyled overlay.
- Restored the hero intro copy on mobile, which had been `display: none`, and raised the sub-11px mono type floor.

### Changed

- Hover states on the works register, capabilities list, and contact link animate `transform` instead of `padding`, removing per-frame layout on full-width rows.
- Primary navigation marks the current section with `aria-current` via a scroll spy.
- The process drawing uses `preserveAspectRatio="xMidYMid slice"` instead of `none`, so it is no longer visibly squashed on narrow viewports.
- The seventh process step spans the full row below 560px instead of being stranded in a two-up grid.
- Project detail pages gained a back-to-register link and the site footer they were missing; the footer is now a shared `SiteFooter` component.
- `ProjectMedia` accepts a `sizes` prop, and every call site passes a value matching its actual layout slot.

## [1.0.0] — 2026-08-07

- Initial build: WebGL forged-ribbon hero with static fallback, seven homepage chapters, statically generated project detail routes, and SEO metadata, sitemap, robots, icon and Open Graph artwork.
