<script setup lang="ts">
import { computed, ref } from 'vue';
import type { SelectOption } from 'naive-ui';
import { useDictStore } from '@/store/modules/dict';

type Props = {
  code: string;
} & SelectOption;

const dictStore = useDictStore();

const model = defineModel<CommonType.EnableStatus>('value', { required: true });

const { code, ...selectProps } = defineProps<Props>();

const options = computed(() => dictStore.dictOptions(code));
</script>

<template>
  <NSelect v-model:value="model" v-bind="selectProps" :options="options"></NSelect>
</template>

<style scoped></style>
