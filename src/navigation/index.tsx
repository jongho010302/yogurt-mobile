import React from 'react';
import { observer } from 'mobx-react-lite';
import AppNavigator from './app';
import AuthNavigator from './auth';
import useUser from '~/hooks/useUser';

const RootNavigation = observer(() => {
  const { isLogined } = useUser();

  return isLogined ? <AppNavigator /> : <AuthNavigator />;
});

export default RootNavigation;
