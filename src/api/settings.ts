import { BACK_URL } from 'react-native-dotenv';
import { makeRequest } from '../utils/common';

export const changeNameApi = (name: string) =>
  makeRequest('put', `${BACK_URL}/user/change-name`, {
    name,
  });

export const changeProfileApi = (formData: FormData) =>
  makeRequest('put', `${BACK_URL}/user/change-profileUrl`, formData, {
    'Content-Type': 'multipart/form-data',
  });

export const changePhoneApi = (phone: string) =>
  makeRequest('put', `${BACK_URL}/user/change-phone`, {
    phone,
  });

export const sendVerificationCodeApi = (email: string) =>
  makeRequest('get', `${BACK_URL}/user/change-email?email=${email}`);

export const changeEmailApi = (email: string, verifyCode: string) =>
  makeRequest('put', `${BACK_URL}/user/change-email`, {
    email,
    verifyCode,
  });

export const changePasswordApi = (password: string) =>
  makeRequest('put', `${BACK_URL}/user/change-password`, {
    password,
  });
