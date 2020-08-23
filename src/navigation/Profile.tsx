import React from 'react';
import { Text, View } from 'react-native';

import { NavigationProps } from '../types';
import BaseStatusBar from '../components/base/StatusBar';

const Profile: React.FC<NavigationProps> = () => {
  return (
    <View style={{ flex: 1 }}>
      <BaseStatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      <Text>Profile</Text>
    </View>
  );
};

export default Profile;
