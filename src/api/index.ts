import axios from 'axios';
import { Alert } from 'react-native';
import Config from 'react-native-config';

const instance = axios.create({
  baseURL: Config.API_SERVER,
  withCredentials: true,
});

instance.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    Alert.alert(error.response.data.message);
    return Promise.reject(error.response.data);
  },
);

export default instance;