import { privateRequest, request } from '@/utils/apis';
import { ENVIRONMENTS } from '@/utils/constant';

interface Result {
  total: number;
  list: any[];
}
export const getTableData = (
  { current, pageSize }: { current: number; pageSize: number },
  formData: Object,
): Promise<Result> => {
  let query = `page=${current}&pageSize=${pageSize}`;
  Object.entries(formData).forEach(([key, value]) => {
    if (value) {
      query += `&${key}=${value}`;
    }
  });

  return privateRequest('/station?' + query, {
    method: 'GET',
  }).then((res: any) => {
    return {
      total: res?.total,
      list: res?.data,
    };
  });
};

export const getUserData = (id: any) => {
  return privateRequest('/user/' + id);
};

export const getListBicycle = (values: string) => {
  const url = `/bicycle?page=1&pageSize=10000&sortBy=id&isActive=true${
    values ? `&name=${values}` : ''
  }`;
  return privateRequest(url, {
    method: 'GET',
  }).then((res: any) => {
    return {
      list: res?.data,
    };
  });
};
