import { BACK_URL } from 'react-native-dotenv';
import { makeRequest } from '../utils/common';

export const changeProfileUrlApi = (formData: FormData) =>
  makeRequest('post', `${BACK_URL}/user/change-profileUrl`, formData, {
    'Content-Type': 'multipart/form-data',
  });

export const changeNameApi = (name: string) =>
  makeRequest('post', `${BACK_URL}/user/change-name`, {
    name,
  });

export const changePhoneNumberApi = (phone: string) =>
  makeRequest('post', `${BACK_URL}/user/change-phone`, {
    phone,
  });
