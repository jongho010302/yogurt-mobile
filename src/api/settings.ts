import apiAxios from './client';

export const changeNameApi = (name: string) =>
  apiAxios.put('/user/name', {
    name,
  });

export const changeProfileApi = (formData: FormData) =>
  apiAxios.put('/user/profile', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const changePhoneApi = (phone: string) =>
  apiAxios.put('/user/phone', {
    phone,
  });

export const sendChangeEmailVerificationCodeApi = (email: string) =>
  apiAxios.post('/auth/verification/send', {
    email,
    verificationType: 'CHANGE_EMAIL',
  });

export const changeEmailApi = (email: string, verificationCode: string) =>
  apiAxios.put('/user/change-email', {
    email,
    verificationCode,
    verificationType: 'CHANGE_EMAIL',
  });

export const changePasswordApi = (password: string) =>
  apiAxios.put('/user/password', {
    password,
  });
