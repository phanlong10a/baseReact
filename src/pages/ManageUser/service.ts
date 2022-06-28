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
  let query = `page=${current}&pageSize=${pageSize}&status=PENDING`;
  Object.entries(formData).forEach(([key, value]) => {
    if (value) {
      query += `&${key}=${value}`;
    }
  });

  return privateRequest(request.get, API_PATH.KYC + '?' + query).then(
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
  return privateRequest(request.get, API_PATH.KYC + '/' + id);
};

export const verifyUser = (id: any) => {
  return privateRequest(request.put, API_PATH.KYC + '/' + id, {
    data: {
      status: StatusKyc.VERIFIED,
    },
  });
};
export const cancelUser = (id: any) => {
  return privateRequest(request.put, API_PATH.KYC + '/' + id, {
    data: {
      status: StatusKyc.CANCELED,
    },
  });
};
