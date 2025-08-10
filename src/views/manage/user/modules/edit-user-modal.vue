<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { updateUser, userDetail } from '@/service/api/user';
import UserOperateModal from '@/views/manage/user/modules/user-operate-modal.vue';

interface Props {
  id: string;
}

const emit = defineEmits<{
  submitted: [];
}>();

const visible = defineModel<boolean>('visible', { required: true });

const { id } = defineProps<Props>();

const createDefaultDTO = (): Api.SystemManage.UserDTO => {
  return {
    deptId: '',
    email: '',
    enable: 'ENABLE',
    gender: null,
    homeRoleId: null,
    nickname: '',
    password: '',
    phone: '',
    roleIds: [],
    username: ''
  };
};

const model = ref<Api.SystemManage.UserDTO>(createDefaultDTO());

const handleSubmitted = async () => {
  await updateUser(id, model.value);
  visible.value = false;
  emit('submitted');
};

onMounted(async () => {
  const { data } = await userDetail(id);
  model.value = data || createDefaultDTO();
});
</script>

<template>
  <UserOperateModal
    v-model:model="model"
    v-model:visible="visible"
    :hidden-password="true"
    title="编辑用户"
    @submitted="handleSubmitted"
  />
</template>

<style scoped></style>
