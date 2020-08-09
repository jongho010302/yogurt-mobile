import React from 'react';
import {
  Text,
  View,
  AsyncStorage,
  Button,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {navigationProps} from '../../types';
import BaseStatusBar from '../../components/base/StatusBar';
import BaseText from '../../components/base/BaseText';
import colors from '../../styles/colors';

const Setting: React.FC<navigationProps> = ({navigation}) => {
  const {navigate} = navigation;

  const settingItemList = [
    {name: '회원정보 변경', screen: 'PersonalInfo'},
    {name: '알람설정'},
    {name: '고객센터'},
    {name: '로그아웃'},
  ];

  const LogOut = async (): Promise<void> => {
    AsyncStorage.removeItem('jwtToken');
    navigate('AuthLoading');
  };

  const CreateSettingComponent = (item: any) => {
    return (
      <View
        style={{flex: 1, margin: '5%', marginLeft: '10%', marginRight: '10%'}}>
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
          onPress={() => navigate(item.screen, {item})}>
          {console.log(item)}
          <View>
            <BaseText
              text={item.name}
              customStyle={{fontSize: 17, fontWeight: '500'}}
            />
          </View>
          <View>
            <Icon name="md-checkmark" style={{fontSize: 17}} />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <BaseStatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
          alignContent: 'flex-end',
          margin: '10%',
        }}>
        <Icon
          name="md-build"
          style={{fontSize: 30, color: colors.lightBlack}}
        />
        <BaseText
          text="환경설정"
          customStyle={{fontSize: 30, fontWeight: '600', marginLeft: '5%'}}
        />
      </View>
      {console.log(navigate)}
      <FlatList
        data={settingItemList}
        renderItem={({item}) => CreateSettingComponent(item)}
      />
      <Button title="로그아웃" onPress={() => LogOut()} />
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({
  settingItem: {},
});
