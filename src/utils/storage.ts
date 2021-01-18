import AsyncStorage from '@react-native-community/async-storage';
import { User } from '~/store/user/types';

export const getJwtToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    return token;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const setJwtToken = async (value: string): Promise<void> => {
  try {
    await AsyncStorage.setItem('accessToken', value);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const removeJwtToken = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem('accessToken');
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getUser = async (): Promise<User | null> => {
  try {
    const token = await AsyncStorage.getItem('user');
    if (token) {
      return JSON.parse(token) as User;
    } else {
      return null;
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

export const setUser = async (user: string): Promise<void> => {
  try {
    await AsyncStorage.setItem('user', JSON.parse(user));
  } catch (error) {
    return Promise.reject(error);
  }
};

export const removeUser = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem('user');
  } catch (error) {
    return Promise.reject(error);
  }
};
