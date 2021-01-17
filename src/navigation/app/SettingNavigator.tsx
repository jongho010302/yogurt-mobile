import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import BaseText from '~/components/base/BaseText';
import EmailInfoScreen from '~/screen/app/setting/EmailInfoScreen';
import NotificationSettingsScreen from '~/screen/app/setting/NotificationSettingsScreen';
import PasswordInfoScreen from '~/screen/app/setting/PasswordInfoScreen';
import PersonalInfoScreen from '~/screen/app/setting/PersonalInfoScreen';
import PhoneNumberInfoScreen from '~/screen/app/setting/PhoneNumberInfoScreen';
import PrivacyPolicyScreen from '~/screen/app/setting/PrivacyPolicyScreen';
import ProfileInfoScreen from '~/screen/app/setting/ProfileInfoScreen';
import Setting from '~/screen/app/setting/SettingScreen';
import TermsOfServiceScreen from '~/screen/app/setting/TermsOfServiceScreen';
import { headerStyle } from '~/utils/navigation';

const Stack = createStackNavigator();

const SettingNavigator = () => {
  const { navigate } = useNavigation();

  return (
    <Stack.Navigator
      initialRouteName="Setting"
      screenOptions={{
        ...headerStyle,
        headerShown: false,
      }}>
      <Stack.Screen
        name="Setting"
        component={Setting}
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: () => <BaseText>Edit profile</BaseText>,
        }}
      />
      <Stack.Screen
        name="PersonalInfo"
        component={PersonalInfoScreen}
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: () => <BaseText>Edit profile</BaseText>,
        }}
      />
      <Stack.Screen
        name="ProfileInfo"
        component={ProfileInfoScreen}
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: () => <BaseText>Edit profile</BaseText>,
        }}
      />
      <Stack.Screen
        name="PhoneNumberInfo"
        component={PhoneNumberInfoScreen}
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: () => <BaseText>Edit profile</BaseText>,
        }}
      />
      <Stack.Screen
        name="EmailInfo"
        component={EmailInfoScreen}
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: () => <BaseText>Edit profile</BaseText>,
        }}
      />
      <Stack.Screen
        name="PasswordInfo"
        component={PasswordInfoScreen}
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: () => <BaseText>Edit profile</BaseText>,
        }}
      />
      <Stack.Screen
        name="NotificationSettings"
        component={NotificationSettingsScreen}
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: () => <BaseText>Edit profile</BaseText>,
        }}
      />{' '}
      <Stack.Screen
        name="TermsOfService"
        component={TermsOfServiceScreen}
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: () => <BaseText>Edit profile</BaseText>,
        }}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicyScreen}
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: () => <BaseText>Edit profile</BaseText>,
        }}
      />
    </Stack.Navigator>
  );
};

export default SettingNavigator;
