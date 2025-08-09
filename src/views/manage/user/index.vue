<script setup lang="tsx">
import { ref, useTemplateRef } from 'vue';
import { NButton, NPopconfirm } from 'naive-ui';
import { deleteUser, pageUser } from '@/service/api/user';
import { useDictStore } from '@/store/modules/dict';
import { useTable, useTableOperate } from '@/hooks/common/table';
import UserDeptTree from '@/views/manage/user/modules/user-dept-tree.vue';
import UserSearch from '@/views/manage/user/modules/user-search.vue';
import CreateUserModal from '@/views/manage/user/modules/create-user-modal.vue';
import EditUserModal from '@/views/manage/user/modules/edit-user-modal.vue';
import { useBoolean } from '~/packages/hooks';

const dictStore = useDictStore();
const { bool: createUserModalVisible, setTrue: openCreateUserModel } = useBoolean();
const { bool: editUserModalVisible, setTrue: openEditUserModal } = useBoolean();

const { columns, data, getData, loading, pagination, columnChecks, getDataByPage, searchParams, resetSearchParams } =
  useTable({
    apiFn: pageUser,
    apiParams: {
      current: 1,
      size: 10,
      username: null,
      nickname: null,
      deptId: null
    },
    columns: () => [
      {
        type: 'selection',
        align: 'center',
        minWidth: 40,
        fixed: 'left'
      },
      {
        key: 'nickname',
        align: 'center',
        title: '昵称',
        minWidth: 10
      },
      {
        key: 'username',
        align: 'center',
        title: '用户名',
        minWidth: 40
      },
      {
        key: 'deptName',
        align: 'center',
        title: '部门名称',
        minWidth: 100
      },
      {
        key: 'gender',
        title: '性别',
        align: 'center',
        minWidth: 30,
        render: row => {
          return (
            <NTag color={{ color: dictStore.dictColor('GENDER', row.gender) }}>
              {dictStore.dictLabel('GENDER', row.gender)}
            </NTag>
          );
        }
      },
      {
        key: 'enable',
        title: '启用状态',
        align: 'center',
        minWidth: 100,
        render: row => {
          return (
            <NTag color={{ color: dictStore.dictColor('ENABLE_STATUS', row.enable) }}>
              {dictStore.dictLabel('ENABLE_STATUS', row.enable)}
            </NTag>
          );
        }
      },
      {
        key: 'createTime',
        title: '创建时间',
        align: 'center',
        minWidth: 100
      },
      {
        key: 'modifyTime',
        title: '修改时间',
        align: 'center',
        minWidth: 100
      },
      {
        key: 'operate',
        title: '操作',
        align: 'center',
        minWidth: 100,
        fixed: 'right',
        render: row => {
          return (
            <NFlex>
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
            </NFlex>
          );
        }
      }
    ]
  });

const { checkedRowKeys, onDeleted, onBatchDeleted } = useTableOperate(data, getData);

const handleDelete = async (id: string) => {
  await deleteUser(id);
  await onDeleted();
};

const handleBatchDelete = async () => {
  await deleteUser(...checkedRowKeys.value);
  await onBatchDeleted();
};

const handleAdd = async () => {
  openCreateUserModel();
};

const currentUserId = ref<string>('');

const handleEdit = (user: Api.SystemManage.UserVO) => {
  currentUserId.value = user.id;
  openEditUserModal();
};

const handleSelectedDept = (ids: string[]) => {
  searchParams.deptId = ids ? ids[0] : undefined;
  getDataByPage();
};

const deptTreeRef = useTemplateRef('deptTree');

const handleReset = async () => {
  searchParams.deptId = undefined;
  deptTreeRef.value?.resetSelectedKeys();
  resetSearchParams();
};
</script>

<template>
  <NFlex>
    <NCard class="w-60">
      <UserDeptTree ref="deptTree" @selected="handleSelectedDept" />
    </NCard>
    <div class="flex flex-col flex-1 gap-2">
      <UserSearch v-model:model="searchParams" @reset="handleReset" @search="getDataByPage" />
      <NCard class="flex-1" title="用户列表">
        <template #header-extra>
          <TableHeaderOperation
            v-model:columns="columnChecks"
            :loading="loading"
            :disabled-delete="checkedRowKeys.length === 0"
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
          :loading="loading"
          :row-key="row => row.id"
          :pagination="pagination"
        />
      </NCard>

      <CreateUserModal
        v-if="createUserModalVisible"
        v-model:visible="createUserModalVisible"
        @submitted="getDataByPage"
      />

      <EditUserModal v-if="editUserModalVisible" :id="currentUserId" v-model:visible="editUserModalVisible" />
    </div>
  </NFlex>
</template>

<style scoped></style>
