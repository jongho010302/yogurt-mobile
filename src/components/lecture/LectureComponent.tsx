import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import colors from '../../..';
import BaseText from '../base/BaseText';

interface Props {
  lecture?: any;
}

const styles = StyleSheet.create({
  wrapper: {
    padding: '2%',
    flex: 1,
    alignSelf: 'center',
    margin: '2%',
    marginLeft: '5%',
    marginRight: '5%',
    height: '85%',
    width: '100%',
    borderRadius: 10,
    borderColor: colors.lightSteelGray,
    backgroundColor: colors.white,
    borderWidth: 0.5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
});

// Component
const LectureComponent: React.FC<Props> = ({ lecture }) => {
  if (!Object.keys(lecture).length) {
    return null;
  }

  return (
    <View style={styles.wrapper}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
        }}>
        <Image
          source={{
            uri: 'http://www.futurekorea.co.kr/news/photo/201903/116160_116410_1321.jpg',
          }}
          style={{
            width: 40,
            height: 40,
            borderRadius: 50,
            marginLeft: '5%',
            marginRight: '5%',
            margin: '1%',
          }}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
            <BaseText text={lecture.lectureName} customStyle={{ fontSize: 10 }} />
            <BaseText text={`${lecture.lecturer}강사`} customStyle={{ fontSize: 12 }} />
          </View>
          <Text style={{ color: colors.lightSkyBlue, fontSize: 12 }}>예약완료</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          justifyContent: 'space-evenly',
        }}>
        <Icon name="time-outline" style={{ marginLeft: '5%', color: '#BDBDBD', fontSize: 12 }} />
        <BaseText text={lecture.time} customStyle={{ fontSize: 12 }} />
        <Icon name="person" style={{ marginLeft: '10%', color: '#BDBDBD', fontSize: 12 }} />
        <BaseText text={lecture.attendedCount} customStyle={{ fontSize: 12, marginRight: '20%' }} />
      </View>
    </View>
  );
};

export default LectureComponent;
