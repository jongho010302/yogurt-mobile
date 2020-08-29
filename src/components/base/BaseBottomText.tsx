import React from 'react';
import { Text, View } from 'react-native';

interface Props {
  text: string;
  color: string;
}

const BaseBottomText: React.FC<Props> = ({ text, color }) => {
  return (
    <View style={{ paddingTop: -10 }}>
      <Text style={{ fontSize: 11, color }}>{text}</Text>
    </View>
  );
};

export default BaseBottomText;
