import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SettingNavigator from './SettingNavigator';
import HomeScreen from '~/screen/app/home/HomeScreen';
import BookingScreen from '~/screen/app/home/BookingScreen';
import CText from '~/components/Common/Text/CText';
import useStudio from '~/hooks/useStudio';
import { useUser } from '~/hooks';
import TabNavigator from './TabNavigator';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Tab" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tab" component={TabNavigator} />
      {/* <Stack.Screen name="Booking" component={BookingScreen} /> */}
      {/* <Stack.Screen name="Setting" component={SettingNavigator} /> */}
    </Stack.Navigator>
  );
};

export default AppNavigator;
