export type tableData = Root2;

export interface Root2 {
  id: number;
  method: string;
  description: string;
  isActive: boolean;
  display: 'ON' | 'OFF';
  status: string;
  createdAt: string;
  updatedAt: string;
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
