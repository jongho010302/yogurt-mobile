import { BACK_URL } from 'react-native-dotenv';
import { makeRequest } from '../utils/common';

export const checkUserApi = () => makeRequest('get', `${BACK_URL}/user/check`);

export const logInApi = (username: string, password: string) =>
  makeRequest('post', `${BACK_URL}/auth/log-in`, {
    username,
    password,
  });

export const logOutApi = () => makeRequest('post', `${BACK_URL}/user/log-out`);

export const findMaskingUsernameApi = (name: string) =>
  makeRequest('get', `${BACK_URL}/auth/find/masking-username?name=${name}`);

export const findUsernameApi = (email: string) =>
  makeRequest('get', `${BACK_URL}/auth/find/username?email=${email}`);

export const sendFindPasswordCodeApi = (email: string) =>
  makeRequest('get', `${BACK_URL}/auth/find/password/verify?email=${email}`);

export const verifyFindPasswordCodeApi = (email: string, verifyCode: string) =>
  makeRequest('post', `${BACK_URL}/auth/find/password/verify`, {
    email,
    verifyCode,
  });

export const findPasswordApi = (email: string, password: string, verifyCode: string) =>
  makeRequest('put', `${BACK_URL}/auth/find/password`, {
    email,
    password,
    verifyCode,
  });

export const getStudiosApi = () => makeRequest('get', `${BACK_URL}/auth/studio`);

export const verifyUsernameApi = (username: string) =>
  makeRequest('get', `${BACK_URL}/auth/sign-up/verify/username?username=${username}`);

export const sendSignUpCodeApi = (email: string) =>
  makeRequest('get', `${BACK_URL}/auth/sign-up/verify/email?email=${email}`);

export const verifySignUpCodeApi = (email: string, verifyCode: string) =>
  makeRequest('post', `${BACK_URL}/auth/sign-up/verify/email`, {
    email,
    verifyCode,
  });

export const signUpApi = (
  studioId: number,
  username: string,
  password: string,
  email: string,
  name: string,
  gender: string,
  birth: string,
  phone: string,
  profileUrl: string,
  verifyCode: string,
) =>
  makeRequest('post', `${BACK_URL}/auth/sign-up`, {
    studioId,
    username,
    password,
    email,
    name,
    gender,
    birth,
    phone,
    profileUrl,
    verifyCode,
  });
