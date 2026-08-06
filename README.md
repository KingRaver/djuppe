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

Place optimized `.webp` or `.avif` files in `public/images/projects/` using this convention:

```text
project-slug-01.webp  # primary / landscape or portrait hero
project-slug-02.webp  # detail
project-slug-03.webp  # technical or installation view
```

Then add `src: "/images/projects/project-slug-01.webp"` to the matching image object in `data/projects.ts`. The existing `variant` stays as a procedural fallback and loading treatment. Use descriptive alt text that says what is visible, not “project image.”

Replace the placeholder domain `https://djuppe.example`, placeholder email, Instagram URL, portrait treatment, and location before launch. Update the domain in `app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts`, and the structured data in `app/page.tsx`.
