interface key_value {
  name: string;
  value: string | boolean | number | null;
}
export const STATUS_ACCOUNT: Array<key_value> = [
  { name: 'general_status_account', value: '' },
  { name: 'general_waiting_verify', value: '1' },
  { name: 'general_success_verify', value: '2' },
  { name: 'general_denied_verify', value: '3' },
];
export const STATUS_ACTIVE: Array<key_value> = [
  { name: 'general_status_active', value: '' },
  { name: 'general_active', value: 'true' },
  { name: 'general_inactive', value: 'false' },
];
