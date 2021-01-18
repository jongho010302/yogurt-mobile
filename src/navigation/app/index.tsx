import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import CText from '~/components/Common/Text/CText';

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
