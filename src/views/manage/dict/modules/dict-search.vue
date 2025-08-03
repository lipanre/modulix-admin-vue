<script setup lang="tsx">
import { ref } from 'vue';
import { useNaiveForm } from '@/hooks/common/form';

const { formRef } = useNaiveForm();

const emit = defineEmits<{
  reset: [];
  search: [query: Api.SystemManage.DictQuery];
}>();

const model = defineModel<Api.SystemManage.DictQuery>('model', { required: true });

const reset = async () => {
  emit('reset');
};

const search = async () => {
  emit('search');
};
</script>

<template>
  <NCard :bordered="false" size="small" class="card-wrapper">
    <NCollapse :expanded-names="['dict-search']">
      <NCollapseItem title="搜索" name="dict-search">
        <NForm ref="formRef" inline :model="model" label-width="80" label-placement="left">
          <NGrid responsive="screen" item-responsive>
            <NFormItemGi span="24 s:12 m:8" label="字典名" path="name">
              <NInput v-model:value="model.name" placeholder="请输入字典名" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:8" label="字典编码" path="code">
              <NInput v-model:value="model.code" placeholder="请输入字典编码" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:8">
              <NFlex justify="end" class="w-full">
                <NButton @click="reset">
                  <template #icon>
                    <icon-ic-round-refresh class="text-icon" />
                  </template>
                  重置
                </NButton>
                <NButton ghost type="primary" @click="search">
                  <template #icon>
                    <icon-ic-round-search class="text-icon" />
                  </template>
                  搜索
                </NButton>
              </NFlex>
            </NFormItemGi>
          </NGrid>
        </NForm>
      </NCollapseItem>
    </NCollapse>
  </NCard>
</template>

<style scoped></style>
