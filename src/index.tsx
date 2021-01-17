import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import App from './App';
import BaseStatusBar from './components/base/BaseStatusBar';
import GlobalProvider from './store';

export default function Index() {
  return (
    <GlobalProvider>
      <BaseStatusBar barStyle="dark-content" />
      <NavigationContainer>
        <App />
      </NavigationContainer>
    </GlobalProvider>
  );
}
