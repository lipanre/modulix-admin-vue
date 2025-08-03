import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { SelectOption } from 'naive-ui';
import { allDict } from '@/service/api/dict';

export const useDictStore = defineStore('dictStore', () => {
  const dictMapping = ref<Record<string, Record<string, string>>>({});

  const init = async () => {
    const { data } = await allDict();
    dictMapping.value = data?.map(node => transform(node)).reduce(mergeDict);
  };

  const transform = (node: CommonType.TreeNode<Api.SystemManage.DictVO>) => {
    return {
      [node.code]: {
        ...node.children?.map(child => ({ [child.code]: child.name })).reduce(mergeDict)
      }
    };
  };

  const mergeDict = (pre, current) => {
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
  const dictLabel = (code: string, detailCode: string) =>
    dictMapping.value[code] ? dictMapping.value[code][detailCode] : null;

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
    dictOptions
  };
});
