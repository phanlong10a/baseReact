import { API_PATH, privateRequest, request } from '@/utils/apis';
import { StatusKyc } from '@/utils/enum';
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

  return privateRequest(request.get, API_PATH.NEWS + '?' + query).then(
    (res: any) => {
      return {
        total: res?.total,
        list: res?.data,
      };
    },
  );
};

export const getNewsData = (id: any) => {
  return privateRequest(request.get, API_PATH.NEWS + '/' + id);
};
export const createNewsData = (payload: any) => {
  return privateRequest(request.post, API_PATH.NEWS, {
    data: payload,
  });
};
export const editNewsData = (id: any, payload: any) => {
  return privateRequest(request.put, API_PATH.NEWS + '/' + id, {
    data: payload,
  });
};
export const uploadImage = (formData: FormData) => {
  return privateRequest(request.post, API_PATH.FILE, {
    headers: {
      headers: { 'Content-Type': 'multipart/form-data' },
    },
    data: formData,
    requestType: 'form',
  });
};
