import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '~/screen/auth/LoginScreen';
import SignupScreen from '~/screen/auth/SignupScreen';
import PasswordSearchScreen from '~/screen/auth/PasswordSearchScreen';
import PasswordResetScreen from '~/screen/auth/PasswordResetScreen';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerTitle: () => '',
        }}
      />
      {/* <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{
          headerTitle: () => '',
        }}
      /> */}
      {/* <Stack.Screen
        name="PasswordSearch"
        component={PasswordSearchScreen}
        options={{
          headerTitle: () => '',
        }}
      />
      <Stack.Screen
        name="PasswordReset"
        component={PasswordResetScreen}
        options={{
          headerTitle: () => '',
        }}
      /> */}
    </Stack.Navigator>
  );
};

export default AuthStack;
