/**
 * Woolhner DevToolkit design tokens.
 *
 * Source of truth:
 * - `~/Woolhner/Brand/Logos/logo.jpeg` (copied verbatim to `public/brand/woolhner-logo.jpeg`).
 *   Pixel analysis: the artwork is achromatic (black #000000 and white #FFFFFF).
 * - `~/Woolhner/Company/woolhner/brand/` (approved direction: minimalist, light-first,
 *   accessible, deliberate typography; no official hex codes or font family approved).
 *
 * Every colour below is either the logo's black/white or a neutral grey derived from
 * them. No accent hue is introduced. Semantic states use weight, borders and icons
 * instead of unrelated colours.
 */

export const brandColors = {
  ink: '#000000',
  paper: '#FFFFFF',
} as const;

export const neutral = {
  50: '#FAFAFA',
  100: '#F5F5F5',
  200: '#E5E5E5',
  300: '#D4D4D4',
  400: '#A3A3A3',
  500: '#737373',
  600: '#525252',
  700: '#404040',
  800: '#262626',
  900: '#171717',
  950: '#0A0A0A',
} as const;

export interface BrandThemeTokens {
  background: string
  surface: string
  surfaceMuted: string
  border: string
  borderStrong: string
  text: string
  textMuted: string
  primary: string
  primaryHover: string
  primaryPressed: string
  primaryFaded: string
  focus: string
  shadow: string
  backdrop: string
}

export const lightThemeTokens: BrandThemeTokens = {
  background: neutral[50],
  surface: brandColors.paper,
  surfaceMuted: neutral[100],
  border: neutral[200],
  borderStrong: neutral[300],
  text: neutral[950],
  textMuted: neutral[600],
  primary: brandColors.ink,
  primaryHover: neutral[800],
  primaryPressed: neutral[700],
  primaryFaded: 'rgba(0, 0, 0, 0.06)',
  focus: brandColors.ink,
  shadow: 'rgba(0, 0, 0, 0.08)',
  backdrop: 'rgba(0, 0, 0, 0.48)',
};

export const darkThemeTokens: BrandThemeTokens = {
  background: neutral[950],
  surface: neutral[900],
  surfaceMuted: neutral[800],
  border: neutral[800],
  borderStrong: neutral[700],
  text: neutral[50],
  textMuted: neutral[400],
  primary: brandColors.paper,
  primaryHover: neutral[200],
  primaryPressed: neutral[300],
  primaryFaded: 'rgba(255, 255, 255, 0.08)',
  focus: brandColors.paper,
  shadow: 'rgba(0, 0, 0, 0.6)',
  backdrop: 'rgba(0, 0, 0, 0.72)',
};

export const brandTokens = {
  logo: `${import.meta.env.BASE_URL}brand/woolhner-logo.jpeg`,
  fontFamily:
    '-apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, \'Helvetica Neue\', Arial, \'Noto Sans\', sans-serif',
  fontFamilyMono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \'Liberation Mono\', monospace',
  radius: '8px',
  radiusSmall: '4px',
} as const;
