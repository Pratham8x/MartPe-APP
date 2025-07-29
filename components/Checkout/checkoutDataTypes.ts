export interface CheckoutData {
  context: Context;
  message: Message;
  error: Error;
}

export interface Context {
  domain: string;
  country: string;
  city: string;
  action: string;
  core_version: string;
  bap_id: string;
  bap_uri: string;
  bpp_uri: string;
  transaction_id: string;
  message_id: string;
  timestamp: string;
  bpp_id: string;
  ttl: string;
}

export interface Message {
  quote: Quote;
}

export interface Quote {
  provider: Provider;
  fulfillments: Fulfillment[];
  quote: Quote2;
  items: Item2[];
}

export interface Provider {
  id: string;
  locations: Location[];
}

export interface Location {
  id: string;
}

export interface Fulfillment {
  id: string;
  "@ondc/org/provider_name": string;
  tracking: boolean;
  "@ondc/org/category": string;
  "@ondc/org/TAT": string;
  provider_id: string;
  type: string;
  state: State;
  end: End;
}

export interface State {
  descriptor: Descriptor;
}

export interface Descriptor {
  code: string;
}

export interface End {
  location: Location2;
}

export interface Location2 {
  gps: string;
  address: Address;
}

export interface Address {
  area_code: string;
}

export interface Quote2 {
  price: Price;
  breakup: Breakup[];
  ttl: string;
}

export interface Price {
  value: string;
  currency: string;
}

export interface Breakup {
  "@ondc/org/item_id": string;
  "@ondc/org/item_quantity"?: OndcOrgItemQuantity;
  title: string;
  "@ondc/org/title_type": string;
  price: Price2;
  item?: Item;
}

export interface OndcOrgItemQuantity {
  count: number;
}

export interface Price2 {
  currency: string;
  value: string;
}

export interface Item {
  quantity: Quantity;
  price: Price3;
  tags: Tag[];
}

export interface Quantity {
  available: Available;
  maximum: Maximum;
}

export interface Available {
  count: string;
}

export interface Maximum {
  count: string;
}

export interface Price3 {
  currency: string;
  value: string;
}

export interface Tag {
  code: string;
  list: List[];
}

export interface List {
  code: string;
  value: string;
}

export interface Item2 {
  id: string;
  tags: Tag2[];
  fulfillment_id: string;
}

export interface Tag2 {
  code: string;
  list: List2[];
}

export interface List2 {
  code: string;
  value: string;
}

export interface Error {
  type: string;
  code: string;
  message: string;
}
