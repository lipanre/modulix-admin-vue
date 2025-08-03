import { ref } from 'vue';
import { defineStore } from 'pinia';
import { allDict } from '@/service/api/dict';

interface Dict {
  code: string;
  name: string;
  children: Dict[];
}

export const useDictStore = defineStore('dictStore', () => {
  const dict = ref<Dict[]>([]);

  const init = async () => {
    const { data } = await allDict();
    data.forEach(node => dict.value?.push(transform(node)));
  };

  const transform = (node: CommonType.TreeNode<Api.SystemManage.DictVO>) => {
    return {
      code: node.code,
      name: node.name,
      children: node.children?.map(transform)
    };
  };

  init();
  return {
    dict
  };
});
