<script setup lang="ts">
import { ref } from 'vue';
import { createRole } from '@/service/api';
import RoleOperateModal from '@/views/manage/role/modules/role-operate-modal.vue';

const emit = defineEmits<{
  submitted: [];
}>();

const visible = defineModel<boolean>('visible', { required: true });
const model = ref<Api.SystemManage.RoleDTO>({
  name: null,
  code: null,
  description: null,
  dataScope: 'DEPT',
  home: 'home',
  status: 'ENABLE'
});

const handleSubmitted = async () => {
  await createRole(model.value);
  emit('submitted');
  window.$message?.info('角色创建成功');
  visible.value = false;
};
</script>

<template>
  <RoleOperateModal v-model:visible="visible" v-model:model="model" title="新增角色" @submitted="handleSubmitted" />
</template>

<style scoped></style>
