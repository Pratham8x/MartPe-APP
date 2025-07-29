export interface SearchProductsResponseType {
  total: number;
  results: ProductSearchResult[];
  aggregations: ProductSearchAggregations;
}

export interface ProductSearchResult {
  symbol: string;
  code?: string;
  store_status: string;
  rating?: number;
  customizable: boolean;
  directlyLinkedCustomGroupIds?: string[];
  type: string;
  unitized?: Unitized;
  location_id: string;
  category_id: string;
  price: Price;
  priceRangeDefault?: number;
  status_timestamp: string;
  common_name?: string;
  brand?: string;
  slug: string;
  tts_in_h?: number;
  store_id: string;
  images?: string[];
  quantity: number;
  diet_type?: string;
  store: Store;
  gps: Gps;
  provider_status_timestamp: string;
  catalog_id: string;
  store_status_timestamp: string;
  provider_status: string;
  vendor_id: string;
  domain: string;
  name: string;
  provider_id: string;
  short_desc?: string;
  status: string;
  instock: boolean;
  distance_in_km: number;
  recommended?: boolean;
}

export interface Unitized {
  measure?: Measure;
}

export interface Measure {
  unit?: string;
  value?: string;
}

export interface Price {
  currency: string;
  value: number;
  range?: Range;
  default_selection?: DefaultSelection;
  maximum_value?: number;
  offerPercent?: number;
}

export interface Range {
  lower: string;
  upper: string;
}

export interface DefaultSelection {
  value: string;
  maximum_value: string;
}

export interface Store {
  symbol: string;
  address: Address;
  name: string;
  rating?: number;
  slug: string;
}

export interface Address {
  city: string;
  street?: string;
  area_code: string;
  locality?: string;
  state: string;
}

export interface Gps {
  lon: number;
  lat: number;
}

export interface ProductSearchAggregations {
  connectivity: Connectivity;
  gender: Gender;
  size: Size;
  color: Color;
  fabric: Fabric;
  cpu: Cpu;
  screen_size: ScreenSize;
  model: Model;
  storage: Storage;
  category: Category;
  brand: Brand;
  ram: Ram;
}

export interface Connectivity {
  doc_count_error_upper_bound: number;
  sum_other_doc_count: number;
  buckets: any[];
}

export interface Gender {
  doc_count_error_upper_bound: number;
  sum_other_doc_count: number;
  buckets: any[];
}

export interface Size {
  doc_count_error_upper_bound: number;
  sum_other_doc_count: number;
  buckets: any[];
}

export interface Color {
  doc_count_error_upper_bound: number;
  sum_other_doc_count: number;
  buckets: any[];
}

export interface Fabric {
  doc_count_error_upper_bound: number;
  sum_other_doc_count: number;
  buckets: any[];
}

export interface Cpu {
  doc_count_error_upper_bound: number;
  sum_other_doc_count: number;
  buckets: any[];
}

export interface ScreenSize {
  doc_count_error_upper_bound: number;
  sum_other_doc_count: number;
  buckets: any[];
}

export interface Model {
  doc_count_error_upper_bound: number;
  sum_other_doc_count: number;
  buckets: any[];
}

export interface Storage {
  doc_count_error_upper_bound: number;
  sum_other_doc_count: number;
  buckets: any[];
}

export interface Category {
  doc_count_error_upper_bound: number;
  sum_other_doc_count: number;
  buckets: Bucket[];
}

export interface Bucket {
  key: string;
  doc_count: number;
}

export interface Brand {
  doc_count_error_upper_bound: number;
  sum_other_doc_count: number;
  buckets: any[];
}

export interface Ram {
  doc_count_error_upper_bound: number;
  sum_other_doc_count: number;
  buckets: any[];
}
