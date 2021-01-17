import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './Tab';
import HomeNavigator from './Home';
import ProfileNavigator from './Profile';
import { verticalAnimation } from '~/lib/utils/navigation';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Tab"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tab" component={TabNavigator} />
      <Stack.Screen
        name="HomeNavigator"
        component={HomeNavigator}
        options={verticalAnimation}
      />
      <Stack.Screen name="ProfileNavigator" component={ProfileNavigator} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
