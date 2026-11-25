import { describe, expect, it } from 'vitest';
import {
  analyseCronExpressions,
  buildCronTriggerConfig,
  describeCloudflareCron,
  isCloudflareCron,
} from './cloudflare-cron-helper.service';

describe('cloudflare-cron-helper.service', () => {
  it('accepts valid 5-field expressions and rejects unsupported forms', () => {
    expect(isCloudflareCron('*/5 * * * *')).toBe(true);
    expect(isCloudflareCron('0 0 1 1 *')).toBe(true);
    expect(isCloudflareCron('0 0 * * 1-5')).toBe(true);
    expect(isCloudflareCron('@daily')).toBe(false);
    expect(isCloudflareCron('0 0 * * * *')).toBe(false);
    expect(isCloudflareCron('61 * * * *')).toBe(false);
  });

  it('describes expressions in English via cronstrue', () => {
    expect(describeCloudflareCron('*/5 * * * *')).toContain('Every 5 minutes');
    expect(describeCloudflareCron('invalid')).toBe('');
  });

  it('analyses a list and ignores blank lines', () => {
    const results = analyseCronExpressions('*/5 * * * *\n\n@daily\n0 9 * * 1');
    expect(results).toHaveLength(3);
    expect(results.filter(result => result.valid)).toHaveLength(2);
    expect(results[1].valid).toBe(false);
  });

  it('generates a wrangler trigger block with only valid expressions', () => {
    const config = buildCronTriggerConfig(['*/5 * * * *', '@daily', '0 9 * * 1']);
    expect(config).toBe('[triggers]\ncrons = [\n  "*/5 * * * *",\n  "0 9 * * 1",\n]\n');
    expect(buildCronTriggerConfig(['@daily'])).toBe('');
  });
});
