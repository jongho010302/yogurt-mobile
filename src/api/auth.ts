import { ApiResponse } from '~/utils/http';
import axios from './index';

/**
 * Singup
 */

export const sendCodeForSignUpApi = async (email: string): Promise<ApiResponse> =>
  axios.post('/auth/verifications/signup/send', { email });

export const verifyCodeForSignUpApi = async (email: string, verificationCode: string): Promise<ApiResponse> =>
  axios.post('/auth/verifications/signup/verify', {
    email,
    verificationCode,
  });

export const signUpApi = async (
  email: string,
  password: string,
  name: string,
  gender: string,
  birthDay: string,
  phone: string,
  verificationCode: string,
): Promise<ApiResponse> =>
  axios.post('/auth/users', {
    email,
    password,
    name,
    gender,
    birthDay,
    phone,
    verificationCode,
  });

/**
 * Find password
 */

export const changeEmailForFindPasswordApi = (
  email: string,
  password: string,
  verificationCode: string,
): Promise<ApiResponse> => {
  return axios.post('/auth/verifications/find-password/verify', { email, password, verificationCode });
};

export const sendCodeForFindingPasswordApi = (email: string): Promise<ApiResponse> => {
  return axios.post('/auth/verifications/find-password/send', { email });
};

export const verifyCodeForFindingPasswordApi = (email: string, verificationCode: string): Promise<ApiResponse> => {
  return axios.post('/auth/verifications/find-password/verify', { email, verificationCode });
};

/**
 * Login / Logout
 */

export const loginApi = async (email: string, password: string) => axios.post('/auth/tokens', { email, password });

export const logoutApi = async (): Promise<ApiResponse> => axios.delete('/auth/tokens');

/**
 * Delete Account
 */

export const deleteAccountApi = async (): Promise<ApiResponse> => {
  return axios.delete('/auth/users');
};
