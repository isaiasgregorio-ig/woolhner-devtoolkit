import { defineStore } from 'pinia';
import _ from 'lodash';
import type { PaletteOption } from './command-palette.types';
import { useToolStore } from '@/tools/tools.store';
import { useFuzzySearch } from '@/composable/fuzzySearch';
import { useStyleStore } from '@/stores/style.store';

import SunIcon from '~icons/mdi/white-balance-sunny';
import GithubIcon from '~icons/mdi/github';
import BugIcon from '~icons/mdi/bug-outline';
import DiceIcon from '~icons/mdi/dice-5';
import InfoIcon from '~icons/mdi/information-outline';

export const useCommandPaletteStore = defineStore('command-palette', () => {
  const toolStore = useToolStore();
  const styleStore = useStyleStore();
  const router = useRouter();
  const { t } = useI18n();
  const searchPrompt = ref('');

  const toolsOptions = computed(() => toolStore.tools.map(tool => ({
    ...tool,
    to: tool.path,
    toolCategory: tool.category,
    category: t('commandPalette.categories.tools'),
  })));

  const searchOptions = computed<PaletteOption[]>(() => [
    ...toolsOptions.value,
    {
      name: t('commandPalette.randomTool'),
      description: t('commandPalette.randomToolDescription'),
      action: () => {
        const { path } = _.sample(toolStore.tools)!;
        router.push(path);
      },
      icon: DiceIcon,
      category: t('commandPalette.categories.tools'),
      keywords: ['random', 'tool', 'pick', 'choose', 'select', 'aleatorio'],
      closeOnSelect: true,
    },
    {
      name: t('commandPalette.toggleTheme'),
      description: t('commandPalette.toggleThemeDescription'),
      action: () => styleStore.toggleDark(),
      icon: SunIcon,
      category: t('commandPalette.categories.actions'),
      keywords: ['dark', 'theme', 'toggle', 'mode', 'light', 'tema'],
    },
    {
      name: t('commandPalette.upstreamRepository'),
      href: 'https://github.com/CorentinTh/it-tools',
      category: t('commandPalette.categories.external'),
      description: t('commandPalette.upstreamDescription'),
      keywords: ['github', 'repo', 'repository', 'source', 'code', 'upstream'],
      icon: GithubIcon,
    },
    {
      name: t('commandPalette.reportIssue'),
      description: t('commandPalette.reportIssueDescription'),
      href: 'https://github.com/CorentinTh/it-tools/issues/new/choose',
      category: t('commandPalette.categories.actions'),
      keywords: ['report', 'issue', 'bug', 'problem', 'error', 'error'],
      icon: BugIcon,
    },
    {
      name: t('commandPalette.about'),
      description: t('commandPalette.aboutDescription'),
      to: '/about',
      category: t('commandPalette.categories.pages'),
      keywords: ['about', 'learn', 'more', 'info', 'information', 'acerca'],
      icon: InfoIcon,
    },
  ]);

  const { searchResult } = useFuzzySearch({
    search: searchPrompt,
    data: searchOptions,
    options: {
      keys: [{ name: 'name', weight: 2 }, 'description', 'keywords', 'category'],
      threshold: 0.3,
    },
  });

  const filteredSearchResult = computed(() =>
    _.chain(searchResult.value).groupBy('category').mapValues(categoryOptions => _.take(categoryOptions, 5)).value());

  return {
    filteredSearchResult,
    searchPrompt,
  };
});
