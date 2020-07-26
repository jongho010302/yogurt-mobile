import React, { useEffect, useCallback } from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  View,
} from 'react-native';

import { navigationProps } from '../../types';

const AuthLoadingScreen: React.FC<navigationProps> = ({ navigation }) => {

  const { navigate } = navigation;

  const navigateUser = useCallback(async () => {
    const jwtToken = await AsyncStorage.getItem('jwtToken');

    // Test token 삭제
    // await AsyncStorage.removeItem('jwtToken');

    navigate(jwtToken ? 'App' : 'Auth');
  }, [ navigate ]);

  useEffect(() => {
    navigateUser();
  }, [navigateUser]);

  return (
    <View>
      <ActivityIndicator />
    </View>
  );
};

export default AuthLoadingScreen;
