import React from 'react';
import { Text, View, AsyncStorage, Button, TouchableOpacity } from 'react-native';

import { navigationProps } from '../types';
import BaseStatusBar from '../components/base/StatusBar';
import BaseText from '../components/base/BaseText';

const Setting: React.FC<navigationProps> = ({ navigation }) => {
  const { navigate } = navigation;

  const LogOut = async (): Promise<void> => {
    AsyncStorage.removeItem('jwtToken');
    navigate('AuthLoading');
  };

  const CreateSettingComponent = (item: any) => {
    console.log(item);
    return (
      <TouchableOpacity style={{}} onPress={() => navigate('NotificationDetails', { item })}>
        <Text>회원정보 변경</Text>
      </TouchableOpacity>
    );
  };
  
  return (
    <View style={{ flex: 1 }}>
      <BaseStatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      <BaseText text="Setting" customStyle={{ fontSize: 30, fontWeight: '400', alignSelf: 'center' }} />
      <View>{CreateSettingComponent}</View>
      <Button title="로그아웃" onPress={()=> LogOut()} />
    </View>
  );
};

export default Setting;
