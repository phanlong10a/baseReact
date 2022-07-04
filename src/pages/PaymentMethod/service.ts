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

  return privateRequest(request.get, API_PATH.PAYMENT + '?' + query).then(
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

export const deletePaymentData = (id: any) => {
  return privateRequest(request.delete, '/payment' + '/' + id);
};

export const getPaymentData = (id: any) => {
  return privateRequest(request.get, API_PATH.PAYMENT + '/' + id);
};
export const createPaymentData = (data: any) => {
  return privateRequest(request.post, API_PATH.PAYMENT, {
    data,
  });
};

export const editPaymentData = (id: any, data: any) => {
  return privateRequest(request.put, API_PATH.PAYMENT + '/' + id, {
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
