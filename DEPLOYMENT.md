# Cloudflare Pages deployment

Woolhner DevToolkit is a fully static Vue application. It needs no server
runtime, database, account system or edge function.

## Build settings

Create a Cloudflare Pages project connected to this repository (or the
Woolhner fork) with:

| Setting | Value |
| --- | --- |
| Framework preset | None (or Vue) |
| Build command | `pnpm install --frozen-lockfile && pnpm build` |
| Build output directory | `dist` |
| Root directory | Repository root |
| Node version | 18 or 20 (set `NODE_VERSION=20` if the dashboard does not provide one) |

The `build` script already runs `vue-tsc --noEmit` before Vite, so a Pages build
fails on type errors instead of publishing a broken bundle.

## Local production check

```sh
pnpm install --frozen-lockfile
pnpm build
pnpm preview
```

Open `http://localhost:5050`, reload a nested tool route (for example
`/json-to-csv/`) and confirm the page still renders. The preview server uses
the same `dist/` output that Pages receives.

## SPA routing

`public/_redirects` contains:

```text
/* /index.html 200
```

Vite copies it to `dist/_redirects`, and Cloudflare Pages uses it to serve the
SPA shell for client-side routes. Keep this file when changing routing.

## Deploying manually

With [Wrangler](https://developers.cloudflare.com/workers/wrangler/) installed
and authenticated:

```sh
pnpm build
pnpm exec wrangler pages deploy dist --project-name woolhner-devtoolkit
```

The command prints the deployment URL. For a custom domain, add it in the
Cloudflare Pages dashboard and update the canonical and social URLs in
`index.html` and `vite.config.ts` if the domain is not `woolhner.com`.

## Base path

The default deployment is at the domain root. To serve the toolkit from a
subdirectory, set `BASE_URL` before building:

```sh
BASE_URL=/toolkit/ pnpm build
```

`vite.config.ts` uses this value for Vite's `base`, the PWA `start_url`,
`scope` and icon paths. `src/design/tokens.ts` uses it for the header logo.
When using a subdirectory, also update the canonical/OG/Twitter URLs in
`index.html`.

## Cloudflare Worker with static assets

A Worker deployment is also configured. `wrangler.jsonc` serves `dist/` as
static assets and maps unknown routes to `index.html` through
`not_found_handling: "single-page-application"`.

Manual deployment (requires an authenticated Wrangler session):

```sh
pnpm build
wrangler deploy --config wrangler.jsonc
```

The included workflow `.github/workflows/deploy-worker.yml` builds and deploys
on pushes to `woolhner-devtoolkit-branding` and on manual dispatch. Add these
repository secrets first:

- `CLOUDFLARE_API_TOKEN` — token with Workers Scripts edit permission.
- `CLOUDFLARE_ACCOUNT_ID` — Cloudflare account ID.

The Worker name is `woolhner-devtoolkit`; change it in `wrangler.jsonc` if that
name is unavailable.

## PWA

`vite-plugin-pwa` generates the web app manifest, service worker and pre-cache
list during `pnpm build`. Verify after deployment that:

- `/manifest.webmanifest` loads with the Woolhner name and Spanish language;
- `/sw.js` is served from the deployment root (or the configured base path);
- icons resolve at the configured base path;
- installing the app opens the toolkit in standalone mode.

Updates use `registerType: 'autoUpdate'`, so a new deployment replaces the old
cache on the next visit.

## Privacy and runtime behaviour

- No analytics script is registered at runtime.
- Tool processing happens in the browser.
- The only external calls come from tools that explicitly document them (for
  example MAC address vendor lookup).
- Cloudflare Pages access logs are controlled by Cloudflare, not by this
  application.

## Troubleshooting

| Symptom | Check |
| --- | --- |
| Nested route returns 404 | `dist/_redirects` exists and contains `/* /index.html 200`. |
| Blank page after a deployment | Browser console for a stale service worker; hard-reload once. |
| Icons or logo missing under a subdirectory | `BASE_URL` was set at build time and ends with `/`. |
| Build fails during Pages deploy | Node 18/20 and `pnpm install --frozen-lockfile` completed successfully. |
| Wrong canonical domain in search results | Update `index.html` and redeploy. |
