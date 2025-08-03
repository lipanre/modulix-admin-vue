<script setup lang="tsx">
import { ref } from 'vue';
import { NButton } from 'naive-ui';
import { deleteRole, pageRole } from '@/service/api';
import { useDictStore } from '@/store/modules/dict';
import { useCommonStore } from '@/store/modules/common';
import { useTable, useTableOperate } from '@/hooks/common/table';
import RoleSearch from '@/views/manage/role/modules/role-search.vue';
import CreateRoleModal from '@/views/manage/role/modules/create-role-modal.vue';
import EditRoleModal from '@/views/manage/role/modules/edit-role-modal.vue';
import { useBoolean } from '~/packages/hooks';

const { bool: createModalVisible, setTrue: openCreateModal } = useBoolean();
const { bool: editModalVisible, setTrue: openEditModal } = useBoolean();

const dictStore = useDictStore();
const { enableTagTypeMap } = useCommonStore();

const { columns, data, getData, getDataByPage, searchParams, resetSearchParams, loading, pagination, columnChecks } =
  useTable({
    apiFn: pageRole,
    apiParams: {
      current: 1,
      size: 10,
      name: null,
      code: null,
      status: null
    },
    columns: () => [
      {
        type: 'selection',
        align: 'center',
        width: 48
      },
      {
        key: 'name',
        title: '角色名',
        align: 'center',
        width: 64
      },
      {
        key: 'code',
        title: '角色编码',
        align: 'center',
        width: 64
      },
      {
        key: 'dataScope',
        title: '数据权限',
        align: 'center',
        width: 64,
        render: row => {
          return <NTag type="primary">{dictStore.dictLabel('DATA_SCOPE', row.dataScope)}</NTag>;
        }
      },
      {
        key: 'status',
        title: '角色状态',
        align: 'center',
        width: 64,
        render: row => {
          return <NTag type={enableTagTypeMap[row.status]}>{dictStore.dictLabel('ENABLE_STATUS', row.status)}</NTag>;
        }
      },
      {
        key: 'description',
        title: '角色描述',
        align: 'center',
        width: 64
      },
      {
        key: 'createTime',
        title: '创建时间',
        align: 'center',
        width: 100
      },
      {
        key: 'modifyTime',
        title: '修改时间',
        align: 'center',
        width: 100
      },
      {
        key: 'operate',
        title: '操作',
        align: 'center',
        width: 100,
        render: row => {
          return (
            <NFlex>
              <NButton type="primary" ghost size="small" onClick={() => handleEdit(row.id)}>
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
            </NFlex>
          );
        }
      }
    ]
  });

const { checkedRowKeys, onDeleted, onBatchDeleted } = useTableOperate(data, getData);

const handleDelete = async (id: string) => {
  await deleteRole(id);
  await onDeleted();
};

const handleBatchDelete = async () => {
  await deleteRole(...checkedRowKeys);
  await onBatchDeleted();
};

const currentRowId = ref<string>('');

const handleEdit = async (id: string) => {
  currentRowId.value = id;
  openEditModal();
};

const handleAddRole = () => {
  openCreateModal();
};
</script>

<template>
  <div>
    <RoleSearch v-model:query="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    <NCard title="角色列表" :bordered="false" size="small" class="mt-4 card-wrapper">
      <template #header-extra>
        <TableHeaderOperation
          v-model:columns="columnChecks"
          :loading="loading"
          :disabled-delete="checkedRowKeys.length === 0"
          @add="handleAddRole"
          @delete="handleBatchDelete"
          @refresh="getData"
        />
      </template>
      <NDataTable
        v-model:checked-row-keys="checkedRowKeys"
        :columns="columns"
        :data="data"
        size="small"
        :loading="loading"
        :row-key="row => row.id"
        :pagination="pagination"
      />
    </NCard>

    <CreateRoleModal v-if="createModalVisible" v-model:visible="createModalVisible" @submitted="getDataByPage" />
    <EditRoleModal
      v-if="editModalVisible"
      :id="currentRowId"
      v-model:visible="editModalVisible"
      @submitted="getDataByPage"
    />
  </div>
</template>

<style scoped></style>
