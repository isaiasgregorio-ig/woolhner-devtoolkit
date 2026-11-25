<script setup lang="ts">
import { IconDragDrop, IconSearch } from '@tabler/icons-vue';
import { useHead } from '@vueuse/head';
import Draggable from 'vuedraggable';
import ToolCard from '../components/ToolCard.vue';
import type { Tool } from '@/tools/tools.types';
import { useToolStore } from '@/tools/tools.store';

const toolStore = useToolStore();

const { t } = useI18n();
useHead({ title: computed(() => t('home.documentTitle')) });

const searchQuery = ref('');
const normalizedSearch = computed(() => searchQuery.value.trim().toLocaleLowerCase());

const favoriteTools = computed(() => toolStore.favoriteTools);

type SearchableTool = Pick<Tool, 'name' | 'description' | 'keywords'> & { category?: string };

function matchesSearch(tool: SearchableTool) {
  if (!normalizedSearch.value) {
    return true;
  }
  return [tool.name, tool.description, tool.category ?? '', ...tool.keywords]
    .join(' ')
    .toLocaleLowerCase()
    .includes(normalizedSearch.value);
}

const filteredTools = computed(() => toolStore.tools.filter(matchesSearch));
const groupedTools = computed(() => toolStore.toolsByCategory
  .map(category => ({ ...category, components: category.components.filter(matchesSearch) }))
  .filter(category => category.components.length > 0));

// Update favorite tools order when drag is finished
function onUpdateFavoriteTools() {
  toolStore.updateFavoriteTools(favoriteTools.value); // Update the store with the new order
}
</script>

<template>
  <div class="home-page">
    <div class="directory-header">
      <div class="directory-title">
        <IconSearch :size="22" />
        <h1>{{ $t('search.label') }}</h1>
      </div>
      <c-input-text
        v-model:value="searchQuery"
        :label="$t('search.placeholder')"
        :aria-label="$t('search.label')"
        clearable
        test-id="tool-search"
      />
    </div>

    <template v-if="normalizedSearch">
      <h3 class="section-title">
        {{ $t('home.categories.searchResults', { count: filteredTools.length }) }}
      </h3>
      <div v-if="filteredTools.length > 0" class="tool-grid">
        <ToolCard v-for="tool in filteredTools" :key="tool.path" :tool="tool" />
      </div>
      <div v-else class="empty-state">
        <p>{{ $t('home.noResults') }}</p>
        <c-button @click="searchQuery = ''">
          {{ $t('home.clearSearch') }}
        </c-button>
      </div>
    </template>

    <template v-else>
      <div v-if="toolStore.recentTools.length > 0">
        <h3 class="section-title">
          {{ $t('home.categories.recentTools') }}
        </h3>
        <div class="tool-grid">
          <ToolCard v-for="tool in toolStore.recentTools" :key="tool.path" :tool="tool" />
        </div>
      </div>

      <div v-if="favoriteTools.length > 0">
        <h3 class="section-title">
          {{ $t('home.categories.favoriteTools') }}
          <c-tooltip :tooltip="$t('home.categories.favoritesDndToolTip')">
            <n-icon :component="IconDragDrop" size="16" />
          </c-tooltip>
        </h3>
        <Draggable
          :list="favoriteTools"
          class="tool-grid"
          ghost-class="ghost-favorites-draggable"
          item-key="path"
          @end="onUpdateFavoriteTools"
        >
          <template #item="{ element: tool }">
            <ToolCard :tool="tool" />
          </template>
        </Draggable>
      </div>

      <div v-if="toolStore.newTools.length > 0">
        <h3 class="section-title">
          {{ $t('home.categories.newestTools') }}
        </h3>
        <div class="tool-grid">
          <ToolCard v-for="tool in toolStore.newTools" :key="tool.path" :tool="tool" />
        </div>
      </div>

      <section v-for="category in groupedTools" :key="category.name" class="category-section">
        <h3 class="section-title">
          {{ category.name }}
        </h3>
        <div class="tool-grid">
          <ToolCard v-for="tool in category.components" :key="tool.path" :tool="tool" />
        </div>
      </section>
    </template>
  </div>
</template>

<style scoped lang="less">
.home-page {
  padding-top: 8px;
}

.directory-header {
  max-width: 720px;
}

.directory-title {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--wh-text-muted);
  margin-bottom: 12px;

  h1 {
    font-size: 15px;
    font-weight: 600;
    margin: 0;
    color: var(--wh-text);
  }
}

.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: var(--wh-text-muted);
  margin: 28px 0 12px;
}

.tool-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 12px;
}

.category-section {
  margin-bottom: 8px;
}

.empty-state {
  border: 1px dashed var(--wh-border-strong);
  border-radius: 8px;
  padding: 40px 20px;
  text-align: center;
  color: var(--wh-text-muted);
}

.ghost-favorites-draggable {
  opacity: 0.4;
  border: 1px dashed var(--wh-border-strong);
}
</style>
