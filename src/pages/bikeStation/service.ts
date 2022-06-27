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
  // let query = `page=${current}&pageSize=${pageSize}`;
  // Object.entries(formData).forEach(([key, value]) => {
  //   if (value) {
  //     query += `&${key}=${value}`;
  //   }
  // });

  return privateRequest(request.get, '/station', {
    params: {
      ...formData,
      ...{
        page: current,
        pageSize: pageSize,
      },
    },
  }).then((res: any) => {
    const data = res?.data?.map((e: any, index: any) => ({
      ...e,
      stt: (res?.page - 1) * res?.pageSize + index + 1,
    }));
    console.log(data);

    return {
      total: res?.total,
      list: data,
    };
  });
};

export const getUserData = (id: any) => {
  return privateRequest(request.get, '/user/' + id);
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

export const addStation = async (params: any) => {
  return privateRequest(request.post, '/station', {
    data: params,
  });
};
