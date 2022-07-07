import { API_PATH, privateRequest, request } from '@/utils/apis';

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

  return privateRequest(request.get, API_PATH.TOPICNOTI + '?' + query).then(
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

export const getAllUsers = () => {
  return privateRequest(
    request.get,
    API_PATH.USER + '?' + 'page=1&pageSize=100000',
  );
};

export const getTemplateData = (id: any) => {
  return privateRequest(request.get, API_PATH.TOPICNOTI + '/' + id);
};
export const createTemplateData = (payload: any) => {
  return privateRequest(request.post, API_PATH.TOPICNOTI, {
    data: payload,
  });
};
export const editTemplateData = (id: any, payload: any) => {
  return privateRequest(request.put, API_PATH.TOPICNOTI + '/' + id, {
    data: payload,
  });
};

export const deleteTemplateData = (id: any) => {
  return privateRequest(request.delete, API_PATH.TOPICNOTI + '/' + id);
};
