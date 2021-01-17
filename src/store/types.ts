export enum AsyncStatus {
  INIT = 'INIT',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
}

export interface ApiState {
  status: AsyncStatus;
  error: string;
  isLoading: () => boolean;
  isSucess: () => boolean;
  isFailure: () => boolean;
}
