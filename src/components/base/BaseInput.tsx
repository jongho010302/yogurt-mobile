import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import colors from '../../styles/colors';
  
interface Props {
  labelText?: string;
  labelTextSize: number;
  labelColor: string;
  textColor: string;
  borderBottomColor: string;
  inputType: string;
  customStyle?: object;
  onChangeText: (text: string) => void;
  inputValue: string;
  autoFocus?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  labelTextWeight?: '700' | 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '800' | '900';
  placeholder?: string;
  inputStyle?: { paddingBottom: number };
}

const setKeyboardType = (inputType: any) => {
  switch(inputType)
  {
    case 'email':
      inputType = 'email-address';
      break;
    case 'phone':
     inputType = 'numeric';
     break;
    case 'password':
    default:
      inputType = 'default';
      break;
  }
  return inputType;
};

const BaseInput: React.FC<Props> = ({
  labelText,
  labelTextSize,
  labelColor,
  textColor,
  borderBottomColor,
  inputType,
  customStyle,
  onChangeText,
  inputValue,
  autoFocus,
  autoCapitalize,
  labelTextWeight,
  inputStyle,
  placeholder,
 }) => {
  // State
  const [secureInput, setSecureInput] = useState<boolean>();

  // UseEffect
  useEffect(() => {
    setSecureInput(!(inputType === 'text' || inputType === 'email' || inputType === 'phone'));
  }, [ setSecureInput, inputType ]);

  // Style
  const fontSize = labelTextSize || 14;
  const fontWeight = labelTextWeight || '700';
  const color = labelColor || colors.white;
  const inputColor = textColor || colors.white;
  const borderBottom = borderBottomColor || 'transparent';
  const customInputStyle: any = inputStyle || {};

  if (!inputStyle || inputStyle && !inputStyle.paddingBottom) {
    customInputStyle.paddingBottom = 5;
  }

  const toggleShowPassword = () => {
    setSecureInput(!secureInput);
  };

  return (
    <View style={[customStyle, styles.wrapper]}>
      <Text style={[{ color, fontSize, fontWeight }, styles.label]}>
        {labelText}
      </Text>
      {inputType === 'password'
        ? (
          <TouchableOpacity
            style={styles.showButton}
            onPress={toggleShowPassword}
          >
            <Text style={styles.showButtonText}>
              {secureInput ? 'Show' : 'Hide'}
            </Text>
          </TouchableOpacity>
        )
      : null }
      <TextInput
        style={[ { color: inputColor, borderBottomColor: borderBottom }, inputStyle, styles.BaseInput ]}
        secureTextEntry={secureInput}
        onChangeText={onChangeText}
        keyboardType = {setKeyboardType(inputType)}
        autoFocus={autoFocus}
        autoCapitalize={autoCapitalize}
        autoCorrect={false}
        underlineColorAndroid="transparent"
        placeholder={placeholder}
        defaultValue={inputValue}
        value={inputValue}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
  },
  label: {
    marginBottom: 10,
  },
  BaseInput: {
    borderBottomWidth: 1,
    paddingTop: 5,
  },
  showButton: {
    position: 'absolute',
    right: 0,
  },
  showButtonText: {
    color: colors.black,
    fontWeight: '300',
    fontSize: 11,
  },
  checkmarkWrapper: {
    position: 'absolute',
    right: 0,
    bottom: 12,
  },
});

export default BaseInput;
