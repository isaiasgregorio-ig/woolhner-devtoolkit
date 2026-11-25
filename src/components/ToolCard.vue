<script setup lang="ts">
import FavoriteButton from './FavoriteButton.vue';
import type { Tool } from '@/tools/tools.types';

const props = defineProps<{ tool: Tool }>();
const { tool } = toRefs(props);
</script>

<template>
  <router-link :to="tool.path" class="tool-card-link decoration-none">
    <c-card class="tool-card">
      <div flex items-center justify-between>
        <n-icon class="tool-icon" size="34" :component="tool.icon" />

        <div flex items-center gap-8px>
          <div v-if="tool.isNew" class="new-badge">
            {{ $t('toolCard.new') }}
          </div>

          <FavoriteButton :tool="tool" />
        </div>
      </div>

      <div class="tool-name">
        {{ tool.name }}
      </div>

      <div class="tool-description">
        {{ tool.description }}
      </div>
    </c-card>
  </router-link>
</template>

<style lang="less" scoped>
.tool-card-link {
  display: block;
  height: 100%;
  border-radius: 8px;
}

.tool-card {
  height: 100%;
  border: 1px solid var(--wh-border);
  transition: border-color 0.15s ease, background-color 0.15s ease;

  &:hover {
    border-color: var(--wh-border-strong);
    background: var(--wh-surface-muted);
  }
}

.tool-card-link:focus-visible .tool-card {
  outline: 2px solid var(--wh-focus);
  outline-offset: 2px;
}

.tool-icon {
  color: var(--wh-text-muted);
}

.new-badge {
  border: 1px solid var(--wh-border-strong);
  border-radius: 999px;
  padding: 2px 8px;
  font-size: 11px;
  color: var(--wh-text-muted);
}

.tool-name {
  margin: 10px 0 4px;
  font-size: 16px;
  font-weight: 600;
  color: var(--wh-text);
}

.tool-description {
  font-size: 13px;
  line-height: 1.5;
  color: var(--wh-text-muted);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
