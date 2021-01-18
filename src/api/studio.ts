import { ApiResponse } from '~/utils/http';
import axios from './axios';

export const getStudiosApi = (): Promise<ApiResponse> => axios.get('/common/studios');
