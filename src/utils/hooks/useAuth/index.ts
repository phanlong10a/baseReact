import { ENVIRONMENTS } from '@/utils/constant';
import { useEffect } from 'react';
import { atom, useRecoilState } from 'recoil';
import { isBrowser } from 'umi';

const authCache =
  isBrowser() &&
  window?.localStorage.getItem(ENVIRONMENTS.LOCAL_STORAGE_KEY as string);

let initialAuth = {};
if (authCache) {
  initialAuth = JSON.parse(authCache);
}

export const authAtom = atom({
  key: `${ENVIRONMENTS.LOCAL_STORAGE_KEY}_AUTH`,
  default: {
    loading: true,
    accessToken: null,
    refreshToken: null,
    expireTime: 0,
    ...initialAuth,
  },
});

export const useAuth = () => {
  const [auth, setAuth] = useRecoilState(authAtom);

  useEffect(() => {
    const authData = window?.localStorage.getItem(
      ENVIRONMENTS.LOCAL_STORAGE_KEY as string,
    );
    let authObj = {};
    if (authData) {
      authObj = JSON.parse(authData);
    }
    setAuth({
      ...auth,
      ...authObj,
      loading: false,
    });
  }, []);

  return {
    auth,
  };
};
