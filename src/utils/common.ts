import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios, { Method } from 'axios';
import { ApiResponse } from '../types';
import { User } from '../modules/user';

export const getToken = async () => {
  const token = (await AsyncStorage.getItem('jwtToken')) as string | null;
  return token;
};

export const setToken = async (jwtToken: string) => {
  await AsyncStorage.setItem('jwtToken', jwtToken);
};

export const removeToken = async () => {
  await AsyncStorage.removeItem('jwtToken');
};

export const getUser = async () => {
  const token = await AsyncStorage.getItem('user');
  if (token) {
    return JSON.parse(token) as User;
  }
  return token;
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
