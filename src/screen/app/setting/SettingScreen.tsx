import React, { useEffect } from 'react';
import { View, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationProps } from '../../types';
import { CreateSettingComponent } from '../../components/layout/NavigationButton';
import BaseStatusBar from '../../components/base/StatusBar';
import BaseText from '../../components/base/BaseText';
import colors from '../../styles/colors';
import { useUser } from '../../hooks';
import { AsyncStatus } from '../../modules/types';

const SettingScreen: React.FC = () => {
  const { navigate } = navigation;

  const { user, handleChangeField, handleLogOut } = useUser();

  useEffect(() => {
    if (user.logOut.status === AsyncStatus.SUCCESS) {
      navigate('AuthLoading');
    }
  }, [user.logOut.status, navigate]);

  useEffect(() => {
    return () => {
      handleChangeField('logOut', {
        status: AsyncStatus.INIT,
        errorMessage: '',
      });
    };
  }, [handleChangeField]);

  const settingItemList = [
    {
      name: '회원정보 변경',
      screen: 'PersonalInfo',
      method: (item: any) => navigate(item),
    },
    {
      name: '알림설정',
      screen: 'NotificationSettings',
      method: (item: any) => navigate(item),
    },
    {
      name: '고객센터',
      screen: 'CustomerService',
      method: (item: any) => navigate(item),
    },
    { name: '로그아웃', method: () => handleLogOut() },
  ];

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
          alignContent: 'flex-end',
          margin: '10%',
        }}>
        <Icon name="md-build" style={{ fontSize: 30, color: colors.lightBlack }} />
        <BaseText text="환경설정" customStyle={{ fontSize: 30, fontWeight: '600', marginLeft: '5%' }} />
      </View>
      <FlatList
        data={settingItemList}
        renderItem={({ item }) => CreateSettingComponent(item)}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
};

export default SettingScreen;
