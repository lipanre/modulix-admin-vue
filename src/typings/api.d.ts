/**
 * Namespace Api
 *
 * All backend api type
 */
declare namespace Api {
  namespace Common {
    /** common params of paginating */
    interface PaginatingCommonParams {
      /** current page number */
      current: number;
      /** page size */
      size: number;
      /** total count */
      total: number;
    }

    /** common params of paginating query list data */
    interface PaginatingQueryRecord<T = any> extends PaginatingCommonParams {
      records: T[];
    }

    /** common search params of table */
    type CommonSearchParams = Pick<Common.PaginatingCommonParams, 'current' | 'size'>;

    /** common record */
    type CommonRecord<T = any> = {
      /** record id */
      id: string;
      /** record creator */
      creatorId: string;
      /** record create time */
      createTime: string;
      /** record updater */
      modifierId: string;
      /** record update time */
      modifyTime: string;
      /** record status */
      status: CommonType.EnableStatus | null;
    } & T;
  }

  /**
   * namespace Auth
   *
   * backend api module: "auth"
   */
  namespace Auth {
    interface LoginToken {
      token: string;
      refreshToken: string;
      clientId: string;
      expire: number;
      header: string;
    }

    interface UserInfo {
      id: string;
      username: string;
      roles: string[];
      buttons: string[];
    }
  }

  /**
   * namespace Route
   *
   * backend api module: "route"
   */
  namespace Route {
    type ElegantConstRoute = import('@elegant-router/types').ElegantConstRoute;

    interface MenuRoute extends ElegantConstRoute {
      id: string;
    }

    interface UserRoute {
      routes: MenuRoute[];
      home: import('@elegant-router/types').LastLevelRouteKey;
    }
  }

  namespace SystemManage {
    type UserGender = 'MALE' | 'FEMALE';

    type IconType = 'ICONIFY' | 'LOCAL';

    type MenuPropsOfRoute = Pick<
      import('vue-router').RouteMeta,
      | 'i18nKey'
      | 'keepAlive'
      | 'constant'
      | 'sort'
      | 'href'
      | 'hideInMenu'
      | 'activeMenu'
      | 'multiTab'
      | 'fixedIndexInTab'
      | 'query'
    >;

    type Menu = Common.CommonRecord<{
      /** parent menu id */
      parentId: string;
      /** menu type */
      type: MenuType;
      /**
       * 布局
       */
      layout?: string;

      query: MenuQuery[];
      page: string;
      pathParam: string;
      /** menu name */
      label: string;
      /** route name */
      routeName: string;
      /** route path */
      routePath: string;
      /** component */
      component?: string;
      /** iconify icon name or local icon name */
      icon: string;
      /** icon type */
      iconType: IconType;
      /** buttons */
      buttons: MenuButton[] | undefined;
      /** children menu */
      children?: Menu[] | null;
    }> &
      MenuPropsOfRoute;

    type MenuType = 'DIR' | 'MENU';

    interface MenuButton {
      code: string;
      desc: string;
    }

    interface MenuQuery {
      key: string;
      value: string;
    }

    type DictDTO = {
      id?: string;
      /* 父级菜单id */
      parentId?: string;
      /* 排序 */
      sort: number;
      /* 字典码 */
      code: string;
      /* 字典名 */
      name: string;
      /* 字典描述 */
      description: string;
    };

    type DictVO = Common.CommonRecord<DictDTO>;
    type DictQuery = Partial<DictVO>;

    type RoleDTO = {
      /* 启用状态 */
      status: CommonType.EnableStatus;
      /* 角色名 */
      name: string;
      /* 角色编码 */
      code: string;
      /* 角色描述 */
      description: string;
      /* 数据权限 */
      dataScope: string;
      /* 首页 */
      home: string;
      /* 菜单id列表 */
      menuIds: string[];
      /* 自定义数据权限 部门列表 */
      deptIds: string[];
      /* 角色可操作的按钮列表 */
      buttons: string[];
    };

    type RoleVO = Common.CommonRecord<RoleDTO>;
    type RoleQuery = Partial<RoleVO>;
  }
}
