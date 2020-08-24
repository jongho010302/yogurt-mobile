import React from 'react';
import { View } from 'react-native';

import { NavigationProps } from '../../types';
import BaseText from '../base/BaseText';
import colors from '../../styles/colors';

const NotificationDetails: React.FC<NavigationProps> = ({ navigation }) => {
  const item = navigation.getParam('item');
  return (
    <View>
      <View
        style={{
          borderRadius: 5,
          margin: '5%',
          padding: '5%',
          height: '90%',
          borderColor: colors.lightSteelGray,
          borderWidth: 0.5,
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
      </View>
    </View>
  );
};

export default NotificationDetails;
