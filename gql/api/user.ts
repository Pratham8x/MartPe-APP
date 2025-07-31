import { MutationCreateUserArgs } from "../../gql/graphql";
import { getHeaders, graphqlClient } from "../../clients/api";
import {
  addNewUserAddressMutation,
  createNewUserMutation,
  deleteUserAddressMutation,
  getAddressByIdQuery,
  getAllAddressesQuery,
  markAddressAsDefaultMutation,
  meQuery,
  updateAddressMutation,
} from "../queries/user";

// Define types based on your GraphQL schema
interface Location {
  lat: number;
  lng: number;
}

interface AddressLinesInputType {
  line1: string;
  line2?: string;
}

type AddressType = "HOME" | "WORK" | "OTHER"; // Adjust based on your actual AddressType enum

interface AddressInput {
  type: AddressType;
  name: string;
  geoLocation: Location;
  address: AddressLinesInputType;
  city: string;
  state: string;
  pincode: string;
  receiver_phone: string; // Changed to match GraphQL schema
  locality?: string;
  landmark?: string;
  isDefault?: boolean;
  directions?: string;
}

interface UpdateAddressInput extends Partial<Omit<AddressInput, 'receiver_phone'>> {
  updateAddressId: string;
  receiver_phone?: string;
}

interface AddressIdParams {
  addressId: string;
}

interface MarkAsDefaultParams {
  addressId: string;
  isDefault: boolean;
}

export const CreateUser = async (params: MutationCreateUserArgs) => {
  return graphqlClient.request(createNewUserMutation, {
    ...params,
  });
};

export const getAllAddresses = async () => {
  const headers = await getHeaders();
  return graphqlClient.setHeaders(headers).request(getAllAddressesQuery);
};

export const AddNewUserAddress = async (addressInput: AddressInput) => {
  const headers = await getHeaders();
  return graphqlClient
    .setHeaders(headers)
    .request(addNewUserAddressMutation, addressInput);
};

export const DeleteUserAddress = async ({ addressId }: AddressIdParams) => {
  const headers = await getHeaders();
  return graphqlClient.setHeaders(headers).request(deleteUserAddressMutation, {
    deleteAddressId: addressId,
  });
};

export const MarkAddressAsDefault = async ({ addressId, isDefault }: MarkAsDefaultParams) => {
  const headers = await getHeaders();
  return graphqlClient
    .setHeaders(headers)
    .request(markAddressAsDefaultMutation, {
      updateAddressId: addressId,
      isDefault,
    });
};

export const GetAddressById = async ({ addressId }: AddressIdParams) => {
  const headers = await getHeaders();
  return graphqlClient.setHeaders(headers).request(getAddressByIdQuery, {
    getAddressByIdId: addressId,
  });
};

export const UpdateAddress = async (input: UpdateAddressInput) => {
  const headers = await getHeaders();
  return graphqlClient
    .setHeaders(headers)
    .request(updateAddressMutation, input);
};

export const me = async () => {
  const headers = await getHeaders();
  return graphqlClient.setHeaders(headers).request(meQuery, null);
};