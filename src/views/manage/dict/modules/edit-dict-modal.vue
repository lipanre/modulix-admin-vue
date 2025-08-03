<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getDictDetail, updateDict } from '@/service/api/dict';
import DictOperateModal from '@/views/manage/dict/modules/dict-operate-modal.vue';

const visible = defineModel<boolean>('visible', { required: true });

const { id } = defineProps<{
  id: string;
}>();

const emit = defineEmits<{
  submitted: [];
}>();

const model = ref<Api.SystemManage.DictDTO>({
  sort: 0,
  code: null,
  name: null,
  description: null
});

const handleUpdate = async (dto: Api.SystemManage.DictDTO) => {
  await updateDict(id, dto);
  emit('submitted');
  window.$message?.info('字典更新成功');
  visible.value = false;
};

onMounted(async () => {
  // 查询字典详情
  const { data } = await getDictDetail(id);
  model.value = data;
});
</script>

<template>
  <DictOperateModal v-model:model="model" v-model:visible="visible" @submitted="handleUpdate" />
</template>

<style scoped></style>
