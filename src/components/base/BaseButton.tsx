import React from 'react';
import { TouchableHighlight, StyleSheet, Text, View } from 'react-native';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
  buttonWrapper: {
    borderRadius: 20,
  },
  button: {
    alignItems: 'center',
    padding: '5%',
  },
  text: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '700',
  },
});

interface Props {
  text: string;
  handleClick: () => void;
  disabled: boolean;
  backgroundColor?: string;
  customStyle?: any;
}

const BaseButton: React.FC<Props> = ({
  text,
  handleClick,
  disabled,
  backgroundColor,
  customStyle,
}) => {
  const opacity = disabled ? 0.2 : 1;

  return (
    <View style={[styles.buttonWrapper, { backgroundColor }, customStyle]}>
      <TouchableHighlight
        onPress={handleClick}
        disabled={disabled}
        style={[{ opacity }, styles.button]}>
        <View>
          <Text style={styles.text}>{text}</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

export default BaseButton;
