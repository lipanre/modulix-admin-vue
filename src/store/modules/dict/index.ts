import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { SelectOption } from 'naive-ui';
import { allDict } from '@/service/api/dict';

export const useDictStore = defineStore('dictStore', () => {
  const dictMapping = ref<Record<string, Record<string, any>>>({});
  const dictColorMapping = ref<Record<string, Record<string, any>>>({});

  const init = async () => {
    const { data } = await allDict();
    dictMapping.value = data?.map(node => transformCode(node)).reduce(mergeDict) || {};
    dictColorMapping.value = data?.map(node => transformColor(node)).reduce(mergeDict) || {};
  };

  const transformCode = (node: CommonType.TreeNode<Api.SystemManage.DictVO>) => {
    return {
      [node.code]: {
        ...node.children?.map(child => ({ [child.code]: child.name })).reduce(mergeDict)
      }
    };
  };

  const transformColor = (node: CommonType.TreeNode<Api.SystemManage.DictVO>) => {
    return {
      [node.code]: {
        ...node.children?.map(child => ({ [child.code]: child.color })).reduce(mergeDict)
      }
    };
  };

  const mergeDict = (pre: Record<string, any>, current: Record<string, any>) => {
    Object.keys(current).forEach(key => {
      pre[key] = current[key];
    });
    return pre;
  };

  /**
   * 获取字典值
   *
   * @param code 字典code
   * @param detailCode 字典明细code
   */
  const dictLabel = (code: string, detailCode: any) =>
    dictMapping.value[code] ? dictMapping.value[code][detailCode] : null;

  /**
   * 获取字典颜色
   *
   * @param code 字典码
   * @param detailCode 字典明细码
   */
  const dictColor = (code: string, detailCode: any) =>
    dictColorMapping.value[code] ? dictColorMapping.value[code][detailCode] : null;

  /**
   * 获取字典下拉选择选项
   * @param code
   */
  const dictOptions = (code: string): SelectOption[] => {
    const dict = dictMapping.value[code];
    if (!dict) return [];
    return Object.keys(dict).map(key => ({
      value: key,
      label: dict[key]
    }));
  };

  init();
  return {
    dictMapping,
    dictLabel,
    dictColor,
    dictOptions
  };
});
