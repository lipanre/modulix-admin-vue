import { request } from '@/service/request';

/**
 * 创建字典
 *
 * @param dto 字典dto
 */
export const createDict = (dto: Api.SystemManage.DictDTO) => {
  return request<boolean>({
    url: '/dict',
    method: 'POST',
    data: dto
  });
};

/**
 * 批量删除字典列表
 *
 * @param ids 字典id列表
 */
export const deleteDict = (...ids: string[]) => {
  return request<boolean>({
    url: '/dict',
    method: 'DELETE',
    data: ids
  });
};

/**
 * 更新指定字典
 *
 * @param id 字典id
 * @param dto 字典dto
 */
export const updateDict = (id: string, dto: Api.SystemManage.DictDTO) => {
  return request<boolean>({
    url: `/dict/${id}`,
    method: 'PUT',
    data: dto
  });
};

/**
 * 分页查询字典列表
 *
 * @param param 查询参数
 */
export const pageDict = (param: Api.Common.CommonSearchParams & Api.SystemManage.DictQuery) => {
  return request<Api.Common.PaginatingQueryRecord<Api.SystemManage.DictVO>>({
    url: '/dict',
    method: 'GET',
    params: param
  });
};

/**
 * 分页查询字典列表
 *
 * @param param 查询参数
 */
export const listDict = (param: Api.SystemManage.DictQuery) => {
  return request<Api.SystemManage.DictVO[]>({
    url: '/dict',
    method: 'GET',
    params: param
  });
};

/**
 * 查询指定字典详情
 *
 * @param id 字典ID
 */
export const getDictDetail = (id: string) => {
  return request<Api.SystemManage.DictVO>({
    url: `/dict/${id}`,
    method: 'GET'
  });
};

/**
 * 更新、新增、删除字典明细
 *
 * @param removeIds 删除id列表
 * @param details 更新或新增列表
 */
export const upsetDictDetail = (removeIds: string[], details: Api.SystemManage.DictDTO) => {
  return request<boolean>({
    url: '/dict/detail',
    method: 'POST',
    data: {
      removeIds,
      details
    }
  });
};
