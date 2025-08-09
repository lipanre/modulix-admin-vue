import { request } from '@/service/request';

/**
 * 创建角色
 *
 * @param dto
 */
export const createRole = (dto: Api.SystemManage.RoleDTO) => {
  return request<boolean>({
    url: '/role',
    method: 'POST',
    data: dto
  });
};

/**
 * 删除角色
 *
 * @param ids
 */
export const deleteRole = (...ids: string[]) => {
  return request<boolean>({
    url: '/role',
    method: 'DELETE',
    data: ids
  });
};

/**
 * 更新角色
 *
 * @param id
 * @param dto
 */
export const updateRole = (id: string, dto: Api.SystemManage.RoleDTO) => {
  return request<boolean>({
    url: `/role/${id}`,
    method: 'PUT',
    data: dto
  });
};

/**
 * 分页查询角色列表
 *
 * @param query 查询条件
 */
export const pageRole = (query: Api.SystemManage.RoleQuery & Api.Common.PaginatingCommonParams) => {
  return request<Api.Common.PaginatingQueryRecord<Api.SystemManage.RoleVO>>({
    url: '/role',
    method: 'GET',
    params: query
  });
};

/**
 * 分页查询角色列表
 *
 * @param query 查询条件
 */
export const listRole = (query?: Api.SystemManage.RoleQuery) => {
  return request<Api.Common.CommonRecord<Api.SystemManage.RoleVO>[]>({
    url: '/role',
    method: 'GET',
    params: query
  });
};

/**
 * 获取角色详情
 *
 * @param id
 */
export const getRoleDetail = (id: string) => {
  return request<Api.Common.CommonRecord<Api.SystemManage.RoleVO>>({
    url: `/role/${id}`,
    method: 'GET'
  });
};
