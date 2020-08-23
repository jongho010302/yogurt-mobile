import React, { useState, use } from 'react';
import { Alert, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Agenda } from 'react-native-calendars';
import moment from 'moment';

// components
import LectureComponent from '../lecture/LectureComponent';
import BaseText from '../base/BaseText';

const DayScheduleCard: React.FC<{ item: any }> = ({ item }) => {
  return (
    <TouchableOpacity onPress={() => Alert.alert(item.name)}>
      <LectureComponent lecture={item} />
    </TouchableOpacity>
  );
};

const AgendaExample: React.FC = () => {
  const [items, setItems] = useState<any>({});

  const loadItems = (day: any) => {
    let newItems: any = {};
    for (let i = -15; i < 85; i++) {
      const date = day.timestamp + i * 24 * 60 * 60 * 1000;
      const dateKey = moment(date).format('YYYY-MM-DD');
      newItems[dateKey] = {};
    }

    // TODO:
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
    ];

    let newLectureList: any = {};

    for (const lecture of lectureList) {
      newLectureList[lecture.date] = [{}];
    }

    for (const lecture of lectureList) {
      newLectureList[lecture.date].push(lecture);
    }

    newLectureList = Object.assign({}, newItems, newLectureList);
    setItems(newLectureList);
  };

  const renderItem = (item: any) => {
    return (
      <View>
        <DayScheduleCard item={item} />
      </View>
    );
  };

  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <BaseText text="This is empty date!" />
      </View>
    );
  };

  const rowHasChanged = (r1: any, r2: any) => {
    return r1.name !== r2.name;
  };

  return (
    <Agenda
      items={items}
      loadItemsForMonth={loadItems}
      selected={moment(new Date()).format('YYYY-MM-DD')}
      renderItem={renderItem}
      renderEmptyDate={renderEmptyDate}
      rowHasChanged={rowHasChanged}
      onDayPress={(date) => {
        console.log('selected date ', date);
      }}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
});

export default AgendaExample;
