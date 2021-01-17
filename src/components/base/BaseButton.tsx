import React from 'react';
import { TouchableHighlight, StyleSheet, Text, View, ViewStyle, StyleProp } from 'react-native';
import { palatte } from '~/style/palatte';

const styles = StyleSheet.create({
  buttonWrapper: {
    borderRadius: 20,
  },
  button: {
    alignItems: 'center',
    padding: '5%',
  },
  text: {
    color: palatte.white,
    fontSize: 15,
    fontWeight: '700',
  },
});

interface Props {
  text: string;
  handleClick: () => void;
  disabled: boolean;
  backgroundColor?: string;
  style?: StyleProp<ViewStyle>;
}

const BaseButton: React.FC<Props> = ({ text, handleClick, disabled, backgroundColor, style }) => {
  const opacity = disabled ? 0.2 : 1;

  return (
    <View style={[styles.buttonWrapper, { backgroundColor }, style]}>
      <TouchableHighlight onPress={handleClick} disabled={disabled} style={[{ opacity }, styles.button]}>
        <View>
          <Text style={styles.text}>{text}</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

export default BaseButton;
