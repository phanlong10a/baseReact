import { extend } from 'umi-request';
import { ENVIRONMENTS } from '../constant';
import TokenManagement from './TokenManagement';

const request = extend({
  prefix: ENVIRONMENTS.API_URL,
  errorHandler: (error) => {
    if (error.response.status === 401) {
      // clean all token
    }
  },
});

const injectBearer = (token: string, configs: any) => {
  if (!configs) {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }

  if (configs.headers) {
    return {
      ...configs,
      headers: {
        ...configs.headers,
        Authorization: `Bearer ${token}`,
      },
    };
  }

  return {
    ...configs,
    headers: {
      Authorization: `Bearer ${token}`,
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
    if (!refreshToken) {
      return done(null);
    }

    request
      .post('/auth/refreshToken', {
        data: {
          refreshToken,
        },
      })
      .then((result) => {
        if (result.refreshToken && result.accessToken) {
          done(result.accessToken);
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
  url: string,
  configs?: any,
  baseRequest = request,
) => {
  const token: string = (await TokenManager.getToken()) as string;
  return baseRequest(url, injectBearer(token, configs));
};

const API_PATH = {
  // Auth
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  REFRESH_TOKEN: '/auth/refreshToken',
  FORGOT_PASSWORD: '/auth/forgotPassword',
  RESET_PASSWORD: '/auth/resetPassword',
  LOGOUT: '/auth/logout',
};

export { API_PATH, request, privateRequest };
