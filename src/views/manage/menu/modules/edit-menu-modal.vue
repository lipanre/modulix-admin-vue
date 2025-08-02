<script setup lang="ts">
import { ref, watch } from 'vue';
import { getMenuDetail, updateMenu } from '@/service/api';
import MenuOperateModal from '@/views/manage/menu/modules/menu-operate-modal.vue';
import { getLayoutAndPage, getPathParamFromRoutePath } from '@/views/manage/menu/modules/shared';

const emit = defineEmits<{ submitted: [] }>();

const { allPages, id } = defineProps<{
  allPages: string[];
  id: string;
}>();

const visible = defineModel<boolean>({ default: false });

const menuDetail = ref<Api.SystemManage.Menu | null>(null);

const handleEditMenu = (menu: Partial<Api.SystemManage.Menu>) => {
  try {
    const { layout, page } = getLayoutAndPage(menuDetail.value?.component);
    const { path, param } = getPathParamFromRoutePath(menuDetail.value?.routePath);

    updateMenu(id, { ...menu, layout, page, routePath: path, pathParam: param });
    emit('submitted');
    window.$message?.info('菜单更新成功');
  } catch {
    window.$message?.error('菜单更新失败');
  }
};

watch(visible, async value => {
  if (!value) return;
  const { data } = await getMenuDetail(id);
  menuDetail.value = data;
});
</script>

<template>
  <MenuOperateModal
    v-model:visible="visible"
    v-model:model="menuDetail"
    title="编辑菜单"
    operate-type="edit"
    :all-pages="allPages"
    @submitted="handleEditMenu"
  />
</template>

<style scoped></style>
