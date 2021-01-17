import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import App from './App';
import BaseStatusBar from './components/base/StatusBar';
import GlobalProvider from './store';

export default function Index() {
  return (
    <GlobalProvider>
      <BaseStatusBar barStyle="default" />
      <NavigationContainer>
        <App />
      </NavigationContainer>
    </GlobalProvider>
  );
}
