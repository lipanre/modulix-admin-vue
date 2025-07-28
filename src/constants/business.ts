import { transformRecordToOption } from '@/utils/common';

export const enableStatusRecord: Record<CommonType.EnableStatus, string> = {
  enable: '启用',
  disable: '禁用'
};

export const enableStatusOptions = transformRecordToOption(enableStatusRecord);

export const userGenderRecord: Record<Api.SystemManage.UserGender, string> = {
  male: '男',
  female: '女'
};

export const userGenderOptions = transformRecordToOption(userGenderRecord);

export const menuTypeRecord: Record<Api.SystemManage.MenuType, string> = {
  dir: '目录',
  menu: '菜单'
};

export const menuTypeOptions = transformRecordToOption(menuTypeRecord);

export const menuIconTypeRecord: Record<Api.SystemManage.IconType, string> = {
  iconify: 'iconify图标',
  local: '本地图标'
};

export const menuIconTypeOptions = transformRecordToOption(menuIconTypeRecord);
