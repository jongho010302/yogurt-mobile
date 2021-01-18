import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '~/screen/app/home/HomeScreen';
import Bottom from '~/components/Layout/Bottom';
import SettingScreen from '~/screen/app/setting/SettingScreen';
import NotificationScreen from '~/screen/app/NotificationScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          if (route.name === 'Home') {
            return <Bottom name="ios-home" isActive={focused} />;
          } else if (route.name === 'Notification') {
            return <Bottom name="ios-notifications" isActive={focused} />;
          } else if (route.name === 'Profile') {
            return <Bottom name="ios-person" isActive={focused} />;
          } else if (route.name === 'Setting') {
            return <Bottom name="ios-settings" isActive={focused} />;
          }
        },
      })}
      tabBarOptions={{
        // style: {
        //   borderTopColor: 'transparent',
        // },
        showLabel: false,
      }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Notification" component={NotificationScreen} />
      <Tab.Screen name="Profile" component={HomeScreen} />
      <Tab.Screen name="Setting" component={SettingScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
