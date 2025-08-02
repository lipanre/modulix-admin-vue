<script setup lang="tsx">
import { computed, watch } from 'vue';
import type { SelectOption } from 'naive-ui';
import { enableStatusOptions, menuIconTypeOptions, menuTypeOptions } from '@/constants/business';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { getLocalIcons } from '@/utils/icon';
import SvgIcon from '@/components/custom/svg-icon.vue';
import { layoutOptions } from '@/views/manage/menu/modules/typing';
import {
  createDefaultModel,
  getRoutePathByRouteName,
  getRoutePathWithParam,
  transformLayoutAndPageToComponent
} from './shared';

interface Props {
  /** all pages */
  allPages: string[];
  /** 标题 **/
  title: string;
  /** 关闭菜单类型选项 **/
  disabledMenuType?: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  submitted: [Partial<Api.SystemManage.Menu>];
}>();

const visible = defineModel<boolean>('visible', {
  default: false
});
const model = defineModel<Api.SystemManage.Menu>('model', { required: true });

const { formRef, validate, restoreValidation } = useNaiveForm();
const { defaultRequiredRule } = useFormRules();

type RuleKey = Extract<keyof Api.SystemManage.Menu, 'label' | 'status' | 'routeName' | 'routePath'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  label: defaultRequiredRule,
  status: defaultRequiredRule,
  routeName: defaultRequiredRule,
  routePath: defaultRequiredRule
};

const localIcons = getLocalIcons();
const localIconOptions = localIcons.map<SelectOption>(item => ({
  label: () => (
    <div class="flex-y-center gap-16px">
      <SvgIcon localIcon={item} class="text-icon" />
      <span>{item}</span>
    </div>
  ),
  value: item
}));

const showLayout = computed(() => model.value.parentId === '0');

const showPage = computed(() => model.value.type === 'menu');

const pageOptions = computed(() => {
  const allPages = [...props.allPages];

  if (model.value.routeName && !allPages.includes(model.value.routeName)) {
    allPages.unshift(model.value.routeName);
  }

  const opts: CommonType.Option[] = allPages.map(page => ({
    label: page,
    value: page
  }));

  return opts;
});

function handleInitModel() {
  model.value = createDefaultModel();

  if (!model.value.query) {
    model.value.query = [];
  }
  if (!model.value.buttons) {
    model.value.buttons = [];
  }
}

function closeDrawer() {
  visible.value = false;
}

function handleUpdateRoutePathByRouteName() {
  if (model.value.routeName) {
    model.value.routePath = getRoutePathByRouteName(model.value.routeName);
  } else {
    model.value.routePath = '';
  }
}

function handleUpdateI18nKeyByRouteName() {
  if (model.value.routeName) {
    model.value.i18nKey = `route.${model.value.routeName}` as App.I18n.I18nKey;
  } else {
    model.value.i18nKey = null;
  }
}

function handleCreateButton() {
  const buttonItem: Api.SystemManage.MenuButton = {
    code: '',
    desc: ''
  };
  return buttonItem;
}

function getSubmitParams() {
  const { layout, page, pathParam, ...params } = model.value;

  const component = transformLayoutAndPageToComponent(layout!, page);
  const routePath = getRoutePathWithParam(model.value.routePath, pathParam);

  params.component = component;
  params.routePath = routePath;

  return params;
}

async function handleSubmit() {
  await validate();
  const params = getSubmitParams();
  emit('submitted', params);
}

watch(visible, () => {
  if (visible.value) {
    handleInitModel();
    restoreValidation();
  }
});

watch(
  () => model.value.routeName,
  () => {
    handleUpdateRoutePathByRouteName();
    handleUpdateI18nKeyByRouteName();
  }
);
</script>

<template>
  <NModal v-model:show="visible" :title="props.title" preset="card" class="w-800px">
    <NScrollbar class="h-480px pr-20px">
      <NForm ref="formRef" :model="model" :rules="rules" label-placement="left" :label-width="100">
        <NGrid responsive="screen" item-responsive>
          <NFormItemGi span="24 m:12" label="菜单类型" path="type">
            <NRadioGroup v-model:value="model.type" :disabled="props.disabledMenuType">
              <NRadio v-for="item in menuTypeOptions" :key="item.value" :value="item.value" :label="item.label" />
            </NRadioGroup>
          </NFormItemGi>
          <NFormItemGi span="24 m:12" label="菜单名称" path="label">
            <NInput v-model:value="model.label" placeholder="请输入菜单名称" />
          </NFormItemGi>
          <NFormItemGi span="24 m:12" label="路由名称" path="routeName">
            <NInput v-model:value="model.routeName" placeholder="请输入路由名称" />
          </NFormItemGi>
          <NFormItemGi span="24 m:12" label="路由路径" path="routePath">
            <NInput v-model:value="model.routePath" disabled placeholder="请输入路由路径" />
          </NFormItemGi>
          <NFormItemGi span="24 m:12" label="路径参数" path="pathParam">
            <NInput v-model:value="model.pathParam" placeholder="请输入路由参数" />
          </NFormItemGi>
          <NFormItemGi v-if="showLayout" span="24 m:12" label="布局" path="layout">
            <NSelect v-model:value="model.layout" :options="layoutOptions" placeholder="请选择布局" />
          </NFormItemGi>
          <NFormItemGi v-if="showPage" span="24 m:12" label="页面组件" path="page">
            <NSelect v-model:value="model.page" :options="pageOptions" placeholder="请选择页面组件" />
          </NFormItemGi>
          <NFormItemGi span="24 m:12" label="国际化key" path="i18nKey">
            <NInput v-model:value="model.i18nKey" placeholder="请输入国际化key" />
          </NFormItemGi>
          <NFormItemGi span="24 m:12" label="排序" path="order">
            <NInputNumber v-model:value="model.sort" class="w-full" placeholder="请输入排序号" />
          </NFormItemGi>
          <NFormItemGi span="24 m:12" label="图标类型" path="iconType">
            <NRadioGroup v-model:value="model.iconType">
              <NRadio v-for="item in menuIconTypeOptions" :key="item.value" :value="item.value" :label="item.label" />
            </NRadioGroup>
          </NFormItemGi>
          <NFormItemGi span="24 m:12" label="图标" path="icon">
            <template v-if="model.iconType === 'iconify'">
              <NInput v-model:value="model.icon" placeholder="请输入图标" class="flex-1">
                <template #suffix>
                  <SvgIcon v-if="model.icon" :icon="model.icon" class="text-icon" />
                </template>
              </NInput>
            </template>
            <template v-if="model.iconType === 'local'">
              <NSelect v-model:value="model.icon" placeholder="请选择本地图标" :options="localIconOptions" />
            </template>
          </NFormItemGi>
          <NFormItemGi span="24 m:12" label="菜单状态" path="status">
            <NRadioGroup v-model:value="model.status">
              <NRadio v-for="item in enableStatusOptions" :key="item.value" :value="item.value" :label="item.label" />
            </NRadioGroup>
          </NFormItemGi>
          <NFormItemGi span="24 m:12" label="缓存路由" path="keepAlive">
            <NRadioGroup v-model:value="model.keepAlive">
              <NRadio :value="true" label="是" />
              <NRadio :value="false" label="否" />
            </NRadioGroup>
          </NFormItemGi>
          <NFormItemGi span="24 m:12" label="常量路由" path="constant">
            <NRadioGroup v-model:value="model.constant">
              <NRadio :value="true" label="是" />
              <NRadio :value="false" label="否" />
            </NRadioGroup>
          </NFormItemGi>
          <NFormItemGi span="24 m:12" label="外链" path="href">
            <NInput v-model:value="model.href" placeholder="请输入外链" />
          </NFormItemGi>
          <NFormItemGi span="24 m:12" label="隐藏菜单" path="hideInMenu">
            <NRadioGroup v-model:value="model.hideInMenu">
              <NRadio :value="true" label="是" />
              <NRadio :value="false" label="否" />
            </NRadioGroup>
          </NFormItemGi>
          <NFormItemGi v-if="model.hideInMenu" span="24 m:12" label="高亮的菜单" path="activeMenu">
            <NSelect
              v-model:value="model.activeMenu"
              :options="pageOptions"
              clearable
              placeholder="请选择高亮的菜单的路由名称"
            />
          </NFormItemGi>
          <NFormItemGi span="24 m:12" label="支持多页签" path="multiTab">
            <NRadioGroup v-model:value="model.multiTab">
              <NRadio :value="true" label="是" />
              <NRadio :value="false" label="否" />
            </NRadioGroup>
          </NFormItemGi>
          <NFormItemGi span="24 m:12" label="固定在页签中的序号" path="fixedIndexInTab">
            <NInputNumber
              v-model:value="model.fixedIndexInTab"
              class="w-full"
              clearable
              placeholder="请输入固定在页签中的序号"
            />
          </NFormItemGi>
          <NFormItemGi span="24" label="路由参数">
            <NDynamicInput
              v-model:value="model.query"
              preset="pair"
              key-placeholder="请输入路由参数key"
              value-placeholder="请输入路由参数value"
            >
              <template #action="{ index, create, remove }">
                <NSpace class="ml-12px">
                  <NButton size="medium" @click="() => create(index)">
                    <icon-ic-round-plus class="text-icon" />
                  </NButton>
                  <NButton size="medium" @click="() => remove(index)">
                    <icon-ic-round-remove class="text-icon" />
                  </NButton>
                </NSpace>
              </template>
            </NDynamicInput>
          </NFormItemGi>
          <NFormItemGi span="24" label="按钮">
            <NDynamicInput v-model:value="model.buttons" :on-create="handleCreateButton">
              <template #default="{ value }">
                <div class="ml-8px flex-y-center flex-1 gap-12px">
                  <NInput v-model:value="value.code" placeholder="请输入按钮编码" class="flex-1" />
                  <NInput v-model:value="value.desc" placeholder="请输入按钮描述" class="flex-1" />
                </div>
              </template>
              <template #action="{ index, create, remove }">
                <NSpace class="ml-12px">
                  <NButton size="medium" @click="() => create(index)">
                    <icon-ic-round-plus class="text-icon" />
                  </NButton>
                  <NButton size="medium" @click="() => remove(index)">
                    <icon-ic-round-remove class="text-icon" />
                  </NButton>
                </NSpace>
              </template>
            </NDynamicInput>
          </NFormItemGi>
        </NGrid>
      </NForm>
    </NScrollbar>
    <template #footer>
      <NSpace justify="end" :size="16">
        <NButton @click="closeDrawer">取消</NButton>
        <NButton type="primary" @click="handleSubmit">确认</NButton>
      </NSpace>
    </template>
  </NModal>
</template>

<style scoped></style>
