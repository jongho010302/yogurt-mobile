import React from 'react';
import { StyleProp, StyleSheet, TextInput, TextStyle } from 'react-native';
import { Controller } from 'react-hook-form';
import CustomText from '../Text/CustomText';
import { hitSlop } from '~/style/common';
import { palatte } from '~/style/palatte';

interface BaseRules {
  [key: string]: any;
  required: boolean;
}

interface Props {
  name: string;
  placeholder: string;
  errors: any;
  control: any;
  maxLength?: number;
  minLength?: number;
  pattern?: RegExp | { value: RegExp; message: string };
  validate?: any;
  secureTextEntry?: boolean;
  onBlur?: () => void;
  defaultValue?: string;
  disable?: boolean;
  style?: StyleProp<TextStyle>;
}

const CustomTextInput: React.FC<Props> = ({
  name,
  placeholder,
  errors,
  control,
  maxLength,
  minLength,
  pattern,
  validate,
  secureTextEntry,
  defaultValue = '',
  disable = false,
  style,
}) => {
  const baseRules: BaseRules = { required: true };
  const setRules = () => {
    if (maxLength) {
      baseRules.maxLength = maxLength;
    }
    if (minLength) {
      baseRules.minLength = minLength;
    }
    if (pattern) {
      baseRules.pattern = pattern;
    }
    if (validate) {
      baseRules.validate = validate;
    }
    return baseRules;
  };

  return (
    <>
      <Controller
        control={control}
        name={name}
        rules={setRules()}
        defaultValue={defaultValue}
        render={({ onChange, onBlur, value }) => (
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
        )}
      />
      {/* 공통 에러 */}
      {errors[name]?.type === 'required' && (
        <CustomText style={styles.errorText}>값이 비어있습니다</CustomText>
      )}
      {errors[name]?.type === 'invalid' && (
        <CustomText style={styles.errorText}>{errors[name].message}</CustomText>
      )}
      {errors[name]?.type === 'existing' && (
        <CustomText style={styles.errorText}>{errors[name].message}</CustomText>
      )}
      {/* 이메일 에러 */}
      {errors[name]?.type === 'pattern' && (
        <CustomText style={styles.errorText}>{errors[name].message}</CustomText>
      )}
      {errors[name]?.type === 'existingEmail' && (
        <CustomText style={styles.errorText}>{errors[name].message}</CustomText>
      )}
      {/* 패스워드 에러 */}
      {errors[name]?.type === 'minLength' && (
        <CustomText
          style={
            styles.errorText
          }>{`Password should contain minimum ${minLength} characters.`}</CustomText>
      )}
      {errors[name]?.type === 'samePassword' && (
        <CustomText style={styles.errorText}>{errors[name].message}</CustomText>
      )}
      {/* verification code 에러 */}
      {errors[name]?.type === 'isCorrectCode' && (
        <CustomText style={styles.errorText}>{errors[name].message}</CustomText>
      )}
    </>
  );
};

export default CustomTextInput;

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
