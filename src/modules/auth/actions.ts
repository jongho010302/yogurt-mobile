import {
  checkUserApi,
  logInApi,
  logOutApi,
  findMaskingUsernameApi,
  findUsernameApi,
  sendFindPasswordCodeApi,
  verifyFindPasswordCodeApi,
  findPasswordApi,
  getStudiosApi,
  verifyUsernameApi,
  sendSignUpCodeApi,
  verifySignUpCodeApi,
  signUpApi,
} from '../../api/auth';
import {
  CHECK_USER,
  LOG_IN,
  LOG_OUT,
  FIND_MASKING_USERNAME,
  FIND_USERNAME,
  SEND_FIND_PASSWORD_CODE,
  VERIFY_FIND_PASSWORD_CODE,
  FIND_PASSWORD,
  VERIFY_USERNAME,
  SEND_SIGN_UP_CODE,
  VERIFY_SIGN_UP_CODE,
  SIGN_UP,
  GET_STUDIOS,
} from './constants';

export const checkUser = () => {
  return {
    type: CHECK_USER,
    promise: checkUserApi(),
  };
};

export const logIn = (username: string, password: string) => {
  return {
    type: LOG_IN,
    promise: logInApi(username, password),
  };
};

export const logOut = () => {
  return {
    type: LOG_OUT,
    promise: logOutApi(),
  };
};

export const findMaskingUsername = (name: string) => {
  return {
    type: FIND_MASKING_USERNAME,
    promise: findMaskingUsernameApi(name),
  };
};

export const findUsername = (email: string) => {
  return {
    type: FIND_USERNAME,
    promise: findUsernameApi(email),
  };
};

export const sendFindPasswordCode = (email: string) => {
  return {
    type: SEND_FIND_PASSWORD_CODE,
    promise: sendFindPasswordCodeApi(email),
  };
};

export const verifyFindPasswordCode = (email: string, verifyCode: string) => {
  return {
    type: VERIFY_FIND_PASSWORD_CODE,
    promise: verifyFindPasswordCodeApi(email, verifyCode),
  };
};

export const findPassword = (email: string, password: string, verifyCode: string) => {
  return {
    type: FIND_PASSWORD,
    promise: findPasswordApi(email, password, verifyCode),
  };
};

export const getStudios = () => {
  return {
    type: GET_STUDIOS,
    promise: getStudiosApi(),
  };
};

export const verifyUsername = (username: string) => {
  return {
    type: VERIFY_USERNAME,
    promise: verifyUsernameApi(username),
  };
};

export const sendSignUpCode = (email: string) => {
  return {
    type: SEND_SIGN_UP_CODE,
    promise: sendSignUpCodeApi(email),
  };
};

export const verifySignUpCode = (email: string, verifyCode: string) => {
  return {
    type: VERIFY_SIGN_UP_CODE,
    promise: verifySignUpCodeApi(email, verifyCode),
  };
};

export const signUp = (
  studioId: number,
  username: string,
  password: string,
  email: string,
  name: string,
  gender: string,
  birth: string,
  phone: string,
  profileUrl: string,
  verificationCode: string,
) => {
  return {
    type: SIGN_UP,
    promise: signUpApi(
      studioId,
      username,
      password,
      email,
      name,
      gender,
      birth,
      phone,
      profileUrl,
      verificationCode,
    ),
  };
};
