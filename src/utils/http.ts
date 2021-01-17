import axios from 'axios';

export interface ApiResponse {
  success: true;
  message: string;
  data: any;
}

export const setAxiosHeaders = (token: string | null) => {
  console.log(token);
  // axios.defaults.headers.common[Authorization = token;
};

export const removeAxiosHeaders = () => {
  axios.defaults.headers.common.Authorization = null;
};
