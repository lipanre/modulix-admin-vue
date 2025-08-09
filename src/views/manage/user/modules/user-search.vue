<script setup lang="ts">
const emit = defineEmits<{
  reset: [];
  search: [];
}>();

const model = defineModel<Api.SystemManage.UserQuery>('model', { required: true });

const handleReset = () => {
  emit('reset');
};

const handleSearch = () => {
  emit('search');
};
</script>

<template>
  <NCard>
    <NCollapse :default-expanded-names="['user-search']">
      <NCollapseItem title="搜索" name="user-search">
        <NForm :model="model" inline label-placement="left" label-width="80">
          <NGrid responsive="screen" item-responsive>
            <NFormItemGi span="24 s:12 m:8" label="用户名" path="username">
              <NInput v-model:value="model.username" placeholder="请输入用户名" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:8" label="昵称" path="nickname">
              <NInput v-model:value="model.nickname" placeholder="请输入用户昵称" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:8">
              <NFlex justify="end" class="w-full">
                <NButton @click="handleReset">
                  <template #icon>
                    <icon-ic-round-refresh class="text-icon" />
                  </template>
                  重置
                </NButton>
                <NButton ghost type="primary" @click="handleSearch">
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
