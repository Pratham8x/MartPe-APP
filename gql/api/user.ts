import { MutationCreateUserArgs } from "gql/graphql";
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

export const CreateUser = async (params: MutationCreateUserArgs) => {
  return graphqlClient.request(createNewUserMutation, {
    ...params,
  });
};

export const getAllAddresses = async () => {
  const headers = await getHeaders();
  return graphqlClient.setHeaders(headers).request(getAllAddressesQuery);
};

export const AddNewUserAddress = async ({ addressInput }) => {
  const headers = await getHeaders();
  return graphqlClient
    .setHeaders(headers)
    .request(addNewUserAddressMutation, addressInput);
};

export const DeleteUserAddress = async ({ addressId }) => {
  const headers = await getHeaders();
  return graphqlClient.setHeaders(headers).request(deleteUserAddressMutation, {
    deleteAddressId: addressId,
  });
};

export const MarkAddressAsDefault = async ({ addressId, isDefault }) => {
  const headers = await getHeaders();
  return graphqlClient
    .setHeaders(headers)
    .request(markAddressAsDefaultMutation, {
      updateAddressId: addressId,
      isDefault,
    });
};

export const GetAddressById = async ({ addressId }) => {
  const headers = await getHeaders();
  return graphqlClient.setHeaders(headers).request(getAddressByIdQuery, {
    getAddressByIdId: addressId,
  });
};

export const UpdateAddress = async ({ addressInput }) => {
  const headers = await getHeaders();
  return graphqlClient
    .setHeaders(headers)
    .request(updateAddressMutation, addressInput);
};

export const me = async () => {
  const headers = await getHeaders();
  return graphqlClient.setHeaders(headers).request(meQuery, null);
};
