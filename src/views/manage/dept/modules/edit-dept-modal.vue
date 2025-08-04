<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getDeptDetail, updateDept } from '@/service/api/dept';
import DeptOperateModal from '@/views/manage/dept/modules/dept-operate-modal.vue';

const visible = defineModel<boolean>('visible', { required: true });
const { id } = defineProps<{
  id: string;
}>();
const emit = defineEmits<{
  submitted: [];
}>();
const model = ref<Api.SystemManage.DeptDTO>({
  name: null,
  sort: 0,
  chargePerson: null,
  phone: null,
  email: null
});

const handleSubmitted = async () => {
  await updateDept(id, model.value);
  emit('submitted');
  visible.value = false;
};

onMounted(async () => {
  const { data } = await getDeptDetail(id);
  model.value = data;
});
</script>

<template>
  <DeptOperateModal v-model:visible="visible" v-model:model="model" title="编辑部门" @submitted="handleSubmitted" />
</template>

<style scoped></style>
