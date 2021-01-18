import React from 'react';
import { StyleProp, StyleSheet, TextInput, TextStyle } from 'react-native';
import { hitSlop } from '~/style/common';
import { palatte } from '~/style/palatte';

interface Props {
  placeholder?: string;
  onChange: (...event: any[]) => void;
  onBlur?: () => void;
  value?: any;
  secureTextEntry?: boolean;
  disable?: boolean;
  style?: StyleProp<TextStyle>;
}

const CTextInput: React.FC<Props> = ({
  placeholder,
  onChange,
  onBlur,
  value,
  secureTextEntry,
  disable = false,
  style,
}) => (
  <TextInput
    style={[styles.textInput, style]}
    placeholder={placeholder}
    autoCapitalize="none"
    selectionColor={palatte.logoColor}
    hitSlop={hitSlop}
    onChangeText={(text: string) => onChange(text)}
    onBlur={onBlur}
    value={value}
    editable={!disable}
    autoCorrect={false}
    underlineColorAndroid="transparent"
    secureTextEntry={secureTextEntry}
  />
);

export default CTextInput;

const styles = StyleSheet.create({
  textInput: {
    paddingTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: palatte.lightGray,
  },
  errorText: {
    marginBottom: 8,
    fontSize: 12,
    fontWeight: '500',
    color: palatte.darkOrange,
  },
});
