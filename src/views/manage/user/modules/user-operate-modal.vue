<script setup lang="tsx">
import { ref, watchEffect } from 'vue';
import type { SelectOption } from 'naive-ui';
import { listRole } from '@/service/api';

const model = defineModel<Api.SystemManage.UserDTO>('model', { required: true });
const visible = defineModel<boolean>('visible', { required: true });
const { title, hiddenPassword = false } = defineProps<{
  title: string;
  hiddenPassword?: boolean;
}>();

const emit = defineEmits<{
  submitted: [];
}>();

const homeOptions = ref<SelectOption[]>([]);

const changeVisible = (value: boolean) => {
  visible.value = value;
};

const submit = () => {
  emit('submitted');
};

watchEffect(async () => {
  if (!model.value.roleIds?.length) {
    homeOptions.value = [];
    model.value.homeRoleId = null;
    return;
  }
  const { data } = await listRole({ ids: model.value.roleIds });
  if (!data) return;
  homeOptions.value = [];
  data.forEach(role => {
    homeOptions.value.push({
      label: role.name,
      value: role.id
    });
  });
  if (!homeOptions.value.find(item => item.value === model.value.homeRoleId)) {
    model.value.homeRoleId = null;
  }
});
</script>

<template>
  <NModal v-model:show="visible" :title="title" preset="card" class="w-600px">
    <NForm :model="model" label-placement="left" :label-width="70">
      <NGrid responsive="screen" item-responsive>
        <NFormItemGi span="24" label="部门" path="deptId">
          <DeptTreeSelect v-model:value="model.deptId" placeholder="请选择所属部门" />
        </NFormItemGi>
        <NFormItemGi span="24 s:12" label="用户名" path="username">
          <NInput v-model:value="model.username" placeholder="请输入用户名" />
        </NFormItemGi>
        <NFormItemGi span="24 s:12" label="昵称" path="nickname">
          <NInput v-model:value="model.nickname" placeholder="请输入用户昵称" />
        </NFormItemGi>
        <NFormItemGi v-if="!hiddenPassword" span="24" label="密码" path="password">
          <NInput
            v-model:value="model.password"
            type="password"
            show-password-on="click"
            placeholder="请输入帐号密码"
          />
        </NFormItemGi>
        <NFormItemGi span="24" label="角色" path="roleIds">
          <RoleSelect v-model:value="model.roleIds" placeholder="请选择用户角色" multiple />
        </NFormItemGi>
        <NFormItemGi span="24" label="首页角色" path="homeRoleId">
          <NSelect v-model:value="model.homeRoleId" :options="homeOptions" placeholder="请选择用户首页所属角色" />
        </NFormItemGi>
        <NFormItemGi span="24 s:12" label="性别" path="gender">
          <DictSelect v-model:value="model.gender" code="GENDER" placeholder="请选择性别" />
        </NFormItemGi>
        <NFormItemGi span="24 s:12" label="状态" path="enable">
          <DictSelect v-model:value="model.enable" code="ENABLE_STATUS" placeholder="请选择状态" />
        </NFormItemGi>
        <NFormItemGi span="24 s:12" label="联系电话" path="phone">
          <NInput v-model:value="model.phone" placeholder="请输入联系电话" />
        </NFormItemGi>
        <NFormItemGi span="24 s:12" label="邮箱" path="email">
          <NInput v-model:value="model.email" placeholder="请输入邮箱" />
        </NFormItemGi>
      </NGrid>
    </NForm>

    <template #footer>
      <NFlex justify="end" :size="16">
        <NButton ghost @click="changeVisible(false)">取消</NButton>
        <NButton ghost type="primary" @click="submit">确认</NButton>
      </NFlex>
    </template>
  </NModal>
</template>

<style scoped></style>
