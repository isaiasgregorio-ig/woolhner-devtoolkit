import type { GlobalThemeOverrides } from 'naive-ui';
import { brandColors, brandTokens, darkThemeTokens, lightThemeTokens, neutral } from './design/tokens';

/**
 * Naive UI follows the same monochrome tokens as the rest of the application.
 * Status colours are deliberately neutral: state is communicated with icons,
 * labels and borders rather than invented accent hues.
 */
function commonOverrides(tokens: typeof lightThemeTokens, baseColor: string) {
  return {
    fontFamily: brandTokens.fontFamily,
    fontFamilyMono: brandTokens.fontFamilyMono,
    borderRadius: brandTokens.radius,
    borderRadiusSmall: brandTokens.radiusSmall,
    baseColor,
    primaryColor: tokens.primary,
    primaryColorHover: tokens.primaryHover,
    primaryColorPressed: tokens.primaryPressed,
    primaryColorSuppl: tokens.primary,
    textColorBase: tokens.text,
    textColor1: tokens.text,
    textColor2: tokens.textMuted,
    textColor3: tokens.textMuted,
    borderColor: tokens.border,
    borderColorHover: tokens.borderStrong,
    dividerColor: tokens.border,
    bodyColor: tokens.background,
    cardColor: tokens.surface,
    inputColor: tokens.surface,
    inputColorDisabled: tokens.surfaceMuted,
    buttonColor2: tokens.surfaceMuted,
    buttonColor2Hover: tokens.border,
    buttonColor2Pressed: tokens.borderStrong,
    successColor: tokens.textMuted,
    successColorHover: tokens.text,
    successColorPressed: tokens.textMuted,
    successColorSuppl: tokens.textMuted,
    warningColor: tokens.textMuted,
    warningColorHover: tokens.text,
    warningColorPressed: tokens.textMuted,
    warningColorSuppl: tokens.textMuted,
    errorColor: tokens.textMuted,
    errorColorHover: tokens.text,
    errorColorPressed: tokens.textMuted,
    errorColorSuppl: tokens.textMuted,
    infoColor: tokens.textMuted,
    infoColorHover: tokens.text,
    infoColorPressed: tokens.textMuted,
    infoColorSuppl: tokens.textMuted,
  };
}

export const lightThemeOverrides: GlobalThemeOverrides = {
  common: commonOverrides(lightThemeTokens, brandColors.paper),
  Layout: {
    color: lightThemeTokens.background,
    siderColor: lightThemeTokens.surface,
    siderBorderColor: lightThemeTokens.border,
  },
  Card: {
    color: lightThemeTokens.surface,
    borderColor: lightThemeTokens.border,
    borderColorHover: lightThemeTokens.borderStrong,
  },
  Menu: { itemHeight: '32px' },
  AutoComplete: {
    peers: {
      InternalSelectMenu: { height: '500px' },
    },
  },
};

export const darkThemeOverrides: GlobalThemeOverrides = {
  common: {
    // Neutral only: a white primary needs dark foreground text on filled controls.
    ...commonOverrides(darkThemeTokens, neutral[950]),
  },
  Layout: {
    color: darkThemeTokens.background,
    siderColor: darkThemeTokens.surface,
    siderBorderColor: darkThemeTokens.border,
  },
  Card: {
    color: darkThemeTokens.surface,
    borderColor: darkThemeTokens.border,
    borderColorHover: darkThemeTokens.borderStrong,
  },
  Table: {
    tdColor: darkThemeTokens.surface,
    thColor: darkThemeTokens.surfaceMuted,
    thColorHover: darkThemeTokens.surfaceMuted,
    tdColorHover: darkThemeTokens.surfaceMuted,
    borderColor: darkThemeTokens.border,
  },
  Notification: {
    color: darkThemeTokens.surface,
    headerColor: darkThemeTokens.text,
    contentColor: darkThemeTokens.textMuted,
    closeColor: darkThemeTokens.textMuted,
    closeColorHover: darkThemeTokens.text,
    closeColorPressed: darkThemeTokens.textMuted,
  },
  Menu: { itemHeight: '32px' },
  AutoComplete: {
    peers: {
      InternalSelectMenu: { height: '500px', color: darkThemeTokens.surface },
    },
  },
};
