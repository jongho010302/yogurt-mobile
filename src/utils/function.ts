import { AsyncStorage, Alert } from 'react-native';

import axios, { Method } from 'axios';
import { ApiResponse } from 'src/types';

export const getToken = async (): Promise<string> => {
  return (await AsyncStorage.getItem('jwtToken')) as string;
};

export const setToken = async (data: any) => {
  return await AsyncStorage.setItem('jwtToken', data.data);
};

export const yogurtAlert = (message: string) => {
  Alert.alert(message);
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
    return err.response.data;
  }
};
