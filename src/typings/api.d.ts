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

    type MenuDTO = {
      /** parent menu id */
      parentId: string | number;
      /** menu type */
      type: MenuType;
      /**
       * 布局
       */
      layout?: string;

      query: Query[];
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
      buttons?: ButtonDTO[];
      /** children menu */
      children?: MenuDTO[] | null;
      /** record status */
      status?: CommonType.EnableStatus;
      /* 移除的按钮id列表 */
      deleteButtonIds: string[];
    } & MenuPropsOfRoute;

    type MenuVO = Api.Common.CommonRecord<ButtonDTO>;
    type MenuQuery = Partial<Api.SystemManage.MenuVO> & {
      menuIds: string[];
    };

    type MenuButtonVO = {
      menuName: string;
      buttons: ButtonVO[];
    };

    type MenuType = 'DIR' | 'MENU';

    type ButtonDTO = {
      id?: string | null;
      name: string;
      code: string;
      menuId?: string | null;
    };

    type ButtonVO = Api.Common.CommonRecord<ButtonDTO>;

    interface Query {
      key: string;
      value: string;
    }

    type DictDTO = {
      id?: string;
      /* 父级菜单id */
      parentId?: string;
      /* 字典颜色 */
      color?: string;
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
      status: CommonType.EnableStatus | null;
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
      buttonIds: string[];
      /* 角色id列表 */
      ids: string[];
    };

    type RoleVO = Common.CommonRecord<RoleDTO>;
    type RoleQuery = Partial<RoleVO>;

    type DeptDTO = {
      /* 上级部门id */
      parentId?: string;
      /* 部门名 */
      name: string;
      /* 排序 */
      sort: number;
      /* 负责人 */
      chargePerson: string;
      /* 联系电话 */
      phone: string;
      /* 邮箱 */
      email: string;
    };

    type DeptVO = Common.CommonRecord<DeptDTO>;
    type DeptQuery = Partial<DeptVO>;

    type UserDTO = {
      /* 用户名 */
      username: string | null;
      /* 密码 */
      password?: string;
      /* 昵称 */
      nickname: string | null;
      /* 部门id */
      deptId: string | null;
      /* 电话号码 */
      phone?: string;
      /* 性别 */
      gender: Api.SystemManage.UserGender | null;
      /* 邮箱 */
      email: string;
      /* 启用状态 */
      enable: CommonType.EnableStatus;
      /* 首页 */
      homeRoleId: string | null;
      /* 角色id列表 */
      roleIds: string[];
    };

    type UserVO = Common.CommonRecord<UserDTO> & {
      deptName: string;
    };
    type UserQuery = Partial<UserVO>;
  }
}
