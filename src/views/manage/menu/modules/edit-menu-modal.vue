<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { getMenuDetail, updateMenu } from '@/service/api';
import MenuOperateModal from '@/views/manage/menu/modules/menu-operate-modal.vue';
import { getLayoutAndPage, getPathParamFromRoutePath } from '@/views/manage/menu/modules/shared';

const emit = defineEmits<{ submitted: [] }>();

const { allPages, id } = defineProps<{
  allPages: string[];
  id: string;
}>();

const visible = defineModel<boolean>('visible', { default: false });

const menuDetail = ref<Api.SystemManage.Menu | null>();

const handleEditMenu = (menu: Partial<Api.SystemManage.Menu>) => {
  try {
    const { layout, page } = getLayoutAndPage(menu?.component);
    const { path, param } = getPathParamFromRoutePath(menu?.routePath as string);

    updateMenu(id, { ...menu, layout, page, routePath: path, pathParam: param });
    emit('submitted');
    visible.value = false;
    window.$message?.info('菜单更新成功');
  } catch {
    window.$message?.error('菜单更新失败');
  }
};

onMounted(async () => {
  const { data } = await getMenuDetail(id);
  menuDetail.value = data;
});
</script>

<template>
  <MenuOperateModal
    v-if="menuDetail"
    v-model:visible="visible"
    v-model:model="menuDetail"
    title="编辑菜单"
    :disabled-menu-type="true"
    :all-pages="allPages"
    @submitted="handleEditMenu"
  />
</template>

<style scoped></style>
