<script setup lang="ts">
import { analyseCronExpressions, buildCronTriggerConfig } from '../cloudflare-cron-helper.service';
import { useCopy } from '@/composable/copy';

const { t } = useI18n();
const input = ref('*/5 * * * *\n0 9 * * 1-5');
const results = computed(() => analyseCronExpressions(input.value));
const validExpressions = computed(() => results.value.filter(result => result.valid).map(result => result.expression));
const snippet = computed(() => buildCronTriggerConfig(validExpressions.value));
const { copy, isJustCopied } = useCopy({
  source: snippet,
  text: t('tools.cloudflare-cron-helper.copied'),
});
</script>

<template>
  <c-card>
    <c-input-text
      v-model:value="input"
      :label="$t('tools.cloudflare-cron-helper.inputLabel')"
      multiline
      monospace
      :rows="6"
      test-id="cloudflare-cron-input"
    />
    <p class="hint">
      {{ $t('tools.cloudflare-cron-helper.hint') }}
    </p>
  </c-card>

  <c-card>
    <n-h3 mt-0>
      {{ $t('tools.cloudflare-cron-helper.results') }}
    </n-h3>
    <p v-if="results.length === 0" class="empty">
      {{ $t('tools.cloudflare-cron-helper.empty') }}
    </p>
    <div v-for="result in results" :key="result.expression" class="cron-result" :class="{ invalid: !result.valid }">
      <code>{{ result.expression }}</code>
      <span>{{ result.valid ? result.description : $t('tools.cloudflare-cron-helper.invalid') }}</span>
    </div>
  </c-card>

  <c-card>
    <div mb-3 flex items-center justify-between>
      <n-h3 mt-0>
        wrangler.toml
      </n-h3>
      <c-button :disabled="!snippet" @click="copy()">
        {{ isJustCopied ? $t('tools.cloudflare-cron-helper.copied') : $t('tools.cloudflare-cron-helper.copy') }}
      </c-button>
    </div>
    <c-input-text v-if="snippet" :value="snippet" readonly multiline monospace :rows="6" test-id="cloudflare-cron-output" />
    <p v-else class="empty">
      {{ $t('tools.cloudflare-cron-helper.noValidExpressions') }}
    </p>
  </c-card>
</template>

<style scoped>
.hint {
  color: var(--wh-text-muted);
  font-size: 12px;
  line-height: 1.6;
  margin: 12px 0 0;
}

.cron-result {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 8px;
  padding: 10px 0;
  border-bottom: 1px solid var(--wh-border);
  line-height: 1.5;
}

.cron-result:last-child {
  border-bottom: none;
}

.cron-result code {
  font-weight: 600;
  color: var(--wh-text);
}

.cron-result span {
  color: var(--wh-text-muted);
}

.cron-result.invalid span {
  color: var(--wh-text);
}

.empty {
  color: var(--wh-text-muted);
  margin: 8px 0;
}
</style>
