import { parse as parseToml } from 'iarna-toml-esm';
import { describe, expect, it } from 'vitest';
import {
  emptyWranglerGeneratorOptions,
  generateWranglerConfig,
  validateWranglerGeneratorOptions,
} from './wrangler-config-generator.service';

describe('wrangler-config-generator.service', () => {
  it('generates parseable TOML with all binding types', () => {
    const options = {
      ...emptyWranglerGeneratorOptions(),
      workersDev: false,
      route: 'api.example.com/*',
      vars: [{ key: 'ENVIRONMENT', value: 'development' }],
      kvNamespaces: [{ binding: 'CACHE', id: 'kv-id' }],
      d1Databases: [{ binding: 'DB', databaseName: 'app-db', databaseId: 'd1-id' }],
      r2Buckets: [{ binding: 'ASSETS', bucketName: 'app-assets' }],
    };

    const toml = generateWranglerConfig(options);
    const parsed = parseToml(toml);

    expect(parsed.name).toBe('woolhner-worker');
    expect(parsed.route).toBe('api.example.com/*');
    expect(parsed.vars.ENVIRONMENT).toBe('development');
    expect(parsed.kv_namespaces).toEqual([{ binding: 'CACHE', id: 'kv-id' }]);
    expect(parsed.d1_databases).toEqual([{ binding: 'DB', database_name: 'app-db', database_id: 'd1-id' }]);
    expect(parsed.r2_buckets).toEqual([{ binding: 'ASSETS', bucket_name: 'app-assets' }]);
  });

  it('escapes strings that contain quotes and newlines', () => {
    const options = {
      ...emptyWranglerGeneratorOptions(),
      vars: [{ key: 'MESSAGE', value: 'say "hi"\nnext line' }],
    };

    const parsed = parseToml(generateWranglerConfig(options));
    expect(parsed.vars.MESSAGE).toBe('say "hi"\nnext line');
  });

  it('reports invalid names, dates, paths and duplicate bindings', () => {
    const errors = validateWranglerGeneratorOptions({
      ...emptyWranglerGeneratorOptions(),
      name: 'Invalid Name',
      main: '/src/index.ts',
      compatibilityDate: '2026-13-45',
      workersDev: false,
      route: '',
      kvNamespaces: [{ binding: 'cache', id: '' }],
      vars: [{ key: 'cache', value: 'x' }],
    });

    expect(errors.length).toBeGreaterThanOrEqual(6);
    expect(errors.join(' ')).toContain('nombre');
    expect(errors.join(' ')).toContain('ruta');
    expect(errors.join(' ')).toContain('fecha');
    expect(errors.join(' ')).toContain('únicos');
  });

  it('accepts a valid default configuration', () => {
    expect(validateWranglerGeneratorOptions(emptyWranglerGeneratorOptions())).toEqual([]);
  });
});
