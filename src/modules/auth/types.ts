import { AsyncState } from '../types';
import { Studio } from '../studio/types';

export interface User {
  id: number;
  studio: Studio;
  username: string;
  password: string;
  email: string;
  name: string;
  gender: string;
  birth: string;
  phone: string;
  profileUrl: string;
  roles: Role[];
  role: Role;
  createdAt: string;
  updatedAt: string;
}

export enum Role {
  'ROLE_DEVELOPER' = 'ROLE_DEVELOPER',
  'ROLE_OWNER' = 'ROLE_OWNER',
  'ROLE_MANAGER' = 'ROLE_MANAGER',
  'ROLE_STAFF' = 'ROLE_STAFF',
  'ROLE_STUDENT' = 'ROLE_STUDENT',
}

export interface Check {
  state: AsyncState;
  errorMessage: string;
}

export interface LogIn {
  data: User | null;
  state: AsyncState;
  errorMessage: string;
}

export interface LogOut {
  state: AsyncState;
  errorMessage: string;
}

export interface FindMaskingUsername {
  data: string[] | null;
  state: AsyncState;
  errorMessage: string;
}

export interface FindUsername {
  state: AsyncState;
  errorMessage: string;
}

export interface SendFindPasswordCode {
  state: AsyncState;
  errorMessage: string;
}

export interface VerifyFindPasswordCode {
  state: AsyncState;
  errorMessage: string;
}

export interface FindPassword {
  state: AsyncState;
  errorMessage: string;
}

export interface GetStudios {
  data: Studio[] | null;
  state: AsyncState;
  errorMessage: string;
}

export interface VerifyUsername {
  state: AsyncState;
  errorMessage: string;
}

export interface SendSignUpCode {
  state: AsyncState;
  errorMessage: string;
}

export interface VerifySignUpCode {
  state: AsyncState;
  errorMessage: string;
}

export interface SignUp {
  state: AsyncState;
  errorMessage: string;
}

export interface AuthState {
  check: Check;
  logIn: LogIn;
  logOut: LogOut;
  findMaskingUsername: FindMaskingUsername;
  findUsername: FindUsername;
  sendFindPasswordCode: SendFindPasswordCode;
  verifyFindPasswordCode: VerifyFindPasswordCode;
  findPassword: FindPassword;
  getStudios: GetStudios;
  verifyUsername: VerifyUsername;
  sendSignUpCode: SendSignUpCode;
  verifySignUpCode: VerifySignUpCode;
  signUp: SignUp;
}
