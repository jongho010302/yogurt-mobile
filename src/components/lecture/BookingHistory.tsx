import React from 'react';
import { View, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { NavigationProps } from '../../types';

import LectureComponent from './LectureComponent';
import BaseText from '../base/BaseText';

const BookingHistory: React.FC<NavigationProps> = ({ navigation }) => {
  const { navigate } = navigation;

  const lectureList = [
    {
      date: '2020-02-03',
      name: '전다은1-1',
      lectureName: '기구 필라테스',
      time: '9:00~9:50',
      attendedCount: '3/5',
      profileUrl:
        'https://seoulforest-image.s3.ap-northeast-2.amazonaws.com/default_profile.png',
    },
    {
      date: '2020-02-11',
      name: '전다은2-1',
      lectureName: '기구 필라테스',
      lecturer: '전다은',
      time: '9:00~9:50',
      attendedCount: '3/5',
      profileUrl:
        'https://seoulforest-image.s3.ap-northeast-2.amazonaws.com/default_profile.png',
    },
    {
      date: '2020-02-29',
      name: '전다은1-1',
      lectureName: '기구 필라테스',
      time: '9:00~9:50',
      attendedCount: '3/5',
      profileUrl:
        'https://seoulforest-image.s3.ap-northeast-2.amazonaws.com/default_profile.png',
    },
    {
      date: '2020-02-19',
      name: '전다은2-1',
      lectureName: '기구 필라테스',
      lecturer: '전다은',
      time: '9:00~9:50',
      attendedCount: '3/5',
      profileUrl:
        'https://seoulforest-image.s3.ap-northeast-2.amazonaws.com/default_profile.png',
    },
    {
      date: '2020-02-20',
      name: '전다은1-1',
      lectureName: '기구 필라테스',
      time: '9:00~9:50',
      attendedCount: '3/5',
      profileUrl:
        'https://seoulforest-image.s3.ap-northeast-2.amazonaws.com/default_profile.png',
    },
    {
      date: '2020-02-31',
      name: '전다은2-1',
      lectureName: '기구 필라테스',
      lecturer: '전다은',
      time: '9:00~9:50',
      attendedCount: '3/5',
      profileUrl:
        'https://seoulforest-image.s3.ap-northeast-2.amazonaws.com/default_profile.png',
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
        <BaseText
          text={`${lectureList.length}개의 내역`}
          customStyle={{ fontSize: 15 }}
        />
        <TouchableOpacity>
          <BaseText text="모든내역" customStyle={{ fontSize: 15 }} />
        </TouchableOpacity>
      </View>
      <ScrollView style={{ flex: 0.9 }}>
        <FlatList
          data={lectureList}
          renderItem={({ item }) => ShowLectureComponent(item)}
          keyExtractor={(item) => item.date + item.time}
        />
      </ScrollView>
    </View>
  );
  // return (
  //   <View style={{ flex: 1 }}>
  //     <View style={{ flex: 0.1, flexDirection: 'row', justifyContent: 'space-between', marginLeft: '10%', marginRight: '10%', marginTop: '5%'}}>
  //       <BaseText text={lectureList.length + '개의 내역'} customStyle={{fontSize: 15}}/>
  //       <TouchableOpacity>
  //         <BaseText text='모든내역' customStyle={{fontSize: 15}}/>
  //       </TouchableOpacity>
  //     </View>
  //     <ScrollView style={{ flex: 0.9}}>
  //       <TouchableOpacity style={{ marginLeft: '10%', marginRight: '5%' }} onPress={() => navigate('BookingDetails')}>
  //         <FlatList
  //           data={lectureList}
  //           renderItem={({ item }) => <LectureComponent lecture={item} />}
  //           keyExtractor={item => item.date}>
  //         </FlatList>
  //       </TouchableOpacity>
  //     </ScrollView>
  //   </View>
  // );
};

export default BookingHistory;
