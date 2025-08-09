<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { userDetail } from '@/service/api/user';
import UserOperateModal from '@/views/manage/user/modules/user-operate-modal.vue';

interface Props {
  id: string;
}

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

onMounted(async () => {
  const { data } = await userDetail(id);
  model.value = data || createDefaultDTO();
});
</script>

<template>
  <UserOperateModal v-model:model="model" v-model:visible="visible" :hidden-password="true" title="编辑用户" />
</template>

<style scoped></style>
