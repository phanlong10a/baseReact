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
