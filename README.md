# Harlequin Auto Repairs — website

Static multi-page site built with Astro 5, Tailwind CSS v4 and Lenis smooth scrolling.

## Run it

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # outputs the finished site to dist/
npm run preview    # serves dist/ locally
npm run lint       # type check
```

## Where things live

- `src/data/site.ts` — every business fact (name, address, phone, hours, services, FAQs). Edit here and every page, the footer and the Google structured data update together.
- `src/pages/` — one file per page; each service page is generated from `services` in `site.ts`.
- `src/assets/` — photos (Astro converts them to AVIF/WebP in several sizes at build time).
- `npm run icons` — regenerates the favicon PNGs and the social share image (`public/og-image.jpg`).

## Before going live

1. Set the real domain in `astro.config.mjs` (`site:`). Canonical URLs, the sitemap, robots.txt and the structured data all use it.
2. Confirm opening hours, the "free fitting & balancing" wording, and the About page copy in `src/data/site.ts` / `src/pages/about.astro`.
3. Deploy the `dist/` folder to any static host (Netlify, Cloudflare Pages, Vercel).
4. Add the site in Google Search Console and submit `/sitemap-index.xml`.
5. Put the website link on the Google Business Profile and the Facebook page.
