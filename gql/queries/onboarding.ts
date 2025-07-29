import { graphql } from "../../gql";

export const generateOTPQuery = graphql(`
  #graphql
  mutation GenerateOTP($sendTo: String!) {
    generateOTP(sendTo: $sendTo) {
      message
      orderId
    }
  }
`);

export const verifyOTPQuery = graphql(`
  #graphql
  mutation VerifyOTP($orderId: String!, $otp: String!, $sendTo: String!) {
    verifyOTP(orderId: $orderId, otp: $otp, sendTo: $sendTo) {
      token
      user {
        firstName
        # savedAddresses {
        #   id
        #   type
        #   name
        #   address {
        #     line1
        #     line2
        #   }
        #   locality
        #   city
        #   state
        #   pincode
        #   isDefault
        # }
        phoneNumber
        email
        lastName
        id
      }
      isOTPVerified
    }
  }
`);

export const resendOTPQuery = graphql(`
  #graphql
  mutation ResendOTP($orderId: String!) {
    resendOTP(orderId: $orderId) {
      message
      orderId
    }
  }
`);
