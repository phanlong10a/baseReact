import { privateRequest, request } from '@/utils/apis';
const getPaymentMethodById = (id: string): string => `/payment/method${id}`;
const deletePaymentMethod = (id: string): string => `/payment/${id}`;
const API_PAYMENT = {
  CREATE: '/payment/method',
  GET_ACTIVE: '/payment/method',
  GET_ALL: '/payment/method/all',
  GET_ID: getPaymentMethodById,
  UPDATE: getPaymentMethodById,
  DELETE: deletePaymentMethod,
};
interface IMethod {
  imageId: number;
  method: string;
  description: string;
  isActive: boolean;
  display: 'ON' | 'OFF';
}
const createPayment = (method: IMethod) => {
  return privateRequest(API_PAYMENT.CREATE, {
    data: method,
    method: 'POST',
  });
};
export { createPayment };

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
  return privateRequest(API_PAYMENT.GET_ALL, {
    params,
  });
};
export { getAllPayment };
