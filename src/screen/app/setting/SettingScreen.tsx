import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CText from '~/components/Common/Text/CText';
import Layout from '~/components/Layout/Layout';
import SettingMenu from '~/components/Layout/SettingMenu';
import { useUser } from '~/hooks';
import { palatte } from '~/style/palatte';

const SettingScreen: React.FC = () => {
  const { navigate } = useNavigation();
  const { logout } = useUser();

  const settingItems = [
    {
      name: '회원정보 변경',
      onPress: () => navigate('PersonalInfo'),
    },
    {
      name: '알림설정',
      onPress: () => navigate('NotificationSettings'),
    },
    {
      name: '고객센터',
      onPress: () => navigate('CustomerService'),
    },
    { name: '로그아웃', onPress: () => logout() },
  ];

  return (
    <Layout padding={[0, 0, 0, 0]}>
      <View style={styles.header}>
        <Icon name="md-build" style={styles.icon} />
        <CText style={styles.text}>환경설정</CText>
      </View>
      <FlatList
        data={settingItems}
        renderItem={({ item }) => <SettingMenu title={item.name} onPress={item.onPress} />}
        keyExtractor={(item) => item.name}
      />
    </Layout>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    margin: '10%',
  },
  icon: {
    fontSize: 30,
    color: palatte.lightBlack,
  },
  text: {
    fontSize: 30,
    fontWeight: '600',
  },
});
