import React from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';
import { palatte } from '~/style/palatte';

interface Props {
  style?: StyleProp<TextStyle>;
}
const BaseText: React.FC<Props> = ({ style, children }) => (
  <Text style={[{ color: palatte.lightBlack }, style]}>{children}</Text>
);

export default BaseText;
