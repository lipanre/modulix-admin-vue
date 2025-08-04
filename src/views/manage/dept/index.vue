<script setup lang="tsx">
import { ref } from 'vue';
import { NButton, NPopconfirm } from 'naive-ui';
import { deleteDept, deptTree, listDept } from '@/service/api/dept';
import { useAppStore } from '@/store/modules/app';
import { useTable, useTableOperate } from '@/hooks/common/table';
import CreateDeptModal from '@/views/manage/dept/modules/create-dept-modal.vue';
import CreateChildModal from '@/views/manage/dept/modules/create-child-modal.vue';
import EditDeptModal from '@/views/manage/dept/modules/edit-dept-modal.vue';
import { useBoolean } from '~/packages/hooks';

const appStore = useAppStore();

const { bool: createModalVisible, setTrue: openCreateModal } = useBoolean();
const { bool: createChildModalVisible, setTrue: openCreateChildModal } = useBoolean();
const { bool: editModalVisible, setTrue: openEditModal } = useBoolean();

const wrapperRef = ref<HTMLElement | null>(null);

const { columns, columnChecks, loading, data, getData } = useTable({
  apiFn: deptTree,
  columns: () => [
    {
      type: 'selection'
    },
    {
      key: 'name',
      title: '部门名称',
      align: 'center',
      width: 150
    },
    {
      key: 'chargePerson',
      title: '负责人',
      align: 'center',
      width: 64
    },
    {
      key: 'phone',
      title: '联系电话',
      align: 'center',
      width: 100
    },
    {
      key: 'email',
      title: '邮箱',
      align: 'center',
      width: 100
    },
    {
      key: 'sort',
      title: '排序',
      align: 'center',
      width: 40
    },
    {
      key: 'createTime',
      title: '创建时间',
      align: 'center',
      width: 150
    },
    {
      key: 'modifyTime',
      title: '修改时间',
      align: 'center',
      width: 150
    },
    {
      key: 'operate',
      title: '操作',
      align: 'center',
      fixed: 'right',
      width: 200,
      render: row => {
        return (
          <NFlex>
            <NButton ghost type="primary" size="small" onClick={() => handleOpenChildModal(row.id)}>
              新增子部门
            </NButton>
            <NButton ghost type="primary" size="small" onClick={() => handleEdit(row.id)}>
              修改
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

const { checkedRowKeys, onBatchDeleted, onDeleted } = useTableOperate(data, getData);

const currentRowId = ref('');

const handleAdd = () => {
  openCreateModal();
};

const handleBatchDelete = async () => {
  await deleteDept(...checkedRowKeys.value);
  await onBatchDeleted();
};

const handleDelete = async (id: string) => {
  await deleteDept(id);
  await onDeleted();
};

const handleOpenChildModal = (id: string) => {
  currentRowId.value = id;
  openCreateChildModal();
};

const handleEdit = async (id: string) => {
  currentRowId.value = id;
  openEditModal();
};
</script>

<template>
  <div ref="wrapperRef" class="flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <NCard class="h-full card-wrapper" title="部门管理" :bordered="false" size="small">
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
        :loading="loading"
        :row-key="row => row.id"
        remote
        class="sm:h-full"
      />
      <CreateDeptModal v-if="createModalVisible" v-model:visible="createModalVisible" @submitted="getData" />
      <CreateChildModal
        v-if="createChildModalVisible"
        v-model:visible="createChildModalVisible"
        :parent-id="currentRowId"
        @submitted="getData"
      />
      <EditDeptModal
        v-if="editModalVisible"
        :id="currentRowId"
        v-model:visible="editModalVisible"
        @submitted="getData"
      />
    </NCard>
  </div>
</template>

<style scoped></style>
