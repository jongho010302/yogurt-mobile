import React, { useState } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import { NavigationProps } from '../types';
import BaseStatusBar from '../components/base/StatusBar';
import { useUser } from '../hooks';
import BookingHistory from '../components/lecture/BookingHistory';
import TicketExample from '../components/tickets/TicketExample';
import BaseText from '../components/base/BaseText';
import colors from '../styles/colors';

const styles = StyleSheet.create({
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 100,
  },
  title: {
    fontSize: 20,
    fontWeight: '400',
    margin: '5%',
    marginLeft: '10%',
  },
});

const Profile: React.FC<NavigationProps> = ({ navigation }) => {
  const { user } = useUser();
  const userData = user.data!;

  const FirstRoute = () => (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 0.4 }}>
        <BaseText text="사용중인 수강권" customStyle={styles.title} />
        <TicketExample />
        <BaseText text="예약된 수업" customStyle={styles.title} />
      </View>
    </View>
  );

  const SecondRoute = () => (
    <View style={{ flex: 1 }}>
      <BookingHistory navigation={navigation} />
    </View>
  );

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      renderLabel={({ route }) => (
        <Text style={{ color: colors.lightBlack }}>{route.title}</Text>
      )}
      indicatorStyle={{ backgroundColor: 'white' }}
      style={{ backgroundColor: 'white' }}
    />
  );

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: '기본정보' },
    { key: 'second', title: '모든수업내역' },
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  return (
    <View style={{ flex: 1 }}>
      <BaseStatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginTop: '20%',
        }}>
        <View
          style={{
            margin: '2%',
            marginLeft: '10%',
          }}>
          <BaseText
            text={userData.name}
            customStyle={{
              fontSize: 22,
              fontWeight: '500',
            }}
          />
          <BaseText text={userData.phone} />
          <BaseText text={userData.email} />
        </View>
        <Image
          source={{ uri: userData.profileUrl }}
          style={styles.profileImage}
        />
      </View>
      <View
        style={{
          flex: 4,
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
    </View>
  );
};

export default Profile;
