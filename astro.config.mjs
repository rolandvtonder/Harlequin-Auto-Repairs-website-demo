// @ts-check
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import {defineConfig} from 'astro/config';

export default defineConfig({
  // TODO: replace the default with the live domain before launch. Every
  // canonical URL, the sitemap, robots.txt, Open Graph tags and the structured
  // data are built from this one value. The GitHub Pages demo build overrides
  // it (and the sub-folder base) through SITE_URL / BASE_PATH — see
  // .github/workflows/deploy.yml.
  site: process.env.SITE_URL || 'https://www.harlequinautorepairs.co.za',
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'always',
  integrations: [sitemap({filter: (page) => !page.includes('/404')})],
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    inlineStylesheets: 'auto',
  },
});
