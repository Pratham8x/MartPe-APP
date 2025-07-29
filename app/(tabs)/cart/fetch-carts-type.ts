export type FetchCartsType = FetchCartType[];

export interface FetchCartType {
  _id: string;
  cart_items: CartItemType[];
  cartItemsCount: number;
  cartTotalPrice: number;
  updatedAt: string;
  store: FetchCartStore;
}

export interface CartItemType {
  _id: string;
  product_slug: string;
  catalog_id: string;
  qty: number;
  unit_price: number;
  total_price: number;
  unit_max_price: number;
  total_max_price: number;
  customizable: boolean;
  product: Product;
  createdAt: string;
  updatedAt: string;
  user_id: string;
  store_id: string;
  customization_hash?: string;
  selected_customizations?: SelectedCustomization[];
  dynamicId?: string;
}

interface Product {
  slug: string;
  parent_item_id?: string;
  name: string;
  symbol: string;
  price: Price;
  quantity: number;
  instock: boolean;
  customizable: boolean;
  diet_type?: string;
  domain: string;
  category_id: string;
  cod: boolean;
  cancellable: boolean;
  returnable: boolean;
  directlyLinkedCustomGroupIds?: string[];
}

interface Price {
  currency: string;
  value: number;

  maximum_value?: number;
  offerPercent?: number;
}

interface SelectedCustomization {
  groupId: string;
  name: string;
  optionId: string;
}

export interface FetchCartStore {
  _id: string;
  address: Address;
  avg_tts_in_h: number;
  context: FetchCartStoreContext;
  deliveryTimings?: DeliveryTiming[];
  domain: string;
  fssai_license_no?: string;
  gps: Gps;
  holidays: any[];

  itemsAt: number;
  location_id: string;
  long_desc: string;
  maxRadius: number;
  max_tts_in_h: number;
  name: string;
  orderTimings?: OrderTiming[];
  provider_id: string;
  provider_status: string;

  rating: number;
  short_desc: string;
  slug: string;
  status: string;

  symbol: string;
  type: string;
  vendor_id: string;
  maxStoreItemOfferPercent?: number;

  createdAt: string;
  updatedAt: string;

  offers: any[];
}

interface Address {
  locality?: string;
  street?: string;
  city: string;
  area_code: string;
  state: string;
}

export interface FetchCartStoreContext {
  domain: string;
  country: string;
  city: string;
  core_version: string;
  bpp_id: string;
  bpp_uri: string;
}

interface DeliveryTiming {
  day: number;
  time_from: string;
  time_to: string;
  type: string;
}

interface Gps {
  lat: number;
  lon: number;
}

interface OrderTiming {
  day: number;
  time_range: {
    gte: string;
    lte: string;
  };
}
