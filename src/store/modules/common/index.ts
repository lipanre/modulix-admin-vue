import { defineStore } from 'pinia';

export const useCommonStore = defineStore('commonStore', () => {
  const enableTagTypeMap: Record<CommonType.EnableStatus, NaiveUI.ThemeColor> = {
    ENABLE: 'success',
    DISABLE: 'warning'
  };

  return {
    enableTagTypeMap
  };
});
