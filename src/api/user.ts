import apiAxios from './client';

export const checkUserApi = () => apiAxios.get('/user/check');

export const logoutApi = () => apiAxios.post('/user/logout');

export const loginApi = (username: string, password: string) =>
  apiAxios.post('/auth/login', {
    username,
    password,
  });

export const findMaskingUsernameApi = (name: string) =>
  apiAxios.get(`/auth/find/masking-username?name=${name}`);

export const findUsernameApi = (email: string) =>
  apiAxios.post('/auth/find/username?email', { email });

export const sendFindPasswordCodeApi = (email: string) =>
  apiAxios.post('/auth/verification/send', {
    email,
    verificationType: 'FIND_PASSWORD',
  });

export const verifyFindPasswordCodeApi = (
  email: string,
  verificationCode: string,
) =>
  apiAxios.post('/auth/verification/verify', {
    email,
    verificationCode,
    verificationType: 'FIND_PASSWORD',
  });

export const findPasswordApi = (
  email: string,
  password: string,
  verificationCode: string,
) =>
  apiAxios.put('/auth/find/password', {
    email,
    password,
    verificationCode,
  });

export const getStudiosApi = () => apiAxios.get('/auth/studio');

export const verifyUsernameApi = (username: string) =>
  apiAxios.post('/auth/validate/username', {
    username,
  });

export const sendSignUpCodeApi = (email: string) =>
  apiAxios.post('/auth/verification/send', {
    email,
    verificationType: 'SIGNUP',
  });

export const verifySignUpCodeApi = (email: string, verificationCode: string) =>
  apiAxios.post('/auth/verification/verify', {
    email,
    verificationCode,
    verificationType: 'SIGNUP',
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
  verificationCode: string,
) =>
  apiAxios.post('/auth/sign-up', {
    studioId,
    username,
    password,
    email,
    name,
    gender,
    birth,
    phone,
    profileUrl,
    verificationCode,
  });
