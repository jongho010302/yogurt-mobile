import React from 'react';
import {
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  StyleProp,
  Pressable,
  GestureResponderEvent,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { palatte } from '~/style/palatte';

interface Props {
  text: string;
  onPress: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

const CustomButton: React.FC<Props> = ({ text, onPress, disabled = false, style }) => {
  const opacity = disabled ? 0.2 : 1;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[{ opacity }, styles.button, style]}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    backgroundColor: palatte.logoColor,
    alignItems: 'center',
    padding: '5%',
  },
  text: {
    color: palatte.white,
    fontSize: 15,
    fontWeight: '700',
  },
});
