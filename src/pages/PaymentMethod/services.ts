import { privateRequest, request } from '@/utils/apis';
const getPaymentMethodById = (id: string): string => `/payment/method/${id}`;
const deletePaymentMethod = (id: string): string => `/payment/${id}`;
const API_PAYMENT = {
  CREATE: '/payment/method',
  GET_ACTIVE: '/payment/method',
  GET_ALL: '/payment/method/all',
  GET_ID: getPaymentMethodById,
  UPDATE: getPaymentMethodById,
  DELETE: deletePaymentMethod,
};
const API_FILE = {
  FILE: '/file',
  FILE_ID: (id: string): string => `/file/${id}`,
};
const createFile = (file: any) => {
  return privateRequest(request.post, API_FILE.FILE, {
    data: file,
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
