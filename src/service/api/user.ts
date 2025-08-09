import { request } from '@/service/request';

/**
 * 创建用户
 *
 * @param dto 用户dto
 */
export const createUser = (dto: Api.SystemManage.UserDTO) => {
  return request<boolean>({
    url: '/user',
    method: 'POST',
    data: dto
  });
};

/**
 * 批量删除用户
 *
 * @param ids 用户id列表
 */
export const deleteUser = (...ids: string[]) => {
  return request<boolean>({
    url: '/user',
    method: 'DELETE',
    data: ids
  });
};

/**
 * 更新用户
 *
 * @param id 用户id
 * @param dto 用户dto
 */
export const updateUser = (id: string, dto: Api.SystemManage.UserDTO) => {
  return request<boolean>({
    url: `/user/${id}`,
    method: 'PUT',
    data: dto
  });
};

/**
 * 分页查询用户列表
 *
 * @param query 查询条件
 */
export const pageUser = (query: Api.Common.CommonSearchParams & Api.SystemManage.UserQuery) => {
  return request<Api.Common.PaginatingQueryRecord<Api.SystemManage.UserVO>>({
    url: '/user',
    method: 'GET',
    params: query
  });
};

/**
 * 查询用户详情
 *
 * @param id 用户id
 */
export const userDetail = (id: string) => {
  return request<Api.SystemManage.UserVO>({
    url: `/user/${id}`,
    method: 'GET'
  });
};
