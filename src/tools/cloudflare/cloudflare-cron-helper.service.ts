import cronstrue from 'cronstrue';
import { isValidCron } from 'cron-validator';

/**
 * Cloudflare Workers cron triggers use the standard 5-field expression
 * (minute, hour, day of month, month, day of week). Aliases such as @daily
 * and 6-field expressions are intentionally rejected.
 */
export function isCloudflareCron(expression: string): boolean {
  const fields = expression.trim().split(/\s+/).filter(Boolean);
  if (fields.length !== 5) {
    return false;
  }
  return isValidCron(expression.trim(), {
    seconds: false,
    alias: false,
    allowBlankDay: false,
  });
}

export function describeCloudflareCron(expression: string): string {
  if (!isCloudflareCron(expression)) {
    return '';
  }
  try {
    return cronstrue.toString(expression.trim(), {
      use24HourTimeFormat: true,
      throwExceptionOnParseError: true,
    });
  }
  catch {
    return '';
  }
}

export interface CloudflareCronResult {
  expression: string
  valid: boolean
  description: string
}

export function analyseCronExpressions(input: string): CloudflareCronResult[] {
  return input
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean)
    .map((expression) => {
      const valid = isCloudflareCron(expression);
      return {
        expression,
        valid,
        description: valid ? describeCloudflareCron(expression) : '',
      };
    });
}

/** Builds the [triggers] block used by wrangler for scheduled Workers. */
export function buildCronTriggerConfig(expressions: string[]): string {
  const valid = expressions.map(expression => expression.trim()).filter(isCloudflareCron);
  if (valid.length === 0) {
    return '';
  }

  const crons = valid.map(expression => `  "${expression}",`).join('\n');
  return `[triggers]\ncrons = [\n${crons}\n]\n`;
}
