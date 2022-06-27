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
  return privateRequest(request.get, '/ticket', {
    params: { ...{ page: current, pageSize }, ...formData },
  }).then((res: any) => {
    return {
      total: res?.total,
      list: res?.data,
    };
  });
};

export const getUserData = (id: any) => {
  return privateRequest(request.get, '/user/' + id);
};

export const getListStation = (values: string) => {
  const url = `/station?sortBy=id${values ? `&name=${values}` : ''}`;
  return privateRequest(request.get, url, {
    params: {
      isActive: true,
      page: 1,
      pageSize: 50,
    },
  }).then((res: any) => {
    return {
      list: res?.data,
    };
  });
};

export const getListBicycle = (values: string) => {
  const url = `/bicycle?page=1&pageSize=10000&status=LOCKED&sortBy=id&isActive=true${
    values ? `&name=${values}` : ''
  }`;
  return privateRequest(request.get, url).then((res: any) => {
    return {
      list: res?.data,
    };
  });
};

export const getListLock = (values: string) => {
  const url = `/lock?sortBy=id${values ? `&code=${values}` : ''}`;
  return privateRequest(request.get, url, {
    params: {
      isActive: true,
      page: 1,
      pageSize: 50,
    },
  }).then((res: any) => {
    return {
      list: res?.data,
    };
  });
};

export const addStation = async (params: any) => {
  return privateRequest(request.post, '/station', {
    data: params,
  });
};
