import { privateRequest, request, API_PATH } from '@/utils/apis';
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

  return privateRequest(request.get, API_PATH.USER + '?' + query).then(
    (res: any) => {
      return {
        total: res?.total,
        list: res?.data,
      };
    },
  );
};

export const getUserData = (id: any) => {
  return privateRequest(request.get, API_PATH.USER + '/' + id);
};

export const switchStatusUser = (user: any, payload: boolean) => {
  return privateRequest(request.put, API_PATH.USER + '/' + user.id, {
    data: {
      ...user,
      isActive: payload,
    },
  });
};
