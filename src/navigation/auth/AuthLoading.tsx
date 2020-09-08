import React, { useEffect, useCallback } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationProps } from '../../types';
import { getToken } from '../../utils/common';

const AuthLoadingScreen: React.FC<NavigationProps> = ({ navigation }) => {
  const { navigate } = navigation;

  const navigateUser = useCallback(async () => {
    const accessToken = await getToken();
    navigate(accessToken ? 'App' : 'Auth');
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
