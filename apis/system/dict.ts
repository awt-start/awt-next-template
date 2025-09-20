import { useApiQuery } from '@/lib/api';
import { DictData } from './dict-data-model';



enum Api {
  root = '/system/dict/data',
}

/**
 * 主要是DictTag组件使用
 * @param dictType 字典类型
 * @returns 字典数据
 */
export function dictDataInfo(dictType: string) {
  return  useApiQuery<DictData[]>(
        { endpoint: `${Api.root}/open/type/${dictType}`  }
    )
}
