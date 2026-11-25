import { resolve } from 'node:path';
import { URL, fileURLToPath } from 'node:url';

import VueI18n from '@intlify/unplugin-vue-i18n/vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Unocss from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import IconsResolver from 'unplugin-icons/resolver';
import Icons from 'unplugin-icons/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import markdown from 'vite-plugin-vue-markdown';
import svgLoader from 'vite-svg-loader';
import { configDefaults } from 'vitest/config';

const baseUrl = process.env.BASE_URL ?? '/';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueI18n({
      runtimeOnly: true,
      jitCompilation: true,
      compositionOnly: true,
      fullInstall: true,
      strictMessage: false,
      include: [
        resolve(__dirname, 'locales/**'),
      ],
    }),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        '@vueuse/core',
        'vue-i18n',
        {
          'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar'],
        },
      ],
      vueTemplate: true,
      eslintrc: {
        enabled: true,
      },
    }),
    Icons({ compiler: 'vue3' }),
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    vueJsx(),
    markdown(),
    svgLoader(),
    VitePWA({
      registerType: 'autoUpdate',
      strategies: 'generateSW',
      manifest: {
        name: 'Woolhner DevToolkit',
        short_name: 'DevToolkit',
        description:
          'Colección de herramientas prácticas para desarrolladores, ingenieros web y profesionales de TI.',
        display: 'standalone',
        lang: 'es',
        dir: 'ltr',
        start_url: baseUrl,
        scope: baseUrl,
        orientation: 'any',
        theme_color: '#ffffff',
        background_color: '#fafafa',
        categories: ['utilities', 'developer'],
        icons: [
          {
            src: `${baseUrl}favicon-16x16.png`,
            type: 'image/png',
            sizes: '16x16',
          },
          {
            src: `${baseUrl}favicon-32x32.png`,
            type: 'image/png',
            sizes: '32x32',
          },
          {
            src: `${baseUrl}android-chrome-192x192.png`,
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: `${baseUrl}android-chrome-512x512.png`,
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
        ],
      },
    }),
    Components({
      dirs: ['src/'],
      extensions: ['vue', 'md'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [NaiveUiResolver(), IconsResolver({ prefix: 'icon' })],
    }),
    Unocss(),
  ],
  base: baseUrl,
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  define: {
    'import.meta.env.PACKAGE_VERSION': JSON.stringify(process.env.npm_package_version),
  },
  test: {
    exclude: [...configDefaults.exclude, '**/*.e2e.spec.ts'],
    // iarna-toml-esm ships an ESM entry point inside a CommonJS package.
    server: {
      deps: {
        inline: ['iarna-toml-esm'],
      },
    },
  },
  build: {
    target: 'esnext',
  },
});
