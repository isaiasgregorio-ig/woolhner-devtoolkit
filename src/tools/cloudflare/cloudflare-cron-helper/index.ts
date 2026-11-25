import { Calendar } from '@vicons/tabler';
import { defineTool } from '../../tool';
import { translate } from '@/plugins/i18n.plugin';

export const tool = defineTool({
  name: translate('tools.cloudflare-cron-helper.title'),
  path: '/cloudflare-cron-helper',
  description: translate('tools.cloudflare-cron-helper.description'),
  keywords: ['cloudflare', 'workers', 'cron', 'schedule', 'trigger', 'wrangler', 'programado'],
  component: () => import('./cloudflare-cron-helper.vue'),
  icon: Calendar,
  createdAt: new Date('2026-11-25T00:00:00Z'),
});
