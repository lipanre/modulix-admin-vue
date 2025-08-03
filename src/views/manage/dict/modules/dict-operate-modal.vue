<script setup lang="tsx">
import { ref } from 'vue';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';

const formRules = useFormRules();

const emit = defineEmits<{
  submitted: [model: Api.SystemManage.DictDTO];
}>();

const model = defineModel<Api.SystemManage.DictDTO>('model', {
  required: true
});
const visible = defineModel<boolean>('visible', { required: true });

const { formRef, validate } = useNaiveForm();

const rules: Record<keyof typeof model.value, App.Global.FormRule> = {
  sort: formRules.defaultRequiredRule,
  code: formRules.defaultRequiredRule,
  name: formRules.defaultRequiredRule
};

const changeVisible = (value: boolean) => {
  visible.value = value;
};

const submit = async () => {
  await validate();
  emit('submitted', model.value);
};
</script>

<template>
  <NModal v-model:show="visible" preset="card" :mask-closable="false" class="w-800px">
    <NForm ref="formRef" :rules="rules" :model="model" label-placement="left" :label-width="100">
      <NGrid responsive="screen" item-responsive>
        <NFormItemGi span="24 m:12" label="字典名称" path="name">
          <NInput v-model:value="model.name" placeholder="请输入字典名称" />
        </NFormItemGi>
        <NFormItemGi span="24 m:12" label="字典编码" path="code">
          <NInput v-model:value="model.code" placeholder="请输入字典编码" />
        </NFormItemGi>
        <NFormItemGi span="24 m:12" label="排序" path="sort">
          <NInputNumber v-model:value="model.sort" class="w-full" placeholder="请输入字典排序号" />
        </NFormItemGi>
        <NFormItemGi span="24" label="描述" path="description">
          <NInput
            v-model:value="model.description"
            type="textarea"
            placeholder="请输入字典描述"
            rows="5"
            show-count
            maxlength="200"
          />
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
