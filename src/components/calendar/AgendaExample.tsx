import React, { useState } from 'react';
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
  const [lectures, setLectures] = useState<any>({});

  const loadItems = (day: any) => {
    const newItems: any = {};
    for (let i = -15; i < 85; i++) {
      const date = day.timestamp + i * 24 * 60 * 60 * 1000;
      const dateKey = moment(date).format('YYYY-MM-DD');
      newItems[dateKey] = {};
    }

    // TODO:
    // const lectures = await getLectureList();
    const lecturesExample = [
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
        date: '2020-08-28',
        name: '전다은2-1',
        lectureName: '기구 필라테스',
        lecturer: '전다은',
        time: '10:00~10:50',
        attendedCount: '3/5',
        profileUrl:
          'https://seoulforest-image.s3.ap-northeast-2.amazonaws.com/default_profile.png',
      },
      {
        date: '2020-08-29',
        name: '전다은2-1',
        lectureName: '기구 필라테스',
        lecturer: '전다은',
        time: '9:00~9:50',
        attendedCount: '3/5',
        profileUrl:
          'https://seoulforest-image.s3.ap-northeast-2.amazonaws.com/default_profile.png',
      },
    ];

    const tempLectures: any = {};
    lecturesExample.forEach((el) => {
      tempLectures[el.date] = tempLectures[el.date]
        ? [...tempLectures[el.date], el]
        : [el];
    });

    setLectures({ ...newItems, ...tempLectures });
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
      items={lectures}
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
