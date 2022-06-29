import { privateRequest, request, API_PATH } from '@/utils/apis';
import { ENVIRONMENTS } from '@/utils/constant';
import { StatusAccount } from '@/utils/enum';

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

export const switchStatusUser = (user: any, payload: StatusAccount) => {
  return privateRequest(request.put, API_PATH.USER + '/' + user.id, {
    data: {
      ...user,
      status: payload,
    },
  });
};
