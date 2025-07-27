import { request } from '@/service/request';

/**
 * 获取菜单列表
 */
export const fetchGetAllPages = () => {};

/**
 * 获取菜单树
 */
export const fetchGetMenuList = () => {
  return request<App.Global.Menu>({
    url: '/menu'
  });
};
