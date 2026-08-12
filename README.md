# DJUPPE — Metal, Given Intent

A production-ready Next.js portfolio for Djuppe: artist, designer, engineer, and metal fabricator. The site is conceived as a digital foundry, combining engineering notation, procedural metal studies, heavy editorial typography, and one interactive forged object.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Production verification:

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm start
```

## Managing content

- Studio copy, contact details, social link, and biography: `data/site.ts`
- Project titles, statements, specifications, and image references: `data/projects.ts`
- Workshop capabilities: `data/capabilities.ts`

## Replacing project images

Place optimized files in `public/images/projects/` named `project-slug-01`, `-02`, and so on, then add `src: "/images/projects/project-slug-01.jpg"` to the matching image object in `data/projects.ts`. The existing `variant` stays as a procedural fallback and loading treatment. Use descriptive alt text that says what is visible, not “project image.”

Order within a project's `images` array decides where each frame lands, so it is not a free list:

```text
images[0]        full-bleed lead on the detail page, and the home page feature slot
images[1]        small inset beside the title in the page header
images.slice(2)  two-up detail gallery
```

Give every frame except the lead a `width`/`height` matching the saved file. That caps its display box under the source's own size so a lower-resolution photograph is never upscaled to fill a slot built for a larger one. **Leave them off the lead**: it runs full-bleed at `82svh`, and a cap there collapses it to a fraction of the viewport.

`datum` draws a survey hairline at the frame's real horizon, as a fraction of the photograph's height. It is only accurate when the display box carries the photograph's own aspect ratio — which is what setting `width`/`height` does. On the uncapped lead the box is wider than most frames, so `object-fit: cover` crops the image vertically by an amount that changes with the viewport and a fixed fraction drifts off the horizon. Omit `datum` there unless the source is wider than the lead box at every size.

Each `<ProjectMedia>` call site already passes a `sizes` value matching the slot that media occupies (full-bleed feature, narrow study column, paired grid, gallery half). If you change a layout’s column widths, update that slot’s `sizes` too, or the browser will download the wrong resolution.

Replace the placeholder domain `https://djuppe.example`, placeholder email, Instagram URL, portrait treatment, and location before launch. Update the domain in `app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts`, and the structured data in `app/page.tsx`.
