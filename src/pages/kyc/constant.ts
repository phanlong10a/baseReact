interface key_value {
  name: string;
  value: string | boolean | number | null;
}
export const STATUS_ACCOUNT: Array<key_value> = [
  { name: 'Trạng thái', value: '' },
  { name: 'Chờ xác thực', value: '1' },
  { name: 'Đã xác thực', value: '2' },
  { name: 'Xác thực thành công', value: '3' },
  { name: 'Từ chối xác thực', value: '4' },
];
export const STATUS_ACTIVE: Array<key_value> = [
  { name: 'Trạng thái hoạt động', value: '' },
  { name: 'Hoạt động', value: 'true' },
  { name: 'Không hoạt động', value: 'false' },
];
