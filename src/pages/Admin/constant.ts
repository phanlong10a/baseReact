interface key_value {
  name: string;
  value: string | boolean | number | null;
}
export const STATUS_ACTIVE: Array<key_value> = [
  { name: 'general_status_active', value: '' },
  { name: 'general_active', value: 'true' },
  { name: 'general_inactive', value: 'false' },
];
