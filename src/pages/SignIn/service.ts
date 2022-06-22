import { useAuth } from '@/utils/hooks/useAuth';
import { API_PATH, request } from '@/utils/apis';
import { useRequest } from 'ahooks';
import { message } from 'antd';

export const useLogin = () => {
  const { onLogin } = useAuth();

  return useRequest(
    async (values) => {
      const params = {
        usernameOrPhone: values?.phone_number?.trim(),
        password: values.password,
      };
      return request.post(API_PATH.LOGIN, {
        data: params,
      });
    },
    {
      manual: true,
      onSuccess: (result) => {
        onLogin(result);
      },
      onError: (err) => {
        message.error(err?.message || 'Login failed');
      },
    },
  );
};
