import { View, StyleSheet, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import BaseText from '~/components/base/BaseText';
import LectureComponent from '~/components/Lecture/LectureComponent';
import TicketExample from '~/components/Ticket/TicketExample';
import Layout from '~/components/Layout/Layout';

const Lectures = () => {
  const { navigate } = useNavigation();

  const lectures = [
    {
      date: '2020-02-09',
      name: '전다은1-1',
      lectureName: '기구 필라테스',
      time: '9:00~9:50',
      attendedCount: '3/5',
      profileUrl: 'https://seoulforest-image.s3.ap-northeast-2.amazonaws.com/default_profile.png',
    },
    {
      date: '2020-02-10',
      name: '전다은2-1',
      lectureName: '기구 필라테스',
      lecturer: '전다은',
      time: '9:00~9:50',
      attendedCount: '3/5',
      profileUrl: 'https://seoulforest-image.s3.ap-northeast-2.amazonaws.com/default_profile.png',
    },
  ];

  if (lectures) {
    return (
      <FlatList
        data={lectures}
        renderItem={({ item }) => <LectureComponent lecture={item} />}
        keyExtractor={(item) => item.date + item.time}
      />
    );
  }

  return (
    <>
      <BaseText style={{ marginLeft: 'auto', marginRight: 'auto' }}>최근 예약 기록이 없습니다.</BaseText>
      <TouchableOpacity
        style={{ marginLeft: 'auto', marginRight: 'auto' }}
        onPress={() => {
          navigate('Booking');
        }}>
        <View>
          <BaseText>예약하러가기</BaseText>
        </View>
      </TouchableOpacity>
    </>
  );
};

const HomeScreen: React.FC = () => {
  const { navigate } = useNavigation();

  return (
    <Layout>
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
        <View style={styles.scrollView}>{Lectures()}</View>
      </SafeAreaView>
    </Layout>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    paddingLeft: '5%',
    marginHorizontal: '5%',
  },
});
