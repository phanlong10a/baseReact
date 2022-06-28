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

  return privateRequest(request.get, API_PATH.ADMIN_USER + '?' + query).then(
    (res: any) => {
      const data = res?.data?.map((e: any, index: any) => ({
        ...e,
        stt: (res?.page - 1) * res?.pageSize + index + 1,
      }));
      return {
        total: res?.total,
        list: data,
      };
    },
  );
};

export const getUserData = (id: any) => {
  return privateRequest(request.get, API_PATH.USER + '/' + id);
};
export const createUser = (payload: any) => {
  return privateRequest(request.post, API_PATH.USER, {
    data: payload,
  });
};
export const editUser = (id: any, payload: any) => {
  return privateRequest(request.put, API_PATH.USER + '/' + id, {
    data: payload,
  });
};
