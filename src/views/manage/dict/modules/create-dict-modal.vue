<script setup lang="ts">
import { ref } from 'vue';
import { createDict } from '@/service/api/dict';
import DictOperateModal from '@/views/manage/dict/modules/dict-operate-modal.vue';

const visible = defineModel<boolean>('visible', { required: true });

const emit = defineEmits<{
  submitted: [];
}>();

const model = ref<Api.SystemManage.DictDTO>({
  sort: 0,
  code: null,
  name: null,
  description: null
});

const handleCreateDict = async (dto: Api.SystemManage.DictDTO) => {
  await createDict(dto);
  emit('submitted');
  window.$message?.info('字典创建成功');
  visible.value = false;
};
</script>

<template>
  <DictOperateModal v-model:model="model" v-model:visible="visible" @submitted="handleCreateDict" />
</template>

<style scoped></style>
