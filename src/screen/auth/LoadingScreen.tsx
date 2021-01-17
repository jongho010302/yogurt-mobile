import React, { useEffect, useCallback } from 'react';
import { ActivityIndicator, View } from 'react-native';

const LoadingScreen: React.FC = () => {
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

export default LoadingScreen;
