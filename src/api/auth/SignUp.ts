import { BACK_URL } from 'react-native-dotenv';
import { makeRequest } from '../../utils';

export const getStudioListApi = async () => {
  return await makeRequest('get', `${BACK_URL}/auth/studio`);
};

export const validateUsernameApi = async (username: string) => {
  return await await makeRequest('post', `${BACK_URL}/auth/validation-username`, {
    username
  });
};

export const validateEmailApi = async (email: string) => {
  return await await makeRequest('post', `${BACK_URL}/auth/validation-email`, {
    email
  });
};

export const signUpApi = async (
  studio: any,
  username: string,
  password: string,
  email: string,
  name: string,
  gender: string,
  birth: string,
  phone: string
) => {
  return await await makeRequest('post', `${BACK_URL}/auth/sign-up`, {
    studio, username, password, email, name, gender, birth, phone
  });
};
