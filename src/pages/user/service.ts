import { privateRequest, request } from '@/utils/apis';
import useRequest from '@ahooksjs/use-request';

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
  return privateRequest(
    request,
    process.env.APP__END_POINT + '/user?' + query,
    {
      method: 'GET',
    },
  ).then((res) => {
    return {
      total: res.total,
      list: res.data,
    };
  });
};

export const getUserData = (id: any) => {
  return privateRequest(request, process.env.APP__END_POINT + '/user/' + id);
};
