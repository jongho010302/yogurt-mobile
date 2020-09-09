import axios from 'axios';
import { BACK_URL } from 'react-native-dotenv';

import { getToken, yogurtAlert } from '../utils/common';

const instance = axios.create({
  baseURL: BACK_URL,
});

instance.interceptors.request.use(async (config) => {
  const accessToken = await getToken();
  config.headers.Authorization = accessToken ? accessToken : '';
  return config;
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    yogurtAlert(error.response.data.message);
    return Promise.reject(error);
  },
);

export default instance;
