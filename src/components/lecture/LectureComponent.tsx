import React from 'react';
import { View, Image } from 'react-native';
import { Card, CardItem, Left, Body, Text, Icon } from 'native-base';
import colors from '../../styles/colors';
import BaseText from '../base/BaseText';

interface Props {
  lecture?: any
}

// Component
const LectureComponent: React.FC<Props> = ({lecture}) => {
  if(!Object.keys(lecture).length) {
    return null;
  }

  return (
    <Card style={{ borderRadius: 10, marginRight: '5%'}}>
      <CardItem style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
        <Left>
          <Image
            source={{ uri: 'http://www.futurekorea.co.kr/news/photo/201903/116160_116410_1321.jpg' }}
            style={{ width: 50, height: 50, borderRadius: 50 }}
          />
          <Body >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <BaseText text={lecture.lectureName} customStyle={{ fontSize: 12 }}/>
              <Text style={{ color: colors.lightSkyBlue, fontSize: 12 }}>예약완료</Text>
            </View>
            <BaseText text={lecture.lecturer + ' 강사'} />
          </Body>
        </Left>
      </CardItem>
      <CardItem style={{ borderBottomLeftRadius: 10, borderBottomRightRadius: 10, justifyContent: 'space-evenly' }}>
        <Icon name="md-clock" style={{ marginLeft: '5%', color: '#BDBDBD' }} />
        <BaseText text={lecture.time}/>
        <Icon name="person" style={{ marginLeft: '10%', color: '#BDBDBD' }} />
        <BaseText text={lecture.attendedCount} customStyle={{ marginRight: '20%' }}/>
      </CardItem>
    </Card>
  );
};

export default LectureComponent;
