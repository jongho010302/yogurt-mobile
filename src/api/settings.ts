import apiAxios from './client';

export const changeNameApi = (name: string) =>
  apiAxios.put('/user/change-name', {
    name,
  });

export const changeProfileApi = (formData: FormData) =>
  apiAxios.put('/user/change-profileUrl', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const changePhoneApi = (phone: string) =>
  apiAxios.put('/user/change-phone', {
    phone,
  });

export const sendVerificationCodeApi = (email: string) =>
  apiAxios.get(`/user/change-email?email=${email}`);

export const changeEmailApi = (email: string, verifyCode: string) =>
  apiAxios.put('/user/change-email', {
    email,
    verifyCode,
  });

export const changePasswordApi = (password: string) =>
  apiAxios.put('/user/change-password', {
    password,
  });
