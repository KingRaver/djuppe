# Project image drop zone

Name files `project-slug-01`, `project-slug-02`, and so on, and reference each from `data/projects.ts`; the reusable `ProjectMedia` component will switch from its procedural study to `next/image` automatically.

Position in a project's `images` array decides the slot: `[0]` is the full-bleed lead, `[1]` the inset beside the title, and the rest fill the two-up detail gallery. See "Replacing project images" in the root README for the `width`/`height` cap and the `datum` hairline, both of which depend on that ordering.
