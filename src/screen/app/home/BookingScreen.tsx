import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import AgendaExample from '../../../components/Calendar/AgendaExample';
import TicketExample from '../../../components/Ticket/TicketExample';
import BookingHistory from '../../../components/Lecture/BookingHistory';
import TicketInformation from '../../../components/Ticket/TicketInformation';
import Layout from '~/components/Layout/Layout';

const BookingScreen: React.FC = () => {
  const FirstRoute = () => (
    <View style={{ flex: 1 }}>
      <AgendaExample />
    </View>
  );

  const SecondRoute = () => (
    <View style={{ flex: 1 }}>
      <BookingHistory navigation={navigation} />
    </View>
  );

  const ThirdRoute = () => (
    <View style={{ flex: 1 }}>
      <TicketInformation />
    </View>
  );

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      renderLabel={({ route }) => <Text style={{ color: 'black' }}>{route.title}</Text>}
      indicatorStyle={{ backgroundColor: 'white' }}
      style={{ backgroundColor: 'white' }}
    />
  );

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: '예약하기' },
    { key: 'second', title: '예약내역' },
    { key: 'third', title: '수강권 정보' },
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });

  return (
    <Layout>
      <View style={{ flex: 2, marginTop: '10%' }}>
        <TicketExample />
      </View>
      <View
        style={{
          flex: 5,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TabView
          renderTabBar={renderTabBar}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
        />
      </View>
    </Layout>
  );
};

export default BookingScreen;
