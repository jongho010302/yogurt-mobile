import React from 'react';
import { Text, Platform, TextStyle, StyleProp } from 'react-native';
import { palatte } from '~/style/palatte';

interface Props {
  style?: StyleProp<TextStyle>;
  props?: any;
}

const CText: React.FC<Props> = ({ children, style, ...props }) => {
  const defaultStyle: StyleProp<TextStyle> = Platform.select({
    ios: {
      color: palatte.black,
    },
    android: {
      color: palatte.black,
      includeFontPadding: false,
    },
  });
  return (
    <Text style={[defaultStyle, style]} allowFontScaling={false} {...props}>
      {children}
    </Text>
  );
};

export default CText;
