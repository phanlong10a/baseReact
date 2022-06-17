import axios from 'axios';

interface LoginItem {
  fcmToken?: string;
  phone: string;
  password: string;
}
export const login: (loginItem: LoginItem) => Promise<any> = (
  loginItem: LoginItem,
) => {
  return axios.post(process.env.APP__END_POINT + '/auth/login', loginItem);
};
