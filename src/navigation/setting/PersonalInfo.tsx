import React from 'react';
import { View, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { navigationProps } from '../../types';
import { CreateSettingComponent } from '../../components/layout/NavigationButton';
import BaseText from '../../components/base/BaseText';

const PersonalInfo: React.FC<navigationProps> = ({ navigation }) => {
  const { navigate } = navigation;

  const settingItemList = [
    { name: '프로필 변경', screen: 'ProfileInfo', method: (item: any) => navigate(item) },
    { name: '휴대폰 번호 변경', screen: 'PhoneNumberInfo', method: (item: any) => navigate(item) },
    { name: '이메일 변경', screen: 'EmailInfo', method: (item: any) => navigate(item) },
    { name: '비밀번호 변경', screen: 'PasswordInfo', method: (item: any) => navigate(item) },
  ];

  return (
    <View style={{ flex: 1, marginTop: '15%' }}>
      <FlatList data={settingItemList} renderItem={({ item }) => CreateSettingComponent(item)} />
    </View>
  );
};

export default PersonalInfo;
