import { ApiResponse } from '~/utils/http';
import axios from './index';

export const getUserApi = (): Promise<ApiResponse> => axios.get('/user');

export const changeNameApi = (name: string): Promise<ApiResponse> =>
  axios.put('/user/name', {
    name,
  });

export const changeProfileApi = (formData: FormData): Promise<ApiResponse> =>
  axios.put('/user/profile', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const changePhoneApi = (phone: string): Promise<ApiResponse> =>
  axios.put('/user/phone', {
    phone,
  });

export const sendChangeEmailVerificationCodeApi = (email: string): Promise<ApiResponse> =>
  axios.post('/auth/verification/send', {
    email,
    verificationType: 'CHANGE_EMAIL',
  });

export const changeEmailApi = (email: string, verificationCode: string): Promise<ApiResponse> =>
  axios.put('/user/change-email', {
    email,
    verificationCode,
    verificationType: 'CHANGE_EMAIL',
  });

export const changePasswordApi = (password: string): Promise<ApiResponse> =>
  axios.put('/user/password', {
    password,
  });
