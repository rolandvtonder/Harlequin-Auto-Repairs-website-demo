// @ts-check
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import {defineConfig} from 'astro/config';

export default defineConfig({
  // TODO: replace with the live domain before launch. Every canonical URL,
  // the sitemap, robots.txt, Open Graph tags and the structured data are built
  // from this one value.
  site: 'https://www.harlequinautorepairs.co.za',
  trailingSlash: 'always',
  integrations: [sitemap({filter: (page) => !page.includes('/404')})],
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    inlineStylesheets: 'auto',
  },
});
