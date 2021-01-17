import { observable, action, makeObservable, computed } from 'mobx';
import { getStudiosApi } from '~/api/studio';
import { ApiState, AsyncStatus } from '../types';
import { Studio } from './types';

class StudioStore {
  /**
   * Data
   */

  @observable apiState: ApiState = {
    status: AsyncStatus.INIT,
    error: '',
  };
  @observable studios: Studio[] = [];

  constructor() {
    makeObservable(this);
  }

  /**
   * Computed
   */

  @computed get isLoading() {
    return this.apiState.status === AsyncStatus.LOADING;
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

  @action private setStudios = (studios: Studio[]) => {
    this.studios = studios;
  };

  /**
   * Signup Actions
   */

  @action getStudios = async (): Promise<void> => {
    this.loadApiState();
    try {
      const res = await getStudiosApi();
      this.setStudios(res.data);
      this.succeedApiState();
    } catch (error) {
      this.failApiState(error.error);
    }
  };
}

export default new StudioStore();