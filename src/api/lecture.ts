import apiAxios from './client';

export const getBookings = () => apiAxios.get('/member/lectures/booking');

export const getLectures = (date: string, classType: string) =>
  apiAxios.get(
    `/lectures?start_at=${date}&end_at=${date} 24:00&page=0&size=30&class_type=${classType}`,
  );