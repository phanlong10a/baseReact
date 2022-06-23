import { API_PATH, privateRequest, request } from '@/utils/apis';
import { ENVIRONMENTS } from '@/utils/constant';

interface Result {
  total: number;
  list: any[];
}
export const getTableData = (
  { current, pageSize }: { current: number; pageSize: number },
  formData: Object,
): Promise<Result> => {
  let query = `page=${current}&pageSize=${pageSize}&status=PENDING`;
  Object.entries(formData).forEach(([key, value]) => {
    if (value) {
      query += `&${key}=${value}`;
    }
  });

  return privateRequest(request.get, API_PATH.KYC + '?' + query).then(
    (res: any) => {
      return {
        total: res?.total,
        list: res?.data,
      };
    },
  );
};

export const getUserData = (id: any) => {
  return privateRequest(request.get, API_PATH.KYC + '/' + id);
};

export const verifyUser = (id: any) => {
  return privateRequest(request.post, API_PATH.KYC + '/' + id, {
    data: {
      status: 'VERIFIED',
    },
  });
};
export const cancelUser = (id: any) => {
  return privateRequest(request.post, API_PATH.KYC + '/' + id, {
    data: {
      status: 'CANCELED',
    },
  });
};
