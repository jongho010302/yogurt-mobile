import React, { useState } from 'react';
import { View, Text } from 'react-native';

// Component
import AgendaExample from '../components/calendar/AgendaExample';
import TicketExample from '../components/tickets/TicketExample';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import BookingHistory from '../components/lecture/BookingHistory';
import TicketInformation from '../components/tickets/TicketInformation';

// Type
import { navigationProps } from '../types';

const Booking: React.FC<navigationProps> = ({ navigation }) => {

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
      renderLabel={({ route }) => (
        <Text style={{ color: 'black' }}>
          {route.title}
        </Text>
      )}
      indicatorStyle={{ backgroundColor: 'white', }}
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
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, marginTop: '10%' }}>
        <TicketExample />
      </View>
      <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <TabView
          renderTabBar={renderTabBar}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
        />
      </View>
    </View>
  );
};

export default Booking;
