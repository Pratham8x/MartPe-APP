import { ApiErrorResponseType } from '../common-types';
import Constants from "expo-constants";

export interface CreateUserResponseType {
  _id: string;
  firstName: string;
  lastName?: string;
  phoneNumber: string;
  email?: string;
  token: string;
}
const BASE_URL = Constants.expoConfig?.extra?.BACKEND_BASE_URL;


export const createUser = async (
  firstName: string,
  phoneNumber: string,
  lastName?: string,
  email?: string
) => {
  try {
    const res = await fetch(`${BASE_URL}/users/create`, {
      method: 'POST',
      body: JSON.stringify({
        firstName,
        phoneNumber,
        lastName,
        email
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (res.status !== 200) {
      console.log('create user failed');
      const data = await res.json();
      return { status: res.status, data };
    }

    const data = (await res.json()) as CreateUserResponseType;
    return { status: 200, data };
  } catch (error) {
    console.log('Create user error ', error);
    return { status: 500, data: { error: { message: 'create user failed' } } };
  }
};
