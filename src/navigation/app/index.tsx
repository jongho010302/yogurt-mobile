import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SettingNavigator from './SettingNavigator';
import HomeScreen from '~/screen/app/home/HomeScreen';
import BookingScreen from '~/screen/app/home/BookingScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      {/* <Stack.Screen name="Booking" component={BookingScreen} /> */}
      {/* <Stack.Screen name="Setting" component={SettingNavigator} /> */}
    </Stack.Navigator>
  );
};

export default AppNavigator;
