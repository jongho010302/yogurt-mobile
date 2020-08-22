import React from 'react';
import { View, FlatList } from 'react-native';
import { openComposer } from 'react-native-email-link';

import { NavigationProps } from '../../types';
import { CreateSettingComponent } from '../../components/layout/NavigationButton';

const CustomerService: React.FC<NavigationProps> = ({ navigation }) => {
  const { navigate } = navigation;

  const createEmailRequest = () => {
    const to = 'yogurtstudio0302@gmail.com';

    openComposer({
      to,
      subject: 'I have a question',
      body: 'Hi, can you help me with...',
    });
  };

  const settingItemList = [
    { name: '이메일 문의하기', method: () => createEmailRequest() },
    {
      name: '이용약관',
      screen: 'TermsOfService',
      method: (item: any) => navigate(item),
    },
    {
      name: '개인정보처리방침',
      screen: 'PrivacyPolicy',
      method: (item: any) => navigate(item),
    },
  ];

  return (
    <View style={{ flex: 1, marginTop: '15%' }}>
      <FlatList
        data={settingItemList}
        renderItem={({ item }) => CreateSettingComponent(item)}
      />
    </View>
  );
};

export default CustomerService;
