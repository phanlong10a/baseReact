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

  return privateRequest(request.get, API_PATH.GUIDE + '?' + query).then(
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

export const deleteGuideData = (id: any) => {
  return privateRequest(request.delete, API_PATH.GUIDE + '/' + id);
};

export const getGuideData = (id: any) => {
  return privateRequest(request.get, API_PATH.GUIDE + '/' + id);
};
export const createGuideData = (data: any) => {
  return privateRequest(request.post, API_PATH.GUIDE, {
    data,
  });
};

export const editGuideData = (id: any, data: any) => {
  return privateRequest(request.put, API_PATH.GUIDE + '/' + id, {
    data,
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
