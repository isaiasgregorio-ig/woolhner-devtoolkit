# Upstream project and derivative changes

## Origin

Woolhner DevToolkit is a derivative work of
[IT-Tools](https://github.com/CorentinTh/it-tools), created and maintained by
[Corentin Thomasset](https://corentin.tech).

- Upstream repository: <https://github.com/CorentinTh/it-tools>
- Upstream commit used for this work: `d505845` (`chore(readme): remove sponsors section`)
- Original author: Corentin Thomasset (preserved in `package.json` and
  `public/humans.txt`)
- License: GNU General Public License v3.0, preserved verbatim in `LICENSE`
- Working branch for this derivative: `woolhner-devtoolkit-branding`

No changes were pushed to the upstream repository. All work was performed in a
local branch and must stay in the Woolhner product repository.

## GPL compliance

This derivative is distributed under the same GNU GPL-3.0 license. The original
copyright and author attribution are retained in:

- `LICENSE`
- `package.json` (`author`, `license`, `repository`)
- `public/humans.txt`
- `README.md`
- the in-app About page and footer
- `locales/*.yml` About content

Third-party package names, versions and notices remain in `package.json` and
`pnpm-lock.yaml`. No upstream attribution was removed.

This program is free software: you can redistribute it and/or modify it under
the terms of the GNU General Public License as published by the Free Software
Foundation, either version 3 of the License, or (at your option) any later
version. It is distributed in the hope that it will be useful, but WITHOUT ANY
WARRANTY; see `LICENSE` for the full text.

## Woolhner modifications

### Brand and visual identity

- Replaced the upstream logo and green gradient dashboard aesthetic with the
  supplied Woolhner artwork and a monochrome design-token system derived from
  its black/white pixels (`src/design/tokens.ts`, `src/styles/brand.css`,
  `src/themes.ts`, `src/ui/theme/themes.ts`, `unocss.config.ts`).
- Added the unmodified logo at `public/brand/woolhner-logo.jpeg` and generated
  favicon, touch, PWA, Windows tile and social banner assets from it.
- Rebranded the application shell, cards, tool layout, home page, About page and
  404 page. The upstream support/donation block was removed.
- Rewrote `index.html` metadata: Spanish language, Woolhner title/description,
  canonical URL, Open Graph, Twitter Card and black/white theme colours.
- Rewrote the PWA manifest in `vite.config.ts` with Woolhner names, Spanish
  language, base-aware icon paths and no campaign parameters.
- Removed the runtime Plausible analytics registration from `src/main.ts`.
- Updated user-facing links to `https://woolhner.com`, the OTP issuer, QR/URL
  demo URLs and Monaco diff theme identifiers.
- Documented the brand sources and the fact that no official palette or font
  was invented in `BRAND.md`.

### Internationalisation

- Set `es` as the default locale and `en` as fallback in
  `src/plugins/i18n.plugin.ts`.
- Fully translated shell, navigation, categories, search, command palette,
  footer, errors, About copy and every tool title/description in
  `locales/es.yml`.
- Updated the English source locale for the new shell/category/cloudflare keys.
- Replaced stale IT-Tools shell copy in the remaining locale files while
  preserving their existing tool translations.

### Navigation and directory

- Reorganised all 89 upstream tools into eleven explicit categories in
  `src/tools/index.ts`: Development, Generators, Converters, Web & API,
  Networking, Security, Text & Data, Mathematics, Images & QR, Measurement and
  Cloudflare.
- Added directory search, category grouping, recently used tools, favourites
  drag-reorder and empty states in `src/pages/Home.page.vue`.
- Added `recentToolPaths`, `recentTools` and `recordToolVisit()` to
  `src/tools/tools.store.ts`; tool visits are recorded from
  `src/layouts/tool.layout.vue`.
- Reworked the command palette store and view to use translated categories and
  actions.

### New Cloudflare utilities

Three new tools were added under `src/tools/cloudflare/`. Each has a service,
Vue UI, index definition, locale entries and unit tests:

1. `wrangler-config-generator` — builds `wrangler.toml` for Workers with KV, D1,
   R2 bindings and plain variables; warns against storing secrets in `vars`.
2. `wrangler-config-validator` — parses pasted `wrangler.toml`/`wrangler.jsonc`,
   validates required fields and bindings, and reports actionable errors and
   warnings locally.
3. `cloudflare-cron-helper` — validates 5-field cron expressions, explains them
   in plain language and exports a `[triggers]` block for Wrangler.

### Deployment and developer documentation

- Added `public/_redirects` for Cloudflare Pages SPA routing.
- Added `DEPLOYMENT.md` with Pages and Worker build settings, base-path guidance
  and PWA verification steps.
- Added `wrangler.jsonc` and a GitHub Actions workflow for Worker static-asset
  deployment.
- Rewrote `README.md` for the derivative and updated `public/humans.txt`.
- Updated `scripts/create-tool.mjs` templates for the new product name.
- Updated existing Playwright specs to expect the new document title suffix and
  injected `locale=en` in `playwright.config.ts` so upstream English
  expectations remain stable.

## File-level summary

Modified areas:

- Identity: `index.html`, `vite.config.ts`, `public/*`, `BRAND.md`
- UI/theme: `src/layouts/*`, `src/components/*`, `src/pages/*`, `src/themes.ts`,
  `src/ui/theme/themes.ts`, `unocss.config.ts`, `src/styles/brand.css`
- State/i18n: `src/tools/tools.store.ts`, `src/modules/command-palette/*`,
  `src/plugins/i18n.plugin.ts`, `locales/*.yml`
- Tools: `src/tools/index.ts`, `src/tools/cloudflare/*`, and small brand-string
  changes in selected upstream tools
- Tests: unit tests for the three new services; new e2e specs for the three
  Cloudflare tools; document-title updates in existing e2e specs
- Documentation: `README.md`, `UPSTREAM.md`, `BRAND.md`, `DEPLOYMENT.md`

Unchanged where it matters:

- `LICENSE` (GNU GPL-3.0)
- original author attribution in `package.json` and `public/humans.txt`
- upstream repository URL in `package.json`
- `pnpm@9.11.0` package manager and lockfile
- all original tool implementations, apart from the small branding strings
  listed above
