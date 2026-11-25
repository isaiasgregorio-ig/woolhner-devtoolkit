import {
  defineConfig,
  presetAttributify,
  presetTypography,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';

import { presetScrollbar } from 'unocss-preset-scrollbar';
import { darkThemeTokens, lightThemeTokens } from './src/design/tokens';

export default defineConfig({
  presets: [presetUno(), presetAttributify({ ignoreAttributes: ['size'] }), presetTypography(), presetScrollbar()],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  theme: {
    colors: {
      primary: lightThemeTokens.primary,
      surface: lightThemeTokens.surface,
      background: lightThemeTokens.background,
      ink: lightThemeTokens.text,
      muted: lightThemeTokens.textMuted,
    },
  },
  shortcuts: {
    'pretty-scrollbar': `scrollbar scrollbar-rounded scrollbar-thumb-color-${lightThemeTokens.borderStrong} scrollbar-track-color-${lightThemeTokens.surfaceMuted} dark:scrollbar-thumb-color-${darkThemeTokens.borderStrong} dark:scrollbar-track-color-${darkThemeTokens.surfaceMuted}`,
    'divider': 'h-1px bg-current op-10',
    'surface-card': `bg-${lightThemeTokens.surface} dark:bg-${darkThemeTokens.surface}`,
    'surface-page': `bg-${lightThemeTokens.background} dark:bg-${darkThemeTokens.background}`,
    'border-brand': `border-${lightThemeTokens.border} dark:border-${darkThemeTokens.borderStrong}`,
  },
});
