<script setup lang="tsx">
import { computed, onMounted, ref } from 'vue';
import { listDict, upsetDictDetail } from '@/service/api/dict';
import SvgIcon from '@/components/custom/svg-icon.vue';

const visible = defineModel<boolean>('visible', { required: true });
const { parentId } = defineProps<{
  parentId: string;
}>();

const details = ref<Api.SystemManage.DictDTO[]>([]);
const removeIds = ref<string[]>([]);

const colorPickerLabel = () => <SvgIcon icon="pepicons-pop:hash" />;

const onCreate = () => {
  const dto: Api.SystemManage.DictDTO = createDefaultDictDetail();
  details.value.push(dto);
  return dto;
};

const onRemove = (value: Api.SystemManage.DictDTO, callback: () => any) => {
  details.value = details.value.filter(detail => detail !== value);
  if (value.id) {
    removeIds.value.push(value.id);
  }
  callback();
};

const createDefaultDictDetail = (): Api.SystemManage.DictDTO => {
  return {
    sort: 0,
    name: '',
    code: '',
    description: ''
  };
};

const closeDrawer = () => {
  visible.value = false;
};

const submit = async () => {
  details.value.forEach((detail, index) => {
    detail.parentId = parentId;
    detail.sort = index;
  });
  await upsetDictDetail(removeIds.value, details.value);
  window.$message?.info('操作成功');
  closeDrawer();
};

onMounted(async () => {
  const { data } = await listDict({ parentId });
  details.value = data ?? [];
});
</script>

<template>
  <NDrawer v-model:show="visible" :width="500">
    <NDrawerContent title="字典明细" closable>
      <NDynamicInput v-model:value="details" :on-create="onCreate" preset="pair">
        <template #create-button-default>添加字典明细</template>
        <template #default="{ value }">
          <NFlex justify="between" :wrap="false">
            <NInput v-model:value="value.name" :style="{ backgroundColor: value.color }" placeholder="字典明细名" />
            <NInput v-model:value="value.code" :style="{ backgroundColor: value.color }" placeholder="字典明细编码">
              <template #suffix>
                <NColorPicker v-model:value="value.color" :modes="['hex']" :render-label="colorPickerLabel" />
              </template>
            </NInput>
          </NFlex>
        </template>
        <template #action="{ index, create, remove, value }">
          <NFlex justify="end" :wrap="false" class="ml-2">
            <NButton size="medium" :style="{ backgroundColor: value.color }" @click="() => create(index)">
              <icon-ic-round-plus class="text-icon" />
            </NButton>
            <NButton
              size="medium"
              :style="{ backgroundColor: value.color }"
              @click="onRemove(value, () => remove(index))"
            >
              <icon-ic-round-remove class="text-icon" />
            </NButton>
          </NFlex>
        </template>
      </NDynamicInput>

      <template #footer>
        <NFlex justify="end">
          <NButton ghost @click="closeDrawer">取消</NButton>
          <NButton type="primary" ghost @click="submit">确认</NButton>
        </NFlex>
      </template>
    </NDrawerContent>
  </NDrawer>
</template>

<style scoped>
:deep(.n-input__suffix) {
  opacity: 0;
}
</style>
