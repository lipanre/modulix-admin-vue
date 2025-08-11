<script setup lang="ts">
import { ref } from 'vue';
import { createMenu } from '@/service/api';
import MenuOperateModal from '@/views/manage/menu/modules/menu-operate-modal.vue';

const emit = defineEmits<{
  submitted: [];
}>();

const { allPages } = defineProps<{
  allPages: string[];
}>();

const visible = defineModel<boolean>('visible', { default: false });

const model = ref<Api.SystemManage.MenuDTO>({
  activeMenu: undefined,
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
  multiTab: undefined,
  page: '',
  parentId: 0,
  pathParam: '',
  query: [],
  routeName: '',
  routePath: '',
  sort: undefined,
  type: 'DIR'
});

/**
 * 创建菜单
 *
 * @param menu 菜单对象
 */
const handleCreateMenu = async (menu: Partial<Api.SystemManage.MenuDTO>) => {
  try {
    // 创建菜单
    await createMenu(menu);
    window.$message?.info('菜单创建成功');
    visible.value = false;
    emit('submitted');
  } catch {
    window.$message?.error('菜单创建失败');
  }
};
</script>

<template>
  <MenuOperateModal
    v-model:visible="visible"
    v-model:model="model"
    title="新增菜单"
    operate-type="add"
    :all-pages="allPages"
    @submitted="handleCreateMenu"
  />
</template>

<style scoped></style>
