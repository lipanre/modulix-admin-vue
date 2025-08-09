<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { SelectProps } from 'naive-ui';
import { listRole } from '@/service/api';

interface Props extends /* @vue-ignore */ SelectProps {
  labelField?: string;
  valueField?: string;
}

const props = withDefaults(defineProps<Props>(), {
  labelField: 'name',
  valueField: 'id'
});

const roleOptions = ref<Api.Common.CommonRecord<Api.SystemManage.RoleVO>[]>([]);

onMounted(async () => {
  const { data } = await listRole();
  roleOptions.value = data || [];
});
</script>

<template>
  <NSelect v-bind="props" :options="roleOptions" labe />
</template>

<style scoped></style>
