export type tableData = Root2;

export interface Root2 {
  id: number;
  method: string;
  description: string;
  display: 'ON' | 'OFF';
  status?: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
  image: Image;
}

export interface Image {
  id: number;
  originalname: string;
  mimetype: string;
  size: number;
  key: string;
  url: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
}

export interface IImage {
  id: number;
  originalname: string;
  mimetype: string;
  size: number;
  key: string;
  url: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUploadImage {
  originalname: string;

  mimetype: string;

  size: number;

  uploadedBy: UploadedBy;

  key: string;

  url: string;

  id: number;

  createdAt: string;

  updatedAt: string;
}

export interface UploadedBy {
  id: number;

  phone: string;

  username: string;

  email: string;

  fullName: string;

  points: number;

  promotionPoints: number;

  dateOfBirth: string;

  gender: string;

  referralCode: string;

  identificationCode: string;

  address: string;

  status: string;

  lastLogin: string;

  createdAt: string;

  updatedAt: string;

  deletedAt: any;

  roles: Role[];

  kyc: Kyc[];

  avatar: any;
}

export interface Role {
  id: number;

  name: string;

  description: string;

  isActive: boolean;

  deleteable: boolean;

  createdAt: string;

  updatedAt: string;
}

export interface Kyc {
  id: number;

  fullName: string;

  dateOfBirth: string;

  countryName: string;

  countryCode: string;

  isVerified: boolean;

  identificationCode: string;

  status: string;

  kycType: string;

  verifiedAt: string;

  updatedBy: number;

  createdAt: string;

  updatedAt: string;

  frontPhoto: any;

  backPhoto: any;
}
export interface IQueryPayment {
  page?: number | 1;
  pageSize?: Number | 10;
  sortBy?: string | 'id' | 'method' | 'createdAt' | 'updatedAt';
  orderBy?: string | 'ACS' | 'DESC';
  method?: string;
  status?: 'ACTIVE' | 'INACTIVE' | string;
  display?: string | 'ON' | 'OFF';
}
