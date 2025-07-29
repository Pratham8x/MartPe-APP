/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  JsonString: { input: any; output: any; }
};

export type AddressLinesInputType = {
  line1: Scalars['String']['input'];
  line2?: InputMaybe<Scalars['String']['input']>;
};

export type AddressLinesType = {
  __typename?: 'AddressLinesType';
  line1: Scalars['String']['output'];
  line2?: Maybe<Scalars['String']['output']>;
};

export enum AddressType {
  FriendsAndFamily = 'FriendsAndFamily',
  Home = 'Home',
  Other = 'Other',
  Work = 'Work'
}

export type Admin = {
  __typename?: 'Admin';
  allowedEntities?: Maybe<Scalars['String']['output']>;
  countryCode?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  dob?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  isActive?: Maybe<Scalars['Boolean']['output']>;
  isDeleted?: Maybe<Scalars['Boolean']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export enum AllowedEntities {
  All = 'All',
  Catalog = 'Catalog',
  Mixed = 'Mixed',
  Orders = 'Orders',
  Payments = 'Payments'
}

export type BreakupItemPrice = {
  __typename?: 'BreakupItemPrice';
  currency: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type BreakupItemQuantity = {
  __typename?: 'BreakupItemQuantity';
  available: BreakupItemQuantityAvailable;
  maximum: BreakupItemQuantityMaximum;
};

export type BreakupItemTagsList = {
  __typename?: 'BreakupItemTagsList';
  code: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type BreakupOndcOrgItemQuantity = {
  __typename?: 'BreakupOndcOrgItemQuantity';
  count: Scalars['Int']['output'];
};

export type Cart = {
  __typename?: 'Cart';
  createdAt: Scalars['DateTime']['output'];
  customizations?: Maybe<Array<CartCustomItemType>>;
  id: Scalars['String']['output'];
  items: Array<CartItem>;
  store?: Maybe<Store>;
  updatedAt: Scalars['DateTime']['output'];
};

export type CartCustomItemIdsOnlyType = {
  __typename?: 'CartCustomItemIdsOnlyType';
  baseItemId: Scalars['String']['output'];
  itemId: Scalars['String']['output'];
  quantity: Scalars['Int']['output'];
};

export type CartCustomItemInputType = {
  /** mongodb id of the option selected */
  id: Scalars['String']['input'];
  /** selected quantity of the option selected */
  quantity: Scalars['Int']['input'];
};

export type CartCustomItemType = {
  __typename?: 'CartCustomItemType';
  baseItemId: Scalars['String']['output'];
  details?: Maybe<CustomItemDetail>;
  itemId: Scalars['String']['output'];
  quantity: Scalars['Int']['output'];
};

export type CartItem = {
  __typename?: 'CartItem';
  details?: Maybe<CartItemDetailsType>;
  itemId: Scalars['String']['output'];
  quantity: Scalars['Int']['output'];
};

export type CartItemDetailsType = CatalogInterface & CatalogsCardInterface & {
  __typename?: 'CartItemDetailsType';
  attributes?: Maybe<Scalars['JsonString']['output']>;
  bpp_id: Scalars['String']['output'];
  catalog_id: Scalars['String']['output'];
  category_id?: Maybe<Scalars['String']['output']>;
  category_ids?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  city_code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  custom_group?: Maybe<Array<Scalars['String']['output']>>;
  customizable: Scalars['Boolean']['output'];
  descriptor: Descriptor;
  domain: Scalars['String']['output'];
  domainName: Scalars['String']['output'];
  geoLocation?: Maybe<GeoLocationType>;
  hyperLocal: Scalars['Boolean']['output'];
  location_id: Scalars['String']['output'];
  meta: CatalogsMeta;
  non_veg?: Maybe<Scalars['Boolean']['output']>;
  panIndia: Scalars['Boolean']['output'];
  parent_item_id?: Maybe<Scalars['String']['output']>;
  price: CatalogsPrice;
  provider_id: Scalars['String']['output'];
  quantity: CatalogsQuantity;
  radius_in_metres?: Maybe<Scalars['Int']['output']>;
  recommended?: Maybe<Scalars['Boolean']['output']>;
  tags?: Maybe<Array<Maybe<CatalogsTags>>>;
  time_to_ship_in_hours?: Maybe<Scalars['Float']['output']>;
  type: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  variants: Array<Scalars['String']['output']>;
  veg?: Maybe<Scalars['Boolean']['output']>;
  vendor_id: Scalars['String']['output'];
  withinCity: Scalars['Boolean']['output'];
};

export type CartItemIdsOnlyType = {
  __typename?: 'CartItemIdsOnlyType';
  itemId: Scalars['String']['output'];
  quantity: Scalars['Int']['output'];
};

export type CartWithIdsOnlyType = {
  __typename?: 'CartWithIdsOnlyType';
  createdAt: Scalars['DateTime']['output'];
  customizations?: Maybe<Array<CartCustomItemIdsOnlyType>>;
  id: Scalars['String']['output'];
  items: Array<CartItemIdsOnlyType>;
  storeId: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['String']['output'];
};

export type Catalog = CatalogInterface & CatalogProviderInterface & CatalogsCardInterface & {
  __typename?: 'Catalog';
  attributes?: Maybe<Scalars['JsonString']['output']>;
  bpp_id: Scalars['String']['output'];
  catalog_id: Scalars['String']['output'];
  category_id?: Maybe<Scalars['String']['output']>;
  category_ids?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  city_code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  custom_group?: Maybe<Array<Scalars['String']['output']>>;
  customizable: Scalars['Boolean']['output'];
  descriptor: Descriptor;
  domain: Scalars['String']['output'];
  domainName: Scalars['String']['output'];
  geoLocation?: Maybe<GeoLocationType>;
  hyperLocal: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  location_id: Scalars['String']['output'];
  meta: CatalogsMeta;
  non_veg?: Maybe<Scalars['Boolean']['output']>;
  panIndia: Scalars['Boolean']['output'];
  parent_item_id?: Maybe<Scalars['String']['output']>;
  price: CatalogsPrice;
  provider?: Maybe<Vendor>;
  provider_id: Scalars['String']['output'];
  quantity: CatalogsQuantity;
  radius_in_metres?: Maybe<Scalars['Int']['output']>;
  recommended?: Maybe<Scalars['Boolean']['output']>;
  tags?: Maybe<Array<Maybe<CatalogsTags>>>;
  time_to_ship_in_hours?: Maybe<Scalars['Float']['output']>;
  type: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  variants: Array<Scalars['String']['output']>;
  veg?: Maybe<Scalars['Boolean']['output']>;
  vendor_id: Scalars['String']['output'];
  withinCity: Scalars['Boolean']['output'];
};

export type CatalogFilterInputType = {
  non_veg?: InputMaybe<Scalars['Boolean']['input']>;
  recommended?: InputMaybe<Scalars['Boolean']['input']>;
  veg?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CatalogInterface = {
  bpp_id: Scalars['String']['output'];
  catalog_id: Scalars['String']['output'];
  category_ids?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  city_code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  domainName: Scalars['String']['output'];
  geoLocation?: Maybe<GeoLocationType>;
  hyperLocal: Scalars['Boolean']['output'];
  location_id: Scalars['String']['output'];
  panIndia: Scalars['Boolean']['output'];
  parent_item_id?: Maybe<Scalars['String']['output']>;
  provider_id: Scalars['String']['output'];
  radius_in_metres?: Maybe<Scalars['Int']['output']>;
  tags?: Maybe<Array<Maybe<CatalogsTags>>>;
  type: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  variants: Array<Scalars['String']['output']>;
  withinCity: Scalars['Boolean']['output'];
};

export type CatalogProviderInterface = {
  id: Scalars['String']['output'];
  provider?: Maybe<Vendor>;
};

export type CatalogsCard = CatalogsCardInterface & {
  __typename?: 'CatalogsCard';
  attributes?: Maybe<Scalars['JsonString']['output']>;
  category_id?: Maybe<Scalars['String']['output']>;
  custom_group?: Maybe<Array<Scalars['String']['output']>>;
  customizable: Scalars['Boolean']['output'];
  descriptor: Descriptor;
  domain: Scalars['String']['output'];
  id: Scalars['String']['output'];
  meta: CatalogsMeta;
  non_veg?: Maybe<Scalars['Boolean']['output']>;
  price: CatalogsPrice;
  quantity: CatalogsQuantity;
  recommended?: Maybe<Scalars['Boolean']['output']>;
  time_to_ship_in_hours?: Maybe<Scalars['Float']['output']>;
  veg?: Maybe<Scalars['Boolean']['output']>;
  vendor_id: Scalars['String']['output'];
};

export type CatalogsCardInterface = {
  attributes?: Maybe<Scalars['JsonString']['output']>;
  category_id?: Maybe<Scalars['String']['output']>;
  custom_group?: Maybe<Array<Scalars['String']['output']>>;
  customizable: Scalars['Boolean']['output'];
  descriptor: Descriptor;
  domain: Scalars['String']['output'];
  meta: CatalogsMeta;
  non_veg?: Maybe<Scalars['Boolean']['output']>;
  price: CatalogsPrice;
  quantity: CatalogsQuantity;
  recommended?: Maybe<Scalars['Boolean']['output']>;
  time_to_ship_in_hours?: Maybe<Scalars['Float']['output']>;
  veg?: Maybe<Scalars['Boolean']['output']>;
  vendor_id: Scalars['String']['output'];
};

export type CatalogsMeta = {
  __typename?: 'CatalogsMeta';
  ondc_org_available_on_cod?: Maybe<Scalars['Boolean']['output']>;
  ondc_org_cancellable?: Maybe<Scalars['Boolean']['output']>;
  ondc_org_contact_details_consumer_care?: Maybe<Scalars['String']['output']>;
  ondc_org_fssai_license_no?: Maybe<Scalars['String']['output']>;
  ondc_org_mandatory_reqs_veggies_fruits?: Maybe<MandatoryReqsVeggiesFruits>;
  ondc_org_return_window?: Maybe<Scalars['String']['output']>;
  ondc_org_returnable?: Maybe<Scalars['Boolean']['output']>;
  ondc_org_seller_pickup_return?: Maybe<Scalars['Boolean']['output']>;
  ondc_org_statutory_reqs_packaged_commodities?: Maybe<StatutoryReqsPackagedCommodities>;
  ondc_org_statutory_reqs_prepackaged_food?: Maybe<StatutoryReqsPrepackagedFood>;
  ondc_org_time_to_ship?: Maybe<Scalars['String']['output']>;
};

export type CatalogsPrice = {
  __typename?: 'CatalogsPrice';
  maximum_value?: Maybe<Scalars['Float']['output']>;
  offer_percent?: Maybe<Scalars['Float']['output']>;
  offer_value?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

export type CatalogsQuantity = {
  __typename?: 'CatalogsQuantity';
  available?: Maybe<CatalogsQuantityAvailable>;
  maximum?: Maybe<CatalogsQuantityMaximum>;
  unitized?: Maybe<CatalogsQuantityUnitized>;
};

export type CatalogsQuantityAvailable = {
  __typename?: 'CatalogsQuantityAvailable';
  count?: Maybe<Scalars['Int']['output']>;
};

export type CatalogsQuantityMaximum = {
  __typename?: 'CatalogsQuantityMaximum';
  count?: Maybe<Scalars['Int']['output']>;
};

export type CatalogsQuantityUnitized = {
  __typename?: 'CatalogsQuantityUnitized';
  measure?: Maybe<CatalogsQuantityUnitizedMeasure>;
};

export type CatalogsQuantityUnitizedMeasure = {
  __typename?: 'CatalogsQuantityUnitizedMeasure';
  unit?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

export type CatalogsTags = {
  __typename?: 'CatalogsTags';
  code?: Maybe<Scalars['String']['output']>;
  list?: Maybe<Array<Maybe<CatalogsTagsList>>>;
};

export type CatalogsTagsList = {
  __typename?: 'CatalogsTagsList';
  code?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

export type Configuration = {
  __typename?: 'Configuration';
  allowedEntities?: Maybe<Scalars['String']['output']>;
  apiVersion?: Maybe<Scalars['String']['output']>;
  bffPercentage?: Maybe<Scalars['Int']['output']>;
  category?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  cityCode?: Maybe<Scalars['String']['output']>;
  convenienceFee?: Maybe<Scalars['Int']['output']>;
  createdBy?: Maybe<Scalars['String']['output']>;
  dob?: Maybe<Scalars['String']['output']>;
  domain?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  isActive?: Maybe<Scalars['Boolean']['output']>;
  isAllowedCOD?: Maybe<Scalars['Boolean']['output']>;
  isAllowedDebit?: Maybe<Scalars['Boolean']['output']>;
  isAllowedNetbanking?: Maybe<Scalars['Boolean']['output']>;
  isAllowedUpi?: Maybe<Scalars['Boolean']['output']>;
  promoThresholdPercentage?: Maybe<Scalars['Int']['output']>;
};

export type CreatedUser = UserInterface & {
  __typename?: 'CreatedUser';
  countryCode?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  dob?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  token?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CustomItemDetail = CzItemInterface & {
  __typename?: 'CustomItemDetail';
  category_id: Scalars['String']['output'];
  child?: Maybe<CzItemChildType>;
  custom_item_id: Scalars['String']['output'];
  descriptor: CzDescriptorType;
  group: CzItemGroupType;
  price: CatalogsPrice;
  quantity: CatalogsQuantity;
  related: Scalars['Boolean']['output'];
  tags: Array<CatalogsTags>;
  type: Scalars['String']['output'];
};

export type CzConfigType = {
  __typename?: 'CzConfigType';
  input?: Maybe<Scalars['String']['output']>;
  max?: Maybe<Scalars['String']['output']>;
  min?: Maybe<Scalars['String']['output']>;
  seq?: Maybe<Scalars['String']['output']>;
};

export type CzDescriptorType = {
  __typename?: 'CzDescriptorType';
  name: Scalars['String']['output'];
};

export type CzItem = CzItemInterface & {
  __typename?: 'CzItem';
  category_id: Scalars['String']['output'];
  child?: Maybe<CzItemChildType>;
  custom_item_id: Scalars['String']['output'];
  descriptor: CzDescriptorType;
  group: CzItemGroupType;
  id: Scalars['String']['output'];
  price: CatalogsPrice;
  quantity: CatalogsQuantity;
  related: Scalars['Boolean']['output'];
  tags: Array<CatalogsTags>;
  type: Scalars['String']['output'];
};

export type CzItemChildType = {
  __typename?: 'CzItemChildType';
  id: Scalars['String']['output'];
};

export type CzItemGroupType = {
  __typename?: 'CzItemGroupType';
  default?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['String']['output'];
};

export type CzItemInterface = {
  category_id: Scalars['String']['output'];
  child?: Maybe<CzItemChildType>;
  custom_item_id: Scalars['String']['output'];
  descriptor: CzDescriptorType;
  group: CzItemGroupType;
  price: CatalogsPrice;
  quantity: CatalogsQuantity;
  related: Scalars['Boolean']['output'];
  tags: Array<CatalogsTags>;
  type: Scalars['String']['output'];
};

export type CzType = {
  __typename?: 'CzType';
  config?: Maybe<CzConfigType>;
  custom_group_id: Scalars['String']['output'];
  descriptor: CzDescriptorType;
  options: Array<CzItem>;
};

export type Domain = {
  __typename?: 'Domain';
  categories?: Maybe<Array<Maybe<DomainCategory>>>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  domain: Scalars['String']['output'];
  domainColor?: Maybe<Scalars['String']['output']>;
  domainName: Scalars['String']['output'];
  id: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type DomainCategory = {
  __typename?: 'DomainCategory';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  domain: Scalars['String']['output'];
  id: Scalars['String']['output'];
  image_url?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type DomainPageData = {
  __typename?: 'DomainPageData';
  offers: Array<Vendor>;
  stores: Array<VendorCard>;
};

export type FavResponseType = {
  __typename?: 'FavResponseType';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export enum Gender {
  Female = 'Female',
  Male = 'Male',
  Other = 'Other'
}

export type GenerateOtpResponse = {
  __typename?: 'GenerateOTPResponse';
  message?: Maybe<Scalars['String']['output']>;
  orderId?: Maybe<Scalars['String']['output']>;
};

export type GeoLocationType = {
  __typename?: 'GeoLocationType';
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
};

export type Home = {
  __typename?: 'Home';
  offers: Array<Vendor>;
  restaurants: Array<VendorCard>;
  stores: Array<VendorCard>;
};

export type Location = {
  lat: Scalars['Float']['input'];
  lng: Scalars['Float']['input'];
};

export type MandatoryReqsVeggiesFruits = {
  __typename?: 'MandatoryReqsVeggiesFruits';
  net_quantity?: Maybe<Scalars['String']['output']>;
};

export type MartpeOffer = {
  __typename?: 'MartpeOffer';
  announcement?: Maybe<Scalars['String']['output']>;
  city_code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  domain?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  image_url?: Maybe<Scalars['String']['output']>;
  link?: Maybe<Scalars['String']['output']>;
  on_first_orders?: Maybe<Scalars['Boolean']['output']>;
  on_order_max_count?: Maybe<Scalars['Int']['output']>;
  on_product_base?: Maybe<Scalars['Boolean']['output']>;
  pincode?: Maybe<Scalars['String']['output']>;
  product_name?: Maybe<Scalars['String']['output']>;
  provider_id?: Maybe<Scalars['String']['output']>;
  qualifier_amount?: Maybe<Scalars['Int']['output']>;
  threshold_amount?: Maybe<Scalars['Int']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /**  item  */
  addItemToCart?: Maybe<CartWithIdsOnlyType>;
  addProductToFavs?: Maybe<FavResponseType>;
  addVendorToFavs?: Maybe<FavResponseType>;
  /** delete all carts of 1 user */
  clearAllCarts?: Maybe<Scalars['String']['output']>;
  /** delete all items of 1 cart  */
  clearCart?: Maybe<Scalars['String']['output']>;
  createAddress?: Maybe<UserAddress>;
  createAdmin?: Maybe<Admin>;
  createConfiguration?: Maybe<Configuration>;
  createUser?: Maybe<CreatedUser>;
  deleteAddress?: Maybe<UserAddress>;
  deleteConfiguration?: Maybe<Configuration>;
  generateOTP?: Maybe<GenerateOtpResponse>;
  removeItemCustomizationFromCart?: Maybe<CartWithIdsOnlyType>;
  removeItemFromCart?: Maybe<CartWithIdsOnlyType>;
  removeProductFromFavs?: Maybe<FavResponseType>;
  removeVendorFromFavs?: Maybe<FavResponseType>;
  resendOTP?: Maybe<ResendOtpResponse>;
  updateAddress?: Maybe<UserAddress>;
  updateAdmin?: Maybe<Admin>;
  updateConfiguration?: Maybe<Configuration>;
  updateCustomizationQuantity?: Maybe<CartWithIdsOnlyType>;
  updateItemQuantity?: Maybe<CartWithIdsOnlyType>;
  updateUser?: Maybe<UserType>;
  verifyOTP?: Maybe<VerifyOtpResponse>;
};


export type MutationAddItemToCartArgs = {
  customizations?: InputMaybe<Array<CartCustomItemInputType>>;
  itemId: Scalars['String']['input'];
  quantity: Scalars['Int']['input'];
  vendor_id: Scalars['String']['input'];
};


export type MutationAddProductToFavsArgs = {
  productId: Scalars['String']['input'];
};


export type MutationAddVendorToFavsArgs = {
  vendorId: Scalars['String']['input'];
};


export type MutationClearCartArgs = {
  vendor_id: Scalars['String']['input'];
};


export type MutationCreateAddressArgs = {
  address: AddressLinesInputType;
  city: Scalars['String']['input'];
  cityCode?: InputMaybe<Scalars['String']['input']>;
  directions?: InputMaybe<Scalars['String']['input']>;
  geoLocation: Location;
  isDefault?: InputMaybe<Scalars['Boolean']['input']>;
  landmark?: InputMaybe<Scalars['String']['input']>;
  locality?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  pincode: Scalars['String']['input'];
  receiver_phone: Scalars['String']['input'];
  state: Scalars['String']['input'];
  type: AddressType;
};


export type MutationCreateAdminArgs = {
  allowedEntities?: InputMaybe<AllowedEntities>;
  countryCode?: InputMaybe<Scalars['String']['input']>;
  dob?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  gender?: InputMaybe<Gender>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  profileImageUrl?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<RoleType>;
};


export type MutationCreateConfigurationArgs = {
  allowedEntities?: InputMaybe<Scalars['String']['input']>;
  apiVersion?: InputMaybe<Scalars['String']['input']>;
  bffPercentage?: InputMaybe<Scalars['Int']['input']>;
  category?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  cityCode: Scalars['String']['input'];
  convenienceFee?: InputMaybe<Scalars['Int']['input']>;
  createdBy?: InputMaybe<Scalars['String']['input']>;
  dob?: InputMaybe<Scalars['String']['input']>;
  domain: Scalars['String']['input'];
  gender?: InputMaybe<Scalars['String']['input']>;
  isActive: Scalars['Boolean']['input'];
  isAllowedCOD?: InputMaybe<Scalars['Boolean']['input']>;
  isAllowedDebit?: InputMaybe<Scalars['Boolean']['input']>;
  isAllowedNetbanking?: InputMaybe<Scalars['Boolean']['input']>;
  isAllowedUpi?: InputMaybe<Scalars['Boolean']['input']>;
  promoThresholdPercentage?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationCreateUserArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstName: Scalars['String']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeleteAddressArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteConfigurationArgs = {
  id: Scalars['String']['input'];
};


export type MutationGenerateOtpArgs = {
  sendTo: Scalars['String']['input'];
};


export type MutationRemoveItemCustomizationFromCartArgs = {
  all?: Scalars['Boolean']['input'];
  baseItemId: Scalars['String']['input'];
  customItemId: Scalars['String']['input'];
  vendor_id: Scalars['String']['input'];
};


export type MutationRemoveItemFromCartArgs = {
  itemId: Scalars['String']['input'];
  vendor_id: Scalars['String']['input'];
};


export type MutationRemoveProductFromFavsArgs = {
  productId: Scalars['String']['input'];
};


export type MutationRemoveVendorFromFavsArgs = {
  vendorId: Scalars['String']['input'];
};


export type MutationResendOtpArgs = {
  orderId: Scalars['String']['input'];
};


export type MutationUpdateAddressArgs = {
  address?: InputMaybe<AddressLinesInputType>;
  city?: InputMaybe<Scalars['String']['input']>;
  cityCode?: InputMaybe<Scalars['String']['input']>;
  directions?: InputMaybe<Scalars['String']['input']>;
  geoLocation?: InputMaybe<Location>;
  id: Scalars['String']['input'];
  isDefault?: InputMaybe<Scalars['Boolean']['input']>;
  landmark?: InputMaybe<Scalars['String']['input']>;
  locality?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  pincode?: InputMaybe<Scalars['String']['input']>;
  receiver_phone?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<AddressType>;
};


export type MutationUpdateAdminArgs = {
  allowedEntities?: InputMaybe<AllowedEntities>;
  countryCode?: InputMaybe<Scalars['String']['input']>;
  dob?: InputMaybe<Scalars['DateTime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Gender>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  isDeleted?: InputMaybe<Scalars['Boolean']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  profileImageUrl?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<RoleType>;
};


export type MutationUpdateConfigurationArgs = {
  allowedEntities?: InputMaybe<Scalars['String']['input']>;
  apiVersion?: InputMaybe<Scalars['String']['input']>;
  bffPercentage?: InputMaybe<Scalars['Int']['input']>;
  category?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  cityCode?: InputMaybe<Scalars['String']['input']>;
  convenienceFee?: InputMaybe<Scalars['Int']['input']>;
  createdBy?: InputMaybe<Scalars['String']['input']>;
  dob?: InputMaybe<Scalars['String']['input']>;
  domain?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  isAllowedCOD?: InputMaybe<Scalars['Boolean']['input']>;
  isAllowedDebit?: InputMaybe<Scalars['Boolean']['input']>;
  isAllowedNetbanking?: InputMaybe<Scalars['Boolean']['input']>;
  isAllowedUpi?: InputMaybe<Scalars['Boolean']['input']>;
  promoThresholdPercentage?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationUpdateCustomizationQuantityArgs = {
  baseItemId: Scalars['String']['input'];
  customItemId: Scalars['String']['input'];
  customItemQuantity: Scalars['Int']['input'];
  vendor_id: Scalars['String']['input'];
};


export type MutationUpdateItemQuantityArgs = {
  itemId: Scalars['String']['input'];
  quantity: Scalars['Int']['input'];
  vendor_id: Scalars['String']['input'];
};


export type MutationUpdateUserArgs = {
  countryCode?: InputMaybe<Scalars['String']['input']>;
  dob?: InputMaybe<Scalars['DateTime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Gender>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
};


export type MutationVerifyOtpArgs = {
  orderId: Scalars['String']['input'];
  otp: Scalars['String']['input'];
  sendTo: Scalars['String']['input'];
};

export type Order = {
  __typename?: 'Order';
  billingAddress?: Maybe<OrderAddressType>;
  bpp_id: Scalars['String']['output'];
  bpp_uri: Scalars['String']['output'];
  cancellation?: Maybe<OrderCancellationType>;
  cancellation_fee?: Maybe<Array<OrderCancellationFeeType>>;
  cancellation_terms?: Maybe<Array<OrderCancellationTermsType>>;
  cancelled_at?: Maybe<Scalars['String']['output']>;
  city: Scalars['String']['output'];
  completed_at?: Maybe<Scalars['String']['output']>;
  core_version: Scalars['String']['output'];
  country: Scalars['String']['output'];
  customizations?: Maybe<Array<CartCustomItemType>>;
  deliveryAddress: OrderAddressType;
  documents?: Maybe<Array<OrderDocumentsType>>;
  domain: Scalars['String']['output'];
  fulfillments: OrderFulfillmentType;
  id: Scalars['String']['output'];
  items: Array<CartItem>;
  order_status: Scalars['String']['output'];
  payment?: Maybe<OrderPaymentType>;
  placed_at?: Maybe<Scalars['String']['output']>;
  provider_id: Scalars['String']['output'];
  quote: OrderQuote;
  razorpay_order_id?: Maybe<Scalars['String']['output']>;
  razorpay_payment_id?: Maybe<Scalars['String']['output']>;
  razorpay_receipt_id?: Maybe<Scalars['String']['output']>;
  store?: Maybe<Store>;
  storeId: Scalars['String']['output'];
  tags?: Maybe<Array<BreakupItemTags>>;
  transaction_id: Scalars['String']['output'];
  unique_order_id: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type OrderAddressType = {
  __typename?: 'OrderAddressType';
  address: AddressLinesType;
  city: Scalars['String']['output'];
  cityCode?: Maybe<Scalars['String']['output']>;
  directions?: Maybe<Scalars['String']['output']>;
  geoLocation: GeoLocationType;
  landmark?: Maybe<Scalars['String']['output']>;
  locality?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  pincode: Scalars['String']['output'];
  receiver_phone?: Maybe<Scalars['String']['output']>;
  state: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type OrderCancellationFeeAmountType = {
  __typename?: 'OrderCancellationFeeAmountType';
  currency: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type OrderCancellationFeeType = {
  __typename?: 'OrderCancellationFeeType';
  cancellation_fee?: Maybe<OrderCancellationTermsCancellationFeeType>;
  fulfillment_state?: Maybe<OrderCancellationTermsFulfillmentStateType>;
  reason_required?: Maybe<Scalars['Boolean']['output']>;
  refund_eligible?: Maybe<Scalars['Boolean']['output']>;
};

export type OrderCancellationReasonType = {
  __typename?: 'OrderCancellationReasonType';
  id?: Maybe<Scalars['String']['output']>;
  reason?: Maybe<Scalars['String']['output']>;
};

export type OrderCancellationTermsCancellationFeeType = {
  __typename?: 'OrderCancellationTermsCancellationFeeType';
  amount?: Maybe<OrderCancellationFeeAmountType>;
  percentage: Scalars['String']['output'];
};

export type OrderCancellationTermsFulfillmentStateDescriptorType = {
  __typename?: 'OrderCancellationTermsFulfillmentStateDescriptorType';
  code: Scalars['String']['output'];
  short_desc: Scalars['String']['output'];
};

export type OrderCancellationTermsFulfillmentStateType = {
  __typename?: 'OrderCancellationTermsFulfillmentStateType';
  descriptor?: Maybe<OrderCancellationTermsFulfillmentStateDescriptorType>;
};

export type OrderCancellationTermsType = {
  __typename?: 'OrderCancellationTermsType';
  cancellation_fee?: Maybe<OrderCancellationTermsCancellationFeeType>;
  fulfillment_state?: Maybe<OrderCancellationTermsFulfillmentStateType>;
};

export type OrderCancellationType = {
  __typename?: 'OrderCancellationType';
  cancelled_by?: Maybe<Scalars['String']['output']>;
  reason?: Maybe<OrderCancellationReasonType>;
};

export type OrderDocumentsType = {
  __typename?: 'OrderDocumentsType';
  label?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type OrderFulfillmentType = {
  __typename?: 'OrderFulfillmentType';
  agent_assigned?: Maybe<OrderFulfillmentsType>;
  at_destination_hub?: Maybe<OrderFulfillmentsType>;
  cancelled?: Maybe<OrderFulfillmentsType>;
  delivery_failed?: Maybe<OrderFulfillmentsType>;
  in_transit?: Maybe<OrderFulfillmentsType>;
  order_delivered?: Maybe<OrderFulfillmentsType>;
  order_picked_up?: Maybe<OrderFulfillmentsType>;
  out_for_delivery?: Maybe<OrderFulfillmentsType>;
  out_for_pickup?: Maybe<OrderFulfillmentsType>;
  packed?: Maybe<OrderFulfillmentsType>;
  pending?: Maybe<OrderFulfillmentsType>;
  pickup_failed?: Maybe<OrderFulfillmentsType>;
};

export type OrderFulfillmentsAgentType = {
  __typename?: 'OrderFulfillmentsAgentType';
  mobile?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
};

export type OrderFulfillmentsEndContactType = {
  __typename?: 'OrderFulfillmentsEndContactType';
  email?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
};

export type OrderFulfillmentsEndLocationAddressType = {
  __typename?: 'OrderFulfillmentsEndLocationAddressType';
  area_code?: Maybe<Scalars['String']['output']>;
  building?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  locality?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
};

export type OrderFulfillmentsEndLocationType = {
  __typename?: 'OrderFulfillmentsEndLocationType';
  address?: Maybe<OrderFulfillmentsEndLocationAddressType>;
  gps?: Maybe<Scalars['String']['output']>;
};

export type OrderFulfillmentsEndPersonType = {
  __typename?: 'OrderFulfillmentsEndPersonType';
  name?: Maybe<Scalars['String']['output']>;
};

export type OrderFulfillmentsEndType = {
  __typename?: 'OrderFulfillmentsEndType';
  authorization?: Maybe<OrderFulfillmentsStartAuthorizationType>;
  contact?: Maybe<OrderFulfillmentsEndContactType>;
  instructions?: Maybe<OrderFulfillmentsStartInstructionsType>;
  location?: Maybe<OrderFulfillmentsEndLocationType>;
  person?: Maybe<OrderFulfillmentsEndPersonType>;
  time?: Maybe<OrderFulfillmentsStartTimeType>;
};

export type OrderFulfillmentsStartAuthorizationType = {
  __typename?: 'OrderFulfillmentsStartAuthorizationType';
  token?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  valid_from?: Maybe<Scalars['String']['output']>;
  valid_to?: Maybe<Scalars['String']['output']>;
};

export type OrderFulfillmentsStartInstructionsType = {
  __typename?: 'OrderFulfillmentsStartInstructionsType';
  code?: Maybe<Scalars['String']['output']>;
  images?: Maybe<Array<Scalars['String']['output']>>;
  long_desc?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  short_desc?: Maybe<Scalars['String']['output']>;
};

export type OrderFulfillmentsStartTimeRangeType = {
  __typename?: 'OrderFulfillmentsStartTimeRangeType';
  end?: Maybe<Scalars['String']['output']>;
  start?: Maybe<Scalars['String']['output']>;
};

export type OrderFulfillmentsStartTimeType = {
  __typename?: 'OrderFulfillmentsStartTimeType';
  range?: Maybe<OrderFulfillmentsStartTimeRangeType>;
  timestamp?: Maybe<Scalars['String']['output']>;
};

export type OrderFulfillmentsStartType = {
  __typename?: 'OrderFulfillmentsStartType';
  authorization?: Maybe<OrderFulfillmentsStartAuthorizationType>;
  contact?: Maybe<OrderFulfillmentsEndContactType>;
  instructions?: Maybe<OrderFulfillmentsStartInstructionsType>;
  location?: Maybe<OrderFulfillmentsEndLocationType>;
  time?: Maybe<OrderFulfillmentsStartTimeType>;
};

export type OrderFulfillmentsStateDescriptorType = {
  __typename?: 'OrderFulfillmentsStateDescriptorType';
  code?: Maybe<Scalars['String']['output']>;
};

export type OrderFulfillmentsStateType = {
  __typename?: 'OrderFulfillmentsStateType';
  descriptor?: Maybe<OrderFulfillmentsStateDescriptorType>;
};

export type OrderFulfillmentsType = {
  __typename?: 'OrderFulfillmentsType';
  agent?: Maybe<OrderFulfillmentsAgentType>;
  end?: Maybe<OrderFulfillmentsEndType>;
  id?: Maybe<Scalars['String']['output']>;
  ondc_org_TAT?: Maybe<Scalars['String']['output']>;
  ondc_org_category?: Maybe<Scalars['String']['output']>;
  ondc_org_provider_name?: Maybe<Scalars['String']['output']>;
  rateable?: Maybe<Scalars['Boolean']['output']>;
  start?: Maybe<OrderFulfillmentsStartType>;
  state?: Maybe<OrderFulfillmentsStateType>;
  tags?: Maybe<Array<BreakupItemTags>>;
  tracking?: Maybe<Scalars['Boolean']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  vehicle?: Maybe<OrderFulfillmentsVehicleType>;
};

export type OrderFulfillmentsVehicleType = {
  __typename?: 'OrderFulfillmentsVehicleType';
  registration?: Maybe<Scalars['String']['output']>;
};

export type OrderPaymentParamsType = {
  __typename?: 'OrderPaymentParamsType';
  amount?: Maybe<Scalars['String']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  transaction_id?: Maybe<Scalars['String']['output']>;
};

export type OrderPaymentType = {
  __typename?: 'OrderPaymentType';
  collected_by?: Maybe<Scalars['String']['output']>;
  ondc_org_buyer_app_finder_fee_amount?: Maybe<Scalars['String']['output']>;
  ondc_org_buyer_app_finder_fee_type?: Maybe<Scalars['String']['output']>;
  ondc_org_settlement_basis?: Maybe<Scalars['String']['output']>;
  ondc_org_settlement_details?: Maybe<Array<OrderSettlementDetailsType>>;
  ondc_org_settlement_window?: Maybe<Scalars['String']['output']>;
  ondc_org_withholding_amount?: Maybe<Scalars['String']['output']>;
  params?: Maybe<OrderPaymentParamsType>;
  status?: Maybe<Scalars['String']['output']>;
  tl_method?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  uri?: Maybe<Scalars['String']['output']>;
};

export type OrderQuote = {
  __typename?: 'OrderQuote';
  breakup: Array<OrderQuoteBreakup>;
  price: OrderQuotePrice;
  ttl?: Maybe<Scalars['String']['output']>;
};

export type OrderQuoteBreakup = {
  __typename?: 'OrderQuoteBreakup';
  details?: Maybe<QuoteBreakupItem>;
  id?: Maybe<Scalars['String']['output']>;
  price?: Maybe<QuoteBreakupPrice>;
  quantity?: Maybe<BreakupOndcOrgItemQuantity>;
  title: Scalars['String']['output'];
  type?: Maybe<Scalars['String']['output']>;
};

export type OrderQuotePrice = {
  __typename?: 'OrderQuotePrice';
  currency: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type OrderSettlementDetailsType = {
  __typename?: 'OrderSettlementDetailsType';
  bank_name?: Maybe<Scalars['String']['output']>;
  beneficiary_name?: Maybe<Scalars['String']['output']>;
  branch_name?: Maybe<Scalars['String']['output']>;
  settlement_bank_account_no?: Maybe<Scalars['String']['output']>;
  settlement_counterparty?: Maybe<Scalars['String']['output']>;
  settlement_ifsc_code?: Maybe<Scalars['String']['output']>;
  settlement_phase?: Maybe<Scalars['String']['output']>;
  settlement_type?: Maybe<Scalars['String']['output']>;
  upi_address?: Maybe<Scalars['String']['output']>;
};

export type ProductsByVendorResponseType = {
  __typename?: 'ProductsByVendorResponseType';
  products: Array<CatalogsCard>;
  total: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  getAddressById?: Maybe<UserAddress>;
  getAdminById?: Maybe<Admin>;
  getAllAddresses: Array<UserAddress>;
  getAllCarts: Array<Cart>;
  getAllCartsIds: Array<CartWithIdsOnlyType>;
  getAllConfigurations?: Maybe<Array<Configuration>>;
  getAllDomainsInfo?: Maybe<Array<Maybe<Domain>>>;
  getAllMartpeOffers?: Maybe<Array<Maybe<MartpeOffer>>>;
  getAllOrders?: Maybe<Array<Order>>;
  getAllOrdersByUser?: Maybe<Array<Order>>;
  getAllReasonCodes?: Maybe<Array<Maybe<ReasonCode>>>;
  getCart?: Maybe<Cart>;
  getConfigurationById?: Maybe<Configuration>;
  getConfigurationsByCityCode?: Maybe<Array<Configuration>>;
  getConfigurationsByDomain?: Maybe<Array<Configuration>>;
  getCustomizations: Array<CzType>;
  getDomainInfo?: Maybe<Domain>;
  getDomainPageData: DomainPageData;
  getHome: Home;
  getMartpeOfferById?: Maybe<MartpeOffer>;
  getMartpeOffersByCityCode?: Maybe<Array<Maybe<MartpeOffer>>>;
  getMartpeOffersByDomain?: Maybe<Array<Maybe<MartpeOffer>>>;
  getOrderById?: Maybe<Order>;
  getProductById?: Maybe<Catalog>;
  getProductByVendor: ProductsByVendorResponseType;
  getReasonCodeByCode?: Maybe<ReasonCode>;
  getReasonCodeById?: Maybe<ReasonCode>;
  getSearchPageData?: Maybe<SearchPageData>;
  getSearchSuggestion?: Maybe<SearchSuggestion>;
  getUserById?: Maybe<UserType>;
  getUserFavourites: UserFavouritesType;
  getUserFavouritesWithDetails: UserFavWithDetailsType;
  getVariants: Array<Catalog>;
  getVendorById?: Maybe<Vendor>;
  me?: Maybe<VerifyOtpUserData>;
  searchStoreItems: Array<CatalogsCard>;
  verifyAdmin?: Maybe<VerifyAdminResponseType>;
};


export type QueryGetAddressByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetAdminByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetAllCartsArgs = {
  withItemDetails?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryGetCartArgs = {
  storeId: Scalars['String']['input'];
  withItemDetails?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryGetConfigurationByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetConfigurationsByCityCodeArgs = {
  cityCode: Scalars['String']['input'];
};


export type QueryGetConfigurationsByDomainArgs = {
  domain: Scalars['String']['input'];
};


export type QueryGetCustomizationsArgs = {
  custom_group: Array<Scalars['String']['input']>;
  vendor_id: Scalars['String']['input'];
};


export type QueryGetDomainInfoArgs = {
  domain: Scalars['String']['input'];
};


export type QueryGetDomainPageDataArgs = {
  cityCode: Scalars['String']['input'];
  domain: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  loc: Location;
  offer_above?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  radius?: InputMaybe<Scalars['Int']['input']>;
  storeCategory?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetHomeArgs = {
  cityCode: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  loc: Location;
  radius?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetMartpeOfferByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetMartpeOffersByCityCodeArgs = {
  city_code: Scalars['String']['input'];
};


export type QueryGetMartpeOffersByDomainArgs = {
  domain: Scalars['String']['input'];
};


export type QueryGetOrderByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetProductByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetProductByVendorArgs = {
  getTotal?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  vendor_id: Scalars['String']['input'];
};


export type QueryGetReasonCodeByCodeArgs = {
  code: Scalars['String']['input'];
};


export type QueryGetReasonCodeByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetSearchPageDataArgs = {
  cityCode: Scalars['String']['input'];
  domain?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  loc: Location;
  query: Scalars['String']['input'];
};


export type QueryGetSearchSuggestionArgs = {
  cityCode: Scalars['String']['input'];
  domain?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  loc: Location;
  query: Scalars['String']['input'];
};


export type QueryGetUserByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetVariantsArgs = {
  parent_item_id: Scalars['String']['input'];
  vendor_id: Scalars['String']['input'];
};


export type QueryGetVendorByIdArgs = {
  id: Scalars['String']['input'];
};


export type QuerySearchStoreItemsArgs = {
  filterBy?: InputMaybe<CatalogFilterInputType>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  sortOrder?: InputMaybe<SortOrderType>;
  vendor_id: Scalars['String']['input'];
};


export type QueryVerifyAdminArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type QuoteBreakupItem = {
  __typename?: 'QuoteBreakupItem';
  parent_item_id?: Maybe<Scalars['String']['output']>;
  price: BreakupItemPrice;
  quantity: BreakupItemQuantity;
  tags: Array<BreakupItemTags>;
};

export type QuoteBreakupPrice = {
  __typename?: 'QuoteBreakupPrice';
  currency: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type ReasonCode = {
  __typename?: 'ReasonCode';
  code: Scalars['String']['output'];
  code_for: Scalars['String']['output'];
  comment?: Maybe<Scalars['String']['output']>;
  cost_attributed_to?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  is_applicable_for_part_cancel?: Maybe<Scalars['Boolean']['output']>;
  is_trigger_rto?: Maybe<Scalars['Boolean']['output']>;
  reason: Scalars['String']['output'];
};

export type ResendOtpResponse = {
  __typename?: 'ResendOTPResponse';
  message?: Maybe<Scalars['String']['output']>;
  orderId?: Maybe<Scalars['String']['output']>;
};

export enum RoleType {
  Admin = 'Admin',
  SuperAdmin = 'SuperAdmin'
}

export type SearchPageCatalog = CatalogInterface & CatalogProviderInterface & CatalogsCardInterface & {
  __typename?: 'SearchPageCatalog';
  attributes?: Maybe<Scalars['JsonString']['output']>;
  bpp_id: Scalars['String']['output'];
  catalog_id: Scalars['String']['output'];
  category_id?: Maybe<Scalars['String']['output']>;
  category_ids?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  city_code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  custom_group?: Maybe<Array<Scalars['String']['output']>>;
  customizable: Scalars['Boolean']['output'];
  descriptor: Descriptor;
  distance: Scalars['Float']['output'];
  domain: Scalars['String']['output'];
  domainName: Scalars['String']['output'];
  geoLocation?: Maybe<GeoLocationType>;
  hyperLocal: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  location_id: Scalars['String']['output'];
  meta: CatalogsMeta;
  non_veg?: Maybe<Scalars['Boolean']['output']>;
  panIndia: Scalars['Boolean']['output'];
  parent_item_id?: Maybe<Scalars['String']['output']>;
  price: CatalogsPrice;
  provider?: Maybe<Vendor>;
  provider_id: Scalars['String']['output'];
  quantity: CatalogsQuantity;
  radius_in_metres?: Maybe<Scalars['Int']['output']>;
  recommended?: Maybe<Scalars['Boolean']['output']>;
  tags?: Maybe<Array<Maybe<CatalogsTags>>>;
  time_to_ship_in_hours?: Maybe<Scalars['Float']['output']>;
  type: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  variants: Array<Scalars['String']['output']>;
  veg?: Maybe<Scalars['Boolean']['output']>;
  vendor_id: Scalars['String']['output'];
  withinCity: Scalars['Boolean']['output'];
};

export type SearchPageData = {
  __typename?: 'SearchPageData';
  catalogs?: Maybe<Array<SearchPageCatalog>>;
  vendors?: Maybe<Array<SearchPageVendor>>;
};

export type SearchPageVendor = StoreInterface & {
  __typename?: 'SearchPageVendor';
  address?: Maybe<VendorsAddress>;
  bpp_id: Scalars['String']['output'];
  bpp_uri: Scalars['String']['output'];
  calculated_max_offer?: Maybe<VendorsCalculatedMaxOffer>;
  city_code?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  descriptor: Descriptor;
  distance: Scalars['Float']['output'];
  domain: Scalars['String']['output'];
  domainName: Scalars['String']['output'];
  fssai_license_no?: Maybe<Scalars['String']['output']>;
  fulfillments?: Maybe<Array<VendorsFulfillments>>;
  geoLocation?: Maybe<GeoLocationType>;
  hyperLocal?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['String']['output'];
  location_id: Scalars['String']['output'];
  panIndia?: Maybe<Scalars['Boolean']['output']>;
  provider_id: Scalars['String']['output'];
  radius_in_metres?: Maybe<Scalars['Int']['output']>;
  storeSections?: Maybe<Array<Scalars['String']['output']>>;
  tags?: Maybe<Array<VendorsTags>>;
  time?: Maybe<VendorsTime>;
  time_to_ship_in_hours?: Maybe<VendorsTimeToShipInHours>;
  updatedAt: Scalars['DateTime']['output'];
  withinCity?: Maybe<Scalars['Boolean']['output']>;
};

export type SearchSuggestion = {
  __typename?: 'SearchSuggestion';
  catalogs?: Maybe<Array<SearchSuggestionItem>>;
  vendors?: Maybe<Array<SearchSuggestionItem>>;
};

export type SearchSuggestionItem = {
  __typename?: 'SearchSuggestionItem';
  descriptor: SuggestionDescriptor;
  domain?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
};

export enum SortOrderType {
  Asc = 'asc',
  Desc = 'desc'
}

export type StatutoryReqsPackagedCommodities = {
  __typename?: 'StatutoryReqsPackagedCommodities';
  common_or_generic_name_of_commodity?: Maybe<Scalars['String']['output']>;
  manufacturer_or_packer_address?: Maybe<Scalars['String']['output']>;
  manufacturer_or_packer_name?: Maybe<Scalars['String']['output']>;
  month_year_of_manufacture_packing_import?: Maybe<Scalars['String']['output']>;
  net_quantity_or_measure_of_commodity_in_pkg?: Maybe<Scalars['String']['output']>;
};

export type StatutoryReqsPrepackagedFood = {
  __typename?: 'StatutoryReqsPrepackagedFood';
  additives_info?: Maybe<Scalars['String']['output']>;
  brand_owner_FSSAI_license_no?: Maybe<Scalars['String']['output']>;
  importer_FSSAI_license_no?: Maybe<Scalars['String']['output']>;
  nutritional_info?: Maybe<Scalars['String']['output']>;
  other_FSSAI_license_no?: Maybe<Scalars['String']['output']>;
};

export type Store = StoreInterface & {
  __typename?: 'Store';
  address?: Maybe<VendorsAddress>;
  bpp_id: Scalars['String']['output'];
  bpp_uri: Scalars['String']['output'];
  calculated_max_offer?: Maybe<VendorsCalculatedMaxOffer>;
  city_code?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  descriptor: Descriptor;
  domain: Scalars['String']['output'];
  domainName: Scalars['String']['output'];
  fssai_license_no?: Maybe<Scalars['String']['output']>;
  fulfillments?: Maybe<Array<VendorsFulfillments>>;
  geoLocation?: Maybe<GeoLocationType>;
  hyperLocal?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['String']['output'];
  location_id: Scalars['String']['output'];
  panIndia?: Maybe<Scalars['Boolean']['output']>;
  provider_id: Scalars['String']['output'];
  radius_in_metres?: Maybe<Scalars['Int']['output']>;
  storeSections?: Maybe<Array<Scalars['String']['output']>>;
  tags?: Maybe<Array<VendorsTags>>;
  time?: Maybe<VendorsTime>;
  time_to_ship_in_hours?: Maybe<VendorsTimeToShipInHours>;
  updatedAt: Scalars['DateTime']['output'];
  withinCity?: Maybe<Scalars['Boolean']['output']>;
};

export type StoreInterface = {
  address?: Maybe<VendorsAddress>;
  bpp_id: Scalars['String']['output'];
  bpp_uri: Scalars['String']['output'];
  calculated_max_offer?: Maybe<VendorsCalculatedMaxOffer>;
  city_code?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  descriptor: Descriptor;
  domain: Scalars['String']['output'];
  domainName: Scalars['String']['output'];
  fssai_license_no?: Maybe<Scalars['String']['output']>;
  fulfillments?: Maybe<Array<VendorsFulfillments>>;
  geoLocation?: Maybe<GeoLocationType>;
  hyperLocal?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['String']['output'];
  location_id: Scalars['String']['output'];
  panIndia?: Maybe<Scalars['Boolean']['output']>;
  provider_id: Scalars['String']['output'];
  radius_in_metres?: Maybe<Scalars['Int']['output']>;
  storeSections?: Maybe<Array<Scalars['String']['output']>>;
  tags?: Maybe<Array<VendorsTags>>;
  time?: Maybe<VendorsTime>;
  time_to_ship_in_hours?: Maybe<VendorsTimeToShipInHours>;
  updatedAt: Scalars['DateTime']['output'];
  withinCity?: Maybe<Scalars['Boolean']['output']>;
};

export type SuggestionDescriptor = {
  __typename?: 'SuggestionDescriptor';
  name: Scalars['String']['output'];
  symbol?: Maybe<Scalars['String']['output']>;
};

export type UserAddress = {
  __typename?: 'UserAddress';
  address?: Maybe<AddressLinesType>;
  city: Scalars['String']['output'];
  cityCode?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  directions?: Maybe<Scalars['String']['output']>;
  geoLocation: GeoLocationType;
  id: Scalars['String']['output'];
  isDefault?: Maybe<Scalars['Boolean']['output']>;
  landmark?: Maybe<Scalars['String']['output']>;
  locality?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  pincode: Scalars['String']['output'];
  receiver_phone?: Maybe<Scalars['String']['output']>;
  state: Scalars['String']['output'];
  type: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type UserFavWithDetailsType = {
  __typename?: 'UserFavWithDetailsType';
  products: Array<Catalog>;
  vendors: Array<Vendor>;
};

export type UserFavouritesType = {
  __typename?: 'UserFavouritesType';
  products: Array<Scalars['String']['output']>;
  vendors: Array<Scalars['String']['output']>;
};

export type UserInterface = {
  countryCode?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  dob?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type UserType = UserInterface & {
  __typename?: 'UserType';
  countryCode?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  dob?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type Vendor = StoreInterface & {
  __typename?: 'Vendor';
  address?: Maybe<VendorsAddress>;
  bpp_id: Scalars['String']['output'];
  bpp_uri: Scalars['String']['output'];
  calculated_max_offer?: Maybe<VendorsCalculatedMaxOffer>;
  catalogs: Array<CatalogsCard>;
  city_code?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  descriptor: Descriptor;
  domain: Scalars['String']['output'];
  domainName: Scalars['String']['output'];
  fssai_license_no?: Maybe<Scalars['String']['output']>;
  fulfillments?: Maybe<Array<VendorsFulfillments>>;
  geoLocation?: Maybe<GeoLocationType>;
  hyperLocal?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['String']['output'];
  location_id: Scalars['String']['output'];
  panIndia?: Maybe<Scalars['Boolean']['output']>;
  provider_id: Scalars['String']['output'];
  radius_in_metres?: Maybe<Scalars['Int']['output']>;
  storeSections?: Maybe<Array<Scalars['String']['output']>>;
  tags?: Maybe<Array<VendorsTags>>;
  time?: Maybe<VendorsTime>;
  time_to_ship_in_hours?: Maybe<VendorsTimeToShipInHours>;
  updatedAt: Scalars['DateTime']['output'];
  withinCity?: Maybe<Scalars['Boolean']['output']>;
};


export type VendorCatalogsArgs = {
  all?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
};

export type VendorCard = StoreInterface & {
  __typename?: 'VendorCard';
  address?: Maybe<VendorsAddress>;
  bpp_id: Scalars['String']['output'];
  bpp_uri: Scalars['String']['output'];
  calculated_max_offer?: Maybe<VendorsCalculatedMaxOffer>;
  catalogs: Array<CatalogsCard>;
  city_code?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  descriptor: Descriptor;
  distance: Scalars['Float']['output'];
  domain: Scalars['String']['output'];
  domainName: Scalars['String']['output'];
  fssai_license_no?: Maybe<Scalars['String']['output']>;
  fulfillments?: Maybe<Array<VendorsFulfillments>>;
  geoLocation?: Maybe<GeoLocationType>;
  hyperLocal?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['String']['output'];
  location_id: Scalars['String']['output'];
  panIndia?: Maybe<Scalars['Boolean']['output']>;
  provider_id: Scalars['String']['output'];
  radius_in_metres?: Maybe<Scalars['Int']['output']>;
  storeSections?: Maybe<Array<Scalars['String']['output']>>;
  tags?: Maybe<Array<VendorsTags>>;
  time?: Maybe<VendorsTime>;
  time_to_ship_in_hours?: Maybe<VendorsTimeToShipInHours>;
  updatedAt: Scalars['DateTime']['output'];
  withinCity?: Maybe<Scalars['Boolean']['output']>;
};

export type VendorsAddress = {
  __typename?: 'VendorsAddress';
  area_code?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  locality?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  street?: Maybe<Scalars['String']['output']>;
};

export type VendorsCalculatedMaxOffer = {
  __typename?: 'VendorsCalculatedMaxOffer';
  percent?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

export type VendorsFulfillments = {
  __typename?: 'VendorsFulfillments';
  contact?: Maybe<VendorsFulfillmentsContact>;
  id?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type VendorsFulfillmentsContact = {
  __typename?: 'VendorsFulfillmentsContact';
  email?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
};

export type VendorsTags = {
  __typename?: 'VendorsTags';
  code?: Maybe<Scalars['String']['output']>;
  list?: Maybe<Array<VendorsTagsList>>;
};

export type VendorsTagsList = {
  __typename?: 'VendorsTagsList';
  code?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

export type VendorsTime = {
  __typename?: 'VendorsTime';
  days?: Maybe<Array<Scalars['Int']['output']>>;
  label?: Maybe<Scalars['String']['output']>;
  range?: Maybe<VendorsTimeRange>;
  schedule?: Maybe<VendorsTimeSchedule>;
};

export type VendorsTimeRange = {
  __typename?: 'VendorsTimeRange';
  end?: Maybe<Scalars['String']['output']>;
  start?: Maybe<Scalars['String']['output']>;
};

export type VendorsTimeSchedule = {
  __typename?: 'VendorsTimeSchedule';
  frequency?: Maybe<Scalars['String']['output']>;
  holidays?: Maybe<Array<Scalars['String']['output']>>;
  times?: Maybe<Array<Scalars['String']['output']>>;
};

export type VendorsTimeToShipInHours = {
  __typename?: 'VendorsTimeToShipInHours';
  avg?: Maybe<Scalars['Float']['output']>;
};

export type VerifyAdminResponseType = {
  __typename?: 'VerifyAdminResponseType';
  admin: Admin;
  token: Scalars['String']['output'];
};

export type VerifyOtpResponse = {
  __typename?: 'VerifyOTPResponse';
  isOTPVerified: Scalars['Boolean']['output'];
  token?: Maybe<Scalars['String']['output']>;
  user?: Maybe<VerifyOtpUserData>;
};

export type VerifyOtpUserData = UserInterface & {
  __typename?: 'VerifyOtpUserData';
  countryCode?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  defaultAddress?: Maybe<UserAddress>;
  dob?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type BreakupItemQuantityAvailable = {
  __typename?: 'breakupItemQuantityAvailable';
  count: Scalars['String']['output'];
};

export type BreakupItemQuantityMaximum = {
  __typename?: 'breakupItemQuantityMaximum';
  count: Scalars['String']['output'];
};

export type BreakupItemTags = {
  __typename?: 'breakupItemTags';
  code: Scalars['String']['output'];
  list?: Maybe<Array<BreakupItemTagsList>>;
};

export type Descriptor = {
  __typename?: 'descriptor';
  images: Array<Scalars['String']['output']>;
  long_desc: Scalars['String']['output'];
  name: Scalars['String']['output'];
  short_desc: Scalars['String']['output'];
  symbol: Scalars['String']['output'];
};

export type GetAllCartsQueryVariables = Exact<{
  withItemDetails?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type GetAllCartsQuery = { __typename?: 'Query', getAllCarts: Array<{ __typename?: 'Cart', id: string, items: Array<{ __typename?: 'CartItem', itemId: string, quantity: number, details?: { __typename?: 'CartItemDetailsType', catalog_id: string, category_id?: string | null, descriptor: { __typename?: 'descriptor', name: string, symbol: string }, price: { __typename?: 'CatalogsPrice', value?: number | null, maximum_value?: number | null }, meta: { __typename?: 'CatalogsMeta', ondc_org_cancellable?: boolean | null }, quantity: { __typename?: 'CatalogsQuantity', maximum?: { __typename?: 'CatalogsQuantityMaximum', count?: number | null } | null, available?: { __typename?: 'CatalogsQuantityAvailable', count?: number | null } | null } } | null }>, store?: { __typename?: 'Store', id: string, domain: string, descriptor: { __typename?: 'descriptor', name: string, symbol: string }, geoLocation?: { __typename?: 'GeoLocationType', lat: number, lng: number } | null, address?: { __typename?: 'VendorsAddress', street?: string | null } | null } | null, customizations?: Array<{ __typename?: 'CartCustomItemType', baseItemId: string, itemId: string, quantity: number, details?: { __typename?: 'CustomItemDetail', descriptor: { __typename?: 'CzDescriptorType', name: string }, price: { __typename?: 'CatalogsPrice', value?: number | null } } | null }> | null }> };

export type AddItemToCartMutationVariables = Exact<{
  vendorId: Scalars['String']['input'];
  itemId: Scalars['String']['input'];
  quantity: Scalars['Int']['input'];
  customizations?: InputMaybe<Array<CartCustomItemInputType> | CartCustomItemInputType>;
}>;


export type AddItemToCartMutation = { __typename?: 'Mutation', addItemToCart?: { __typename?: 'CartWithIdsOnlyType', id: string, storeId: string, userId: string, customizations?: Array<{ __typename?: 'CartCustomItemIdsOnlyType', baseItemId: string, itemId: string, quantity: number }> | null, items: Array<{ __typename?: 'CartItemIdsOnlyType', itemId: string, quantity: number }> } | null };

export type ClearCartMutationVariables = Exact<{
  vendorId: Scalars['String']['input'];
}>;


export type ClearCartMutation = { __typename?: 'Mutation', clearCart?: string | null };

export type ClearAllCartsMutationVariables = Exact<{ [key: string]: never; }>;


export type ClearAllCartsMutation = { __typename?: 'Mutation', clearAllCarts?: string | null };

export type RemoveItemFromCartMutationVariables = Exact<{
  vendorId: Scalars['String']['input'];
  itemId: Scalars['String']['input'];
}>;


export type RemoveItemFromCartMutation = { __typename?: 'Mutation', removeItemFromCart?: { __typename?: 'CartWithIdsOnlyType', id: string, storeId: string, userId: string, customizations?: Array<{ __typename?: 'CartCustomItemIdsOnlyType', baseItemId: string, itemId: string, quantity: number }> | null, items: Array<{ __typename?: 'CartItemIdsOnlyType', itemId: string, quantity: number }> } | null };

export type UpdateItemQuantityMutationVariables = Exact<{
  vendorId: Scalars['String']['input'];
  itemId: Scalars['String']['input'];
  quantity: Scalars['Int']['input'];
}>;


export type UpdateItemQuantityMutation = { __typename?: 'Mutation', updateItemQuantity?: { __typename?: 'CartWithIdsOnlyType', id: string, storeId: string, userId: string, customizations?: Array<{ __typename?: 'CartCustomItemIdsOnlyType', baseItemId: string, itemId: string, quantity: number }> | null, items: Array<{ __typename?: 'CartItemIdsOnlyType', itemId: string, quantity: number }> } | null };

export type GetDomainPageDataQueryVariables = Exact<{
  domain: Scalars['String']['input'];
  loc: Location;
  cityCode: Scalars['String']['input'];
}>;


export type GetDomainPageDataQuery = { __typename?: 'Query', getDomainPageData: { __typename?: 'DomainPageData', stores: Array<{ __typename?: 'VendorCard', domain: string, id: string, distance: number, descriptor: { __typename?: 'descriptor', name: string, images: Array<string>, symbol: string }, catalogs: Array<{ __typename?: 'CatalogsCard', id: string, category_id?: string | null, descriptor: { __typename?: 'descriptor', name: string, images: Array<string>, short_desc: string }, price: { __typename?: 'CatalogsPrice', maximum_value?: number | null, offer_percent?: number | null, value?: number | null }, quantity: { __typename?: 'CatalogsQuantity', available?: { __typename?: 'CatalogsQuantityAvailable', count?: number | null } | null, maximum?: { __typename?: 'CatalogsQuantityMaximum', count?: number | null } | null, unitized?: { __typename?: 'CatalogsQuantityUnitized', measure?: { __typename?: 'CatalogsQuantityUnitizedMeasure', unit?: string | null, value?: string | null } | null } | null } }>, address?: { __typename?: 'VendorsAddress', street?: string | null } | null, geoLocation?: { __typename?: 'GeoLocationType', lat: number, lng: number } | null, calculated_max_offer?: { __typename?: 'VendorsCalculatedMaxOffer', percent?: number | null } | null, time_to_ship_in_hours?: { __typename?: 'VendorsTimeToShipInHours', avg?: number | null } | null }>, offers: Array<{ __typename?: 'Vendor', id: string, calculated_max_offer?: { __typename?: 'VendorsCalculatedMaxOffer', percent?: number | null } | null, descriptor: { __typename?: 'descriptor', name: string, symbol: string, images: Array<string> } }> } };

export type GetUserFavouritesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserFavouritesQuery = { __typename?: 'Query', getUserFavourites: { __typename?: 'UserFavouritesType', products: Array<string>, vendors: Array<string> } };

export type AddProductToFavsMutationVariables = Exact<{
  productId: Scalars['String']['input'];
}>;


export type AddProductToFavsMutation = { __typename?: 'Mutation', addProductToFavs?: { __typename?: 'FavResponseType', success: boolean, message: string } | null };

export type RemoveProductFromFavsMutationVariables = Exact<{
  productId: Scalars['String']['input'];
}>;


export type RemoveProductFromFavsMutation = { __typename?: 'Mutation', removeProductFromFavs?: { __typename?: 'FavResponseType', success: boolean, message: string } | null };

export type GetUserFavouritesWithDetailsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserFavouritesWithDetailsQuery = { __typename?: 'Query', getUserFavouritesWithDetails: { __typename?: 'UserFavWithDetailsType', products: Array<{ __typename?: 'Catalog', id: string, vendor_id: string, descriptor: { __typename?: 'descriptor', images: Array<string>, name: string }, price: { __typename?: 'CatalogsPrice', maximum_value?: number | null, offer_percent?: number | null, offer_value?: number | null, value?: number | null }, quantity: { __typename?: 'CatalogsQuantity', available?: { __typename?: 'CatalogsQuantityAvailable', count?: number | null } | null, maximum?: { __typename?: 'CatalogsQuantityMaximum', count?: number | null } | null }, provider?: { __typename?: 'Vendor', panIndia?: boolean | null, hyperLocal?: boolean | null, descriptor: { __typename?: 'descriptor', name: string }, address?: { __typename?: 'VendorsAddress', city?: string | null, locality?: string | null, state?: string | null } | null } | null }>, vendors: Array<{ __typename?: 'Vendor', city_code?: string | null, panIndia?: boolean | null, provider_id: string, id: string, address?: { __typename?: 'VendorsAddress', locality?: string | null, city?: string | null, state?: string | null } | null, descriptor: { __typename?: 'descriptor', images: Array<string>, name: string, symbol: string } }> } };

export type AddVendorToFavsMutationVariables = Exact<{
  vendorId: Scalars['String']['input'];
}>;


export type AddVendorToFavsMutation = { __typename?: 'Mutation', addVendorToFavs?: { __typename?: 'FavResponseType', success: boolean, message: string } | null };

export type RemoveVendorFromFavsMutationVariables = Exact<{
  vendorId: Scalars['String']['input'];
}>;


export type RemoveVendorFromFavsMutation = { __typename?: 'Mutation', removeVendorFromFavs?: { __typename?: 'FavResponseType', success: boolean, message: string } | null };

export type GetHomeQueryVariables = Exact<{
  loc: Location;
  cityCode: Scalars['String']['input'];
}>;


export type GetHomeQuery = { __typename?: 'Query', getHome: { __typename?: 'Home', offers: Array<{ __typename?: 'Vendor', id: string, descriptor: { __typename?: 'descriptor', name: string, short_desc: string, symbol: string }, calculated_max_offer?: { __typename?: 'VendorsCalculatedMaxOffer', percent?: number | null, value?: number | null } | null }>, restaurants: Array<{ __typename?: 'VendorCard', distance: number, id: string, provider_id: string, descriptor: { __typename?: 'descriptor', images: Array<string>, long_desc: string, name: string, short_desc: string, symbol: string }, address?: { __typename?: 'VendorsAddress', locality?: string | null } | null, geoLocation?: { __typename?: 'GeoLocationType', lat: number, lng: number } | null }>, stores: Array<{ __typename?: 'VendorCard', distance: number, id: string, provider_id: string, descriptor: { __typename?: 'descriptor', images: Array<string>, long_desc: string, name: string, short_desc: string, symbol: string }, address?: { __typename?: 'VendorsAddress', locality?: string | null } | null, geoLocation?: { __typename?: 'GeoLocationType', lat: number, lng: number } | null }> } };

export type GenerateOtpMutationVariables = Exact<{
  sendTo: Scalars['String']['input'];
}>;


export type GenerateOtpMutation = { __typename?: 'Mutation', generateOTP?: { __typename?: 'GenerateOTPResponse', message?: string | null, orderId?: string | null } | null };

export type VerifyOtpMutationVariables = Exact<{
  orderId: Scalars['String']['input'];
  otp: Scalars['String']['input'];
  sendTo: Scalars['String']['input'];
}>;


export type VerifyOtpMutation = { __typename?: 'Mutation', verifyOTP?: { __typename?: 'VerifyOTPResponse', token?: string | null, isOTPVerified: boolean, user?: { __typename?: 'VerifyOtpUserData', firstName?: string | null, phoneNumber?: string | null, email?: string | null, lastName?: string | null, id: string } | null } | null };

export type ResendOtpMutationVariables = Exact<{
  orderId: Scalars['String']['input'];
}>;


export type ResendOtpMutation = { __typename?: 'Mutation', resendOTP?: { __typename?: 'ResendOTPResponse', message?: string | null, orderId?: string | null } | null };

export type GetAllOrdersByUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllOrdersByUserQuery = { __typename?: 'Query', getAllOrdersByUser?: Array<{ __typename?: 'Order', id: string, order_status: string, placed_at?: string | null, completed_at?: string | null, cancelled_at?: string | null, fulfillments: { __typename?: 'OrderFulfillmentType', pending?: { __typename?: 'OrderFulfillmentsType', state?: { __typename?: 'OrderFulfillmentsStateType', descriptor?: { __typename?: 'OrderFulfillmentsStateDescriptorType', code?: string | null } | null } | null } | null, packed?: { __typename?: 'OrderFulfillmentsType', state?: { __typename?: 'OrderFulfillmentsStateType', descriptor?: { __typename?: 'OrderFulfillmentsStateDescriptorType', code?: string | null } | null } | null } | null, agent_assigned?: { __typename?: 'OrderFulfillmentsType', state?: { __typename?: 'OrderFulfillmentsStateType', descriptor?: { __typename?: 'OrderFulfillmentsStateDescriptorType', code?: string | null } | null } | null } | null, out_for_pickup?: { __typename?: 'OrderFulfillmentsType', state?: { __typename?: 'OrderFulfillmentsStateType', descriptor?: { __typename?: 'OrderFulfillmentsStateDescriptorType', code?: string | null } | null } | null } | null, pickup_failed?: { __typename?: 'OrderFulfillmentsType', state?: { __typename?: 'OrderFulfillmentsStateType', descriptor?: { __typename?: 'OrderFulfillmentsStateDescriptorType', code?: string | null } | null } | null } | null, order_picked_up?: { __typename?: 'OrderFulfillmentsType', state?: { __typename?: 'OrderFulfillmentsStateType', descriptor?: { __typename?: 'OrderFulfillmentsStateDescriptorType', code?: string | null } | null } | null } | null, in_transit?: { __typename?: 'OrderFulfillmentsType', state?: { __typename?: 'OrderFulfillmentsStateType', descriptor?: { __typename?: 'OrderFulfillmentsStateDescriptorType', code?: string | null } | null } | null } | null, at_destination_hub?: { __typename?: 'OrderFulfillmentsType', state?: { __typename?: 'OrderFulfillmentsStateType', descriptor?: { __typename?: 'OrderFulfillmentsStateDescriptorType', code?: string | null } | null } | null } | null, out_for_delivery?: { __typename?: 'OrderFulfillmentsType', state?: { __typename?: 'OrderFulfillmentsStateType', descriptor?: { __typename?: 'OrderFulfillmentsStateDescriptorType', code?: string | null } | null } | null } | null, delivery_failed?: { __typename?: 'OrderFulfillmentsType', state?: { __typename?: 'OrderFulfillmentsStateType', descriptor?: { __typename?: 'OrderFulfillmentsStateDescriptorType', code?: string | null } | null } | null } | null, order_delivered?: { __typename?: 'OrderFulfillmentsType', state?: { __typename?: 'OrderFulfillmentsStateType', descriptor?: { __typename?: 'OrderFulfillmentsStateDescriptorType', code?: string | null } | null } | null } | null, cancelled?: { __typename?: 'OrderFulfillmentsType', state?: { __typename?: 'OrderFulfillmentsStateType', descriptor?: { __typename?: 'OrderFulfillmentsStateDescriptorType', code?: string | null } | null } | null } | null }, items: Array<{ __typename?: 'CartItem', details?: { __typename?: 'CartItemDetailsType', catalog_id: string, descriptor: { __typename?: 'descriptor', name: string, symbol: string } } | null }>, quote: { __typename?: 'OrderQuote', breakup: Array<{ __typename?: 'OrderQuoteBreakup', type?: string | null, title: string, id?: string | null, details?: { __typename?: 'QuoteBreakupItem', price: { __typename?: 'BreakupItemPrice', value: string } } | null, price?: { __typename?: 'QuoteBreakupPrice', value: string } | null, quantity?: { __typename?: 'BreakupOndcOrgItemQuantity', count: number } | null }>, price: { __typename?: 'OrderQuotePrice', value: string } }, store?: { __typename?: 'Store', descriptor: { __typename?: 'descriptor', symbol: string, name: string }, address?: { __typename?: 'VendorsAddress', street?: string | null } | null } | null, cancellation?: { __typename?: 'OrderCancellationType', cancelled_by?: string | null, reason?: { __typename?: 'OrderCancellationReasonType', reason?: string | null } | null } | null }> | null };

export type GetAllReasonCodesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllReasonCodesQuery = { __typename?: 'Query', getAllReasonCodes?: Array<{ __typename?: 'ReasonCode', reason: string, is_trigger_rto?: boolean | null, is_applicable_for_part_cancel?: boolean | null, id: string, cost_attributed_to?: string | null, code_for: string, comment?: string | null, code: string } | null> | null };

export type GetProductByIdQueryVariables = Exact<{
  getProductByIdId: Scalars['String']['input'];
}>;


export type GetProductByIdQuery = { __typename?: 'Query', getProductById?: { __typename?: 'Catalog', custom_group?: Array<string> | null, customizable: boolean, attributes?: any | null, domain: string, variants: Array<string>, domainName: string, time_to_ship_in_hours?: number | null, parent_item_id?: string | null, city_code: string, descriptor: { __typename?: 'descriptor', images: Array<string>, long_desc: string, name: string, short_desc: string, symbol: string }, price: { __typename?: 'CatalogsPrice', maximum_value?: number | null, offer_percent?: number | null, offer_value?: number | null, value?: number | null }, quantity: { __typename?: 'CatalogsQuantity', available?: { __typename?: 'CatalogsQuantityAvailable', count?: number | null } | null, maximum?: { __typename?: 'CatalogsQuantityMaximum', count?: number | null } | null, unitized?: { __typename?: 'CatalogsQuantityUnitized', measure?: { __typename?: 'CatalogsQuantityUnitizedMeasure', unit?: string | null, value?: string | null } | null } | null }, meta: { __typename?: 'CatalogsMeta', ondc_org_cancellable?: boolean | null, ondc_org_available_on_cod?: boolean | null, ondc_org_contact_details_consumer_care?: string | null, ondc_org_fssai_license_no?: string | null, ondc_org_return_window?: string | null, ondc_org_returnable?: boolean | null, ondc_org_seller_pickup_return?: boolean | null, ondc_org_mandatory_reqs_veggies_fruits?: { __typename?: 'MandatoryReqsVeggiesFruits', net_quantity?: string | null } | null, ondc_org_statutory_reqs_packaged_commodities?: { __typename?: 'StatutoryReqsPackagedCommodities', common_or_generic_name_of_commodity?: string | null, manufacturer_or_packer_address?: string | null, manufacturer_or_packer_name?: string | null, month_year_of_manufacture_packing_import?: string | null, net_quantity_or_measure_of_commodity_in_pkg?: string | null } | null }, provider?: { __typename?: 'Vendor', id: string, descriptor: { __typename?: 'descriptor', images: Array<string>, name: string, long_desc: string, short_desc: string, symbol: string }, catalogs: Array<{ __typename?: 'CatalogsCard', id: string, descriptor: { __typename?: 'descriptor', images: Array<string>, long_desc: string, name: string, short_desc: string, symbol: string }, price: { __typename?: 'CatalogsPrice', maximum_value?: number | null, offer_percent?: number | null, offer_value?: number | null, value?: number | null } }> } | null } | null };

export type GetSearchPageDataQueryVariables = Exact<{
  loc: Location;
  limit?: InputMaybe<Scalars['Int']['input']>;
  cityCode: Scalars['String']['input'];
  query: Scalars['String']['input'];
  domain?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetSearchPageDataQuery = { __typename?: 'Query', getSearchPageData?: { __typename?: 'SearchPageData', catalogs?: Array<{ __typename?: 'SearchPageCatalog', id: string, provider_id: string, customizable: boolean, custom_group?: Array<string> | null, city_code: string, category_id?: string | null, domain: string, time_to_ship_in_hours?: number | null, domainName: string, descriptor: { __typename?: 'descriptor', name: string, short_desc: string, images: Array<string> }, price: { __typename?: 'CatalogsPrice', maximum_value?: number | null, offer_percent?: number | null, offer_value?: number | null, value?: number | null }, provider?: { __typename?: 'Vendor', id: string, descriptor: { __typename?: 'descriptor', symbol: string, name: string }, calculated_max_offer?: { __typename?: 'VendorsCalculatedMaxOffer', percent?: number | null } | null } | null, quantity: { __typename?: 'CatalogsQuantity', unitized?: { __typename?: 'CatalogsQuantityUnitized', measure?: { __typename?: 'CatalogsQuantityUnitizedMeasure', unit?: string | null, value?: string | null } | null } | null }, geoLocation?: { __typename?: 'GeoLocationType', lat: number, lng: number } | null }> | null, vendors?: Array<{ __typename?: 'SearchPageVendor', id: string, domain: string, descriptor: { __typename?: 'descriptor', name: string } }> | null } | null };

export type GetSearchSuggestionQueryVariables = Exact<{
  loc: Location;
  cityCode: Scalars['String']['input'];
  query: Scalars['String']['input'];
  domain?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetSearchSuggestionQuery = { __typename?: 'Query', getSearchSuggestion?: { __typename?: 'SearchSuggestion', catalogs?: Array<{ __typename?: 'SearchSuggestionItem', id: string, domain?: string | null, descriptor: { __typename?: 'SuggestionDescriptor', name: string, symbol?: string | null } }> | null, vendors?: Array<{ __typename?: 'SearchSuggestionItem', id: string, domain?: string | null, descriptor: { __typename?: 'SuggestionDescriptor', name: string, symbol?: string | null } }> | null } | null };

export type GetAllAddressesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllAddressesQuery = { __typename?: 'Query', getAllAddresses: Array<{ __typename?: 'UserAddress', id: string, type: string, name: string, receiver_phone?: string | null, city: string, state: string, pincode: string, landmark?: string | null, isDefault?: boolean | null, locality?: string | null, geoLocation: { __typename?: 'GeoLocationType', lat: number, lng: number }, address?: { __typename?: 'AddressLinesType', line1: string, line2?: string | null } | null }> };

export type GetAddressByIdQueryVariables = Exact<{
  getAddressByIdId: Scalars['String']['input'];
}>;


export type GetAddressByIdQuery = { __typename?: 'Query', getAddressById?: { __typename?: 'UserAddress', id: string, type: string, name: string, receiver_phone?: string | null, locality?: string | null, city: string, state: string, pincode: string, landmark?: string | null, directions?: string | null, createdAt?: any | null, isDefault?: boolean | null, updatedAt?: any | null, address?: { __typename?: 'AddressLinesType', line1: string, line2?: string | null } | null, geoLocation: { __typename?: 'GeoLocationType', lat: number, lng: number } } | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'VerifyOtpUserData', firstName?: string | null } | null };

export type MutationMutationVariables = Exact<{
  firstName: Scalars['String']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
}>;


export type MutationMutation = { __typename?: 'Mutation', createUser?: { __typename?: 'CreatedUser', token?: string | null, id: string, firstName?: string | null, lastName?: string | null, email?: string | null, password?: string | null, countryCode?: string | null, phoneNumber?: string | null, dob?: any | null, gender?: string | null, createdAt?: any | null, updatedAt?: any | null } | null };

export type CreateAddressMutationVariables = Exact<{
  type: AddressType;
  name: Scalars['String']['input'];
  geoLocation: Location;
  address: AddressLinesInputType;
  city: Scalars['String']['input'];
  state: Scalars['String']['input'];
  pincode: Scalars['String']['input'];
  receiverPhone: Scalars['String']['input'];
  locality?: InputMaybe<Scalars['String']['input']>;
  landmark?: InputMaybe<Scalars['String']['input']>;
  isDefault?: InputMaybe<Scalars['Boolean']['input']>;
  directions?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateAddressMutation = { __typename?: 'Mutation', createAddress?: { __typename?: 'UserAddress', id: string, type: string, name: string, receiver_phone?: string | null, locality?: string | null, city: string, state: string, pincode: string, landmark?: string | null, directions?: string | null, isDefault?: boolean | null, createdAt?: any | null, updatedAt?: any | null, geoLocation: { __typename?: 'GeoLocationType', lat: number, lng: number }, address?: { __typename?: 'AddressLinesType', line1: string, line2?: string | null } | null } | null };

export type DeleteAddressMutationVariables = Exact<{
  deleteAddressId: Scalars['String']['input'];
}>;


export type DeleteAddressMutation = { __typename?: 'Mutation', deleteAddress?: { __typename?: 'UserAddress', id: string, type: string, name: string, receiver_phone?: string | null, locality?: string | null, city: string, state: string, pincode: string, landmark?: string | null, directions?: string | null, isDefault?: boolean | null, createdAt?: any | null, updatedAt?: any | null, geoLocation: { __typename?: 'GeoLocationType', lat: number, lng: number }, address?: { __typename?: 'AddressLinesType', line1: string, line2?: string | null } | null } | null };

export type UpdateAddressMutationVariables = Exact<{
  updateAddressId: Scalars['String']['input'];
  isDefault?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type UpdateAddressMutation = { __typename?: 'Mutation', updateAddress?: { __typename?: 'UserAddress', id: string } | null };

export type UpdateAddressWithDetailsMutationVariables = Exact<{
  updateAddressId: Scalars['String']['input'];
  isDefault?: InputMaybe<Scalars['Boolean']['input']>;
  directions?: InputMaybe<Scalars['String']['input']>;
  landmark?: InputMaybe<Scalars['String']['input']>;
  pincode?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  locality?: InputMaybe<Scalars['String']['input']>;
  address?: InputMaybe<AddressLinesInputType>;
  geoLocation?: InputMaybe<Location>;
  receiverPhone?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<AddressType>;
}>;


export type UpdateAddressWithDetailsMutation = { __typename?: 'Mutation', updateAddress?: { __typename?: 'UserAddress', id: string } | null };

export type GetVendorByIdQueryVariables = Exact<{
  getVendorByIdId: Scalars['String']['input'];
  all?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type GetVendorByIdQuery = { __typename?: 'Query', getVendorById?: { __typename?: 'Vendor', id: string, panIndia?: boolean | null, withinCity?: boolean | null, hyperLocal?: boolean | null, radius_in_metres?: number | null, fssai_license_no?: string | null, storeSections?: Array<string> | null, domain: string, descriptor: { __typename?: 'descriptor', name: string, images: Array<string>, symbol: string }, address?: { __typename?: 'VendorsAddress', area_code?: string | null, city?: string | null, locality?: string | null, state?: string | null, street?: string | null } | null, time_to_ship_in_hours?: { __typename?: 'VendorsTimeToShipInHours', avg?: number | null } | null, geoLocation?: { __typename?: 'GeoLocationType', lat: number, lng: number } | null, catalogs: Array<{ __typename?: 'CatalogsCard', category_id?: string | null, id: string, veg?: boolean | null, non_veg?: boolean | null, descriptor: { __typename?: 'descriptor', name: string, images: Array<string>, symbol: string, long_desc: string, short_desc: string }, price: { __typename?: 'CatalogsPrice', offer_value?: number | null, offer_percent?: number | null, maximum_value?: number | null, value?: number | null }, quantity: { __typename?: 'CatalogsQuantity', available?: { __typename?: 'CatalogsQuantityAvailable', count?: number | null } | null, maximum?: { __typename?: 'CatalogsQuantityMaximum', count?: number | null } | null } }> } | null };


export const GetAllCartsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllCarts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"withItemDetails"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllCarts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"withItemDetails"},"value":{"kind":"Variable","name":{"kind":"Name","value":"withItemDetails"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"itemId"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"details"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"descriptor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"maximum_value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ondc_org_cancellable"}}]}},{"kind":"Field","name":{"kind":"Name","value":"quantity"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"maximum"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}},{"kind":"Field","name":{"kind":"Name","value":"available"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"catalog_id"}},{"kind":"Field","name":{"kind":"Name","value":"category_id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"store"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"descriptor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}},{"kind":"Field","name":{"kind":"Name","value":"domain"}},{"kind":"Field","name":{"kind":"Name","value":"geoLocation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}},{"kind":"Field","name":{"kind":"Name","value":"address"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"street"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"customizations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"baseItemId"}},{"kind":"Field","name":{"kind":"Name","value":"details"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"descriptor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"itemId"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}}]}}]}}]}}]} as unknown as DocumentNode<GetAllCartsQuery, GetAllCartsQueryVariables>;
export const AddItemToCartDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddItemToCart"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vendorId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"itemId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"quantity"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"customizations"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CartCustomItemInputType"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addItemToCart"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"vendor_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vendorId"}}},{"kind":"Argument","name":{"kind":"Name","value":"itemId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"itemId"}}},{"kind":"Argument","name":{"kind":"Name","value":"quantity"},"value":{"kind":"Variable","name":{"kind":"Name","value":"quantity"}}},{"kind":"Argument","name":{"kind":"Name","value":"customizations"},"value":{"kind":"Variable","name":{"kind":"Name","value":"customizations"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customizations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"baseItemId"}},{"kind":"Field","name":{"kind":"Name","value":"itemId"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"storeId"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"itemId"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}}]}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]}}]} as unknown as DocumentNode<AddItemToCartMutation, AddItemToCartMutationVariables>;
export const ClearCartDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ClearCart"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vendorId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"clearCart"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"vendor_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vendorId"}}}]}]}}]} as unknown as DocumentNode<ClearCartMutation, ClearCartMutationVariables>;
export const ClearAllCartsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"clearAllCarts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"clearAllCarts"}}]}}]} as unknown as DocumentNode<ClearAllCartsMutation, ClearAllCartsMutationVariables>;
export const RemoveItemFromCartDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveItemFromCart"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vendorId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"itemId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeItemFromCart"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"vendor_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vendorId"}}},{"kind":"Argument","name":{"kind":"Name","value":"itemId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"itemId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customizations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"baseItemId"}},{"kind":"Field","name":{"kind":"Name","value":"itemId"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"itemId"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}}]}},{"kind":"Field","name":{"kind":"Name","value":"storeId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]}}]} as unknown as DocumentNode<RemoveItemFromCartMutation, RemoveItemFromCartMutationVariables>;
export const UpdateItemQuantityDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateItemQuantity"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vendorId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"itemId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"quantity"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateItemQuantity"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"vendor_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vendorId"}}},{"kind":"Argument","name":{"kind":"Name","value":"itemId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"itemId"}}},{"kind":"Argument","name":{"kind":"Name","value":"quantity"},"value":{"kind":"Variable","name":{"kind":"Name","value":"quantity"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customizations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"baseItemId"}},{"kind":"Field","name":{"kind":"Name","value":"itemId"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"itemId"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}}]}},{"kind":"Field","name":{"kind":"Name","value":"storeId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]}}]} as unknown as DocumentNode<UpdateItemQuantityMutation, UpdateItemQuantityMutationVariables>;
export const GetDomainPageDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetDomainPageData"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"domain"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"loc"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Location"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cityCode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getDomainPageData"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"domain"},"value":{"kind":"Variable","name":{"kind":"Name","value":"domain"}}},{"kind":"Argument","name":{"kind":"Name","value":"loc"},"value":{"kind":"Variable","name":{"kind":"Name","value":"loc"}}},{"kind":"Argument","name":{"kind":"Name","value":"cityCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cityCode"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stores"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"descriptor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}},{"kind":"Field","name":{"kind":"Name","value":"domain"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"distance"}},{"kind":"Field","name":{"kind":"Name","value":"catalogs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"descriptor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"}},{"kind":"Field","name":{"kind":"Name","value":"short_desc"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"category_id"}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"maximum_value"}},{"kind":"Field","name":{"kind":"Name","value":"offer_percent"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"quantity"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"available"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}},{"kind":"Field","name":{"kind":"Name","value":"maximum"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}},{"kind":"Field","name":{"kind":"Name","value":"unitized"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"measure"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"address"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"street"}}]}},{"kind":"Field","name":{"kind":"Name","value":"geoLocation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}},{"kind":"Field","name":{"kind":"Name","value":"calculated_max_offer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"percent"}}]}},{"kind":"Field","name":{"kind":"Name","value":"time_to_ship_in_hours"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avg"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"offers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"calculated_max_offer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"percent"}}]}},{"kind":"Field","name":{"kind":"Name","value":"descriptor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"images"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<GetDomainPageDataQuery, GetDomainPageDataQueryVariables>;
export const GetUserFavouritesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserFavourites"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserFavourites"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"products"}},{"kind":"Field","name":{"kind":"Name","value":"vendors"}}]}}]}}]} as unknown as DocumentNode<GetUserFavouritesQuery, GetUserFavouritesQueryVariables>;
export const AddProductToFavsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddProductToFavs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"productId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addProductToFavs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"productId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"productId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<AddProductToFavsMutation, AddProductToFavsMutationVariables>;
export const RemoveProductFromFavsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveProductFromFavs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"productId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeProductFromFavs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"productId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"productId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<RemoveProductFromFavsMutation, RemoveProductFromFavsMutationVariables>;
export const GetUserFavouritesWithDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserFavouritesWithDetails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserFavouritesWithDetails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"products"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"descriptor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"images"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"maximum_value"}},{"kind":"Field","name":{"kind":"Name","value":"offer_percent"}},{"kind":"Field","name":{"kind":"Name","value":"offer_value"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"quantity"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"available"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}},{"kind":"Field","name":{"kind":"Name","value":"maximum"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"provider"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"descriptor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"panIndia"}},{"kind":"Field","name":{"kind":"Name","value":"hyperLocal"}},{"kind":"Field","name":{"kind":"Name","value":"address"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"locality"}},{"kind":"Field","name":{"kind":"Name","value":"state"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vendor_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"vendors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"city_code"}},{"kind":"Field","name":{"kind":"Name","value":"address"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"locality"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"state"}}]}},{"kind":"Field","name":{"kind":"Name","value":"panIndia"}},{"kind":"Field","name":{"kind":"Name","value":"provider_id"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"descriptor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"images"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetUserFavouritesWithDetailsQuery, GetUserFavouritesWithDetailsQueryVariables>;
export const AddVendorToFavsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddVendorToFavs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vendorId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addVendorToFavs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"vendorId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vendorId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<AddVendorToFavsMutation, AddVendorToFavsMutationVariables>;
export const RemoveVendorFromFavsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveVendorFromFavs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vendorId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeVendorFromFavs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"vendorId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vendorId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<RemoveVendorFromFavsMutation, RemoveVendorFromFavsMutationVariables>;
export const GetHomeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetHome"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"loc"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Location"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cityCode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getHome"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"loc"},"value":{"kind":"Variable","name":{"kind":"Name","value":"loc"}}},{"kind":"Argument","name":{"kind":"Name","value":"cityCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cityCode"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"offers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"descriptor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"short_desc"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"calculated_max_offer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"percent"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"restaurants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"distance"}},{"kind":"Field","name":{"kind":"Name","value":"descriptor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"images"}},{"kind":"Field","name":{"kind":"Name","value":"long_desc"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"short_desc"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"locality"}}]}},{"kind":"Field","name":{"kind":"Name","value":"geoLocation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}},{"kind":"Field","name":{"kind":"Name","value":"provider_id"}},{"kind":"Field","name":{"kind":"Name","value":"distance"}}]}},{"kind":"Field","name":{"kind":"Name","value":"stores"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"distance"}},{"kind":"Field","name":{"kind":"Name","value":"descriptor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"images"}},{"kind":"Field","name":{"kind":"Name","value":"long_desc"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"short_desc"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"locality"}}]}},{"kind":"Field","name":{"kind":"Name","value":"geoLocation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}},{"kind":"Field","name":{"kind":"Name","value":"provider_id"}},{"kind":"Field","name":{"kind":"Name","value":"distance"}}]}}]}}]}}]} as unknown as DocumentNode<GetHomeQuery, GetHomeQueryVariables>;
export const GenerateOtpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"GenerateOTP"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sendTo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"generateOTP"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sendTo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sendTo"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"orderId"}}]}}]}}]} as unknown as DocumentNode<GenerateOtpMutation, GenerateOtpMutationVariables>;
export const VerifyOtpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifyOTP"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"otp"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sendTo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyOTP"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderId"}}},{"kind":"Argument","name":{"kind":"Name","value":"otp"},"value":{"kind":"Variable","name":{"kind":"Name","value":"otp"}}},{"kind":"Argument","name":{"kind":"Name","value":"sendTo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sendTo"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isOTPVerified"}}]}}]}}]} as unknown as DocumentNode<VerifyOtpMutation, VerifyOtpMutationVariables>;
export const ResendOtpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResendOTP"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resendOTP"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"orderId"}}]}}]}}]} as unknown as DocumentNode<ResendOtpMutation, ResendOtpMutationVariables>;
export const GetAllOrdersByUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllOrdersByUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllOrdersByUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fulfillments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pending"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"state"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"descriptor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"packed"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"state"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"descriptor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"agent_assigned"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"state"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"descriptor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"out_for_pickup"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"state"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"descriptor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pickup_failed"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"state"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"descriptor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"order_picked_up"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"state"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"descriptor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"in_transit"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"state"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"descriptor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"at_destination_hub"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"state"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"descriptor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"out_for_delivery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"state"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"descriptor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"delivery_failed"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"state"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"descriptor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"order_delivered"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"state"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"descriptor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"cancelled"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"state"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"descriptor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"details"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"descriptor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}},{"kind":"Field","name":{"kind":"Name","value":"catalog_id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"order_status"}},{"kind":"Field","name":{"kind":"Name","value":"quote"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"breakup"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"details"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"quantity"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"store"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"descriptor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"address"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"street"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"placed_at"}},{"kind":"Field","name":{"kind":"Name","value":"completed_at"}},{"kind":"Field","name":{"kind":"Name","value":"cancelled_at"}},{"kind":"Field","name":{"kind":"Name","value":"cancellation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reason"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reason"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cancelled_by"}}]}}]}}]}}]} as unknown as DocumentNode<GetAllOrdersByUserQuery, GetAllOrdersByUserQueryVariables>;
export const GetAllReasonCodesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllReasonCodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllReasonCodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reason"}},{"kind":"Field","name":{"kind":"Name","value":"is_trigger_rto"}},{"kind":"Field","name":{"kind":"Name","value":"is_applicable_for_part_cancel"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"cost_attributed_to"}},{"kind":"Field","name":{"kind":"Name","value":"code_for"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]} as unknown as DocumentNode<GetAllReasonCodesQuery, GetAllReasonCodesQueryVariables>;
export const GetProductByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProductById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"getProductByIdId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getProductById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"getProductByIdId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"descriptor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"images"}},{"kind":"Field","name":{"kind":"Name","value":"long_desc"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"short_desc"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}},{"kind":"Field","name":{"kind":"Name","value":"custom_group"}},{"kind":"Field","name":{"kind":"Name","value":"customizable"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"}},{"kind":"Field","name":{"kind":"Name","value":"domain"}},{"kind":"Field","name":{"kind":"Name","value":"variants"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"}},{"kind":"Field","name":{"kind":"Name","value":"domainName"}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"maximum_value"}},{"kind":"Field","name":{"kind":"Name","value":"offer_percent"}},{"kind":"Field","name":{"kind":"Name","value":"offer_value"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"quantity"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"available"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}},{"kind":"Field","name":{"kind":"Name","value":"maximum"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}},{"kind":"Field","name":{"kind":"Name","value":"unitized"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"measure"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"time_to_ship_in_hours"}},{"kind":"Field","name":{"kind":"Name","value":"custom_group"}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ondc_org_cancellable"}},{"kind":"Field","name":{"kind":"Name","value":"ondc_org_available_on_cod"}},{"kind":"Field","name":{"kind":"Name","value":"ondc_org_contact_details_consumer_care"}},{"kind":"Field","name":{"kind":"Name","value":"ondc_org_fssai_license_no"}},{"kind":"Field","name":{"kind":"Name","value":"ondc_org_mandatory_reqs_veggies_fruits"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"net_quantity"}}]}},{"kind":"Field","name":{"kind":"Name","value":"ondc_org_return_window"}},{"kind":"Field","name":{"kind":"Name","value":"ondc_org_returnable"}},{"kind":"Field","name":{"kind":"Name","value":"ondc_org_seller_pickup_return"}},{"kind":"Field","name":{"kind":"Name","value":"ondc_org_statutory_reqs_packaged_commodities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"common_or_generic_name_of_commodity"}},{"kind":"Field","name":{"kind":"Name","value":"manufacturer_or_packer_address"}},{"kind":"Field","name":{"kind":"Name","value":"manufacturer_or_packer_name"}},{"kind":"Field","name":{"kind":"Name","value":"month_year_of_manufacture_packing_import"}},{"kind":"Field","name":{"kind":"Name","value":"net_quantity_or_measure_of_commodity_in_pkg"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"provider"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"descriptor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"images"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"long_desc"}},{"kind":"Field","name":{"kind":"Name","value":"short_desc"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}},{"kind":"Field","name":{"kind":"Name","value":"catalogs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"descriptor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"images"}},{"kind":"Field","name":{"kind":"Name","value":"long_desc"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"short_desc"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"maximum_value"}},{"kind":"Field","name":{"kind":"Name","value":"offer_percent"}},{"kind":"Field","name":{"kind":"Name","value":"offer_value"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"parent_item_id"}},{"kind":"Field","name":{"kind":"Name","value":"city_code"}}]}}]}}]} as unknown as DocumentNode<GetProductByIdQuery, GetProductByIdQueryVariables>;
export const GetSearchPageDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSearchPageData"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"loc"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Location"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cityCode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"domain"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSearchPageData"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}},{"kind":"Argument","name":{"kind":"Name","value":"loc"},"value":{"kind":"Variable","name":{"kind":"Name","value":"loc"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"cityCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cityCode"}}},{"kind":"Argument","name":{"kind":"Name","value":"domain"},"value":{"kind":"Variable","name":{"kind":"Name","value":"domain"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"catalogs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"provider_id"}},{"kind":"Field","name":{"kind":"Name","value":"customizable"}},{"kind":"Field","name":{"kind":"Name","value":"custom_group"}},{"kind":"Field","name":{"kind":"Name","value":"city_code"}},{"kind":"Field","name":{"kind":"Name","value":"descriptor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"short_desc"}},{"kind":"Field","name":{"kind":"Name","value":"images"}}]}},{"kind":"Field","name":{"kind":"Name","value":"category_id"}},{"kind":"Field","name":{"kind":"Name","value":"domain"}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"maximum_value"}},{"kind":"Field","name":{"kind":"Name","value":"offer_percent"}},{"kind":"Field","name":{"kind":"Name","value":"offer_value"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"time_to_ship_in_hours"}},{"kind":"Field","name":{"kind":"Name","value":"domainName"}},{"kind":"Field","name":{"kind":"Name","value":"provider"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"descriptor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"calculated_max_offer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"percent"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"quantity"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unitized"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"measure"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"geoLocation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"vendors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"domain"}},{"kind":"Field","name":{"kind":"Name","value":"descriptor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetSearchPageDataQuery, GetSearchPageDataQueryVariables>;
export const GetSearchSuggestionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSearchSuggestion"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"loc"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Location"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cityCode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"domain"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSearchSuggestion"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"loc"},"value":{"kind":"Variable","name":{"kind":"Name","value":"loc"}}},{"kind":"Argument","name":{"kind":"Name","value":"cityCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cityCode"}}},{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}},{"kind":"Argument","name":{"kind":"Name","value":"domain"},"value":{"kind":"Variable","name":{"kind":"Name","value":"domain"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"catalogs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"descriptor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}},{"kind":"Field","name":{"kind":"Name","value":"domain"}}]}},{"kind":"Field","name":{"kind":"Name","value":"vendors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"descriptor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}},{"kind":"Field","name":{"kind":"Name","value":"domain"}}]}}]}}]}}]} as unknown as DocumentNode<GetSearchSuggestionQuery, GetSearchSuggestionQueryVariables>;
export const GetAllAddressesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllAddresses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllAddresses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"geoLocation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}},{"kind":"Field","name":{"kind":"Name","value":"receiver_phone"}},{"kind":"Field","name":{"kind":"Name","value":"address"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"line1"}},{"kind":"Field","name":{"kind":"Name","value":"line2"}}]}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"pincode"}},{"kind":"Field","name":{"kind":"Name","value":"landmark"}},{"kind":"Field","name":{"kind":"Name","value":"isDefault"}},{"kind":"Field","name":{"kind":"Name","value":"locality"}}]}}]}}]} as unknown as DocumentNode<GetAllAddressesQuery, GetAllAddressesQueryVariables>;
export const GetAddressByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAddressById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"getAddressByIdId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAddressById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"getAddressByIdId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"receiver_phone"}},{"kind":"Field","name":{"kind":"Name","value":"address"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"line1"}},{"kind":"Field","name":{"kind":"Name","value":"line2"}}]}},{"kind":"Field","name":{"kind":"Name","value":"locality"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"pincode"}},{"kind":"Field","name":{"kind":"Name","value":"landmark"}},{"kind":"Field","name":{"kind":"Name","value":"directions"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"geoLocation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isDefault"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetAddressByIdQuery, GetAddressByIdQueryVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Mutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"phoneNumber"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"firstName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}}},{"kind":"Argument","name":{"kind":"Name","value":"lastName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}}},{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"phoneNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"phoneNumber"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"password"}},{"kind":"Field","name":{"kind":"Name","value":"countryCode"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"dob"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<MutationMutation, MutationMutationVariables>;
export const CreateAddressDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateAddress"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddressType"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"geoLocation"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Location"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddressLinesInputType"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"city"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"state"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pincode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"receiverPhone"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"locality"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"landmark"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isDefault"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"directions"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAddress"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"geoLocation"},"value":{"kind":"Variable","name":{"kind":"Name","value":"geoLocation"}}},{"kind":"Argument","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}},{"kind":"Argument","name":{"kind":"Name","value":"city"},"value":{"kind":"Variable","name":{"kind":"Name","value":"city"}}},{"kind":"Argument","name":{"kind":"Name","value":"state"},"value":{"kind":"Variable","name":{"kind":"Name","value":"state"}}},{"kind":"Argument","name":{"kind":"Name","value":"pincode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pincode"}}},{"kind":"Argument","name":{"kind":"Name","value":"receiver_phone"},"value":{"kind":"Variable","name":{"kind":"Name","value":"receiverPhone"}}},{"kind":"Argument","name":{"kind":"Name","value":"locality"},"value":{"kind":"Variable","name":{"kind":"Name","value":"locality"}}},{"kind":"Argument","name":{"kind":"Name","value":"landmark"},"value":{"kind":"Variable","name":{"kind":"Name","value":"landmark"}}},{"kind":"Argument","name":{"kind":"Name","value":"isDefault"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isDefault"}}},{"kind":"Argument","name":{"kind":"Name","value":"directions"},"value":{"kind":"Variable","name":{"kind":"Name","value":"directions"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"receiver_phone"}},{"kind":"Field","name":{"kind":"Name","value":"geoLocation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}},{"kind":"Field","name":{"kind":"Name","value":"address"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"line1"}},{"kind":"Field","name":{"kind":"Name","value":"line2"}}]}},{"kind":"Field","name":{"kind":"Name","value":"locality"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"pincode"}},{"kind":"Field","name":{"kind":"Name","value":"landmark"}},{"kind":"Field","name":{"kind":"Name","value":"directions"}},{"kind":"Field","name":{"kind":"Name","value":"isDefault"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CreateAddressMutation, CreateAddressMutationVariables>;
export const DeleteAddressDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteAddress"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deleteAddressId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteAddress"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deleteAddressId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"receiver_phone"}},{"kind":"Field","name":{"kind":"Name","value":"geoLocation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}},{"kind":"Field","name":{"kind":"Name","value":"address"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"line1"}},{"kind":"Field","name":{"kind":"Name","value":"line2"}}]}},{"kind":"Field","name":{"kind":"Name","value":"locality"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"pincode"}},{"kind":"Field","name":{"kind":"Name","value":"landmark"}},{"kind":"Field","name":{"kind":"Name","value":"directions"}},{"kind":"Field","name":{"kind":"Name","value":"isDefault"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<DeleteAddressMutation, DeleteAddressMutationVariables>;
export const UpdateAddressDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateAddress"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateAddressId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isDefault"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAddress"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateAddressId"}}},{"kind":"Argument","name":{"kind":"Name","value":"isDefault"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isDefault"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateAddressMutation, UpdateAddressMutationVariables>;
export const UpdateAddressWithDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateAddressWithDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateAddressId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isDefault"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"directions"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"landmark"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pincode"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"state"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"city"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"locality"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"AddressLinesInputType"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"geoLocation"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Location"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"receiverPhone"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"AddressType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAddress"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateAddressId"}}},{"kind":"Argument","name":{"kind":"Name","value":"isDefault"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isDefault"}}},{"kind":"Argument","name":{"kind":"Name","value":"directions"},"value":{"kind":"Variable","name":{"kind":"Name","value":"directions"}}},{"kind":"Argument","name":{"kind":"Name","value":"landmark"},"value":{"kind":"Variable","name":{"kind":"Name","value":"landmark"}}},{"kind":"Argument","name":{"kind":"Name","value":"pincode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pincode"}}},{"kind":"Argument","name":{"kind":"Name","value":"state"},"value":{"kind":"Variable","name":{"kind":"Name","value":"state"}}},{"kind":"Argument","name":{"kind":"Name","value":"city"},"value":{"kind":"Variable","name":{"kind":"Name","value":"city"}}},{"kind":"Argument","name":{"kind":"Name","value":"locality"},"value":{"kind":"Variable","name":{"kind":"Name","value":"locality"}}},{"kind":"Argument","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}},{"kind":"Argument","name":{"kind":"Name","value":"geoLocation"},"value":{"kind":"Variable","name":{"kind":"Name","value":"geoLocation"}}},{"kind":"Argument","name":{"kind":"Name","value":"receiver_phone"},"value":{"kind":"Variable","name":{"kind":"Name","value":"receiverPhone"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateAddressWithDetailsMutation, UpdateAddressWithDetailsMutationVariables>;
export const GetVendorByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetVendorById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"getVendorByIdId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"all"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getVendorById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"getVendorByIdId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"panIndia"}},{"kind":"Field","name":{"kind":"Name","value":"withinCity"}},{"kind":"Field","name":{"kind":"Name","value":"hyperLocal"}},{"kind":"Field","name":{"kind":"Name","value":"radius_in_metres"}},{"kind":"Field","name":{"kind":"Name","value":"descriptor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}},{"kind":"Field","name":{"kind":"Name","value":"fssai_license_no"}},{"kind":"Field","name":{"kind":"Name","value":"address"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"area_code"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"locality"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"street"}}]}},{"kind":"Field","name":{"kind":"Name","value":"storeSections"}},{"kind":"Field","name":{"kind":"Name","value":"domain"}},{"kind":"Field","name":{"kind":"Name","value":"time_to_ship_in_hours"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avg"}}]}},{"kind":"Field","name":{"kind":"Name","value":"geoLocation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}},{"kind":"Field","name":{"kind":"Name","value":"catalogs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"all"},"value":{"kind":"Variable","name":{"kind":"Name","value":"all"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"category_id"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"descriptor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"long_desc"}},{"kind":"Field","name":{"kind":"Name","value":"short_desc"}}]}},{"kind":"Field","name":{"kind":"Name","value":"veg"}},{"kind":"Field","name":{"kind":"Name","value":"non_veg"}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"offer_value"}},{"kind":"Field","name":{"kind":"Name","value":"offer_percent"}},{"kind":"Field","name":{"kind":"Name","value":"maximum_value"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"category_id"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"available"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}},{"kind":"Field","name":{"kind":"Name","value":"maximum"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetVendorByIdQuery, GetVendorByIdQueryVariables>;