import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Fully static site (output: 'static' is the default). No SSR adapter needed —
// the forum is GitHub Discussions, embedded client-side via Giscus. The build
// emits plain HTML to dist/, served by an assets-only Cloudflare Worker
// (see wrangler.jsonc). Point forum.vjsonline.org at that Worker.
export default defineConfig({
  site: 'https://forum.vjsonline.org',
  integrations: [sitemap()],
});
