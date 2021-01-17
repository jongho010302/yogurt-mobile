import React, { createContext } from 'react';
import UserStore from '~/store/user';
import StudioStore from '~/store/studio';

export const UserContext = createContext<typeof UserStore>(UserStore);
export const StudioContext = createContext<typeof StudioStore>(StudioStore);

const GlobalProvider: React.FC = () => {
  return (
    <UserContext.Provider value={UserStore}>
      <StudioContext.Provider value={StudioStore} />
    </UserContext.Provider>
  );
};

export default GlobalProvider;
