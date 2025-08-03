<script setup lang="tsx">
import { ref } from 'vue';
import { NButton, NTag } from 'naive-ui';
import { deleteDict, pageDict } from '@/service/api/dict';
import { useDictStore } from '@/store/modules/dict';
import { useTable, useTableOperate } from '@/hooks/common/table';
import CreateDictModal from '@/views/manage/dict/modules/create-dict-modal.vue';
import EditDictModal from '@/views/manage/dict/modules/edit-dict-modal.vue';
import DictSearch from '@/views/manage/dict/modules/dict-search.vue';
import DictDetailDrawer from '@/views/manage/dict/modules/dict-detail-drawer.vue';
import { useBoolean } from '~/packages/hooks';

const dictStore = useDictStore();

const { bool: createModalVisible, setTrue: openCreateModal } = useBoolean();
const { bool: editModalVisible, setTrue: openEditModal } = useBoolean();
const { bool: dictDetailVisible, setTrue: openDictDetailDrawer } = useBoolean();

const { pagination, columns, columnChecks, loading, getData, data, getDataByPage, searchParams, resetSearchParams } =
  useTable({
    apiFn: pageDict,
    apiParams: {
      size: 10,
      current: 1,
      name: null,
      code: null
    },
    columns: () => [
      {
        type: 'selection',
        align: 'center',
        width: 48
      },
      {
        key: 'name',
        title: '字典名',
        align: 'center',
        width: 64,
        render: row => <NTag type="info">{row.name}</NTag>
      },
      {
        key: 'code',
        title: '字典编码',
        align: 'center',
        width: 100,
        render: row => <NTag type="success">{row.code}</NTag>
      },
      {
        key: 'sort',
        title: '排序',
        align: 'center',
        width: 100
      },
      {
        key: 'description',
        title: '字典描述',
        align: 'center',
        minWidth: 120
      },
      {
        key: 'createTime',
        title: '创建时间',
        align: 'center',
        minWidth: 120
      },
      {
        key: 'modifyTime',
        title: '修改时间',
        align: 'center',
        minWidth: 120
      },
      {
        key: 'operate',
        title: '操作',
        align: 'center',
        minWidth: 150,
        fixed: 'right',
        render: row => {
          return (
            <div>
              <NFlex>
                <NButton type="primary" ghost size="small" onClick={() => handleOpenDictDetailDrawer(row.id)}>
                  添加明细
                </NButton>
                <NButton type="primary" ghost size="small" onClick={() => handleEditDict(row.id)}>
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
            </div>
          );
        }
      }
    ]
  });

const { checkedRowKeys, onBatchDeleted, onDeleted } = useTableOperate(data, getData);

const handleCreateDict = () => {
  openCreateModal();
};

const currentRowId = ref('');

const handleEditDict = (id: string) => {
  currentRowId.value = id;
  openEditModal();
};

const handleDelete = async (id: string) => {
  await deleteDict(id);
  await onDeleted();
};

const handleBatchDelete = async () => {
  await deleteDict(...checkedRowKeys.value);
  await onBatchDeleted();
};

const handleOpenDictDetailDrawer = (id: string) => {
  currentRowId.value = id;
  openDictDetailDrawer();
};
</script>

<template>
  <div>
    <DictSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    <NCard title="字典列表" :bordered="false" size="small" class="mt-4 card-wrapper">
      <template #header-extra>
        <TableHeaderOperation
          v-model:columns="columnChecks"
          :loading="loading"
          :disabled-delete="checkedRowKeys.length === 0"
          @add="handleCreateDict"
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

    <CreateDictModal v-if="createModalVisible" v-model:visible="createModalVisible" @submitted="getDataByPage" />
    <EditDictModal
      v-if="editModalVisible"
      :id="currentRowId"
      v-model:visible="editModalVisible"
      @submitted="getDataByPage"
    />
    <DictDetailDrawer v-if="dictDetailVisible" v-model:visible="dictDetailVisible" :parent-id="currentRowId" />
  </div>
</template>

<style scoped></style>
