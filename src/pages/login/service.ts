import axios from 'axios';

interface LoginItem {
  fcmToken?: string;
  phone: string;
  password: string;
}
export const login: (loginItem: LoginItem) => Promise<any> = (
  loginItem: LoginItem,
) => {
  console.log(process.env.API_ENDPOINT);
  return axios.post('http://34.143.191.39:4000/auth/login', loginItem);
};
