import { useContext } from 'react';
import { UserContext } from '~/store';

const useUser = () => {
  const UserStore = useContext(UserContext);
  return UserStore;
};

export default useUser;
