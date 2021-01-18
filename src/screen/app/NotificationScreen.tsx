import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import CText from '~/components/Common/Text/CText';
import Layout from '~/components/Layout/Layout';
import NotificationItem from '~/components/Notification/NotificationItem';
import { palatte } from '~/style/palatte';

const NotificationScreen: React.FC = () => {
  const { navigate } = useNavigation();
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

  return (
    <Layout padding={[0, 0, 0, 0]}>
      <View style={styles.header}>
        <CText style={styles.headerText}>알림</CText>
      </View>
      <FlatList
        data={lectureList}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigate('NotificationDetails', { item })}>
            <NotificationItem notification={item} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.dateTime}
      />
    </Layout>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    margin: '10%',
  },
  headerText: {
    fontSize: 30,
    fontWeight: '600',
  },
  text: {
    backgroundColor: palatte.lightGray,
    width: '90%',
    height: '10%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
