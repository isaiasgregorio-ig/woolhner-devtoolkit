# Woolhner DevToolkit — brand implementation

This document records where the visual identity comes from, which decisions are
approved, and which values are product-level choices. It exists so nobody
mistakes a derived token for an official Woolhner brand value.

## Source of truth

| Source | Use | Status |
| --- | --- | --- |
| `~/Woolhner/Brand/Logos/logo.jpeg` | Copied unchanged to `public/brand/woolhner-logo.jpeg` and used in the header, favicons, PWA icons and social banner. | Supplied Woolhner artwork used by this product. The brand documentation has no formal approval record for an official logo, so this is documented as the source asset, not presented as a certified brand kit. |
| `~/Woolhner/Company/woolhner/brand/README.md` | Approved principles: minimalist, fast, useful, intuitive, beautiful; light-first; accessible; deliberate typography. | Approved company direction. |
| `~/Woolhner/Company/woolhner/brand/visual-guidelines/README.md` | Minimalism, clarity, light-first default, accessibility over decoration. | Approved direction. |
| `~/Woolhner/Company/woolhner/brand/identity/README.md` | Company name `Woolhner`, domain `woolhner.com`, Spanish-first customer products. | Approved identity facts. |
| `~/Woolhner/Company/woolhner/brand/typography/README.md` | Prefer system or self-hosted fonts; no declared brand font. | Approved direction; font family remains an open decision. |
| `~/Woolhner/Brand/Assets/Woolhner_ Academic and Design Services.png` | Reviewed as historical context only. | Not used, not an approved logo. |

## Colours

The supplied logo artwork is effectively achromatic. Pixel inspection found
99.96% of pixels to be black `#000000` or white `#FFFFFF`; the remaining pixels
are JPEG compression artefacts around their edges. The brand documentation
explicitly states that no official colour palette has been approved.

Therefore this product uses only:

- **Ink** `#000000` — from the logo.
- **Paper** `#FFFFFF` — from the logo.
- **Neutral greys** `#FAFAFA`, `#F5F5F5`, `#E5E5E5`, `#D4D4D4`, `#A3A3A3`,
  `#737373`, `#525252`, `#404040`, `#262626`, `#171717`, `#0A0A0A` — derived
  from black/white for hierarchy, borders and surfaces.

No accent hue, gradient or purple/blue dashboard palette was introduced. Status
and feedback states use borders, weight and icons; Naive UI semantic colours are
mapped to the same neutral ramp rather than a new palette.

The canonical token definitions are in `src/design/tokens.ts`. They are mirrored
as CSS custom properties in `src/styles/brand.css` and applied to Naive UI in
`src/themes.ts` and `src/ui/theme/themes.ts`.

### Light theme (default)

| Token | Value |
| --- | --- |
| Background | `#FAFAFA` |
| Surface | `#FFFFFF` |
| Muted surface | `#F5F5F5` |
| Border / strong border | `#E5E5E5` / `#D4D4D4` |
| Text / muted text | `#0A0A0A` / `#525252` |
| Primary / hover / pressed | `#000000` / `#262626` / `#404040` |
| Focus | `#000000` |

### Dark theme (optional, not the default)

| Token | Value |
| --- | --- |
| Background | `#0A0A0A` |
| Surface | `#171717` |
| Muted surface | `#262626` |
| Border / strong border | `#262626` / `#404040` |
| Text / muted text | `#FAFAFA` / `#A3A3A3` |
| Primary / hover / pressed | `#FFFFFF` / `#E5E5E5` / `#D4D4D4` |
| Focus | `#FFFFFF` |

Light is the initial standard because the brand direction is light-first. Dark
mode remains available as a user preference; it is not presented as the brand
default.

## Typography

The interface uses a system UI stack:

`-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif`

Monospace content uses the platform monospace stack. This avoids a webfont
payload and respects the approved performance guidance. **There is no approved
Woolhner brand font**; this stack is a product implementation choice, not an
official brand font.

## Assets

- `public/brand/woolhner-logo.jpeg` — unmodified copy of the supplied logo.
- `public/favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`,
  `apple-touch-icon.png`, `android-chrome-192x192.png`,
  `android-chrome-512x512.png`, `mstile-*.png`, `safari-pinned-tab.svg` —
  monochrome sizes derived from the same artwork.
- `public/banner.png` — social sharing banner derived from the same artwork.
  It is a product asset, not an approved brand kit item.

Derivatives were generated from the logo without altering the source file.
No third-party or synthesized mark is presented as an official Woolhner logo.

## Copy and metadata

- Product name: **Woolhner DevToolkit**.
- Product header: plain `Woolhner` / `DevToolkit` wordmark beside the supplied
  artwork.
- Default locale: `es`; fallback locale: `en`.
- Canonical URL and social metadata point to `https://woolhner.com/`.
- External links are direct URLs without UTM tracking parameters.
- No analytics script is installed at runtime; the inherited
  `plausible-tracker` dependency is no longer imported by the application.

## Homepage composition

The homepage is a task-focused directory rather than a decorative landing page:

- search across names, descriptions and keywords;
- recently used tools;
- favourites with drag-to-reorder;
- category sections for every tool;
- explicit empty state and clear-search action.

The green gradient hero, support donation block and unrelated accent colours
from the upstream project were removed.
