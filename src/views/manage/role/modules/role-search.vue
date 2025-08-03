<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits<{
  reset: [];
  search: [];
}>();

const query = defineModel<Api.SystemManage.RoleQuery>('query', { required: true });

const reset = () => {
  emit('reset');
};

const search = () => {
  emit('search');
};
</script>

<template>
  <NCard :bordered="false" size="small" class="card-wrapper">
    <NCollapse :default-expanded-names="['role-search']">
      <NCollapseItem title="搜索" name="role-search">
        <NForm :model="query" inline label-width="80" label-placement="left">
          <NGrid responsive="screen" item-responsive>
            <NFormItemGi span="24 s:12 m:6" label="角色名称" path="name" class="pr-24px">
              <NInput v-model:value="query.name" placeholder="请输入角色名称" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="角色编码" path="code" class="pr-24px">
              <NInput v-model:value="query.code" placeholder="请输入角色编码" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="角色状态" path="status" class="pr-24px">
              <DictSelect v-model:value="query.status" code="ENABLE_STATUS" clearable placeholder="请选择角色状态" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" class="pr-24px">
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
