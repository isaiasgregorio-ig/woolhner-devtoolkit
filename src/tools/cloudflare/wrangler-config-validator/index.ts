import { FileText } from '@vicons/tabler';
import { defineTool } from '../../tool';
import { translate } from '@/plugins/i18n.plugin';

export const tool = defineTool({
  name: translate('tools.wrangler-config-validator.title'),
  path: '/wrangler-config-validator',
  description: translate('tools.wrangler-config-validator.description'),
  keywords: ['cloudflare', 'wrangler', 'worker', 'validate', 'toml', 'jsonc', 'validar'],
  component: () => import('./wrangler-config-validator.vue'),
  icon: FileText,
  createdAt: new Date('2026-11-25T00:00:00Z'),
});
