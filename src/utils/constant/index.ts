interface IObjectProperty {
  name: string;
  value: string | boolean | number | null;
}
export const STATUS_ACTIVE: IObjectProperty[] = [
  { name: 'general_status_active', value: '' },
  { name: 'general_active', value: 'true' },
  { name: 'general_inactive', value: 'false' },
];
export const GENDER: IObjectProperty[] = [
  { name: 'general_gender_male', value: 'male' },
  { name: 'general_gender_female', value: 'female' },
];
export const STATUS_ACCOUNT: IObjectProperty[] = [
  { name: 'general_status_account', value: '' },
  { name: 'general_waiting_verify', value: '1' },
  { name: 'general_success_verify', value: '2' },
  { name: 'general_denied_verify', value: '3' },
];

export const ENVIRONMENTS = {
  API_URL: process.env.APP__API_URL,
  LOCAL_STORAGE_KEY: process.env.APP__LOCAL_STORAGE_KEY,
};
