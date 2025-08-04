<script setup lang="ts">
import FormRule = App.Global.FormRule;
import { useFormRules, useNaiveForm } from '@/hooks/common/form';

const visible = defineModel<boolean>('visible', { required: true });

const model = defineModel<Api.SystemManage.DeptDTO>('model', { required: true });

const { title } = defineProps<{
  title: string;
}>();

const emit = defineEmits<{
  submitted: [];
}>();

const {
  defaultRequiredRule,
  patternRules: { phone, email }
} = useFormRules();

const { formRef, validate } = useNaiveForm();

const rules: Record<keyof typeof model.value, FormRule> = {
  name: defaultRequiredRule,
  email,
  phone
};

const changeVisible = (value: boolean) => {
  visible.value = value;
};

const submit = async () => {
  await validate();
  emit('submitted');
};
</script>

<template>
  <NModal v-model:show="visible" :title="title" preset="card" class="w-800px">
    <NForm ref="formRef" :model="model" :rules="rules" label-placement="left" label-width="80">
      <NGrid responsive="screen" item-responsive>
        <NFormItemGi span="24 s:12" label="部门名称" class="pr-24px" path="name">
          <NInput v-model:value="model.name" placeholder="请输入部门名称" />
        </NFormItemGi>
        <NFormItemGi span="24 s:12" label="显示排序" class="pr-24px" path="sort">
          <NInputNumber v-model:value="model.sort" placeholder="显示排序" />
        </NFormItemGi>
        <NFormItemGi span="24 s:12" label="负责人" class="pr-24px" path="chargePerson">
          <NInput v-model:value="model.chargePerson" placeholder="请输入部门负责人" />
        </NFormItemGi>
        <NFormItemGi span="24 s:12" label="联系电话" class="pr-24px" path="phone">
          <NInput v-model:value="model.phone" placeholder="请输入联系电话" />
        </NFormItemGi>
        <NFormItemGi span="24 s:12" label="邮箱" class="pr-24px" path="email">
          <NInput v-model:value="model.email" placeholder="请输入邮箱" />
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
