<script setup lang="ts">
import { ref } from 'vue';
import { createUser } from '@/service/api/user';
import UserOperateModal from '@/views/manage/user/modules/user-operate-modal.vue';

const emit = defineEmits<{
  submitted: [];
}>();
const visible = defineModel<boolean>('visible', { required: true });

const model = ref<Api.SystemManage.UserDTO>({
  deptId: '',
  email: '',
  enable: 'ENABLE',
  gender: null,
  homeRoleId: '',
  nickname: '',
  password: '',
  phone: '',
  username: '',
  roleIds: []
});

const handleSubmit = async () => {
  await createUser(model.value);
  visible.value = false;
  emit('submitted');
};
</script>

<template>
  <UserOperateModal v-model:visible="visible" v-model:model="model" title="新增用户" @submitted="handleSubmit" />
</template>

<style scoped></style>
