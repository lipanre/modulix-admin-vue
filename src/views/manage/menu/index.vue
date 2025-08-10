<script setup lang="tsx">
import { ref } from 'vue';
import { NButton, NPopconfirm, NTag } from 'naive-ui';
import { useBoolean } from '@sa/hooks';
import { yesOrNoRecord } from '@/constants/common';
import { enableStatusRecord, menuTypeRecord } from '@/constants/business';
import { batchDeleteMenu, deleteMenu, fetchGetMenuList, listPage } from '@/service/api';
import { useAppStore } from '@/store/modules/app';
import { useTable, useTableOperate } from '@/hooks/common/table';
import SvgIcon from '@/components/custom/svg-icon.vue';
import AddMenuModal from '@/views/manage/menu/modules/add-menu-modal.vue';
import EditMenuModal from '@/views/manage/menu/modules/edit-menu-modal.vue';
import AddChildMenuModal from '@/views/manage/menu/modules/add-child-menu-modal.vue';

const appStore = useAppStore();

const { bool: addVisible, setTrue: openAddModal } = useBoolean();
const { bool: addChildVisible, setTrue: openAddChildModal } = useBoolean();
const { bool: editVisible, setTrue: openEditModal } = useBoolean();

const wrapperRef = ref<HTMLElement | null>(null);

const { columns, columnChecks, data, loading, getData, getDataByPage } = useTable({
  apiFn: fetchGetMenuList,
  apiParams: {
    // current: 1,
    // size: -1
  },
  columns: () => [
    {
      type: 'selection',
      align: 'center',
      width: 48
    },
    {
      key: 'id',
      align: 'center',
      width: 20,
      render: _ => <div></div>
    },
    {
      key: 'type',
      title: '菜单类型',
      align: 'center',
      width: 80,
      render: row => {
        const tagMap: Record<Api.SystemManage.MenuType, NaiveUI.ThemeColor> = {
          DIR: 'default',
          MENU: 'primary'
        };

        const type = row.type as Api.SystemManage.MenuType;
        const label = menuTypeRecord[type];

        return <NTag type={tagMap[type]}>{label}</NTag>;
      }
    },
    {
      key: 'label',
      title: '菜单名称',
      align: 'center',
      minWidth: 120,
      render: row => {
        const { label } = row;
        return <span>{label}</span>;
      }
    },
    {
      key: 'icon',
      title: '图标',
      align: 'center',
      width: 60,
      render: row => {
        const icon = row.iconType === 'ICONIFY' ? row.icon : undefined;
        const localIcon = row.iconType === 'LOCAL' ? row.icon : undefined;

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
      minWidth: 90
    },
    {
      key: 'routePath',
      title: '路由路径',
      align: 'center',
      minWidth: 80
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
          ENABLE: 'success',
          DISABLE: 'warning'
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
          {row.type === 'DIR' && (
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

function handleAdd() {
  openAddModal();
}

async function handleBatchDelete() {
  // request
  await batchDeleteMenu(checkedRowKeys.value);
  await onBatchDeleted();
}

async function handleDelete(id: string) {
  // request
  await deleteMenu(id);
  await onDeleted();
}

const currentRowId = ref<string>('');

function handleEdit(item: Api.SystemManage.MenuDTO) {
  currentRowId.value = item.id;
  openEditModal();
}

function handleAddChildMenu(item: Api.SystemManage.MenuDTO) {
  currentRowId.value = item.id;
  openAddChildModal();
}

const allPages = ref<string[]>([]);

async function getAllPages() {
  const { data: pages } = await listPage();
  allPages.value = pages || [];
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
        class="sm:h-full"
      />

      <!--   新增菜单   -->
      <AddMenuModal v-if="addVisible" v-model:visible="addVisible" :all-pages="allPages" @submitted="getDataByPage" />
      <!--   新增子菜单   -->
      <AddChildMenuModal
        v-else-if="addChildVisible"
        v-model:visible="addChildVisible"
        :all-pages="allPages"
        :parent-id="currentRowId"
        @submitted="getDataByPage"
      />
      <!--   编辑菜单   -->
      <EditMenuModal
        v-else-if="editVisible"
        :id="currentRowId"
        v-model:visible="editVisible"
        :all-pages="allPages"
        @submitted="getDataByPage"
      />
    </NCard>
  </div>
</template>

<style scoped></style>
