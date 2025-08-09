<script setup lang="tsx">
import { onMounted, ref, watch } from 'vue';
import type { TreeProps } from 'naive-ui';
import { deptTree } from '@/service/api/dept';

interface Props extends Omit</* @vue-ignore */ TreeProps, 'selectedKeys' | 'pattern'> {
  labelField?: string;
  keyField?: string;
  showIrrelevantNodes?: boolean;
}

const emit = defineEmits<{
  selected: [deptIds: string[]];
}>();

const searchPattern = ref<string>();

const props = withDefaults(defineProps<Props>(), {
  labelField: 'name',
  keyField: 'id',
  showIrrelevantNodes: false
});

const deptTreeNodes = ref<CommonType.TreeNode<Api.SystemManage.DeptVO>[]>();

const selectedKeys = ref<string[]>([]);

const resetSelectedKeys = () => {
  selectedKeys.value = [];
};

onMounted(async () => {
  const { data } = await deptTree();
  if (data) {
    deptTreeNodes.value = data;
  }
});

watch(selectedKeys, value => {
  emit('selected', value);
});

defineExpose({
  resetSelectedKeys
});
</script>

<template>
  <NFlex vertical size="medium">
    <NInput v-model:value="searchPattern" placeholder="请输入部门名称" />
    <NTree v-model:selected-keys="selectedKeys" v-bind="props" :pattern="searchPattern" :data="deptTreeNodes" />
  </NFlex>
</template>

<style scoped></style>
