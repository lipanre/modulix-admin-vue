<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { TreeSelectProps } from 'naive-ui';
import { deptTree } from '@/service/api/dept';

interface Props extends /* @vue-ignore */ TreeSelectProps {
  checkable?: boolean;
  labelField?: string;
  keyField?: string;
}

const deptTreeOption = ref<CommonType.TreeNode<Api.SystemManage.DeptVO>[]>([]);

const props = withDefaults(defineProps<Props>(), {
  checkable: true,
  labelField: 'name',
  keyField: 'id'
});

onMounted(async () => {
  const { data } = await deptTree();
  deptTreeOption.value = data || [];
});
</script>

<template>
  <NTreeSelect v-bind="props" :options="deptTreeOption" />
</template>

<style scoped></style>
