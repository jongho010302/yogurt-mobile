import { changeNameApi, changePhoneApi, changeProfileApi } from '../../api/settings';
import { CHANGE_NAME, CHANGE_PHONE, CHANGE_PROFILE } from './constants';

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
