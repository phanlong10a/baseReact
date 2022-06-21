import useRequest from '@ahooksjs/use-request';
import { request } from 'umi';

export const getTableData = (
  { current, pageSize }: { current: number; pageSize: number },
  formData: Object,
): Promise<any> => {
  let query = `page=${current}&pageSize=${pageSize}`;
  Object.entries(formData).forEach(([key, value]) => {
    if (value) {
      query += `&${key}=${value}`;
    }
  });
  return request(process.env.APP__END_POINT + '/user?' + query, {
    method: 'GET',
  }).then((res) => {
    return {
      total: res.total,
      list: res.data,
    };
  });
};

export const getUserData = (id: any) => {
  return request(process.env.APP__END_POINT + '/user/' + id);
};
