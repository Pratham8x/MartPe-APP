import { AddressType } from '../common-types';

export interface FetchUserType {
  _id: string;
  firstName: string;
  lastName?: string;
  phoneNumber: string;
  email?: string;
  countryCode?: string;

  createdAt: string;
  updatedAt: string;
  fav_items: string[];
  fav_stores: string[];
  savedAddresses: AddressType[];
  cart_items: CartItemStateType[];
  cartItemsCount: number;
  // cartTotalPrice: number;
}

export interface CartItemStateType {
  _id: string;
  product_slug: string;
  store_id: string;
  qty: number;
  total_price: number;
  selected_customizations?: SelectedCustomizationType[];
}

export interface SelectedCustomizationType {
  groupId: string;
  name: string;
  optionId: string;
}
