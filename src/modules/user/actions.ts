import { changeNameApi, changePhoneApi, changeProfileApi } from '../../api/settings';
import { CHANGE_NAME, CHANGE_PHONE, CHANGE_PROFILE, INIT_STATUS } from './constants';
import { AsyncState } from '../types';

export const changeName = (name: string) => {
  return {
    type: CHANGE_NAME,
    promise: changeNameApi(name),
  };
};

export const changePhone = (phone: string) => {
  return {
    type: CHANGE_PHONE,
    promise: changePhoneApi(phone),
  };
};

export const changeProfile = (formData: FormData) => {
  return {
    type: CHANGE_PROFILE,
    promise: changeProfileApi(formData),
  };
};

export const initStatus = () => {
  return {
    type: INIT_STATUS,
  };
};
