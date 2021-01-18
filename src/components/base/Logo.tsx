import React from 'react';
import { ImageStyle, StyleProp, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';

interface Props {}

const Logo: React.FC<Props> = () => {
  return <FastImage source={require('~/img/logo.jpg')} style={styles.container} />;
};
export default Logo;

const styles = StyleSheet.create({
  container: {
    width: '25%',
    height: '10%',
    alignSelf: 'center',
  },
});
