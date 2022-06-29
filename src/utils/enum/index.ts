export enum StatusKyc {
  NOT_VERIFIED = 'NOT_VERIFIED',
  PENDING = 'PENDING',
  VERIFIED = 'VERIFIED',
  CANCELED = 'CANCELED',
}

export enum StatusAccount {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}
export enum Applicable {
  ALL = 'ALL',
  USER = 'USER',
}

export enum KycType {
  IDENTIFY_CARD = 'IDENTIFY_CARD',
  PASSPORT = 'PASSPORT',
  DRIVING_LICENSE = 'DRIVING_LICENSE',
}

export enum KycPhotoType {
  FRONT_PHOTO = 'FRONT_PHOTO',
  BACK_PHOTO = 'BACK_PHOTO',
}
