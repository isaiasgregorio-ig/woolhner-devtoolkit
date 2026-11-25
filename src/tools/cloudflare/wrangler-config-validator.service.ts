import { parse as parseToml } from 'iarna-toml-esm';
import JSON5 from 'json5';

export interface WranglerConfigIssue {
  level: 'error' | 'warning'
  message: string
}

export interface WranglerConfigValidation {
  format: 'toml' | 'json' | 'unknown'
  issues: WranglerConfigIssue[]
  workerName?: string
}

const workerNamePattern = /^[a-z0-9][a-z0-9_-]*$/;
const bindingPattern = /^[A-Z][A-Z0-9_]*$/;
const secretLikeKey = /(secret|token|password|api[_-]?key|private[_-]?key)/i;

function isValidDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function parseConfig(input: string): { format: 'toml' | 'json' | 'unknown'; value?: Record<string, unknown>; error?: string } {
  const trimmed = input.trim();
  if (!trimmed) {
    return { format: 'unknown', error: 'La configuración está vacía.' };
  }

  if (trimmed.startsWith('{')) {
    try {
      // JSON5 accepts the comments used by wrangler.jsonc files.
      const value = JSON5.parse(trimmed);
      if (typeof value !== 'object' || value === null || Array.isArray(value)) {
        return { format: 'json', error: 'El JSON debe contener un objeto en la raíz.' };
      }
      return { format: 'json', value: value as Record<string, unknown> };
    }
    catch (error) {
      return { format: 'json', error: `JSON no válido: ${(error as Error).message}` };
    }
  }

  try {
    const value = parseToml(trimmed);
    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
      return { format: 'toml', error: 'El TOML debe contener una tabla en la raíz.' };
    }
    return { format: 'toml', value: value as Record<string, unknown> };
  }
  catch (error) {
    return { format: 'toml', error: `TOML no válido: ${(error as Error).message}` };
  }
}

function validateBindingArray(
  value: unknown,
  label: string,
  requiredFields: string[],
  issues: WranglerConfigIssue[],
  bindings: string[],
) {
  if (value === undefined) {
    return;
  }
  if (!Array.isArray(value)) {
    issues.push({ level: 'error', message: `${label} debe ser una lista de tablas.` });
    return;
  }

  value.forEach((entry, index) => {
    if (typeof entry !== 'object' || entry === null) {
      issues.push({ level: 'error', message: `${label}[${index}] no es una tabla válida.` });
      return;
    }

    const record = entry as Record<string, unknown>;
    requiredFields.forEach((field) => {
      if (typeof record[field] !== 'string' || !String(record[field]).trim()) {
        issues.push({ level: 'error', message: `${label}[${index}].${field} es obligatorio.` });
      }
    });

    const binding = record.binding;
    if (typeof binding === 'string' && binding.trim()) {
      if (!bindingPattern.test(binding.trim())) {
        issues.push({ level: 'error', message: `${label}[${index}].binding debe ir en MAYÚSCULAS.` });
      }
      bindings.push(binding.trim());
    }
  });
}

/** Validates a pasted wrangler.toml / wrangler.jsonc-shaped config entirely in the browser. */
export function validateWranglerConfig(input: string): WranglerConfigValidation {
  const parsed = parseConfig(input);
  if (!parsed.value) {
    return {
      format: parsed.format,
      issues: [{ level: 'error', message: parsed.error ?? 'No se pudo analizar la configuración.' }],
    };
  }

  const config = parsed.value;
  const issues: WranglerConfigIssue[] = [];

  if (typeof config.name !== 'string' || !config.name.trim()) {
    issues.push({ level: 'error', message: 'Falta el campo name.' });
  }
  else if (!workerNamePattern.test(config.name.trim())) {
    issues.push({ level: 'error', message: 'name debe usar minúsculas, números, guiones o guiones bajos.' });
  }

  if (typeof config.main !== 'string' || !config.main.trim()) {
    issues.push({ level: 'error', message: 'Falta el campo main (punto de entrada del Worker).' });
  }

  if (typeof config.compatibility_date !== 'string' || !isValidDate(config.compatibility_date)) {
    issues.push({ level: 'error', message: 'compatibility_date debe ser una fecha válida AAAA-MM-DD.' });
  }

  const bindings: string[] = [];
  validateBindingArray(config.kv_namespaces, 'kv_namespaces', ['binding', 'id'], issues, bindings);
  validateBindingArray(config.d1_databases, 'd1_databases', ['binding', 'database_id'], issues, bindings);
  validateBindingArray(config.r2_buckets, 'r2_buckets', ['binding', 'bucket_name'], issues, bindings);

  if (config.vars !== undefined) {
    if (typeof config.vars !== 'object' || config.vars === null || Array.isArray(config.vars)) {
      issues.push({ level: 'error', message: 'vars debe ser una tabla de clave/valor.' });
    }
    else {
      const vars = config.vars as Record<string, unknown>;
      Object.entries(vars).forEach(([key, value]) => {
        if (!bindingPattern.test(key)) {
          issues.push({ level: 'error', message: `vars.${key} debe ir en MAYÚSCULAS.` });
        }
        if (typeof value !== 'string') {
          issues.push({ level: 'warning', message: `vars.${key} no es una cadena; Wrangler lo convertirá.` });
        }
        if (secretLikeKey.test(key)) {
          issues.push({ level: 'warning', message: `vars.${key} parece un secreto; usa wrangler secret put en su lugar.` });
        }
        bindings.push(key);
      });
    }
  }

  if (new Set(bindings).size !== bindings.length) {
    issues.push({ level: 'error', message: 'Hay nombres de binding duplicados.' });
  }

  const hasCronTriggers = typeof config.triggers === 'object'
    && config.triggers !== null
    && Array.isArray((config.triggers as Record<string, unknown>).crons)
    && ((config.triggers as Record<string, unknown>).crons as unknown[]).length > 0;
  const routes = config.routes;
  const hasRoutes = Array.isArray(routes) ? routes.length > 0 : Boolean(typeof config.route === 'string' && config.route.trim());

  if (config.workers_dev === false && !hasRoutes && !hasCronTriggers) {
    issues.push({ level: 'warning', message: 'workers_dev está desactivado y no hay rutas ni disparadores cron.' });
  }

  return {
    format: parsed.format,
    issues,
    workerName: typeof config.name === 'string' ? config.name : undefined,
  };
}
