import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


const TicketInformation: React.FC = () => {

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', padding: '8%', justifyContent: 'space-evenly' }}>
        <View style={{ flexDirection: 'column', padding: '1%', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 12, color: '#2C333A', marginRight: '10%', marginBottom: '10%' }}>예약가능횟수</Text>
          <Text style={{ marginRight: '10%', color: '#2C333A' }}>18회 남음</Text>
        </View>
        <View style={{ flexDirection: 'column', padding: '1%', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 12, color: '#2C333A', marginRight: '10%', marginBottom: '10%' }}>잔여횟수</Text>
          <Text style={{ marginRight: '10%', color: '#2C333A' }}>20회 남음</Text>
        </View>
        <View style={{ flexDirection: 'column', padding: '1%', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 12, color: '#2C333A', marginRight: '10%', marginBottom: '10%' }}>잔여일</Text>
          <Text style={{ marginRight: '10%', color: '#2C333A' }}>359일</Text>
        </View>
      </View>
      <View style={{ borderBottomColor: '#2C333A', borderBottomWidth: 0.8, marginLeft: '5%', marginRight: '5%' }}/>
      <View style={{ flexDirection: 'column', padding: '7%', justifyContent: 'flex-start' }}>
        <View style={{ flexDirection: 'row', }}>
          <Icon style={{ fontSize: 16, color: '#2C333A', marginRight: '5%' }} name="md-time" />
          <Text style={{ color: '#2C333A' }}>2020. 3. 17 ~ 2021. 4. 15</Text>
        </View>
        <View style={{ flexDirection: 'row', paddingTop: '3%' }}>
          <Icon style={{ fontSize: 16, color: '#2C333A', marginRight: '5%' }} name="md-time" />
          <Text style={{ color: '#2C333A' }}>30회 이용원</Text>
        </View>
        <View style={{ flexDirection: 'row', paddingTop: '3%' }}>
          <Icon style={{ fontSize: 16, color: '#2C333A', marginRight: '5%' }} name="md-time" />
          <Text style={{ color: '#2C333A' }}>취소횟수 10회 제한</Text>
        </View>
        <View style={{ flexDirection: 'row', paddingTop: '3%' }}>
          <Icon style={{ fontSize: 16, color: '#2C333A', marginRight: '5%' }} name="md-time" />
          <Text style={{ color: '#2C333A' }}>주간, 월간 최대 이용횟수 제한없음</Text>
        </View>
      </View>
    </View>
  );
};

export default TicketInformation;
