export interface AllCartsType {
  getAllCarts: Cart[];
}
export interface Cart {
  id: string;
  items: Item[];
  store: Store;
  customizations: any;
}

export interface Item {
  itemId: string;
  quantity: number;
  details: Details;
}

export interface Details {
  descriptor: Descriptor;
  price: Price;
}

export interface Descriptor {
  name: string;
  symbol: string;
}

export interface Price {
  value: number;
}

export interface Store {
  id: string;
  descriptor: Descriptor2;
  domain: string;
  geoLocation: GeoLocation;
}

export interface Descriptor2 {
  name: string;
  symbol: string;
}

export interface GeoLocation {
  lat: number;
  lng: number;
}
