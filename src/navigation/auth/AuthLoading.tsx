import React, { useEffect, useCallback } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { navigationProps } from '../../types';
import { getToken } from '../../utils/common';

const AuthLoadingScreen: React.FC<navigationProps> = ({ navigation }) => {
  const { navigate } = navigation;

  const navigateUser = useCallback(async () => {
    const jwtToken = await getToken();
    navigate(jwtToken ? 'App' : 'Auth');
  }, [navigate]);

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
