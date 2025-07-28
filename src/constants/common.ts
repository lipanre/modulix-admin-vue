import { transformRecordToOption } from '@/utils/common';

export const yesOrNoRecord: Record<CommonType.YesOrNo, App.I18n.I18nKey> = {
  Y: '是',
  N: '否'
};

export const yesOrNoOptions = transformRecordToOption(yesOrNoRecord);
