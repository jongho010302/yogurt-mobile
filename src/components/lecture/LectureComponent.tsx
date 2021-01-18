import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { palatte } from '~/style/palatte';
import CText from '../Common/Text/CText';

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
    borderColor: palatte.lightSteelGray,
    backgroundColor: palatte.white,
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
            <CText style={{ fontSize: 10 }}>{lecture.lectureName}</CText>
            <CText style={{ fontSize: 12 }}>{lecture.lecturer}강사</CText>
          </View>
          <Text style={{ color: palatte.logoColor, fontSize: 12 }}>예약완료</Text>
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
        <CText style={{ fontSize: 12 }}>{lecture.time}</CText>
        <Icon name="person" style={{ marginLeft: '10%', color: '#BDBDBD', fontSize: 12 }} />
        <CText style={{ fontSize: 12, marginRight: '20%' }}>{lecture.attendedCount}</CText>
      </View>
    </View>
  );
};

export default LectureComponent;
