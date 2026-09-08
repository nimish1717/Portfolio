# Journey Through Time — Portfolio Starter

A dark, cinematic scroll-driven portfolio: a glowing curved timeline (2021–2026)
that transitions into a floating grid of project cards.

## Setup

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`.

## Structure

```
src/
  components/
    HeroTimeline.jsx   — curved track, year markers, comet, silhouette
    ProjectGrid.jsx     — floating glowing project cards
    About.jsx           — bio section
    Footer.jsx          — contact links
  App.jsx               — wires sections together with Lenis smooth scroll
  main.jsx
  index.css
```

## Customize

- **Your projects**: edit the `PROJECTS` array in `ProjectGrid.jsx` — swap
  `image` paths (put real files in `public/projects/`) and rewrite titles.
- **Your years/timeline**: edit `YEARS` in `HeroTimeline.jsx`.
- **Your bio**: edit the copy in `About.jsx`.
- **Your links**: edit the `links` array in `Footer.jsx`.
- **Colors**: the accent color is defined once as `ACCENT` in each component
  and in `tailwind.config.js` — change `#ff9d1c` there to retheme everything.

## Notes

- 3D scenes use React Three Fiber + drei + postprocessing (bloom) — keep an
  eye on performance on low-end devices; consider a simplified CSS-only
  fallback for mobile if needed.
- Reduced-motion users get instant transitions via the CSS media query in
  `index.css`.
