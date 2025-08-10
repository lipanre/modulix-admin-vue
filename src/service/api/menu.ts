import { request } from '@/service/request';

/**
 * 获取菜单列表
 */
export const fetchGetAllPages = () => {};

/**
 * 获取菜单树
 */
export const fetchGetMenuList = (query?: Api.SystemManage.MenuQuery) => {
  return request<Api.SystemManage.MenuVO[]>({
    url: '/menu/tree',
    params: query
  });
};

/**
 * 新增菜单
 * @param dto 菜单dto
 */
export const createMenu = (dto: Partial<Api.SystemManage.MenuDTO>) => {
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
export const updateMenu = (id: string, dto: Partial<Api.SystemManage.MenuDTO>) => {
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
  return request<Api.SystemManage.MenuDTO>({
    url: `/menu/${id}`,
    method: 'GET'
  });
};

/**
 * 删除指定菜单
 *
 * @param id 菜单id
 */
export const deleteMenu = (id: string) => {
  return request<boolean>({
    url: `/menu/${id}`,
    method: 'DELETE'
  });
};

/**
 * 批量删除菜单
 *
 * @param ids 菜单id列表
 */
export const batchDeleteMenu = (ids: string[]) => {
  return request<boolean>({
    url: '/menu',
    method: 'DELETE',
    data: ids
  });
};

/**
 * 查询所有页面路由列表
 */
export const listPage = () => {
  return request<string[]>({
    url: '/menu/all-page',
    method: 'GET'
  });
};

/**
 * 查询页面按钮列表
 */
export const listPageButton = (query?: Api.SystemManage.MenuQuery) => {
  return request<Api.SystemManage.MenuButtonVO[]>({
    url: '/menu/button',
    method: 'GET',
    params: query
  });
};
