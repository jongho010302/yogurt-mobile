import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  FlatList,
} from 'react-native';

// Component
import TicketExample from '../components/tickets/TicketExample';
import LectureComponent from '../components/lecture/LectureComponent';
import BaseText from '../components/base/BaseText';

// Types
import { NavigationProps } from '../types';
import colors from 'src/styles/colors';

const Home: React.FC<NavigationProps> = ({ navigation }) => {
  const { navigate } = navigation;

  const createLectureComponent = (item: any) => {
    return <LectureComponent lecture={item} />;
  };

  // set Home Screen with lectures
  const setLectureList = () => {
    // const lectureList = await getLectureList();

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
        time: '9:00~9:50',
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

    if (lectureList.length > 0) {
      return (
        <FlatList
          data={lectureList}
          renderItem={({ item }) => createLectureComponent(item)}
          keyExtractor={(item) => item.date}
        />
      );
    } else {
      return (
        <View>
          <BaseText
            customStyle={{ marginLeft: 'auto', marginRight: 'auto' }}
            text="최근 예약 기록이 없습니다."
          />
          <TouchableOpacity
            style={{ marginLeft: 'auto', marginRight: 'auto' }}
            onPress={() => {
              navigate('Booking');
            }}>
            <View>
              <BaseText text="예약하러가기" />
            </View>
          </TouchableOpacity>
        </View>
      );
    }
    // });
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 0.8 }}>
        <View
          style={{
            flex: 0.8,
            marginTop: '10%',
            borderBottomWidth: 0.5,
            borderBottomColor: '#b0c4de',
          }}>
          <TouchableOpacity onPress={() => navigate('Booking')}>
            <TicketExample />
          </TouchableOpacity>
        </View>
      </View>
      <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
        <ScrollView style={styles.scrollView}>{setLectureList()}</ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    paddingLeft: '5%',
    marginHorizontal: '5%',
  },
});
