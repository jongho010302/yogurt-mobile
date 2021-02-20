import { observable, action, makeObservable, computed } from 'mobx';
import { Alert } from 'react-native';
import {
  changeEmailForFindPasswordApi,
  deleteAccountApi,
  loginApi,
  logoutApi,
  sendCodeForFindingPasswordApi,
  sendCodeForSignUpApi,
  signUpApi,
  verifyCodeForFindingPasswordApi,
} from '~/api/auth';
import { changeNameApi, changePasswordApi, changeProfileApi, getUserApi } from '~/api/user';
import { removeJwtToken, setJwtToken } from '~/utils/storage';
import { Studio } from '../studio/types';
import { ApiState, AsyncStatus } from '../types';
import { User } from './types';

class UserStore {
  /**
   * Data
   */

  @observable apiState: ApiState = {
    status: AsyncStatus.INIT,
    error: '',
    isLoading() {
      return this.status === AsyncStatus.LOADING;
    },
    isSucess() {
      return this.status === AsyncStatus.SUCCESS;
    },
    isFailure() {
      return this.status === AsyncStatus.FAILURE;
    },
  };
  @observable user: User | null = null;
  @observable studio: Studio | null = null;

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

  @action private setStudio = (studio: Studio) => {
    this.studio = studio;
  };

  @action private removeStudio = () => {
    this.studio = null;
  };

  /**
   * Signup Actions
   */

  @action signup = async (
    studioId: number,
    email: string,
    password: string,
    name: string,
    phone: string,
    verificationCode: string,
  ): Promise<void> => {
    this.loadApiState();
    try {
      await signUpApi(studioId, email, password, name, phone, verificationCode);
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

  @action verifyCodeForFindPassword = async (
    email: string,
    verificationCode: string,
  ): Promise<void> => {
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
      this.setStudio(res.data.studio);
      setJwtToken(res.data.accessToken);
      this.succeedApiState();
    } catch (error) {
      // Alert.alert(error.message);
      this.failApiState(error.error);
    }
  };

  @action logout = async (): Promise<void> => {
    this.loadApiState();
    try {
      this.removeUser();
      await logoutApi();
      removeJwtToken();
      this.removeStudio();
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
      this.removeStudio();
      removeJwtToken();
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
      this.setUser(res.data.user);
      this.setStudio(res.data.studio);
    } catch (error) {
      removeJwtToken();
      this.failApiState(error.error);
    }
  };
}

export default new UserStore();
