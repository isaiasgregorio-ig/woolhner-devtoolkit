<script setup lang="ts">
import type { Component } from 'vue';

const props = defineProps<{ icon: Component; title: string }>();
const { icon, title } = toRefs(props);
</script>

<template>
  <c-card class="notice-card">
    <n-icon class="icon" size="32" :component="icon" />
    <n-h3 class="title">
      <n-ellipsis>{{ title }}</n-ellipsis>
    </n-h3>

    <div class="description">
      <n-ellipsis :line-clamp="2" :tooltip="false">
        <slot />
      </n-ellipsis>
    </div>
  </c-card>
</template>

<style lang="less" scoped>
.notice-card {
  background: var(--wh-surface-muted);
  border: 1px solid var(--wh-border);
  color: var(--wh-text);

  .icon {
    color: var(--wh-text-muted);
  }

  .title {
    color: var(--wh-text);
    margin: 8px 0 4px;
  }

  .description {
    color: var(--wh-text-muted);
    margin: 4px 0;

    ::v-deep(a) {
      color: var(--wh-text);
      text-decoration: underline;
      font-weight: 600;

      &:hover {
        color: var(--wh-text-muted);
      }
    }
  }
}
</style>
