import { defineThemes } from './theme.models';
import { darkThemeTokens, lightThemeTokens } from '@/design/tokens';

/**
 * Theme for the local c-* component library. It mirrors the Naive UI tokens so
 * both component systems render identically in light and dark modes.
 */
export const { themes: appThemes, useTheme: useAppTheme } = defineThemes({
  light: {
    background: lightThemeTokens.background,
    text: {
      baseColor: lightThemeTokens.text,
      mutedColor: lightThemeTokens.textMuted,
    },
    default: {
      color: lightThemeTokens.surfaceMuted,
      colorHover: lightThemeTokens.border,
      colorPressed: lightThemeTokens.borderStrong,
    },
    primary: {
      color: lightThemeTokens.primary,
      colorHover: lightThemeTokens.primaryHover,
      colorPressed: lightThemeTokens.primaryPressed,
      colorFaded: lightThemeTokens.primaryFaded,
    },
    warning: {
      color: lightThemeTokens.textMuted,
      colorHover: lightThemeTokens.text,
      colorPressed: lightThemeTokens.textMuted,
      colorFaded: lightThemeTokens.primaryFaded,
    },
    success: {
      color: lightThemeTokens.textMuted,
      colorHover: lightThemeTokens.text,
      colorPressed: lightThemeTokens.textMuted,
      colorFaded: lightThemeTokens.primaryFaded,
    },
    error: {
      color: lightThemeTokens.text,
      colorHover: lightThemeTokens.text,
      colorPressed: lightThemeTokens.text,
      colorFaded: lightThemeTokens.primaryFaded,
    },
  },
  dark: {
    background: darkThemeTokens.background,
    text: {
      baseColor: darkThemeTokens.text,
      mutedColor: darkThemeTokens.textMuted,
    },
    default: {
      color: darkThemeTokens.surfaceMuted,
      colorHover: darkThemeTokens.borderStrong,
      colorPressed: darkThemeTokens.textMuted,
    },
    primary: {
      color: darkThemeTokens.primary,
      colorHover: darkThemeTokens.primaryHover,
      colorPressed: darkThemeTokens.primaryPressed,
      colorFaded: darkThemeTokens.primaryFaded,
    },
    warning: {
      color: darkThemeTokens.textMuted,
      colorHover: darkThemeTokens.text,
      colorPressed: darkThemeTokens.textMuted,
      colorFaded: darkThemeTokens.primaryFaded,
    },
    success: {
      color: darkThemeTokens.textMuted,
      colorHover: darkThemeTokens.text,
      colorPressed: darkThemeTokens.textMuted,
      colorFaded: darkThemeTokens.primaryFaded,
    },
    error: {
      color: darkThemeTokens.text,
      colorHover: darkThemeTokens.text,
      colorPressed: darkThemeTokens.text,
      colorFaded: darkThemeTokens.primaryFaded,
    },
  },
});
