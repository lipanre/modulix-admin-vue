import { request } from '@/service/request';

/**
 * 获取菜单列表
 */
export const fetchGetAllPages = () => {};

/**
 * 获取菜单树
 */
export const fetchGetMenuList = (query: Api.Common.PaginatingCommonParams) => {
  return request<App.Global.Menu>({
    url: '/menu/tree',
    params: query
  });
};

/**
 * 新增菜单
 * @param dto 菜单dto
 */
export const createMenu = (dto: Api.SystemManage.Menu) => {
  return request<boolean>({
    url: '/menu',
    method: 'POST',
    data: dto
  });
};
