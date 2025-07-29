import { graphql } from "../../gql";

// queries
export const getAllAddressesQuery = graphql(`
  #graphql
  query GetAllAddresses {
    getAllAddresses {
      id
      type
      name
      geoLocation {
        lat
        lng
      }
      receiver_phone
      address {
        line1
        line2
      }
      city
      state
      pincode
      landmark
      isDefault
      locality
    }
  }
`);

export const getAddressByIdQuery = graphql(`
  #graphql
  query GetAddressById($getAddressByIdId: String!) {
    getAddressById(id: $getAddressByIdId) {
      id
      type
      name
      receiver_phone
      address {
        line1
        line2
      }
      locality
      city
      state
      pincode
      landmark
      directions
      createdAt
      geoLocation {
        lat
        lng
      }
      isDefault
      updatedAt
    }
  }
`);

export const meQuery = graphql(`
  #graphql
  query Me {
    me {
      firstName
    }
  }
`);

// mutations
export const createNewUserMutation = graphql(`
  #graphql
  mutation Mutation(
    $firstName: String!
    $lastName: String
    $email: String
    $phoneNumber: String
  ) {
    createUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      phoneNumber: $phoneNumber
    ) {
      token
      id
      firstName
      lastName
      email
      password
      countryCode
      phoneNumber
      dob
      gender
      createdAt
      updatedAt
    }
  }
`);

export const addNewUserAddressMutation = graphql(`
  #graphql
  mutation CreateAddress(
    $type: AddressType!
    $name: String!
    $geoLocation: Location!
    $address: AddressLinesInputType!
    $city: String!
    $state: String!
    $pincode: String!
    $receiverPhone: String!
    $locality: String
    $landmark: String
    $isDefault: Boolean
    $directions: String
  ) {
    createAddress(
      type: $type
      name: $name
      geoLocation: $geoLocation
      address: $address
      city: $city
      state: $state
      pincode: $pincode
      receiver_phone: $receiverPhone
      locality: $locality
      landmark: $landmark
      isDefault: $isDefault
      directions: $directions
    ) {
      id
      type
      name
      receiver_phone
      geoLocation {
        lat
        lng
      }
      address {
        line1
        line2
      }
      locality
      city
      state
      pincode
      landmark
      directions
      isDefault
      createdAt
      updatedAt
    }
  }
`);

export const deleteUserAddressMutation = graphql(`
  #graphql
  mutation DeleteAddress($deleteAddressId: String!) {
    deleteAddress(id: $deleteAddressId) {
      id
      type
      name
      receiver_phone
      geoLocation {
        lat
        lng
      }
      address {
        line1
        line2
      }
      locality
      city
      state
      pincode
      landmark
      directions
      isDefault
      createdAt
      updatedAt
    }
  }
`);

export const markAddressAsDefaultMutation = graphql(`
  #graphql
  mutation UpdateAddress($updateAddressId: String!, $isDefault: Boolean) {
    updateAddress(id: $updateAddressId, isDefault: $isDefault) {
      id
    }
  }
`);

export const updateAddressMutation = graphql(`
  #graphql
  mutation UpdateAddressWithDetails(
    $updateAddressId: String!
    $isDefault: Boolean
    $directions: String
    $landmark: String
    $pincode: String
    $state: String
    $city: String
    $locality: String
    $address: AddressLinesInputType
    $geoLocation: Location
    $receiverPhone: String
    $name: String
    $type: AddressType
  ) {
    updateAddress(
      id: $updateAddressId
      isDefault: $isDefault
      directions: $directions
      landmark: $landmark
      pincode: $pincode
      state: $state
      city: $city
      locality: $locality
      address: $address
      geoLocation: $geoLocation
      receiver_phone: $receiverPhone
      name: $name
      type: $type
    ) {
      id
    }
  }
`);
