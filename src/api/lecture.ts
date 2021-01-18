import { ApiResponse } from '~/utils/http';
import axios from './axios';

export const getLectures = (date: string, classType: string): Promise<ApiResponse> =>
  axios.get(
    `/member/lectures?start_at=${date}&end_at=${date} 24:00&page=0&size=30&class_type=${classType}`,
  );

export const getBookings = (): Promise<ApiResponse> => axios.get('/member/lectures/bookings');
