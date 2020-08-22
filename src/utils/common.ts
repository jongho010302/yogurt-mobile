import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios, { Method } from 'axios';
import { ApiResponse } from '../types';
import { User } from '../modules/auth';

export const getToken = async () => {
  const token = (await AsyncStorage.getItem('jwtToken')) as string | null;
  return token;
};

export const setToken = async (jwtToken: string) => {
  return await AsyncStorage.setItem('jwtToken', jwtToken);
};

export const removeToken = async () => {
  return await AsyncStorage.removeItem('jwtToken');
};

export const getUser = async () => {
  const token = await AsyncStorage.getItem('user');
  if (token) {
    return JSON.parse(token) as User;
  } else {
    return token;
  }
};

export const setUser = async (user: User) => {
  return await AsyncStorage.setItem('user', JSON.stringify(user));
};

export const removeUser = async () => {
  return await AsyncStorage.removeItem('user');
};

export const yogurtAlert = (message: string) => {
  Alert.alert(message);
};

export const setAxiosHeaders = (token: string) => {
  axios.defaults.headers.common.Authorization = token;
};

export const removeAxiosHeaders = () => {
  axios.defaults.headers.common.Authorization = undefined;
};

export const makeRequest = async (
  method: Method,
  url: string,
  data?: any,
  headers?: any,
): Promise<ApiResponse> => {
  try {
    const res = await axios({
      method,
      url,
      data,
      headers,
    });

    return res.data;
  } catch (err) {
    yogurtAlert(err.response.data.message);
    throw err.response.data;
  }
};
