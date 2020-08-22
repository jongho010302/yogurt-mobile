import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';

// Component
import BaseText from '../components/base/BaseText';
import NotificationComponent from '../components/notification/NotificationComponent';
import colors from '../styles/colors';
import { NavigationProps } from '../types';

const Notification: React.FC<NavigationProps> = ({ navigation }) => {
  const { navigate } = navigation;
  const lectureList = [
    {
      date: '2020-02-09',
      name: '전다은1-1',
      lectureName: '기구 필라테스',
      time: '9:00~9:50',
      attendedCount: '3/5',
      profileUrl:
        'https://seoulforest-image.s3.ap-northeast-2.amazonaws.com/default_profile.png',
    },
    {
      date: '2020-02-09',
      name: '전다은2-1',
      lectureName: '기구 필라테스',
      lecturer: '전다은',
      time: '14:00~14:50',
      attendedCount: '3/5',
      profileUrl:
        'https://seoulforest-image.s3.ap-northeast-2.amazonaws.com/default_profile.png',
    },
    {
      date: '2020-02-09',
      name: '전다은1-1',
      lectureName: '기구 필라테스',
      time: '10:00~10:50',
      attendedCount: '3/5',
      profileUrl:
        'https://seoulforest-image.s3.ap-northeast-2.amazonaws.com/default_profile.png',
    },
    {
      date: '2020-02-09',
      name: '전다은2-1',
      lectureName: '기구 필라테스',
      lecturer: '전다은',
      time: '12:00~12:50',
      attendedCount: '3/5',
      profileUrl:
        'https://seoulforest-image.s3.ap-northeast-2.amazonaws.com/default_profile.png',
    },
    {
      date: '2020-02-09',
      name: '전다은1-1',
      lectureName: '기구 필라테스',
      time: '9:00~9:50',
      attendedCount: '3/5',
      profileUrl:
        'https://seoulforest-image.s3.ap-northeast-2.amazonaws.com/default_profile.png',
    },
    {
      date: '2020-02-09',
      name: '전다은2-1',
      lectureName: '기구 필라테스',
      lecturer: '전다은',
      time: '9:00~9:50',
      attendedCount: '3/5',
      profileUrl:
        'https://seoulforest-image.s3.ap-northeast-2.amazonaws.com/default_profile.png',
    },
  ];

  // const ShowNotificationDetails = () => {
  //   return (
  //     <View style={{flex:1, width: '100%', height: '100%', backgroundColor: 'black'}}>
  //       <Text>Jieun</Text>
  //     </View>
  //   );
  // };

  const ShowNotificationComponent = (item: any) => {
    console.log(item);
    return (
      <TouchableOpacity
        style={{}}
        onPress={() => navigate('NotificationDetails', { item })}>
        <NotificationComponent notification={item} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.text}>
        <BaseText text={'서울숲필라테스 일정 및 예약 내용을 확인하세요.'} />
      </View>
      <ScrollView style={styles.scrollView}>
        <FlatList
          data={lectureList}
          renderItem={({ item }) => ShowNotificationComponent(item)}
          keyExtractor={(item) => item.date}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
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

export default Notification;
