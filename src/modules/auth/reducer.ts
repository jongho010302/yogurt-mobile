import { handle } from 'redux-pack';
import { produce } from 'immer';
import {
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
} from './constants';
import { AsyncState } from '../types';
import { AuthState } from './types';
import {
  getUser,
  setUser,
  removeUser,
  removeToken,
  setToken,
  setAxiosHeaders,
  removeAxiosHeaders,
} from '../../utils/common';

const initialState: AuthState = {
  check: {
    state: AsyncState.INIT,
    errorMessage: '',
  },
  logIn: {
    data: getUser() as any,
    state: AsyncState.INIT,
    errorMessage: '',
  },
  logOut: {
    state: AsyncState.INIT,
    errorMessage: '',
  },
  findMaskingUsername: {
    data: null,
    state: AsyncState.INIT,
    errorMessage: '',
  },
  findUsername: {
    state: AsyncState.INIT,
    errorMessage: '',
  },
  sendFindPasswordCode: {
    state: AsyncState.INIT,
    errorMessage: '',
  },
  verifyFindPasswordCode: {
    state: AsyncState.INIT,
    errorMessage: '',
  },
  findPassword: {
    state: AsyncState.INIT,
    errorMessage: '',
  },
  getStudios: {
    data: null,
    state: AsyncState.INIT,
    errorMessage: '',
  },
  verifyUsername: {
    state: AsyncState.INIT,
    errorMessage: '',
  },
  sendSignUpCode: {
    state: AsyncState.INIT,
    errorMessage: '',
  },
  verifySignUpCode: {
    state: AsyncState.INIT,
    errorMessage: '',
  },
  signUp: {
    state: AsyncState.INIT,
    errorMessage: '',
  },
};

export const reducer = (
  state: AuthState = initialState,
  action: { type: string; payload: any },
) => {
  const { type } = action;
  switch (type) {
    case CHECK_USER:
      return handle(state, action, {
        start: prevState =>
          produce(prevState, draft => {
            draft.check.state = AsyncState.WAITING;
          }),
        failure: (prevState, { payload }) =>
          produce(prevState, draft => {
            draft.check.state = AsyncState.FAILURE;
            draft.check.errorMessage = payload.message || 'Failed to check user.';
            removeUser();
            removeToken();
            removeAxiosHeaders();
          }),
        success: (prevState, { payload }) =>
          produce(prevState, draft => {
            draft.logIn.data = payload.data;
            draft.check.state = AsyncState.SUCCESS;
            setUser(payload.data);
          }),
      });
    case LOG_IN:
      return handle(state, action, {
        start: prevState =>
          produce(prevState, draft => {
            draft.logIn.state = AsyncState.WAITING;
          }),
        failure: (prevState, { payload }) =>
          produce(prevState, draft => {
            draft.logIn.state = AsyncState.FAILURE;
            draft.logIn.errorMessage = payload.message || 'Failed to login.';
            removeUser();
            removeToken();
          }),
        success: (prevState, { payload }) =>
          produce(prevState, draft => {
            draft.logIn.data = payload.data.user;
            draft.logIn.state = AsyncState.SUCCESS;

            const { jwtToken, user } = payload.data;

            setAxiosHeaders(jwtToken);
            setToken(jwtToken);
            setUser(user);
          }),
      });
    case LOG_OUT:
      return handle(state, action, {
        start: prevState =>
          produce(prevState, draft => {
            draft.logOut.state = AsyncState.WAITING;
          }),
        failure: (prevState, { payload }) =>
          produce(prevState, draft => {
            draft.logOut.state = AsyncState.FAILURE;
            draft.logOut.errorMessage = payload.message || 'Failed to logout.';
          }),
        success: prevState =>
          produce(prevState, draft => {
            draft.logIn.data = null;
            draft.logOut.state = AsyncState.SUCCESS;
            removeAxiosHeaders();
            removeUser();
            removeToken();
          }),
      });
    case FIND_MASKING_USERNAME:
      return handle(state, action, {
        start: prevState =>
          produce(prevState, draft => {
            draft.findMaskingUsername.state = AsyncState.WAITING;
          }),
        failure: (prevState, { payload }) =>
          produce(prevState, draft => {
            draft.findMaskingUsername.state = AsyncState.FAILURE;
            draft.findMaskingUsername.errorMessage =
              payload.message || 'Failed to find masking username.';
          }),
        success: (prevState, { payload }) =>
          produce(prevState, draft => {
            draft.findMaskingUsername.data = payload.data;
            draft.findMaskingUsername.state = AsyncState.SUCCESS;
          }),
      });
    case FIND_USERNAME:
      return handle(state, action, {
        start: prevState =>
          produce(prevState, draft => {
            draft.findUsername.state = AsyncState.WAITING;
          }),
        failure: (prevState, { payload }) =>
          produce(prevState, draft => {
            draft.findUsername.state = AsyncState.FAILURE;
            draft.findUsername.errorMessage = payload.message || 'Failed to find username.';
          }),
        success: prevState =>
          produce(prevState, draft => {
            draft.findUsername.state = AsyncState.SUCCESS;
          }),
      });
    case SEND_FIND_PASSWORD_CODE:
      return handle(state, action, {
        start: prevState =>
          produce(prevState, draft => {
            draft.sendFindPasswordCode.state = AsyncState.WAITING;
          }),
        failure: (prevState, { payload }) =>
          produce(prevState, draft => {
            draft.sendFindPasswordCode.state = AsyncState.FAILURE;
            draft.sendFindPasswordCode.errorMessage =
              payload.message || 'Failed to send find password code.';
          }),
        success: prevState =>
          produce(prevState, draft => {
            draft.sendFindPasswordCode.state = AsyncState.SUCCESS;
          }),
      });
    case VERIFY_FIND_PASSWORD_CODE:
      return handle(state, action, {
        start: prevState =>
          produce(prevState, draft => {
            draft.verifyFindPasswordCode.state = AsyncState.WAITING;
          }),
        failure: (prevState, { payload }) =>
          produce(prevState, draft => {
            draft.verifyFindPasswordCode.state = AsyncState.FAILURE;
            draft.verifyFindPasswordCode.errorMessage =
              payload.message || 'Failed to verfiy find password code.';
          }),
        success: prevState =>
          produce(prevState, draft => {
            draft.verifyFindPasswordCode.state = AsyncState.SUCCESS;
          }),
      });
    case FIND_PASSWORD:
      return handle(state, action, {
        start: prevState =>
          produce(prevState, draft => {
            draft.findPassword.state = AsyncState.WAITING;
          }),
        failure: (prevState, { payload }) =>
          produce(prevState, draft => {
            draft.findPassword.state = AsyncState.FAILURE;
            draft.findPassword.errorMessage = payload.message || 'Failed to find password.';
          }),
        success: prevState =>
          produce(prevState, draft => {
            draft.findPassword.state = AsyncState.SUCCESS;
          }),
      });
    case GET_STUDIOS:
      return handle(state, action, {
        start: prevState =>
          produce(prevState, draft => {
            draft.getStudios.state = AsyncState.WAITING;
          }),
        failure: (prevState, { payload }) =>
          produce(prevState, draft => {
            draft.getStudios.state = AsyncState.FAILURE;
            draft.getStudios.errorMessage = payload.message || 'Failed to get studios.';
          }),
        success: (prevState, { payload }) =>
          produce(prevState, draft => {
            draft.getStudios.data = payload.data;
            draft.getStudios.state = AsyncState.SUCCESS;
          }),
      });
    case VERIFY_USERNAME:
      return handle(state, action, {
        start: prevState =>
          produce(prevState, draft => {
            draft.verifyUsername.state = AsyncState.WAITING;
          }),
        failure: (prevState, { payload }) =>
          produce(prevState, draft => {
            draft.verifyUsername.state = AsyncState.FAILURE;
            draft.verifyUsername.errorMessage = payload.message || 'Failed to verify username.';
          }),
        success: prevState =>
          produce(prevState, draft => {
            draft.verifyUsername.state = AsyncState.SUCCESS;
          }),
      });
    case SEND_SIGN_UP_CODE:
      return handle(state, action, {
        start: prevState =>
          produce(prevState, draft => {
            draft.sendSignUpCode.state = AsyncState.WAITING;
          }),
        failure: (prevState, { payload }) =>
          produce(prevState, draft => {
            draft.sendSignUpCode.state = AsyncState.FAILURE;
            draft.sendSignUpCode.errorMessage = payload.message || 'Failed to send signup code.';
          }),
        success: prevState =>
          produce(prevState, draft => {
            draft.sendSignUpCode.state = AsyncState.SUCCESS;
          }),
      });
    case VERIFY_SIGN_UP_CODE:
      return handle(state, action, {
        start: prevState =>
          produce(prevState, draft => {
            draft.verifySignUpCode.state = AsyncState.WAITING;
          }),
        failure: (prevState, { payload }) =>
          produce(prevState, draft => {
            draft.verifySignUpCode.state = AsyncState.FAILURE;
            draft.verifySignUpCode.errorMessage =
              payload.message || 'Failed to verify signup code.';
          }),
        success: prevState =>
          produce(prevState, draft => {
            draft.verifySignUpCode.state = AsyncState.SUCCESS;
          }),
      });
    case SIGN_UP:
      return handle(state, action, {
        start: prevState =>
          produce(prevState, draft => {
            draft.signUp.state = AsyncState.WAITING;
          }),
        failure: (prevState, { payload }) =>
          produce(prevState, draft => {
            draft.signUp.state = AsyncState.FAILURE;
            draft.signUp.errorMessage = payload.message || 'Failed to signup.';
          }),
        success: prevState =>
          produce(prevState, draft => {
            draft.signUp.state = AsyncState.SUCCESS;
          }),
      });
    default:
      return state;
  }
};

export default reducer;
