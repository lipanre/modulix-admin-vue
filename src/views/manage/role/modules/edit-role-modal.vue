<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getRoleDetail, updateRole } from '@/service/api';
import RoleOperateModal from '@/views/manage/role/modules/role-operate-modal.vue';

const { id } = defineProps<{
  id: string;
}>();

const emit = defineEmits<{
  submitted: [];
}>();

const visible = defineModel<boolean>('visible', { required: true });

const model = ref<Api.SystemManage.RoleDTO>({});

const handleSubmitted = async () => {
  await updateRole(id, model.value);
  emit('submitted');
  visible.value = false;
};

onMounted(async () => {
  const { data } = await getRoleDetail(id);
  model.value = data;
});
</script>

<template>
  <RoleOperateModal v-model:visible="visible" v-model:model="model" title="编辑角色" @submitted="handleSubmitted" />
</template>

<style scoped></style>
