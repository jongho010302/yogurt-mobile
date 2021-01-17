import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import BaseText from '../components/base/BaseText';
import NotificationComponent from '../components/notification/NotificationComponent';
import colors from '../styles/colors';
import { NavigationProps } from '../types';

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: '5%',
  },
  text: {
    backgroundColor: colors.lightGray,
    width: '90%',
    height: '10%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const NotificationScreen: React.FC = () => {
  const { navigate } = navigation;
  const lectureList = [
    {
      dateTime: '2020-02-09 13:44:55',
      name: '전다은1-1',
      lectureName: '기구 필라테스',
      time: '9:00~9:50',
      attendedCount: '3/5',
      profileUrl: 'https://seoulforest-image.s3.ap-northeast-2.amazonaws.com/default_profile.png',
    },
    {
      dateTime: '2020-02-09 13:33:44',
      name: '전다은2-1',
      lectureName: '기구 필라테스',
      lecturer: '전다은',
      time: '14:00~14:50',
      attendedCount: '3/5',
      profileUrl: 'https://seoulforest-image.s3.ap-northeast-2.amazonaws.com/default_profile.png',
    },
    {
      dateTime: '2020-02-09 13:32:22',
      name: '전다은1-1',
      lectureName: '기구 필라테스',
      time: '10:00~10:50',
      attendedCount: '3/5',
      profileUrl: 'https://seoulforest-image.s3.ap-northeast-2.amazonaws.com/default_profile.png',
    },
    {
      dateTime: '2020-02-09 11:24:44',
      name: '전다은2-1',
      lectureName: '기구 필라테스',
      lecturer: '전다은',
      time: '12:00~12:50',
      attendedCount: '3/5',
      profileUrl: 'https://seoulforest-image.s3.ap-northeast-2.amazonaws.com/default_profile.png',
    },
    {
      dateTime: '2020-02-09 10:22:34',
      name: '전다은1-1',
      lectureName: '기구 필라테스',
      time: '9:00~9:50',
      attendedCount: '3/5',
      profileUrl: 'https://seoulforest-image.s3.ap-northeast-2.amazonaws.com/default_profile.png',
    },
    {
      dateTime: '2020-02-09 09:12:33',
      name: '전다은2-1',
      lectureName: '기구 필라테스',
      lecturer: '전다은',
      time: '9:00~9:50',
      attendedCount: '3/5',
      profileUrl: 'https://seoulforest-image.s3.ap-northeast-2.amazonaws.com/default_profile.png',
    },
  ];

  const ShowNotificationComponent = (item: any) => {
    return (
      <TouchableOpacity style={{}} onPress={() => navigate('NotificationDetails', { item })}>
        <NotificationComponent notification={item} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.text}>
        <BaseText text="서울숲필라테스 일정 및 예약 내용을 확인하세요." />
      </View>
      <View style={styles.wrapper}>
        <FlatList
          data={lectureList}
          renderItem={({ item }) => ShowNotificationComponent(item)}
          keyExtractor={(item) => item.dateTime}
        />
      </View>
    </View>
  );
};

export default NotificationScreen;
