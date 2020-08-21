import { BACK_URL } from 'react-native-dotenv';
import { makeRequest } from '../utils/common';

export const loginApi = (username: string, password: string) =>
  makeRequest('post', `${BACK_URL}/auth/log-in`, {
    username,
    password,
  });

export const getStudiosApi = () => makeRequest('get', `${BACK_URL}/auth/studio`);

export const validateUsernameApi = (username: string) =>
  makeRequest('post', `${BACK_URL}/auth/verification/username-duplication`, {
    username,
  });

export const validateEmailApi = (email: string) =>
  makeRequest('post', `${BACK_URL}/auth/verification/email-duplication`, {
    email,
  });

export const signUpApi = (
  studio: any,
  username: string,
  password: string,
  email: string,
  name: string,
  gender: string,
  birth: string,
  phone: string,
) =>
  makeRequest('post', `${BACK_URL}/auth/sign-up`, {
    studio,
    username,
    password,
    email,
    name,
    gender,
    birth,
    phone,
  });
