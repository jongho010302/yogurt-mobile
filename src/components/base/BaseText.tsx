import React from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';

import colors from '../../styles/colors';

interface Props {
  style?: StyleProp<TextStyle>;
}
const BaseText: React.FC<Props> = ({ style, children }) => (
  <Text style={[{ color: colors.lightBlack }, style]}>{children}</Text>
);

export default BaseText;
