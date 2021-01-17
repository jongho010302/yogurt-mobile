import { ApiResponse } from '~/utils/http';
import axios from './index';

export const getStudiosApi = (): Promise<ApiResponse> => axios.get('/common/studios');
