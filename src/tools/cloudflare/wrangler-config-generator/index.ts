import { Code } from '@vicons/tabler';
import { defineTool } from '../../tool';
import { translate } from '@/plugins/i18n.plugin';

export const tool = defineTool({
  name: translate('tools.wrangler-config-generator.title'),
  path: '/wrangler-config-generator',
  description: translate('tools.wrangler-config-generator.description'),
  keywords: ['cloudflare', 'wrangler', 'worker', 'config', 'kv', 'd1', 'r2', 'generador'],
  component: () => import('./wrangler-config-generator.vue'),
  icon: Code,
  createdAt: new Date('2026-11-25T00:00:00Z'),
});
