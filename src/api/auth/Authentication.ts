import { BACK_URL } from 'react-native-dotenv';
import { makeRequest } from '../../utils';

export const loginApi = async (username: string, password: string) => {
  return await makeRequest('post', `${BACK_URL}/auth/log-in`, {
    username,
    password,
  });
};
