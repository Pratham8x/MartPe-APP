export interface ApiErrorResponseType {
  error: {
    message: string;
    code?: string;
  };
}

export interface AddressType {
  _id: string;
  user_id: string;
  city: string;
  houseNo: string;
  street: string;
  gps: AddressGpsType;
  lastUsed?: boolean;
  name: string;
  pincode: string;
  state: string;
  type: string;
  phone: string;
  building?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AddressGpsType {
  lat: number;
  lon: number;
}

export interface GeoPointType {
  coordinates: number[];
}
