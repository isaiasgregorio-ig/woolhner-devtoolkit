import { describe, expect, it } from 'vitest';
import { validateWranglerConfig } from './wrangler-config-validator.service';

describe('wrangler-config-validator.service', () => {
  it('accepts a valid wrangler.toml configuration', () => {
    const result = validateWranglerConfig(`
name = "api"
main = "src/index.ts"
compatibility_date = "2026-01-01"

[[kv_namespaces]]
binding = "CACHE"
id = "kv-id"
`);

    expect(result.format).toBe('toml');
    expect(result.workerName).toBe('api');
    expect(result.issues).toEqual([]);
  });

  it('reports missing fields and duplicate bindings', () => {
    const result = validateWranglerConfig(`
name = "API"
main = "src/index.ts"
compatibility_date = "2026-99-99"

[[kv_namespaces]]
binding = "cache"
id = "kv-id"

[vars]
cache = "value"
`);

    const messages = result.issues.map(issue => issue.message).join(' ');
    expect(messages).toContain('name');
    expect(messages).toContain('fecha');
    expect(messages).toContain('MAYÚSCULAS');
    expect(messages).toContain('duplicados');
  });

  it('supports commented wrangler.jsonc input and warns about secrets in vars', () => {
    const result = validateWranglerConfig(`{
      // Worker configuration
      "name": "api",
      "main": "src/index.ts",
      "compatibility_date": "2026-01-01",
      "vars": { "API_TOKEN": "hardcoded" },
    }`);

    expect(result.format).toBe('json');
    expect(result.issues).toHaveLength(1);
    expect(result.issues[0].level).toBe('warning');
    expect(result.issues[0].message).toContain('secreto');
  });

  it('returns a parse error for malformed TOML', () => {
    const result = validateWranglerConfig('name = "api"\n[[broken');
    expect(result.issues[0].level).toBe('error');
    expect(result.issues[0].message).toContain('TOML no válido');
  });
});
