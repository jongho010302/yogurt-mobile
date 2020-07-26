import React from 'react';
import { Text, View, AsyncStorage, Button } from 'react-native';

// Etc
import { navigationProps } from '../types';

const Setting: React.FC<navigationProps> = ({ navigation }) => {
  const { navigate } = navigation;

  const LogOut = async (): Promise<void> => {
    AsyncStorage.removeItem('jwtToken');
    navigate('AuthLoading');
  };

  return (
    <View>
      <Text>Setting</Text>
      <Button title="로그아웃" onPress={()=> LogOut()} />
    </View>
  );
};

export default Setting;
