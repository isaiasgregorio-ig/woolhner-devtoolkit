<script setup lang="ts">
import {
  emptyWranglerGeneratorOptions,
  generateWranglerConfig,
  validateWranglerGeneratorOptions,
} from '../wrangler-config-generator.service';
import { useCopy } from '@/composable/copy';

const { t } = useI18n();
const form = reactive(emptyWranglerGeneratorOptions());

const errors = computed(() => validateWranglerGeneratorOptions(form));
const config = computed(() => (errors.value.length === 0 ? generateWranglerConfig(form) : ''));
const { copy, isJustCopied } = useCopy({
  source: config,
  text: t('tools.wrangler-config-generator.copied'),
});

function addKv() {
  form.kvNamespaces.push({ binding: '', id: '' });
}
function addD1() {
  form.d1Databases.push({ binding: '', databaseName: '', databaseId: '' });
}
function addR2() {
  form.r2Buckets.push({ binding: '', bucketName: '' });
}
function addVar() {
  form.vars.push({ key: '', value: '' });
}
</script>

<template>
  <c-card>
    <n-form :show-feedback="false" label-placement="top">
      <n-form-item :label="$t('tools.wrangler-config-generator.workerName')">
        <c-input-text v-model:value="form.name" test-id="wrangler-name" />
      </n-form-item>
      <n-form-item :label="$t('tools.wrangler-config-generator.entrypoint')">
        <c-input-text v-model:value="form.main" test-id="wrangler-main" />
      </n-form-item>
      <n-form-item :label="$t('tools.wrangler-config-generator.compatibilityDate')">
        <c-input-text v-model:value="form.compatibilityDate" placeholder="2026-01-01" test-id="wrangler-date" />
      </n-form-item>
      <n-form-item>
        <n-switch v-model:value="form.workersDev" />
        <span ml-3>workers_dev</span>
      </n-form-item>
      <n-form-item :label="$t('tools.wrangler-config-generator.route')">
        <c-input-text v-model:value="form.route" placeholder="api.example.com/*" test-id="wrangler-route" />
      </n-form-item>
    </n-form>
  </c-card>

  <c-card>
    <n-h3 mt-0>
      {{ $t('tools.wrangler-config-generator.bindings') }}
    </n-h3>

    <div v-for="(binding, index) in form.kvNamespaces" :key="`kv-${index}`" class="binding-row">
      <c-input-text v-model:value="binding.binding" :label="$t('tools.wrangler-config-generator.binding')" placeholder="CACHE" />
      <c-input-text v-model:value="binding.id" :label="$t('tools.wrangler-config-generator.namespaceId')" />
      <c-button variant="text" :aria-label="$t('tools.wrangler-config-generator.remove')" @click="form.kvNamespaces.splice(index, 1)">
        ×
      </c-button>
    </div>
    <c-button size="small" @click="addKv">
      + KV
    </c-button>

    <div v-for="(binding, index) in form.d1Databases" :key="`d1-${index}`" class="binding-row">
      <c-input-text v-model:value="binding.binding" :label="$t('tools.wrangler-config-generator.binding')" placeholder="DB" />
      <c-input-text v-model:value="binding.databaseName" :label="$t('tools.wrangler-config-generator.databaseName')" />
      <c-input-text v-model:value="binding.databaseId" :label="$t('tools.wrangler-config-generator.databaseId')" />
      <c-button variant="text" :aria-label="$t('tools.wrangler-config-generator.remove')" @click="form.d1Databases.splice(index, 1)">
        ×
      </c-button>
    </div>
    <c-button size="small" @click="addD1">
      + D1
    </c-button>

    <div v-for="(binding, index) in form.r2Buckets" :key="`r2-${index}`" class="binding-row">
      <c-input-text v-model:value="binding.binding" :label="$t('tools.wrangler-config-generator.binding')" placeholder="ASSETS" />
      <c-input-text v-model:value="binding.bucketName" :label="$t('tools.wrangler-config-generator.bucketName')" />
      <c-button variant="text" :aria-label="$t('tools.wrangler-config-generator.remove')" @click="form.r2Buckets.splice(index, 1)">
        ×
      </c-button>
    </div>
    <c-button size="small" @click="addR2">
      + R2
    </c-button>

    <div v-for="(variable, index) in form.vars" :key="`var-${index}`" class="binding-row">
      <c-input-text v-model:value="variable.key" :label="$t('tools.wrangler-config-generator.variableName')" placeholder="MODE" />
      <c-input-text v-model:value="variable.value" :label="$t('tools.wrangler-config-generator.value')" />
      <c-button variant="text" :aria-label="$t('tools.wrangler-config-generator.remove')" @click="form.vars.splice(index, 1)">
        ×
      </c-button>
    </div>
    <c-button size="small" @click="addVar">
      + {{ $t('tools.wrangler-config-generator.variable') }}
    </c-button>

    <p class="hint">
      {{ $t('tools.wrangler-config-generator.secretHint') }}
    </p>
  </c-card>

  <c-card>
    <div mb-3 flex items-center justify-between>
      <n-h3 mt-0>
        wrangler.toml
      </n-h3>
      <c-button :disabled="!config" @click="copy()">
        {{ isJustCopied ? $t('tools.wrangler-config-generator.copied') : $t('tools.wrangler-config-generator.copy') }}
      </c-button>
    </div>

    <n-alert v-if="errors.length > 0" type="error" :show-icon="false">
      <ul m-0 pl-5>
        <li v-for="error in errors" :key="error">
          {{ error }}
        </li>
      </ul>
    </n-alert>
    <c-input-text v-else :value="config" readonly multiline monospace :rows="14" test-id="wrangler-output" />
  </c-card>
</template>

<style scoped>
.binding-row {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 8px;
  margin: 12px 0;
}

.binding-row > :deep(*) {
  flex: 1 1 140px;
}

.binding-row > :deep(button) {
  flex: 0 0 auto;
}

.hint {
  color: var(--wh-text-muted);
  font-size: 12px;
  line-height: 1.6;
  margin: 16px 0 0;
}
</style>
