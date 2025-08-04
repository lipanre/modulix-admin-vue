<script setup lang="ts">
import { ref } from 'vue';
import { createDept } from '@/service/api/dept';
import CreateDeptModal from '@/views/manage/dept/modules/create-dept-modal.vue';
import DeptOperateModal from '@/views/manage/dept/modules/dept-operate-modal.vue';

const { parentId } = defineProps<{
  parentId: string;
}>();

const visible = defineModel<boolean>('visible', { required: true });

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
  await createDept({ ...model.value, parentId });
  emit('submitted');
  visible.value = false;
};
</script>

<template>
  <DeptOperateModal v-model:model="model" v-model:visible="visible" title="新增子部门" @submitted="handleSubmitted" />
</template>

<style scoped></style>
