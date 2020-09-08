import { handle } from 'redux-pack';
import { produce } from 'immer';
import {
  CHANGE_FIELD,
  CHECK_USER,
  LOG_IN,
  LOG_OUT,
  FIND_MASKING_USERNAME,
  FIND_USERNAME,
  SEND_FIND_PASSWORD_CODE,
  VERIFY_FIND_PASSWORD_CODE,
  FIND_PASSWORD,
  GET_STUDIOS,
  VERIFY_USERNAME,
  SEND_SIGN_UP_CODE,
  VERIFY_SIGN_UP_CODE,
  SIGN_UP,
  CHANGE_NAME,
  CHANGE_PROFILE,
  CHANGE_PHONE,
  CHANGE_EMAIL,
  CHANGE_PASSWORD,
  SEND_VERIFICATION_CODE,
} from './constants';
import { AsyncStatus } from '../types';
import { UserState } from './types';
import {
  removeToken,
  setToken,
  setAxiosHeaders,
  removeAxiosHeaders,
} from '../../utils/common';
import { ApiResponse } from '../../types';

const initialState: UserState = {
  data: null,
  check: {
    status: AsyncStatus.INIT,
    errorMessage: '',
  },
  logIn: {
    status: AsyncStatus.INIT,
    errorMessage: '',
  },
  logOut: {
    status: AsyncStatus.INIT,
    errorMessage: '',
  },
  findMaskingUsername: {
    data: null,
    status: AsyncStatus.INIT,
    errorMessage: '',
  },
  findUsername: {
    status: AsyncStatus.INIT,
    errorMessage: '',
  },
  sendFindPasswordCode: {
    status: AsyncStatus.INIT,
    errorMessage: '',
  },
  verifyFindPasswordCode: {
    status: AsyncStatus.INIT,
    errorMessage: '',
  },
  findPassword: {
    status: AsyncStatus.INIT,
    errorMessage: '',
  },
  getStudios: {
    data: null,
    status: AsyncStatus.INIT,
    errorMessage: '',
  },
  verifyUsername: {
    status: AsyncStatus.INIT,
    errorMessage: '',
  },
  sendSignUpCode: {
    status: AsyncStatus.INIT,
    errorMessage: '',
  },
  verifySignUpCode: {
    status: AsyncStatus.INIT,
    errorMessage: '',
  },
  signUp: {
    status: AsyncStatus.INIT,
    errorMessage: '',
  },
  changeName: {
    status: AsyncStatus.INIT,
    errorMessage: '',
  },
  changeProfile: {
    status: AsyncStatus.INIT,
    errorMessage: '',
  },
  changePhone: {
    status: AsyncStatus.INIT,
    errorMessage: '',
  },
  sendVerificationCode: {
    status: AsyncStatus.INIT,
    errorMessage: '',
  },
  changeEmail: {
    status: AsyncStatus.INIT,
    errorMessage: '',
  },
  changePassword: {
    status: AsyncStatus.INIT,
    errorMessage: '',
  },
};

export const reducer = (
  state: UserState = initialState,
  action: { type: string; payload: any },
) => {
  const { type } = action;
  switch (type) {
    case CHANGE_FIELD:
      return produce(state, (draft) => {
        // @ts-ignore
        draft[action.payload.key] = action.payload.value;
      });
    case CHECK_USER:
      return handle(state, action, {
        start: (prevState) =>
          produce(prevState, (draft) => {
            draft.check.status = AsyncStatus.WAITING;
          }),
        failure: (prevState, { payload }: { payload: ApiResponse }) =>
          produce(prevState, (draft) => {
            draft.check.status = AsyncStatus.FAILURE;
            draft.check.errorMessage =
              payload.message || 'Failed to check user.';
            removeToken();
            removeAxiosHeaders();
          }),
        success: (prevState, { payload }: { payload: ApiResponse }) =>
          produce(prevState, (draft) => {
            draft.data = payload.data;
            draft.check.status = AsyncStatus.SUCCESS;
          }),
      });
    case LOG_IN:
      return handle(state, action, {
        start: (prevState) =>
          produce(prevState, (draft) => {
            draft.logIn.status = AsyncStatus.WAITING;
          }),
        failure: (prevState, { payload }: { payload: ApiResponse }) =>
          produce(prevState, (draft) => {
            draft.logIn.status = AsyncStatus.FAILURE;
            draft.logIn.errorMessage = payload.message || 'Failed to login.';
            removeToken();
          }),
        success: (prevState, { payload }: { payload: ApiResponse }) =>
          produce(prevState, (draft) => {
            const { accessToken, user } = payload.data;
            draft.data = user;
            draft.logIn.status = AsyncStatus.SUCCESS;

            setAxiosHeaders(accessToken);
            setToken(accessToken);
          }),
      });
    case LOG_OUT:
      return handle(state, action, {
        start: (prevState) =>
          produce(prevState, (draft) => {
            draft.logOut.status = AsyncStatus.WAITING;
          }),
        failure: (prevState, { payload }: { payload: ApiResponse }) =>
          produce(prevState, (draft) => {
            draft.logOut.status = AsyncStatus.FAILURE;
            draft.logOut.errorMessage = payload.message || 'Failed to logout.';
          }),
        success: (prevState) =>
          produce(prevState, (draft) => {
            draft.data = null;
            draft.logOut.status = AsyncStatus.SUCCESS;
            removeAxiosHeaders();
            removeToken();
          }),
      });
    case FIND_MASKING_USERNAME:
      return handle(state, action, {
        start: (prevState) =>
          produce(prevState, (draft) => {
            draft.findMaskingUsername.status = AsyncStatus.WAITING;
          }),
        failure: (prevState, { payload }: { payload: ApiResponse }) =>
          produce(prevState, (draft) => {
            draft.findMaskingUsername.status = AsyncStatus.FAILURE;
            draft.findMaskingUsername.errorMessage =
              payload.message || 'Failed to find masking username.';
          }),
        success: (prevState, { payload }: { payload: ApiResponse }) =>
          produce(prevState, (draft) => {
            draft.findMaskingUsername.data = payload.data;
            draft.findMaskingUsername.status = AsyncStatus.SUCCESS;
          }),
      });
    case FIND_USERNAME:
      return handle(state, action, {
        start: (prevState) =>
          produce(prevState, (draft) => {
            draft.findUsername.status = AsyncStatus.WAITING;
          }),
        failure: (prevState, { payload }: { payload: ApiResponse }) =>
          produce(prevState, (draft) => {
            draft.findUsername.status = AsyncStatus.FAILURE;
            draft.findUsername.errorMessage =
              payload.message || 'Failed to find username.';
          }),
        success: (prevState) =>
          produce(prevState, (draft) => {
            draft.findUsername.status = AsyncStatus.SUCCESS;
          }),
      });
    case SEND_FIND_PASSWORD_CODE:
      return handle(state, action, {
        start: (prevState) =>
          produce(prevState, (draft) => {
            draft.sendFindPasswordCode.status = AsyncStatus.WAITING;
          }),
        failure: (prevState, { payload }: { payload: ApiResponse }) =>
          produce(prevState, (draft) => {
            draft.sendFindPasswordCode.status = AsyncStatus.FAILURE;
            draft.sendFindPasswordCode.errorMessage =
              payload.message || 'Failed to send find password code.';
          }),
        success: (prevState) =>
          produce(prevState, (draft) => {
            draft.sendFindPasswordCode.status = AsyncStatus.SUCCESS;
          }),
      });
    case VERIFY_FIND_PASSWORD_CODE:
      return handle(state, action, {
        start: (prevState) =>
          produce(prevState, (draft) => {
            draft.verifyFindPasswordCode.status = AsyncStatus.WAITING;
          }),
        failure: (prevState, { payload }: { payload: ApiResponse }) =>
          produce(prevState, (draft) => {
            draft.verifyFindPasswordCode.status = AsyncStatus.FAILURE;
            draft.verifyFindPasswordCode.errorMessage =
              payload.message || 'Failed to verfiy find password code.';
          }),
        success: (prevState) =>
          produce(prevState, (draft) => {
            draft.verifyFindPasswordCode.status = AsyncStatus.SUCCESS;
          }),
      });
    case FIND_PASSWORD:
      return handle(state, action, {
        start: (prevState) =>
          produce(prevState, (draft) => {
            draft.findPassword.status = AsyncStatus.WAITING;
          }),
        failure: (prevState, { payload }: { payload: ApiResponse }) =>
          produce(prevState, (draft) => {
            draft.findPassword.status = AsyncStatus.FAILURE;
            draft.findPassword.errorMessage =
              payload.message || 'Failed to find password.';
          }),
        success: (prevState) =>
          produce(prevState, (draft) => {
            draft.findPassword.status = AsyncStatus.SUCCESS;
          }),
      });
    case GET_STUDIOS:
      return handle(state, action, {
        start: (prevState) =>
          produce(prevState, (draft) => {
            draft.getStudios.status = AsyncStatus.WAITING;
          }),
        failure: (prevState, { payload }: { payload: ApiResponse }) =>
          produce(prevState, (draft) => {
            draft.getStudios.status = AsyncStatus.FAILURE;
            draft.getStudios.errorMessage =
              payload.message || 'Failed to get studios.';
          }),
        success: (prevState, { payload }: { payload: ApiResponse }) =>
          produce(prevState, (draft) => {
            draft.getStudios.data = payload.data;
            draft.getStudios.status = AsyncStatus.SUCCESS;
          }),
      });
    case VERIFY_USERNAME:
      return handle(state, action, {
        start: (prevState) =>
          produce(prevState, (draft) => {
            draft.verifyUsername.status = AsyncStatus.WAITING;
          }),
        failure: (prevState, { payload }: { payload: ApiResponse }) =>
          produce(prevState, (draft) => {
            draft.verifyUsername.status = AsyncStatus.FAILURE;
            draft.verifyUsername.errorMessage =
              payload.message || 'Failed to verify username.';
          }),
        success: (prevState) =>
          produce(prevState, (draft) => {
            draft.verifyUsername.status = AsyncStatus.SUCCESS;
          }),
      });
    case SEND_SIGN_UP_CODE:
      return handle(state, action, {
        start: (prevState) =>
          produce(prevState, (draft) => {
            draft.sendSignUpCode.status = AsyncStatus.WAITING;
          }),
        failure: (prevState, { payload }: { payload: ApiResponse }) =>
          produce(prevState, (draft) => {
            draft.sendSignUpCode.status = AsyncStatus.FAILURE;
            draft.sendSignUpCode.errorMessage =
              payload.message || 'Failed to send signup code.';
          }),
        success: (prevState) =>
          produce(prevState, (draft) => {
            draft.sendSignUpCode.status = AsyncStatus.SUCCESS;
          }),
      });
    case VERIFY_SIGN_UP_CODE:
      return handle(state, action, {
        start: (prevState) =>
          produce(prevState, (draft) => {
            draft.verifySignUpCode.status = AsyncStatus.WAITING;
          }),
        failure: (prevState, { payload }: { payload: ApiResponse }) =>
          produce(prevState, (draft) => {
            draft.verifySignUpCode.status = AsyncStatus.FAILURE;
            draft.verifySignUpCode.errorMessage =
              payload.message || 'Failed to verify signup code.';
          }),
        success: (prevState) =>
          produce(prevState, (draft) => {
            draft.verifySignUpCode.status = AsyncStatus.SUCCESS;
          }),
      });
    case SIGN_UP:
      return handle(state, action, {
        start: (prevState) =>
          produce(prevState, (draft) => {
            draft.signUp.status = AsyncStatus.WAITING;
          }),
        failure: (prevState, { payload }: { payload: ApiResponse }) =>
          produce(prevState, (draft) => {
            draft.signUp.status = AsyncStatus.FAILURE;
            draft.signUp.errorMessage = payload.message || 'Failed to signup.';
          }),
        success: (prevState) =>
          produce(prevState, (draft) => {
            draft.signUp.status = AsyncStatus.SUCCESS;
          }),
      });
    case CHANGE_NAME:
      return handle(state, action, {
        start: (prevState) =>
          produce(prevState, (draft) => {
            draft.changeName.status = AsyncStatus.WAITING;
          }),
        failure: (prevState, { payload }: { payload: ApiResponse }) =>
          produce(prevState, (draft) => {
            draft.changeName.status = AsyncStatus.FAILURE;
            draft.changeName.errorMessage =
              payload.message || 'Failed to check user.';
          }),
        success: (prevState, { payload }: { payload: ApiResponse }) =>
          produce(prevState, (draft) => {
            draft.changeName.status = AsyncStatus.SUCCESS;
            draft.data = payload.data;
          }),
      });
    case CHANGE_PHONE:
      return handle(state, action, {
        start: (prevState) =>
          produce(prevState, (draft) => {
            draft.changePhone.status = AsyncStatus.WAITING;
          }),
        failure: (prevState, { payload }: { payload: ApiResponse }) =>
          produce(prevState, (draft) => {
            draft.changePhone.status = AsyncStatus.FAILURE;
            draft.changePhone.errorMessage =
              payload.message || 'Failed to check user.';
          }),
        success: (prevState, { payload }: { payload: ApiResponse }) =>
          produce(prevState, (draft) => {
            draft.changePhone.status = AsyncStatus.SUCCESS;
            draft.data = payload.data;
          }),
      });
    case CHANGE_PROFILE:
      return handle(state, action, {
        start: (prevState) =>
          produce(prevState, (draft) => {
            draft.changeProfile.status = AsyncStatus.WAITING;
          }),
        failure: (prevState, { payload }: { payload: ApiResponse }) =>
          produce(prevState, (draft) => {
            draft.changeProfile.status = AsyncStatus.FAILURE;
            draft.changeProfile.errorMessage =
              payload.message || 'Failed to check user.';
          }),
        success: (prevState, { payload }: { payload: ApiResponse }) =>
          produce(prevState, (draft) => {
            draft.changeProfile.status = AsyncStatus.SUCCESS;
            draft.data = payload.data;
          }),
      });
    case CHANGE_EMAIL:
      return handle(state, action, {
        start: (prevState) =>
          produce(prevState, (draft) => {
            draft.changeEmail.status = AsyncStatus.WAITING;
          }),
        failure: (prevState, { payload }: { payload: ApiResponse }) =>
          produce(prevState, (draft) => {
            draft.changeEmail.status = AsyncStatus.FAILURE;
            draft.changeEmail.errorMessage =
              payload.message || 'Failed to change email.';
          }),
        success: (prevState, { payload }: { payload: ApiResponse }) =>
          produce(prevState, (draft) => {
            draft.changeEmail.status = AsyncStatus.SUCCESS;
            draft.data = payload.data;
          }),
      });
    case SEND_VERIFICATION_CODE:
      return handle(state, action, {
        start: (prevState) =>
          produce(prevState, (draft) => {
            draft.sendVerificationCode.status = AsyncStatus.WAITING;
          }),
        failure: (prevState, { payload }: { payload: ApiResponse }) =>
          produce(prevState, (draft) => {
            draft.sendVerificationCode.status = AsyncStatus.FAILURE;
            draft.sendVerificationCode.errorMessage =
              payload.message || 'Failed to send verification code';
          }),
        success: (prevState, { payload }: { payload: ApiResponse }) =>
          produce(prevState, (draft) => {
            draft.sendVerificationCode.status = AsyncStatus.SUCCESS;
            draft.data = payload.data;
          }),
      });
    case CHANGE_PASSWORD:
      return handle(state, action, {
        start: (prevState) =>
          produce(prevState, (draft) => {
            draft.changePassword.status = AsyncStatus.WAITING;
          }),
        failure: (prevState, { payload }: { payload: ApiResponse }) =>
          produce(prevState, (draft) => {
            draft.changePassword.status = AsyncStatus.FAILURE;
            draft.changePassword.errorMessage =
              payload.message || 'Failed to change password.';
          }),
        success: (prevState, { payload }: { payload: ApiResponse }) =>
          produce(prevState, (draft) => {
            draft.changePassword.status = AsyncStatus.SUCCESS;
            draft.data = payload.data;
          }),
      });
    default:
      return state;
  }
};

export default reducer;
