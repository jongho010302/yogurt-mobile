import { observable, action, makeObservable, computed } from 'mobx';
import {
  changeEmailForFindPasswordApi,
  deleteAccountApi,
  loginApi,
  logoutApi,
  sendCodeForFindingPasswordApi,
  sendCodeForSignUpApi,
  signUpApi,
  verifyCodeForFindingPasswordApi,
  verifyCodeForSignUpApi,
} from '~/api/auth';
import { changeNameApi, changePasswordApi, changeProfileApi, getUserApi } from '~/api/user';
import { removeAxiosHeaders, setAxiosHeaders } from '~/utils/http';
import { removeJwtToken, removeUser, setJwtToken, setUser } from '~/utils/storage';
import { ApiState, AsyncStatus } from '../types';
import { User } from './types';

class UserStore {
  /**
   * Data
   */

  @observable apiState: ApiState = {
    status: AsyncStatus.INIT,
    error: '',
  };
  @observable user: User | null = null;

  constructor() {
    makeObservable(this);
  }

  /**
   * Computed
   */

  @computed get isLoading() {
    return this.apiState.status === AsyncStatus.LOADING;
  }

  @computed get isLogined() {
    return this.user ? true : false;
  }

  /**
   * Base Actions
   */

  @action initializeApiState = () => {
    this.apiState.status = AsyncStatus.INIT;
    this.apiState.error = '';
  };

  @action private loadApiState = () => {
    this.apiState.status = AsyncStatus.LOADING;
  };

  @action private failApiState = (message: string) => {
    this.apiState.status = AsyncStatus.FAILURE;
    this.apiState.error = message;
  };

  @action private succeedApiState = () => {
    this.apiState.status = AsyncStatus.SUCCESS;
  };

  /**
   * Private Actions
   */

  @action private setUser = (user: User) => {
    this.user = user;
  };

  @action private removeUser = () => {
    this.user = null;
  };

  /**
   * Signup Actions
   */

  @action signup = async (
    email: string,
    password: string,
    name: string,
    gender: string,
    birthDay: string,
    phone: string,
    verificationCode: string,
  ): Promise<void> => {
    this.loadApiState();
    try {
      await signUpApi(email, password, name, gender, birthDay, phone, verificationCode);
      await this.login(email, password);
      this.succeedApiState();
    } catch (error) {
      this.failApiState(error.error);
    }
  };

  @action sendCodeForSignUp = async (email: string): Promise<void> => {
    this.loadApiState();
    try {
      await sendCodeForSignUpApi(email);
      this.succeedApiState();
    } catch (error) {
      this.failApiState(error.error);
    }
  };

  @action verifyCodeForSignUp = async (email: string, verificationCode: string): Promise<void> => {
    this.loadApiState();
    try {
      await verifyCodeForSignUpApi(email, verificationCode);
      this.succeedApiState();
    } catch (error) {
      this.failApiState(error.error);
    }
  };

  /**
   * Find Password Actions
   */

  @action changePasswordForFindPassword = async (
    email: string,
    newPassword: string,
    verificationCode: string,
  ): Promise<void> => {
    this.loadApiState();
    try {
      await changeEmailForFindPasswordApi(email, newPassword, verificationCode);
      this.succeedApiState();
    } catch (error) {
      this.failApiState(error.error);
    }
  };

  @action sendCodeForFindPassword = async (email: string): Promise<void> => {
    this.loadApiState();
    try {
      await sendCodeForFindingPasswordApi(email);
      this.succeedApiState();
    } catch (error) {
      this.failApiState(error.error);
    }
  };

  @action verifyCodeForFindPassword = async (email: string, verificationCode: string): Promise<void> => {
    this.loadApiState();
    try {
      await verifyCodeForFindingPasswordApi(email, verificationCode);
      this.succeedApiState();
    } catch (error) {
      this.failApiState(error.error);
    }
  };

  /**
   * Login / Logout Actions
   */

  @action login = async (email: string, password: string): Promise<void> => {
    this.loadApiState();
    try {
      const res = await loginApi(email, password);
      this.setUser(res.data.user);
      setJwtToken(res.data.accessToken);
      setUser(res.data.user);
      setAxiosHeaders(res.data.accessToken);
      this.succeedApiState();
    } catch (error) {
      this.failApiState(error.error);
    }
  };

  @action logout = async (): Promise<void> => {
    this.loadApiState();
    try {
      await logoutApi();
      this.removeUser();
      removeJwtToken();
      removeUser();
      removeAxiosHeaders();
      this.succeedApiState();
    } catch (error) {
      this.failApiState(error.error);
    }
  };

  /**
   * Change Password Actions
   */

  @action changePasswordInProfile = async (password: string): Promise<void> => {
    this.loadApiState();
    try {
      await changePasswordApi(password);
      this.succeedApiState();
    } catch (error) {
      this.failApiState(error.error);
    }
  };

  /**
   * Change Name Actions
   */

  @action changeName = async (name: string): Promise<void> => {
    this.loadApiState();
    try {
      const res = await changeNameApi(name);
      this.setUser(res.data);
      this.succeedApiState();
    } catch (error) {
      this.failApiState(error.error);
    }
  };

  /**
   * Change Profile Actions
   */

  @action changeProfile = async (formData: FormData): Promise<void> => {
    this.loadApiState();
    try {
      const res = await changeProfileApi(formData);
      this.setUser(res.data);
      this.succeedApiState();
    } catch (error) {
      this.failApiState(error.error);
    }
  };

  /**
   * Delete Account Actions
   */

  @action deleteAccount = async (): Promise<void> => {
    this.loadApiState();
    try {
      await deleteAccountApi();
      this.removeUser();
      removeJwtToken();
      removeUser();
      removeAxiosHeaders();
      this.succeedApiState();
    } catch (error) {
      this.failApiState(error.error);
    }
  };

  /**
   * Get User Actions
   */

  @action getUser = async (): Promise<void> => {
    this.loadApiState();
    try {
      const res = await getUserApi();
      this.setUser(res.data);
      setUser(res.data);
    } catch (error) {
      this.failApiState(error.error);
    }
  };
}

export default new UserStore();
