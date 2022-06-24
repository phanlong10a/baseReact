import { ENVIRONMENTS } from '@/utils/constant';
import { privateRequest, request } from '@/utils/apis';
import TokenManagement from '@/utils/apis/TokenManagement';
const getPaymentMethodById = (id: string): string => `/payment/method/${id}`;
const deletePaymentMethod = (id: string): string => `/payment/${id}`;
export const API_PAYMENT = {
  CREATE: '/payment/method',
  GET_ACTIVE: '/payment/method',
  GET_ALL: '/payment/method/all',
  GET_ID: getPaymentMethodById,
  UPDATE: getPaymentMethodById,
  DELETE: deletePaymentMethod,
};
export const API_FILE = {
  FILE: '/file',
  FILE_ID: (id: number): string => `/file/${id}`,
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

const createFile = async (file: File) => {
  const form = new FormData();
  form.append('files', file);
  return privateRequest(request.post, API_FILE.FILE, {
    data: form,
  })
    .then((result) => {
      return result;
    })
    .catch((er) => Promise.reject(er));
};
export { createFile };

export interface IGetFile {
  page?: number;
  pageSize?: number;
  sortBy?: 'id' | 'originalname' | 'mimetype' | 'createdAt' | 'updatedAt';
  orderBy?: 'ASC' | 'DESC';
  name?: string;
}
const getFile = (params?: IGetFile) => {
  return privateRequest(request.get, API_FILE.FILE, {
    params,
  })
    .then((result) => {
      return result;
    })
    .catch((er) => Promise.reject(er));
};
export { getFile };

const getFileId = (id: number) => {
  return privateRequest(request.get, API_FILE.FILE_ID(id))
    .then((result) => {
      return result;
    })
    .catch((er) => Promise.reject(er));
};
export { getFileId };

const deleteFileId = async (id: number) => {
  return privateRequest(request.delete, API_FILE.FILE_ID(id))
    .catch((er) => {
      console.log(er);
      return Promise.reject(er);
    })
    .then((result) => {
      return result;
    });
};
export { deleteFileId };
export interface IMethod {
  imageId: number;
  method: string;
  description: string;
  isActive: boolean;
  display: 'ON' | 'OFF';
}
const createPayment = (method: IMethod) => {
  return privateRequest(request.post, API_PAYMENT.CREATE, {
    data: method,
  })
    .then((result) => {
      return result;
    })
    .catch((er) => Promise.reject(er));
};
export { createPayment };

export interface IUpdateMethod {
  description: string;
  isActive: boolean;
  display: 'ON' | 'OFF';
}

const editPayment = (method: IUpdateMethod, id: number) => {
  const url = API_PAYMENT.UPDATE(String(id));
  return privateRequest(request.put, url, {
    data: method,
  })
    .then((result) => {
      return result;
    })
    .catch((er) => Promise.reject(er));
};
export { editPayment };

const deletePayment = (id: number) => {
  const url = API_PAYMENT.UPDATE(String(id));
  return privateRequest(request.delete, url, {})
    .then((result) => {
      return result;
    })
    .catch((er) => Promise.reject(er));
};
export { deletePayment };

interface IGetAllPayment {
  page?: number;
  pageSize?: number;
  SortBy?: 'id' | 'method' | 'createdAt' | 'updatedAt';
  orderby?: 'ASC' | 'DESC';
  method?: string;
  isActive?: boolean;
  display?: 'ON' | 'OFF';
}
const getAllPayment = (params: IGetAllPayment) => {
  return privateRequest(request, API_PAYMENT.GET_ALL, {
    params,
  });
};
export { getAllPayment };
