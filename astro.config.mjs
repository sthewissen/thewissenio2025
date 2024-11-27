import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';
import rss from '@astrojs/rss';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://thewissen.io',
  integrations: [tailwind(), sitemap()]
});