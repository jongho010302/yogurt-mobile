import React from 'react';
import { View, AsyncStorage, Button, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { navigationProps } from '../../types';
import { CreateSettingComponent } from '../../components/layout/NavigationButton';
import BaseStatusBar from '../../components/base/StatusBar';
import BaseText from '../../components/base/BaseText';
import colors from '../../styles/colors';

const Setting: React.FC<navigationProps> = ({ navigation }) => {
  const { navigate } = navigation;

  const settingItemList = [
    { name: '회원정보 변경', screen: 'PersonalInfo', method: (item: any) => navigate(item) },
    { name: '알림설정', screen: 'NotificationSettings', method: (item: any) => navigate(item) },
    { name: '고객센터', screen: 'CustomerService', method: (item: any) => navigate(item) },
    { name: '로그아웃', method: () => logOut() },
  ];

  const logOut = async (): Promise<void> => {
    AsyncStorage.removeItem('jwtToken');
    navigate('AuthLoading');
  };

  return (
    <View style={{ flex: 1 }}>
      <BaseStatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
          alignContent: 'flex-end',
          margin: '10%',
        }}>
        <Icon name="md-build" style={{ fontSize: 30, color: colors.lightBlack }} />
        <BaseText
          text="환경설정"
          customStyle={{ fontSize: 30, fontWeight: '600', marginLeft: '5%' }}
        />
      </View>
      <FlatList data={settingItemList} renderItem={({ item }) => CreateSettingComponent(item)} />
    </View>
  );
};

export default Setting;
