import React from 'react';
import { View, TouchableOpacity, FlatList } from 'react-native';
import { NavigationProps } from '../../types';

import LectureComponent from './LectureComponent';
import BaseText from '../base/BaseText';

const BookingHistory: React.FC = () => {
  const { navigate } = navigation;

  const lectures = [
    {
      date: '2020-02-03',
      name: '전다은1-1',
      lectureName: '기구 필라테스',
      time: '9:00~9:50',
      attendedCount: '3/5',
      profileUrl: 'https://seoulforest-image.s3.ap-northeast-2.amazonaws.com/default_profile.png',
    },
    {
      date: '2020-02-11',
      name: '전다은2-1',
      lectureName: '기구 필라테스',
      lecturer: '전다은',
      time: '9:00~9:50',
      attendedCount: '3/5',
      profileUrl: 'https://seoulforest-image.s3.ap-northeast-2.amazonaws.com/default_profile.png',
    },
    {
      date: '2020-02-29',
      name: '전다은1-1',
      lectureName: '기구 필라테스',
      time: '9:00~9:50',
      attendedCount: '3/5',
      profileUrl: 'https://seoulforest-image.s3.ap-northeast-2.amazonaws.com/default_profile.png',
    },
    {
      date: '2020-02-19',
      name: '전다은2-1',
      lectureName: '기구 필라테스',
      lecturer: '전다은',
      time: '9:00~9:50',
      attendedCount: '3/5',
      profileUrl: 'https://seoulforest-image.s3.ap-northeast-2.amazonaws.com/default_profile.png',
    },
    {
      date: '2020-02-20',
      name: '전다은1-1',
      lectureName: '기구 필라테스',
      time: '9:00~9:50',
      attendedCount: '3/5',
      profileUrl: 'https://seoulforest-image.s3.ap-northeast-2.amazonaws.com/default_profile.png',
    },
    {
      date: '2020-02-31',
      name: '전다은2-1',
      lectureName: '기구 필라테스',
      lecturer: '전다은',
      time: '9:00~9:50',
      attendedCount: '3/5',
      profileUrl: 'https://seoulforest-image.s3.ap-northeast-2.amazonaws.com/default_profile.png',
    },
  ];

  const ShowLectureComponent = (item: any) => {
    return (
      <TouchableOpacity
        style={{ marginLeft: '10%', marginRight: '5%' }}
        onPress={() => navigate('BookingDetails', { item })}>
        <LectureComponent lecture={item} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 0.1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginLeft: '10%',
          marginRight: '10%',
          marginTop: '5%',
        }}>
        <BaseText text={`${lectures.length}개의 내역`} customStyle={{ fontSize: 15 }} />
        <TouchableOpacity>
          <BaseText text="모든내역" customStyle={{ fontSize: 15 }} />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 0.9 }}>
        <FlatList
          data={lectures}
          renderItem={({ item }) => ShowLectureComponent(item)}
          keyExtractor={(item) => item.date + item.time}
        />
      </View>
    </View>
  );
};

export default BookingHistory;
