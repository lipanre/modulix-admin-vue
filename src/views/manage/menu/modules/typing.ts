/**
 * 操作类型
 */
export type OperateType = NaiveUI.TableOperateType | 'addChild';

/**
 * 数据模型
 */
export type Model = Pick<
  Api.SystemManage.Menu,
  | 'type'
  | 'name'
  | 'routeName'
  | 'routePath'
  | 'component'
  | 'sort'
  | 'i18nKey'
  | 'icon'
  | 'iconType'
  | 'status'
  | 'parentId'
  | 'keepAlive'
  | 'constant'
  | 'href'
  | 'hideInMenu'
  | 'activeMenu'
  | 'multiTab'
  | 'fixedIndexInTab'
> & {
  query: NonNullable<Api.SystemManage.Menu['query']>;
  buttons: NonNullable<Api.SystemManage.Menu['buttons']>;
  layout: string;
  page: string;
  pathParam: string;
};

/**
 * 布局选项
 */
export const layoutOptions: CommonType.Option[] = [
  {
    label: 'base',
    value: 'base'
  },
  {
    label: 'blank',
    value: 'blank'
  }
];
