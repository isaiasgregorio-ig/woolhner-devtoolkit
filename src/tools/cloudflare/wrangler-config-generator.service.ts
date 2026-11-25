export interface KvNamespaceBinding {
  binding: string
  id: string
}

export interface D1DatabaseBinding {
  binding: string
  databaseName: string
  databaseId: string
}

export interface R2BucketBinding {
  binding: string
  bucketName: string
}

export interface WranglerVariable {
  key: string
  value: string
}

export interface WranglerGeneratorOptions {
  name: string
  main: string
  compatibilityDate: string
  workersDev: boolean
  route: string
  kvNamespaces: KvNamespaceBinding[]
  d1Databases: D1DatabaseBinding[]
  r2Buckets: R2BucketBinding[]
  vars: WranglerVariable[]
}

export function emptyWranglerGeneratorOptions(): WranglerGeneratorOptions {
  return {
    name: 'woolhner-worker',
    main: 'src/index.ts',
    compatibilityDate: '2026-01-01',
    workersDev: true,
    route: '',
    kvNamespaces: [],
    d1Databases: [],
    r2Buckets: [],
    vars: [],
  };
}

const workerNamePattern = /^[a-z0-9][a-z0-9_-]*$/;
const bindingPattern = /^[A-Z][A-Z0-9_]*$/;

function isValidDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function hasDuplicateBindings(bindings: string[]) {
  return new Set(bindings).size !== bindings.length;
}

/** Validates form state before generating a configuration. All checks are local. */
export function validateWranglerGeneratorOptions(options: WranglerGeneratorOptions): string[] {
  const errors: string[] = [];

  if (!options.name.trim()) {
    errors.push('El nombre del Worker es obligatorio.');
  }
  else if (!workerNamePattern.test(options.name.trim())) {
    errors.push('El nombre debe usar minúsculas, números, guiones o guiones bajos y empezar por una letra o número.');
  }

  if (!options.main.trim()) {
    errors.push('El campo main es obligatorio.');
  }
  else if (options.main.trim().startsWith('/')) {
    errors.push('main debe ser una ruta relativa, por ejemplo src/index.ts.');
  }

  if (!isValidDate(options.compatibilityDate.trim())) {
    errors.push('compatibility_date debe ser una fecha válida en formato AAAA-MM-DD.');
  }

  if (!options.workersDev && !options.route.trim()) {
    errors.push('Define una ruta o habilita workers_dev para publicar el Worker.');
  }

  const bindings = [
    ...options.kvNamespaces.map(b => b.binding),
    ...options.d1Databases.map(b => b.binding),
    ...options.r2Buckets.map(b => b.binding),
    ...options.vars.map(v => v.key),
  ].map(binding => binding.trim());

  if (hasDuplicateBindings(bindings.filter(Boolean))) {
    errors.push('Los nombres de binding y las variables deben ser únicos.');
  }

  options.kvNamespaces.forEach((binding, index) => {
    if (!bindingPattern.test(binding.binding.trim())) {
      errors.push(`KV ${index + 1}: el binding debe ir en MAYÚSCULAS con letras, números o guiones bajos.`);
    }
    if (!binding.id.trim()) {
      errors.push(`KV ${index + 1}: el namespace ID es obligatorio.`);
    }
  });

  options.d1Databases.forEach((binding, index) => {
    if (!bindingPattern.test(binding.binding.trim())) {
      errors.push(`D1 ${index + 1}: el binding debe ir en MAYÚSCULAS con letras, números o guiones bajos.`);
    }
    if (!binding.databaseId.trim()) {
      errors.push(`D1 ${index + 1}: el database ID es obligatorio.`);
    }
  });

  options.r2Buckets.forEach((binding, index) => {
    if (!bindingPattern.test(binding.binding.trim())) {
      errors.push(`R2 ${index + 1}: el binding debe ir en MAYÚSCULAS con letras, números o guiones bajos.`);
    }
    if (!binding.bucketName.trim()) {
      errors.push(`R2 ${index + 1}: el nombre del bucket es obligatorio.`);
    }
  });

  options.vars.forEach((variable, index) => {
    if (!bindingPattern.test(variable.key.trim())) {
      errors.push(`Variable ${index + 1}: el nombre debe ir en MAYÚSCULAS con letras, números o guiones bajos.`);
    }
  });

  return errors;
}

function tomlString(value: string) {
  return `"${value
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t')}"`;
}

/** Generates a deterministic wrangler.toml file. Never contacts Cloudflare. */
export function generateWranglerConfig(options: WranglerGeneratorOptions): string {
  const lines: string[] = [
    '# Generado con Woolhner DevToolkit',
    `name = ${tomlString(options.name.trim())}`,
    `main = ${tomlString(options.main.trim())}`,
    `compatibility_date = ${tomlString(options.compatibilityDate.trim())}`,
    `workers_dev = ${options.workersDev}`,
  ];

  if (options.route.trim()) {
    lines.push(`route = ${tomlString(options.route.trim())}`);
  }

  if (options.vars.length > 0) {
    lines.push('', '[vars]');
    options.vars.forEach(variable => lines.push(`${variable.key.trim()} = ${tomlString(variable.value)}`));
  }

  if (options.kvNamespaces.length > 0) {
    options.kvNamespaces.forEach((binding) => {
      lines.push('', '[[kv_namespaces]]', `binding = ${tomlString(binding.binding.trim())}`, `id = ${tomlString(binding.id.trim())}`);
    });
  }

  if (options.d1Databases.length > 0) {
    options.d1Databases.forEach((binding) => {
      lines.push(
        '',
        '[[d1_databases]]',
        `binding = ${tomlString(binding.binding.trim())}`,
        `database_name = ${tomlString(binding.databaseName.trim())}`,
        `database_id = ${tomlString(binding.databaseId.trim())}`,
      );
    });
  }

  if (options.r2Buckets.length > 0) {
    options.r2Buckets.forEach((binding) => {
      lines.push(
        '',
        '[[r2_buckets]]',
        `binding = ${tomlString(binding.binding.trim())}`,
        `bucket_name = ${tomlString(binding.bucketName.trim())}`,
      );
    });
  }

  return `${lines.join('\n')}\n`;
}
