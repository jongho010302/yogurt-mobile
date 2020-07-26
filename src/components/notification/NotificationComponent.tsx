import React from 'react';
import { View } from 'react-native';
import { Card, CardItem, Icon } from 'native-base';
import moment from 'moment';

import BaseText from '../base/BaseText';
import colors from '../../styles/colors';


interface Props {
  notification?: any;
}

const NotificationComponent: React.FC<Props> = ({ notification }) => {
  if (!Object.keys(notification).length){
    return null;
  }
  
  return (
    <Card style={{ borderRadius: 2, borderBottomColor: 'black', borderColor: 'white', shadowColor: 'white', flexDirection: 'row', justifyContent: 'space-between' }}>
      <CardItem style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10, }}>
        <BaseText text={notification.lectureName + ' 수업이 ' + '\n' + notification.time + '에 예약되어 있습니다'} />
      </CardItem>
      <CardItem >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 'auto', marginRight: 'auto' }}>
          <View>
            <BaseText text={moment(new Date()).format('YYYY-MM-DD')} customStyle={{ fontSize: 11 }} />
          </View>
          <View>
            <Icon name="ios-arrow-forward" style={{ fontSize: 11, color: colors.lightBlack, paddingLeft: '5%' }}/>
          </View>
        </View>
      </CardItem>
    </Card>
  );
};

export default NotificationComponent;
