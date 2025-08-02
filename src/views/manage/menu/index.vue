<script setup lang="tsx">
import { ref } from 'vue';
import type { Ref } from 'vue';
import { NButton, NPopconfirm, NTag } from 'naive-ui';
import { useBoolean } from '@sa/hooks';
import { yesOrNoRecord } from '@/constants/common';
import { enableStatusRecord, menuTypeRecord } from '@/constants/business';
import { fetchGetMenuList } from '@/service/api';
import { useAppStore } from '@/store/modules/app';
import { useTable, useTableOperate } from '@/hooks/common/table';
import SvgIcon from '@/components/custom/svg-icon.vue';
import MenuOperateModal, { type OperateType } from './modules/menu-operate-modal.vue';
import EnableStatus = CommonType.EnableStatus;
import MenuType = Api.SystemManage.MenuType;

const appStore = useAppStore();

const { bool: visible, setTrue: openModal } = useBoolean();

const wrapperRef = ref<HTMLElement | null>(null);

const { columns, columnChecks, data, loading, pagination, getData, getDataByPage } = useTable({
  apiFn: fetchGetMenuList,
  apiParams: {
    current: 1,
    size: -1
  },
  columns: () => [
    {
      type: 'selection',
      align: 'center',
      width: 48
    },
    {
      key: 'id',
      title: 'ID',
      align: 'center',
      minWidth: 370
    },
    {
      key: 'type',
      title: '菜单类型',
      align: 'center',
      width: 80,
      render: row => {
        const tagMap: Record<Api.SystemManage.MenuType, NaiveUI.ThemeColor> = {
          dir: 'default',
          menu: 'primary'
        };

        const type = row.type as MenuType;
        const label = menuTypeRecord[type];

        return <NTag type={tagMap[type]}>{label}</NTag>;
      }
    },
    {
      key: 'name',
      title: '菜单名称',
      align: 'center',
      minWidth: 120,
      render: row => {
        const { name } = row;
        return <span>{name}</span>;
      }
    },
    {
      key: 'icon',
      title: '图标',
      align: 'center',
      width: 60,
      render: row => {
        const icon = row.iconType === 'iconify' ? row.icon : undefined;
        const localIcon = row.iconType === 'local' ? row.icon : undefined;

        return (
          <div class="flex-center">
            <SvgIcon icon={icon} localIcon={localIcon} class="text-icon" />
          </div>
        );
      }
    },
    {
      key: 'routeName',
      title: '路由名称',
      align: 'center',
      minWidth: 120
    },
    {
      key: 'path',
      title: '路由路径',
      align: 'center',
      minWidth: 120
    },
    {
      key: 'status',
      title: '菜单状态',
      align: 'center',
      width: 80,
      render: row => {
        if (row.status === null) {
          return null;
        }

        const tagMap: Record<CommonType.EnableStatus, NaiveUI.ThemeColor> = {
          enable: 'success',
          disable: 'warning'
        };
        const enableStatus = row.status;
        const label = enableStatusRecord[enableStatus];

        return <NTag type={tagMap[enableStatus]}>{label}</NTag>;
      }
    },
    {
      key: 'hideInMenu',
      title: '隐藏菜单',
      align: 'center',
      width: 80,
      render: row => {
        const hide: CommonType.YesOrNo = row.hideInMenu ? 'Y' : 'N';

        const tagMap: Record<CommonType.YesOrNo, NaiveUI.ThemeColor> = {
          Y: 'error',
          N: 'default'
        };

        const label = yesOrNoRecord[hide];

        return <NTag type={tagMap[hide]}>{label}</NTag>;
      }
    },
    {
      key: 'parentId',
      title: '父级菜单ID',
      width: 90,
      align: 'center'
    },
    {
      key: 'sort',
      title: '排序',
      align: 'center',
      width: 60
    },
    {
      key: 'operate',
      title: '操作',
      align: 'center',
      fixed: 'right',
      width: 230,
      render: row => (
        <div class="flex-center justify-end gap-8px">
          {row.type === 'dir' && (
            <NButton type="primary" ghost size="small" onClick={() => handleAddChildMenu(row)}>
              新增子菜单
            </NButton>
          )}
          <NButton type="primary" ghost size="small" onClick={() => handleEdit(row)}>
            编辑
          </NButton>
          <NPopconfirm onPositiveClick={() => handleDelete(row.id)}>
            {{
              default: () => '确认删除吗?',
              trigger: () => (
                <NButton type="error" ghost size="small">
                  删除
                </NButton>
              )
            }}
          </NPopconfirm>
        </div>
      )
    }
  ]
});

const { checkedRowKeys, onBatchDeleted, onDeleted } = useTableOperate(data, getData);

const operateType = ref<OperateType>('add');

function handleAdd() {
  operateType.value = 'add';
  openModal();
}

async function handleBatchDelete() {
  // request
  console.log(checkedRowKeys.value);

  onBatchDeleted();
}

function handleDelete(id: number) {
  // request
  console.log(id);

  onDeleted();
}

/** the edit menu data or the parent menu data when adding a child menu */
const editingData: Ref<Api.SystemManage.Menu | null> = ref(null);

function handleEdit(item: Api.SystemManage.Menu) {
  operateType.value = 'edit';
  editingData.value = { ...item };

  openModal();
}

function handleAddChildMenu(item: Api.SystemManage.Menu) {
  operateType.value = 'addChild';

  editingData.value = { ...item };

  openModal();
}

const allPages = ref<string[]>([]);

async function getAllPages() {
  // const { data: pages } = await fetchGetAllPages();
  // allPages.value = pages || [];
  allPages.value = [];
}

function init() {
  getAllPages();
}

// init
init();
</script>

<template>
  <div ref="wrapperRef" class="flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <NCard title="菜单列表" :bordered="false" size="small" class="card-wrapper sm:flex-1-hidden">
      <template #header-extra>
        <TableHeaderOperation
          v-model:columns="columnChecks"
          :disabled-delete="checkedRowKeys.length === 0"
          :loading="loading"
          @add="handleAdd"
          @delete="handleBatchDelete"
          @refresh="getData"
        />
      </template>
      <NDataTable
        v-model:checked-row-keys="checkedRowKeys"
        :columns="columns"
        :data="data"
        size="small"
        :flex-height="!appStore.isMobile"
        :scroll-x="1088"
        :loading="loading"
        :row-key="row => row.id"
        remote
        :pagination="pagination"
        class="sm:h-full"
      />
    </NCard>
  </div>
</template>

<style scoped></style>
