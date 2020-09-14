import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios, { Method } from 'axios';
import { ApiResponse } from '../types';
import { User } from '../modules/user';

export const getToken = async () => {
  const token = (await AsyncStorage.getItem('accessToken')) as string | null;
  return token;
};

export const setToken = async (accessToken: string) => {
  await AsyncStorage.setItem('accessToken', accessToken);
};

export const removeToken = async () => {
  await AsyncStorage.removeItem('accessToken');
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
