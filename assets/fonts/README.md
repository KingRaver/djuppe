# Bundled fonts

Static TrueType instances used **only** by the Open Graph image renderer
(`app/opengraph-image.tsx`). The site itself loads its webfonts from
`@fontsource*` in `app/globals.css` — these files are not served to browsers.

They exist because Satori, the renderer behind `next/og`'s `ImageResponse`,
cannot decode `woff2`, which is the only format `@fontsource-variable/big-shoulders-display`
ships. Each file is a single static weight pulled from Google Fonts.

| File | Family | Weight | Source |
|---|---|---|---|
| `BigShouldersDisplay-ExtraBold.ttf` | Big Shoulders Display | 800 | Google Fonts |
| `IBMPlexMono-Medium.ttf` | IBM Plex Mono | 500 | Google Fonts |

Both families are licensed under the **SIL Open Font License 1.1**, which permits
bundling and redistribution. See <https://openfontlicense.org>.
