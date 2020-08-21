import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import axios, { Method } from 'axios';
import { ApiResponse } from 'src/types';

export const getToken = async () => {
  const token = (await AsyncStorage.getItem('jwtToken')) as string | null;
  return token;
};

export const setToken = async (jwtToken: any) => {
  return await AsyncStorage.setItem('jwtToken', jwtToken);
};

export const getUser = async () => {
  const token = (await AsyncStorage.getItem('user')) as any | null;
  return token;
};

export const setUser = async (user: any) => {
  return await AsyncStorage.setItem('user', user);
};

export const yogurtAlert = (message: string) => {
  Alert.alert(message);
};

export const setAxiosHeaders = (token: string) => {
  axios.defaults.headers.common.Authorization = token;
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
    console.error(err);
    yogurtAlert(err.response.data.message);
    throw err.response.data;
  }
};
