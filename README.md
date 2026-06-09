# VietPhD Forum — `forum.vjsonline.org`

A standalone, VietPhD-branded landing site that fronts the community forum
(GitHub Discussions on [`lemduc/vietphd-forum`](https://github.com/lemduc/vietphd-forum)).
Fully static Astro, deployed as an **assets-only Cloudflare Worker**. No server,
no database — the forum data lives on GitHub.

## Stack
- **Astro 6** (`output: 'static'`, no SSR adapter)
- **Giscus** embeds one on-site general discussion; category cards deep-link into GitHub Discussions
- **Cloudflare Workers** static assets (`wrangler.jsonc`)

## Develop
```sh
npm install
npm run dev        # local dev server
npm run build      # -> dist/ (static HTML)
npm run preview    # build + serve via wrangler dev
```

## Deploy
```sh
npm run deploy     # build + wrangler deploy  (assets-only Worker "vietphd-forum")
```
First time, authenticate: `npx wrangler login`.

## Point `forum.vjsonline.org` at it
After the first deploy:

1. **Cloudflare dashboard** → Workers & Pages → **vietphd-forum** → **Settings → Domains & Routes** → **Add → Custom Domain** → `forum.vjsonline.org`.
2. Cloudflare auto-creates the DNS record (the `vjsonline.org` zone must be on this Cloudflare account). TLS provisions in a minute or two.

Or pin it in `wrangler.jsonc` instead of the dashboard:
```jsonc
"routes": [{ "pattern": "forum.vjsonline.org", "custom_domain": true }]
```

## Required one-time setup for comments
Install the **giscus GitHub App** on `lemduc/vietphd-forum` (otherwise the embed
shows "giscus is not installed"): https://github.com/apps/giscus → Install → select that repo only.

## Editing
- Branding/colors: `src/styles/global.css` (`--navy`, `--green`).
- Categories: the `categories` array in `src/pages/index.astro` — `ghName` must
  exactly match the GitHub Discussion category name for the deep-link to land.
- Giscus IDs: `src/components/Giscus.astro` (repo-id `R_kgDOS032kA`).
