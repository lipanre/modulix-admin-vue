import boolean from 'async-validator/dist-types/validator/boolean';
import { request } from '@/service/request';

/**
 * 创建部门
 * @param dto
 */
export const createDept = (dto: Api.SystemManage.DeptDTO) => {
  return request<boolean>({
    url: '/dept',
    method: 'POST',
    data: dto
  });
};

/**
 * 删除部门
 * @param ids
 */
export const deleteDept = (...ids: string[]) => {
  return request<boolean>({
    url: '/dept',
    method: 'DELETE',
    data: ids
  });
};

/**
 * 更新不萌
 * @param id
 * @param dto
 */
export const updateDept = (id: string, dto: Api.SystemManage.DeptDTO) => {
  return request<boolean>({
    url: `/dept/${id}`,
    method: 'PUT',
    data: dto
  });
};

/**
 * 查询部门详情
 * @param id
 */
export const getDeptDetail = (id: string) => {
  return request<Api.SystemManage.DeptVO>({
    url: `/dept/${id}`,
    method: 'GET'
  });
};

/**
 * 分页查询部门列表
 * @param query
 */
export const pageDept = (query: Api.SystemManage.DeptQuery & Api.Common.PaginatingCommonParams) => {
  return request<Api.Common.PaginatingQueryRecord<Api.SystemManage.DeptVO>>({
    url: '/dept',
    method: 'GET',
    data: query
  });
};

/**
 * 查询部门列表
 * @param query
 */
export const listDept = (query: Api.SystemManage.DeptQuery) => {
  return request<Api.SystemManage.DeptVO[]>({
    url: '/dept',
    method: 'GET',
    data: query
  });
};

/**
 * 查询部门列表
 */
export const deptTree = () => {
  return request<CommonType.TreeNode<Api.SystemManage.DeptVO>[]>({
    url: '/dept/tree',
    method: 'GET'
  });
};
