import React from 'react';
import { StyleSheet, Text, ViewStyle, StyleProp, GestureResponderEvent } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { palatte } from '~/style/palatte';

interface Props {
  onPress: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

const CButton: React.FC<Props> = ({ onPress, disabled = false, style, children }) => {
  const opacity = disabled ? 0.2 : 1;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[{ opacity }, styles.button, style]}>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
};

export default CButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
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
