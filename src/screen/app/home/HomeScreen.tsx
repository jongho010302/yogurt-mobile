import { StyleSheet, TouchableOpacity, SafeAreaView, FlatList, View } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import LectureComponent from '~/components/Lecture/LectureComponent';
import TicketCard from '~/components/Ticket/TicketCard';
import Layout from '~/components/Layout/Layout';
import CText from '~/components/Common/Text/CText';
import { palatte } from '~/style/palatte';

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

const Lectures = () => {
  const { navigate } = useNavigation();

  return (
    <>
      <CText style={{ marginLeft: 'auto', marginRight: 'auto' }}>최근 예약 기록이 없습니다.</CText>
      <TouchableOpacity
        style={{ marginLeft: 'auto', marginRight: 'auto' }}
        onPress={() => {
          navigate('Booking');
        }}>
        <CText>예약하러가기</CText>
      </TouchableOpacity>
    </>
  );
};

const HomeScreen: React.FC = observer(() => {
  const { navigate } = useNavigation();

  const onPress = () => {
    navigate('Booking');
  };

  return (
    <Layout>
      <TicketCard onPress={onPress} style={styles.ticket} />
      <FlatList
        data={lectures}
        renderItem={({ item }) => <LectureComponent lecture={item} />}
        keyExtractor={(item) => item.date + item.time}
      />
    </Layout>
  );
});

export default HomeScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: palatte.black,
  },
  ticket: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#b0c4de',
  },
  scrollView: {
    flex: 1,
    paddingLeft: '5%',
    marginHorizontal: '5%',
  },
});
