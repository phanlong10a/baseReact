import { extend } from 'umi-request';
import { ENVIRONMENTS } from '../constant';
import TokenManagement from './TokenManagement';

const localeInfo = localStorage.getItem('umi_locale') || 'vi-VN';

const request = extend({
  prefix: ENVIRONMENTS.API_URL,
  errorHandler: async (error) => {
    if (error.response?.status === 401) {
      await TokenManager.getNewToken().then((res) => {
        window?.localStorage.setItem(
          ENVIRONMENTS.LOCAL_STORAGE_KEY as string,
          JSON.stringify(res),
        );
      });
      window?.location.reload();
      // clean all token
    }
    throw error?.data || error?.response;
  },
});

const injectBearer = (token: string, configs: any) => {
  console.log(localeInfo);
  if (!configs) {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        'Accept-Language': localeInfo,
      },
    };
  }

  if (configs.headers) {
    return {
      ...configs,
      headers: {
        ...configs.headers,
        Authorization: `Bearer ${token}`,
        'Accept-Language': localeInfo,
      },
    };
  }

  return {
    ...configs,
    headers: {
      Authorization: `Bearer ${token}`,
      'Accept-Language': localeInfo,
    },
  };
};

const TokenManager = new TokenManagement({
  isTokenValid: () => {
    const localInfo = window?.localStorage.getItem(
      ENVIRONMENTS.LOCAL_STORAGE_KEY as string,
    );
    let localInfoObject;

    if (localInfo) {
      localInfoObject = JSON.parse(localInfo);
    }
    return !!localInfoObject?.token;
  },
  getAccessToken: () => {
    const localInfo = window?.localStorage.getItem(
      ENVIRONMENTS.LOCAL_STORAGE_KEY as string,
    );
    let localInfoObject;

    if (localInfo) {
      localInfoObject = JSON.parse(localInfo);
    }

    return localInfoObject?.token || '';
  },
  onRefreshToken(done) {
    const localInfo = window?.localStorage.getItem(
      ENVIRONMENTS.LOCAL_STORAGE_KEY as string,
    );
    let localInfoObject;

    if (localInfo) {
      localInfoObject = JSON.parse(localInfo);
    }

    const refreshToken = localInfoObject?.refreshToken;
    // if (!refreshToken) {
    //   return done(null);
    // }

    request
      .post('/auth/refreshToken', {
        data: {
          refreshToken,
        },
      })
      .then((result) => {
        if (result.refreshToken && result.token) {
          done(result);
          return;
        }

        done(null);
      })
      .catch((err) => {
        console.error(err);
        done(null);
      });
  },
});

const privateRequest = async (
  request: any,
  suffixUrl: string,
  configs?: any,
) => {
  const token: string = (await TokenManager.getToken()) as string;
  return request(suffixUrl, injectBearer(token, configs));
};

const API_PATH = {
  // Auth
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  REFRESH_TOKEN: '/auth/refreshToken',
  FORGOT_PASSWORD: '/auth/forgotPassword',
  RESET_PASSWORD: '/auth/resetPassword',
  LOGOUT: '/auth/logout',
  USER: '/user',
  RATING: '/rating',
  KYC: '/kyc',
  ADMIN_USER: '/user/admin',
  NEWS: '/news',
  FILE: '/file',
  GUIDE: '/guide',
  COUPON: '/coupon',
  PAYMENT: '/payment/method',
  TOPICNOTI: '/notification/topic',
  NOTI: '/notification/template',
  SEND_NOTI: '/notification/send',
};

export { API_PATH, request, privateRequest };
