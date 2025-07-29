export interface selectResponseMessageT {
  data?: {
    map(arg0: (item: any) => void): unknown;
    context?: any;
    message?: any;
    error?: any;
    id: string;
  };
  error?: string;
}

export interface selectCallUserMessageT {
  context: {
    city: string;
    state: string;
  };
  message: {
    userId: string;
    cartId: string;
    fulfillmentAddressId: string;
  };
}

export type userDetailsT = {
  userId: string | undefined;
  email: string | undefined;
  phoneNumber: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  accessToken: string | undefined;
};
export type breakupT = {
  delivery: number | undefined;
  packing: number | undefined;
  convenience: number | undefined;
  discount: number | undefined;
  tax: number | undefined;
};
