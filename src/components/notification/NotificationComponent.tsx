import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

import BaseText from '../base/BaseText';
import colors from '../../styles/colors';

interface Props {
  notification?: any;
}

const NotificationComponent: React.FC<Props> = ({ notification }) => {
  if (!Object.keys(notification).length) {
    return null;
  }

  return (
    <View
      style={{
        borderRadius: 2,
        borderBottomWidth: 0.5,
        borderColor: colors.lightGray,
        shadowColor: colors.lightGray,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '2%',
      }}>
      <View
        style={{
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}>
        <BaseText
          text={`
            ${notification.lectureName} 수업이\n${notification.time}에 예약되어 있습니다`}
        />
      </View>
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: '5%',
          }}>
          <View>
            <BaseText
              text={moment(new Date()).format('YYYY-MM-DD')}
              customStyle={{ fontSize: 11 }}
            />
          </View>
          <View>
            <Icon
              name="chatbox"
              style={{
                fontSize: 11,
                color: colors.lightBlack,
                paddingLeft: '5%',
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default NotificationComponent;
