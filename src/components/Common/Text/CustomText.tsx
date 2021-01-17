import React from 'react';
import { Text, Platform, TextStyle, StyleProp } from 'react-native';
import { palatte } from '~/style/palatte';

interface Props {
  style?: StyleProp<TextStyle>;
  props?: any;
}

const CustomText: React.FC<Props> = ({ children, style, ...props }) => {
  const defaultStyle: StyleProp<TextStyle> = Platform.select({
    ios: {
      color: palatte.black,
      fontWeight: '700',
      fontSize: 20,
    },
    android: {
      includeFontPadding: false,
      color: palatte.black,
      fontWeight: 'bold',
      fontSize: 20,
    },
  });
  return (
    <Text style={[defaultStyle, style]} allowFontScaling={false} {...props}>
      {children}
    </Text>
  );
};

export default CustomText;
