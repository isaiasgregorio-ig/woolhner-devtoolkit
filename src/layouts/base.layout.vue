<script lang="ts" setup>
import { NIcon } from 'naive-ui';

import { RouterLink } from 'vue-router';
import { Home2, Menu2 } from '@vicons/tabler';

import { storeToRefs } from 'pinia';
import MenuLayout from '../components/MenuLayout.vue';
import NavbarButtons from '../components/NavbarButtons.vue';
import { useStyleStore } from '@/stores/style.store';
import { config } from '@/config';
import type { ToolCategory } from '@/tools/tools.types';
import { useToolStore } from '@/tools/tools.store';
import CollapsibleToolMenu from '@/components/CollapsibleToolMenu.vue';
import { brandTokens } from '@/design/tokens';

const styleStore = useStyleStore();
const version = config.app.version;
const commitSha = config.app.lastCommitSha.slice(0, 7);

const { t } = useI18n();

const toolStore = useToolStore();
const { favoriteTools, toolsByCategory } = storeToRefs(toolStore);

const tools = computed<ToolCategory[]>(() => [
  ...(favoriteTools.value.length > 0 ? [{ name: t('tools.categories.favorite-tools'), components: favoriteTools.value }] : []),
  ...toolsByCategory.value,
]);
</script>

<template>
  <MenuLayout class="menu-layout" :class="{ isSmallScreen: styleStore.isSmallScreen }">
    <template #sider>
      <RouterLink to="/" class="brand-wrapper">
        <img :src="brandTokens.logo" alt="Woolhner" class="brand-logo" width="56" height="56">
        <div class="brand-text">
          <div class="brand-name">
            Woolhner
          </div>
          <div class="brand-product">
            DevToolkit
          </div>
          <div class="brand-subtitle">
            {{ $t('home.subtitle') }}
          </div>
        </div>
      </RouterLink>

      <div class="sider-content">
        <div v-if="styleStore.isSmallScreen" flex flex-col items-center>
          <locale-selector w="90%" />

          <div flex justify-center>
            <NavbarButtons />
          </div>
        </div>

        <CollapsibleToolMenu :tools-by-category="tools" />

        <div class="footer">
          <div class="footer-version">
            Woolhner DevToolkit
            <c-link
              target="_blank"
              rel="noopener"
              :href="`https://github.com/CorentinTh/it-tools/tree/v${version}`"
            >
              v{{ version }}
            </c-link>
            <template v-if="commitSha">
              ·
              <c-link
                target="_blank"
                rel="noopener"
                :href="`https://github.com/CorentinTh/it-tools/tree/${commitSha}`"
              >
                {{ commitSha }}
              </c-link>
            </template>
          </div>
          <div class="footer-attribution">
            {{ $t('home.footer.basedOn') }}
            <c-link target="_blank" rel="noopener" href="https://github.com/CorentinTh/it-tools">
              IT-Tools
            </c-link>
            {{ $t('home.footer.by') }}
            <c-link target="_blank" rel="noopener" href="https://corentin.tech">
              Corentin Thomasset
            </c-link>
            · {{ $t('home.footer.license') }}
          </div>
          <div>
            © {{ new Date().getFullYear() }}
            <c-link target="_blank" rel="noopener" href="https://woolhner.com">
              Woolhner
            </c-link>
          </div>
        </div>
      </div>
    </template>

    <template #content>
      <div class="topbar">
        <c-button
          circle
          variant="text"
          :aria-label="$t('home.toggleMenu')"
          @click="styleStore.isMenuCollapsed = !styleStore.isMenuCollapsed"
        >
          <NIcon size="22" :component="Menu2" />
        </c-button>

        <c-tooltip :tooltip="$t('home.home')" position="bottom">
          <c-button to="/" circle variant="text" :aria-label="$t('home.home')">
            <NIcon size="22" :component="Home2" />
          </c-button>
        </c-tooltip>

        <c-tooltip v-if="config.app.env === 'development'" :tooltip="$t('home.uiLib')" position="bottom">
          <c-button circle variant="text" to="/c-lib" :aria-label="$t('home.uiLib')">
            <icon-mdi:brush-variant text-20px />
          </c-button>
        </c-tooltip>

        <command-palette />

        <div class="topbar-spacer" />

        <locale-selector v-if="!styleStore.isSmallScreen" />
        <NavbarButtons v-if="!styleStore.isSmallScreen" />
      </div>
      <slot />
    </template>
  </MenuLayout>
</template>

<style lang="less" scoped>
.topbar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-bottom: 20px;
}

.topbar-spacer {
  flex: 1 1 auto;
}

.footer {
  text-align: center;
  color: var(--wh-text-muted);
  font-size: 12px;
  line-height: 1.7;
  margin-top: 20px;
  padding: 20px 0;

  .footer-version {
    font-weight: 600;
    color: var(--wh-text);
  }

  .footer-attribution {
    max-width: 220px;
    margin: 0 auto;
  }
}

.sider-content {
  padding-top: 20px;
  padding-bottom: 40px;
}

.brand-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px;
  border-bottom: 1px solid var(--wh-border);
  text-decoration: none;
  color: var(--wh-text);
}

.brand-logo {
  display: block;
  flex: 0 0 auto;
  width: 56px;
  height: 56px;
  object-fit: contain;
}

.brand-text {
  min-width: 0;
}

.brand-name {
  font-size: 18px;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.brand-product {
  font-size: 13px;
  font-weight: 500;
  line-height: 1.5;
}

.brand-subtitle {
  font-size: 11px;
  color: var(--wh-text-muted);
  line-height: 1.4;
}
</style>
