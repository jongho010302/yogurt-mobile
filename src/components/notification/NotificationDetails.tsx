import React from 'react';
import { View } from 'react-native';
import { Card } from 'native-base';

import { NavigationProps } from '../../types';
import BaseText from '../base/BaseText';

const NotificationDetails: React.FC<NavigationProps> = ({ navigation }) => {
  const item = navigation.getParam('item');
  return (
    <View>
      <Card
        style={{
          borderRadius: 5,
          margin: '10%',
          padding: '5%',
          height: '90%',
        }}>
        <View
          style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
          <BaseText
            text="서울숲필라테스"
            customStyle={{ fontSize: 18, fontWeight: 'bold' }}
          />
          <BaseText
            text="받은날짜"
            customStyle={{ fontSize: 15, fontWeight: 'normal' }}
          />
          <BaseText
            text={`${item.lecturer} 강사의 ${item.lectureName} 수업에 예약했습니다.`}
            customStyle={{ fontSize: 15, fontWeight: 'normal' }}
          />
        </View>
      </Card>
    </View>
  );
};

export default NotificationDetails;
