import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import { palatte } from '~/style/palatte';
import CText from '../Common/Text/CText';

interface Props {
  notification?: any;
}

const NotificationItem: React.FC<Props> = ({ notification }) => {
  if (!Object.keys(notification).length) {
    return null;
  }

  return (
    <View
      style={{
        borderBottomWidth: 0.5,
        borderColor: palatte.lightGray,
        shadowColor: palatte.lightGray,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '2%',
      }}>
      <View
        style={{
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}>
        <CText>
          {notification.lectureName} 수업이 {notification.time}에 예약되어 있습니다
        </CText>
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
            <CText style={{ fontSize: 11 }}>{moment(new Date()).format('YYYY-MM-DD')}</CText>
          </View>
          <View>
            <Icon
              name="chatbox"
              style={{
                fontSize: 11,
                color: palatte.lightBlack,
                paddingLeft: '5%',
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default NotificationItem;
