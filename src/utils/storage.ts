import AsyncStorage from '@react-native-community/async-storage';

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
