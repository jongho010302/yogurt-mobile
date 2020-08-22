import { AsyncState } from '../types';

export interface ChangeName {
  state: AsyncState;
  errorMessage: string;
}

export interface ChangeProfile {
  state: AsyncState;
  errorMessage: string;
}

export interface ChangePhone {
  state: AsyncState;
  errorMessage: string;
}

export interface UserState {
  changeName: ChangeName;
  changeProfile: ChangeProfile;
  changePhone: ChangePhone;
}
