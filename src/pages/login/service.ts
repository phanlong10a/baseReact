import { useRequest } from 'ahooks';

export const useLogin = () => {
  return useRequest(
    async (values) => {
      return 2;
    },
    {
      manual: true,
    },
  );
};
