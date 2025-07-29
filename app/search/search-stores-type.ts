import { StoreCardOfferType } from "/(tabs)/home/fetch-home-type";

export interface SearchStoresResponseType {
  total: number;
  results: StoreSearchResult[];
}

export interface StoreSearchResult {
  symbol: string;
  orderTimings?: OrderTiming[];
  rating?: number;
  store_sub_categories?: string[];
  type: string;
  location_id: string;
  holidays?: any[];
  avg_tts_in_h?: number;
  status_timestamp: string;
  offers?: StoreCardOfferType[];
  slug: string;
  images?: string[];
  address: Address;
  orderDays?: number[];
  gps: Gps;
  menu?: any[];
  provider_status_timestamp: string;
  itemsAt?: number;
  max_tts_in_h?: number;
  provider_status: string;
  vendor_id: string;
  domain: string;
  name: string;
  provider_id: string;
  short_desc: string;
  status: string;
  distance_in_km: number;
  maxStoreItemOfferPercent?: number;
}

export interface OrderTiming {
  day: number;
  time_range: {
    gte: string;
    lte: string;
  };
}

export interface OrderTiming {
  time_to: string;
  time_from: string;
  type: string;
  day: number;
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
