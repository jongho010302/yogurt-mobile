import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';

const SplashScreen: React.FC = () => {
  return (
    <View>
      <ActivityIndicator />
    </View>
  );
};

export default SplashScreen;
