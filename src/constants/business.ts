import { transformRecordToOption } from '@/utils/common';

export const enableStatusRecord: Record<CommonType.EnableStatus, string> = {
  ENABLE: '启用',
  DISABLE: '禁用'
};

export const enableStatusOptions = transformRecordToOption(enableStatusRecord);

export const userGenderRecord: Record<Api.SystemManage.UserGender, string> = {
  MALE: '男',
  FEMALE: '女'
};

export const userGenderOptions = transformRecordToOption(userGenderRecord);

export const menuTypeRecord: Record<Api.SystemManage.MenuType, string> = {
  DIR: '目录',
  MENU: '菜单'
};

export const menuTypeOptions = transformRecordToOption(menuTypeRecord);

export const menuIconTypeRecord: Record<Api.SystemManage.IconType, string> = {
  ICONIFY: 'iconify图标',
  LOCAL: '本地图标'
};

export const menuIconTypeOptions = transformRecordToOption(menuIconTypeRecord);
