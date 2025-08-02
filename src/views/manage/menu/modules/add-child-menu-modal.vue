<script setup lang="ts">
import { ref, watch } from 'vue';
import { createMenu, getMenuDetail, updateMenu } from '@/service/api';
import MenuOperateModal from '@/views/manage/menu/modules/menu-operate-modal.vue';
import { createDefaultModel } from '@/views/manage/menu/modules/shared';
import type { Model } from '@/views/manage/menu/modules/typing';

const emit = defineEmits<{ submitted: [] }>();

const { allPages, parentId } = defineProps<{
  allPages: string[];
  parentId: string;
}>();

const visible = defineModel<boolean>({ default: false });

const menuDetail = ref<Api.SystemManage.Menu>(createDefaultModel());

const handleEditMenu = (menu: Partial<Api.SystemManage.Menu>) => {
  try {
    createMenu({ ...menu, parentId });
    emit('submitted');
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
    v-model:visible="visible"
    v-model:model="menuDetail"
    title="新增子菜单"
    operate-type="edit"
    :all-pages="allPages"
    @submitted="handleEditMenu"
  />
</template>

<style scoped></style>
