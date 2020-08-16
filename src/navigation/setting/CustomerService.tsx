import React, { useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { openComposer } from 'react-native-email-link';

import { navigationProps } from '../../types';
import { CreateSettingComponent } from '../../components/layout/NavigationButton';
import BaseText from '../../components/base/BaseText';

const CustomerService: React.FC<navigationProps> = ({ navigation }) => {
  const { navigate } = navigation;

  const settingItemList = [
    { name: '이메일 문의하기', method: () => createEmailRequest() },
    { name: '이용약관', screen: 'TermsOfService', method: (item: any) => navigate(item) },
    { name: '개인정보처리방침', screen: 'PrivacyPolicy', method: (item: any) => navigate(item) },
  ];

  const createEmailRequest = () => {
    const to = 'yogurtstudio0302@gmail.com';

    openComposer({
      to,
      subject: 'I have a question',
      body: 'Hi, can you help me with...',
    });
  };

  return (
    <View style={{ flex: 1, marginTop: '15%' }}>
      <FlatList data={settingItemList} renderItem={({ item }) => CreateSettingComponent(item)} />
    </View>
  );
};
export default CustomerService;

const styles = StyleSheet.create({
  navigationButtonWrapper: {
    flex: 1,
    margin: '5%',
    marginLeft: '10%',
    marginRight: '10%',
  },
  navigationButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
