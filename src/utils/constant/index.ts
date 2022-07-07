import {
  Applicable,
  DisplayType,
  PaymentType,
  TypeTemplateNoti,
} from '../enum';

interface IObjectProperty {
  name: string;
  value: string | boolean | number | null;
}
export const STATUS_ACTIVE: IObjectProperty[] = [
  { name: 'general_status_active', value: '' },
  { name: 'general_active', value: 'ACTIVE' },
  { name: 'general_inactive', value: 'INACTIVE' },
];

export const OPTION_STATUS_ACTIVE: IObjectProperty[] = [
  { name: 'general_active', value: 'ACTIVE' },
  { name: 'general_inactive', value: 'INACTIVE' },
];

export const OPTION_GENDER: IObjectProperty[] = [
  { name: 'general_gender_male', value: 'MALE' },
  { name: 'general_gender_female', value: 'FEMALE' },
  { name: 'general_gender_other', value: 'OTHER' },
];

export const STATUS_ACCOUNT: IObjectProperty[] = [
  { name: 'general_status_account', value: '' },
  { name: 'general_waiting_verify', value: '1' },
  { name: 'general_success_verify', value: '2' },
  { name: 'general_denied_verify', value: '3' },
];

export const STATUS_KYC: IObjectProperty[] = [
  { name: 'general_kyc_not_verified', value: 'NOT_VERIFIED' },
  { name: 'general_pending_kyc', value: 'PENDING' },
  { name: 'general_verified_kyc', value: 'VERIFIED' },
  { name: 'general_cancel_kyc', value: 'CANCELED' },
];

export const KYC_TYPE: IObjectProperty[] = [
  { name: 'general_kyc_type_IDcard', value: 'IDENTIFY_CARD' },
  { name: 'general_kyc_type_passport', value: 'PASSPORT' },
  { name: 'general_kyc_type_driving_license', value: 'DRIVING_LICENSE' },
];

export const PAYMENT_TYPE: IObjectProperty[] = [
  { name: 'general_payment_vtc', value: PaymentType.VTC_PAY },
  { name: 'general_payment_domestic_bank', value: PaymentType.DOMESTIC_BANK },
  {
    name: 'general_payment_international_card',
    value: PaymentType.INTERNATIONAL_CARD,
  },
];

export const KYC_PHOTO_TYPES: IObjectProperty[] = [
  { name: 'general_kyc_photo_type_front', value: 'FRONT_PHOTO' },
  { name: 'general_kyc_photo_type_back', value: 'BACK_PHOTO' },
];

export const APPLICABLE: IObjectProperty[] = [
  { name: 'general_all', value: Applicable.ALL },
  { name: 'general_user', value: Applicable.USER },
];

export const DISPLAY_TYPE: IObjectProperty[] = [
  { name: 'general_on', value: DisplayType.ON },
  { name: 'general_off', value: DisplayType.OFF },
];
export const TYPE_TEMPLATE_NOTI: IObjectProperty[] = [
  { name: 'general_noti_topic', value: TypeTemplateNoti.TOPIC },
  { name: 'general_noti_user', value: TypeTemplateNoti.USER },
];

export const ENVIRONMENTS = {
  API_URL: process.env.APP__API_URL,
  LOCAL_STORAGE_KEY: process.env.APP__LOCAL_STORAGE_KEY,
};
