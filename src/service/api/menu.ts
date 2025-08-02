import { request } from '@/service/request';

/**
 * 获取菜单列表
 */
export const fetchGetAllPages = () => {};

/**
 * 获取菜单树
 */
export const fetchGetMenuList = (query: Api.Common.CommonSearchParams) => {
  return request<Api.Common.PaginatingQueryRecord<Api.Common.CommonRecord<App.Global.Menu>>>({
    url: '/menu/tree',
    params: query
  });
};

/**
 * 新增菜单
 * @param dto 菜单dto
 */
export const createMenu = (dto: Partial<Api.SystemManage.Menu>) => {
  return request<boolean>({
    url: '/menu',
    method: 'POST',
    data: dto
  });
};

/**
 * 更新菜单
 *
 * @param id 菜单id
 * @param dto 菜单dto
 */
export const updateMenu = (id: string, dto: Partial<Api.SystemManage.Menu>) => {
  return request<boolean>({
    url: `/menu/${id}`,
    method: 'PUT',
    data: dto
  });
};

/**
 * 获取菜单详情
 *
 * @param id 菜单id
 */
export const getMenuDetail = (id: string) => {
  return request<Api.SystemManage.Menu>({
    url: `/menu/${id}`,
    method: 'GET'
  });
};
