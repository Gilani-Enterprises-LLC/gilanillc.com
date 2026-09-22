import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
// Static output — deploy the `dist/` folder directly to Cloudflare Pages
// (build command: npm run build, output directory: dist). No adapter is
// needed for a fully static site like this one.
export default defineConfig({
  site: 'https://gilanillc.com',
  vite: {
    plugins: [tailwindcss()],
  },
});
