<script setup lang="ts">
import { ref, watch } from 'vue';
import { createMenu, getMenuDetail } from '@/service/api';
import MenuOperateModal from '@/views/manage/menu/modules/menu-operate-modal.vue';
import { createDefaultModel } from '@/views/manage/menu/modules/shared';

const emit = defineEmits<{ submitted: [] }>();

const { allPages, parentId } = defineProps<{
  allPages: string[];
  parentId: string;
}>();

const visible = defineModel<boolean>('visible', { default: false });

const menuDetail = ref<Api.SystemManage.MenuDTO | null>({
  activeMenu: undefined,
  buttons: [],
  children: undefined,
  component: '',
  constant: undefined,
  deleteButtonIds: [],
  fixedIndexInTab: undefined,
  hideInMenu: undefined,
  href: undefined,
  i18nKey: undefined,
  icon: '',
  iconType: 'ICONIFY',
  keepAlive: undefined,
  label: '',
  layout: '',
  multiTab: undefined,
  page: '',
  parentId,
  pathParam: '',
  query: [],
  routeName: '',
  routePath: '',
  sort: undefined,
  status: undefined,
  type: 'DIR'
});

const handleEditMenu = (menu: Partial<Api.SystemManage.MenuDTO>) => {
  try {
    createMenu({ ...menu, parentId });
    emit('submitted');
    visible.value = false;
    window.$message?.info('子菜单添加成功');
  } catch {
    window.$message?.error('子菜单添加失败');
  }
};

watch(visible, async value => {
  if (!value) return;
  const { data } = await getMenuDetail(parentId);
  menuDetail.value = data;
});
</script>

<template>
  <MenuOperateModal
    v-if="menuDetail"
    v-model:visible="visible"
    v-model:model="menuDetail"
    title="新增子菜单"
    operate-type="edit"
    :all-pages="allPages"
    @submitted="handleEditMenu"
  />
</template>

<style scoped></style>
