<script setup lang="ts">
import { validateWranglerConfig } from '../wrangler-config-validator.service';

const input = ref('name = "api"\nmain = "src/index.ts"\ncompatibility_date = "2026-01-01"\n');
const result = computed(() => validateWranglerConfig(input.value));
const errorCount = computed(() => result.value.issues.filter(issue => issue.level === 'error').length);
const warningCount = computed(() => result.value.issues.filter(issue => issue.level === 'warning').length);
</script>

<template>
  <c-card>
    <c-input-text
      v-model:value="input"
      :label="$t('tools.wrangler-config-validator.configLabel')"
      :placeholder="$t('tools.wrangler-config-validator.configPlaceholder')"
      multiline
      monospace
      :rows="14"
      test-id="wrangler-validator-input"
    />
    <p class="hint">
      {{ $t('tools.wrangler-config-validator.privacyNote') }}
    </p>
  </c-card>

  <c-card>
    <n-h3 mt-0>
      {{ $t('tools.wrangler-config-validator.results') }}
    </n-h3>

    <div class="summary">
      <span>{{ $t('tools.wrangler-config-validator.format') }}: <strong>{{ result.format }}</strong></span>
      <span v-if="result.workerName">
        {{ $t('tools.wrangler-config-validator.worker') }}: <strong>{{ result.workerName }}</strong>
      </span>
      <span>{{ $t('tools.wrangler-config-validator.errors') }}: <strong>{{ errorCount }}</strong></span>
      <span>{{ $t('tools.wrangler-config-validator.warnings') }}: <strong>{{ warningCount }}</strong></span>
    </div>

    <n-alert v-if="result.issues.length === 0" type="success" :show-icon="false">
      {{ $t('tools.wrangler-config-validator.valid') }}
    </n-alert>

    <ul v-else class="issues">
      <li v-for="(issue, index) in result.issues" :key="index" :class="issue.level">
        <strong>{{ issue.level === 'error' ? $t('tools.wrangler-config-validator.error') : $t('tools.wrangler-config-validator.warning') }}</strong>
        {{ issue.message }}
      </li>
    </ul>
  </c-card>
</template>

<style scoped>
.hint {
  color: var(--wh-text-muted);
  font-size: 12px;
  line-height: 1.6;
  margin: 12px 0 0;
}

.summary {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 20px;
  margin-bottom: 16px;
  font-size: 13px;
  color: var(--wh-text-muted);
}

.summary strong {
  color: var(--wh-text);
}

.issues {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.issues li {
  border: 1px solid var(--wh-border);
  border-left-width: 3px;
  border-radius: 4px;
  padding: 10px 12px;
  line-height: 1.5;
  color: var(--wh-text-muted);
}

.issues li.error {
  border-left-color: var(--wh-text);
}

.issues li.warning {
  border-left-color: var(--wh-border-strong);
}

.issues li strong {
  color: var(--wh-text);
  margin-right: 8px;
}
</style>
