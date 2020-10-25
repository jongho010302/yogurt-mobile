import { AsyncStatus } from '../types';
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
  status: AsyncStatus;
  errorMessage: string;
}

export interface LogIn {
  status: AsyncStatus;
  errorMessage: string;
}

export interface LogOut {
  status: AsyncStatus;
  errorMessage: string;
}

export interface FindMaskingUsername {
  data: string[] | null;
  status: AsyncStatus;
  errorMessage: string;
}

export interface FindUsername {
  status: AsyncStatus;
  errorMessage: string;
}

export interface SendFindPasswordCode {
  status: AsyncStatus;
  errorMessage: string;
}

export interface VerifyFindPasswordCode {
  status: AsyncStatus;
  errorMessage: string;
}

export interface FindPassword {
  status: AsyncStatus;
  errorMessage: string;
}

export interface GetStudios {
  data: Studio[] | null;
  status: AsyncStatus;
  errorMessage: string;
}

export interface VerifyUsername {
  status: AsyncStatus;
  errorMessage: string;
}

export interface SendSignUpCode {
  status: AsyncStatus;
  errorMessage: string;
}

export interface VerifySignUpCode {
  status: AsyncStatus;
  errorMessage: string;
}

export interface SignUp {
  status: AsyncStatus;
  errorMessage: string;
}

export interface ChangeName {
  status: AsyncStatus;
  errorMessage: string;
}

export interface ChangeProfile {
  status: AsyncStatus;
  errorMessage: string;
}

export interface ChangePhone {
  status: AsyncStatus;
  errorMessage: string;
}

export interface SendVerificationCode {
  status: AsyncStatus;
  errorMessage: string;
}

export interface ChangeEmail {
  status: AsyncStatus;
  errorMessage: string;
}

export interface ChangePassword {
  status: AsyncStatus;
  errorMessage: string;
}

export interface UserState {
  data: User | null;
  check: Check;
  login: LogIn;
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
  changeName: ChangeName;
  changeProfile: ChangeProfile;
  changePhone: ChangePhone;
  sendVerificationCode: SendVerificationCode;
  changeEmail: ChangeEmail;
  changePassword: ChangePassword;
}
