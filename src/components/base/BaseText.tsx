import React from 'react';
import { Text } from 'react-native';

import colors from '../../styles/colors';

interface Props {
  text: string;
  customStyle?: any;
}
const YogurtStudioDefaultText: React.FC<Props> = ({ text, customStyle }) => {
  return (
    <Text style={[{ color: colors.lightBlack }, customStyle]}>{text}</Text>
  );
};

export default YogurtStudioDefaultText;
