<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import type { SelectGroupOption, SelectOption } from 'naive-ui';
import { fetchGetMenuList, listPage, listPageButton } from '@/service/api';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';

const visible = defineModel<boolean>('visible', { required: true });
const model = defineModel<Api.SystemManage.RoleDTO>('model', { required: true });
const emit = defineEmits<{
  submitted: [];
}>();

const { title } = defineProps<{
  title: string;
}>();

const pages = ref<SelectOption[]>([]);

const menuTree = ref<Api.SystemManage.MenuVO[]>([]);
const pageButtonsOptions = ref<SelectGroupOption[]>([]);

const { formRef, validate } = useNaiveForm();
const { defaultRequiredRule } = useFormRules();

const rules: Record<keyof typeof model.value, App.Global.FormRule> = {
  name: defaultRequiredRule,
  code: defaultRequiredRule,
  status: defaultRequiredRule
};

const changeVisible = (value: boolean) => {
  visible.value = value;
};

const submit = async () => {
  await validate();
  emit('submitted');
};

const loadPages = async () => {
  const { data } = await listPage();
  pages.value =
    data?.map(page => ({
      label: page,
      value: page
    })) || [];
};

const loadPageTree = async () => {
  const { data } = await fetchGetMenuList();
  menuTree.value = data || [];
};

const loadPageButtons = async (menuIds: string[]) => {
  const { data } = await listPageButton({ menuIds });
  model.value.buttonIds =
    data
      ?.flatMap(menuButton => menuButton.buttons)
      .map(button => button.id)
      .filter(id => model.value.buttonIds?.includes(id)) || [];
  pageButtonsOptions.value = data?.map(transformGroupOption) || [];
};

const transformGroupOption = (pageButton: Api.SystemManage.MenuButtonVO): SelectGroupOption => {
  return {
    type: 'group',
    name: pageButton.menuName,
    buttons: pageButton.buttons
  };
};

const init = async () => {
  await Promise.all([loadPages(), loadPageTree()]);
};

watch(
  () => model.value.menuIds,
  async value => {
    await loadPageButtons(value);
  }
);

onMounted(async () => {
  await init();
});
</script>

<template>
  <NModal v-model:show="visible" :title="title" preset="card" class="w-600px">
    <NForm ref="formRef" :model="model" :rules="rules" label-width="85" label-placement="left">
      <NGrid responsive="screen" item-responsive>
        <NFormItemGi label="角色名" path="name" span="24 s:12" class="pr-24px">
          <NInput v-model:value="model.name" placeholder="请输入角色名" />
        </NFormItemGi>
        <NFormItemGi label="角色编码" path="code" span="24 s:12" class="pr-24px">
          <NInput v-model:value="model.code" placeholder="请输入角色编码" />
        </NFormItemGi>
        <NFormItemGi label="启用状态" path="status" span="24 s:12" class="pr-24px">
          <DictSelect v-model:value="model.status" code="ENABLE_STATUS" placeholder="请输入选择状态" />
        </NFormItemGi>
        <NFormItemGi label="数据权限" path="dataScope" span="24 s:12" class="pr-24px">
          <DictSelect v-model:value="model.dataScope" code="DATA_SCOPE" />
        </NFormItemGi>
        <NFormItemGi v-if="model.dataScope === 'CUSTOMIZE'" label="自定义部门" span="24" class="pr-24px"></NFormItemGi>
        <NFormItemGi label="首页" path="home" span="24 s:12" class="pr-24px">
          <NSelect v-model:value="model.home" :options="pages" />
        </NFormItemGi>
        <NFormItemGi label="菜单权限" span="24" class="pr-24px">
          <NTreeSelect
            v-model:value="model.menuIds"
            :options="menuTree"
            multiple
            clearable
            cascade
            checkable
            filterable
            :clear-filter-after-select="false"
            label-field="label"
            key-field="id"
            children-field="children"
            placeholder="请选择角色的菜单权限"
          />
        </NFormItemGi>

        <NFormItemGi label="按钮权限" span="24" class="pr-24px">
          <NSelect
            v-model:value="model.buttonIds"
            multiple
            clearable
            filterable
            children-field="buttons"
            label-field="name"
            value-field="id"
            :options="pageButtonsOptions"
          />
        </NFormItemGi>
        <NFormItemGi span="24" label="角色描述">
          <NInput v-model:value="model.description" type="textarea" placeholder="请输入角色描述" />
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
