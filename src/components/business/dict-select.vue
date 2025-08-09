<script setup lang="ts">
import { computed } from 'vue';
import type { SelectProps } from 'naive-ui';
import { useDictStore } from '@/store/modules/dict';

interface Props extends /* @vue-ignore */ SelectProps {
  code: string;
}

const dictStore = useDictStore();

const { code, ...selectProps } = defineProps<Props>();

const options = computed(() => dictStore.dictOptions(code));
</script>

<template>
  <NSelect v-bind="selectProps" :options="options"></NSelect>
</template>

<style scoped></style>
