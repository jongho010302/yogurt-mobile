import React from 'react';
import { Platform, StatusBar, StyleSheet, SafeAreaView } from 'react-native';

interface Props {
  backgroundColor: string;
  barStyle: 'default' | 'light-content' | 'dark-content' | undefined;
}

const BaseStatusBar: React.FC<Props> = ({backgroundColor, barStyle}) => (
  <SafeAreaView style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} barStyle={barStyle} />
  </SafeAreaView>
);

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
});

export default BaseStatusBar;
