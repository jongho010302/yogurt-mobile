import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

interface Props {
  marginTop?: number;
  marginBottom?: number;
  style?: ViewStyle;
}

const Divider: React.FC<Props> = ({ marginTop, marginBottom, style }) => {
  const styleByProps: ViewStyle = {
    marginTop,
    marginBottom,
  };

  return <View style={[styles.container, styleByProps, style]} />;
};

export default Divider;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignSelf: 'center',
    borderBottomColor: '#333333',
    borderBottomWidth: 1,
  },
});
