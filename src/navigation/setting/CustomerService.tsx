import React from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { navigationProps } from '../../types';
import BaseText from '../../components/base/BaseText';

const CustomerService: React.FC<navigationProps> = ({ navigation }) => {
  const { navigate } = navigation;

  const settingItemList = [
    { name: '이메일 문의하기', screen: 'ProfileInfo' },
    { name: '이용약관', screen: 'PhoneNumberInfo' },
    { name: '개인정보처리방침', screen: 'EmailInfo' },
  ];

  const CreateSettingComponent = (item: any) => {
    return (
      <View style={styles.settingItem}>
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
          onPress={() => navigate(item.screen, { item })}>
          <View>
            <BaseText text={item.name} customStyle={{ fontSize: 17, fontWeight: '500' }} />
          </View>
          <View>
            <Icon name="md-checkmark" style={{ fontSize: 17 }} />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, marginTop: '15%' }}>
      <FlatList data={settingItemList} renderItem={({ item }) => CreateSettingComponent(item)} />
    </View>
  );
};
export default CustomerService;

const styles = StyleSheet.create({
  settingItem: {
    flex: 1,
    margin: '5%',
    marginLeft: '10%',
    marginRight: '10%',
  },
});
