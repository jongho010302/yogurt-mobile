import { handle } from 'redux-pack';
import { produce } from 'immer';
import { CHANGE_NAME, CHANGE_PHONE, CHANGE_PROFILE } from './constants';
import { AsyncState } from '../types';
import { UserState } from './types';

const initialState: UserState = {
  changeName: {
    state: AsyncState.INIT,
    errorMessage: '',
  },
  changePhone: {
    state: AsyncState.INIT,
    errorMessage: '',
  },
  changeProfile: {
    state: AsyncState.INIT,
    errorMessage: '',
  },
};

export const reducer = (
  state: UserState = initialState,
  action: { type: string; payload: any },
) => {
  const { type } = action;
  switch (type) {
    case CHANGE_NAME:
      return handle(state, action, {
        start: prevState =>
          produce(prevState, draft => {
            draft.changeName.state = AsyncState.WAITING;
          }),
        failure: (prevState, { payload }) =>
          produce(prevState, draft => {
            draft.changeName.state = AsyncState.FAILURE;
            draft.changeName.errorMessage = payload.message || 'Failed to check user.';
          }),
        success: (prevState, { payload }) =>
          produce(prevState, draft => {
            draft.changeName.state = AsyncState.SUCCESS;
          }),
      });
    case CHANGE_PHONE:
      return handle(state, action, {
        start: prevState =>
          produce(prevState, draft => {
            draft.changePhone.state = AsyncState.WAITING;
          }),
        failure: (prevState, { payload }) =>
          produce(prevState, draft => {
            draft.changePhone.state = AsyncState.FAILURE;
            draft.changePhone.errorMessage = payload.message || 'Failed to check user.';
          }),
        success: (prevState, { payload }) =>
          produce(prevState, draft => {
            draft.changePhone.state = AsyncState.SUCCESS;
          }),
      });
    case CHANGE_PROFILE:
      return handle(state, action, {
        start: prevState =>
          produce(prevState, draft => {
            draft.changeProfile.state = AsyncState.WAITING;
          }),
        failure: (prevState, { payload }) =>
          produce(prevState, draft => {
            draft.changeProfile.state = AsyncState.FAILURE;
            draft.changeProfile.errorMessage = payload.message || 'Failed to check user.';
          }),
        success: (prevState, { payload }) =>
          produce(prevState, draft => {
            draft.changeProfile.state = AsyncState.SUCCESS;
          }),
      });
    default:
      return state;
  }
};

export default reducer;
