import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, FlatList } from 'react-native';
import { openComposer } from 'react-native-email-link';

const CustomerServiceScreen: React.FC = () => {
  const { navigate } = useNavigation();

  const createEmailRequest = () => {
    const to = 'yogurtstudio0302@gmail.com';

    openComposer({
      to,
      subject: 'I have a question',
      body: 'Hi, can you help me with...',
    });
  };

  const settingItems = [
    {
      name: '이메일 문의하기',
      onPress: () => createEmailRequest(),
    },
    {
      name: '이용약관',
      onPress: () => navigate('TermsOfService'),
    },
    {
      name: '개인정보처리방침',
      onPress: () => navigate('PrivacyPolicy'),
    },
  ];

  return (
    <View style={{ flex: 1, marginTop: '15%' }}>
      <FlatList
        data={settingItems}
        renderItem={({ item }) => <SettingMenu title={item.name} onPress={item.onPress} />}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
};

export default CustomerServiceScreen;
