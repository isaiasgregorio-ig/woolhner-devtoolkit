import messages from '@intlify/unplugin-vue-i18n/messages';
import type { Plugin } from 'vue';
import { createI18n } from 'vue-i18n';

const i18n = createI18n({
  legacy: false,
  locale: 'es',
  fallbackLocale: 'en',
  messages,
});

export const i18nPlugin: Plugin = {
  install: (app) => {
    app.use(i18n);
  },
};

/**
 * Tool metadata uses stable English default values (names, descriptions and
 * favourite identifiers). User-facing copy is translated reactively by the
 * tool store and tool layout, so this does not affect the visible language.
 */
export const translate = function (localeKey: string) {
  const hasKey = i18n.global.te(localeKey, 'en');
  return hasKey ? i18n.global.t(localeKey, {}, { locale: 'en' }) : localeKey;
};
