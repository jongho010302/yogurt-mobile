import React from 'react';
import { StyleProp, StyleSheet, TextStyle } from 'react-native';
import { Controller, DeepMap, FieldError } from 'react-hook-form';
import CText from '../Text/CText';
import { palatte } from '~/style/palatte';
import CTextInput from './CTextInput';

interface BaseRules {
  [key: string]: any;
  required: boolean;
}

interface Props {
  name: string;
  placeholder: string;
  errors: DeepMap<any, FieldError>;
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

const CTextInputValid: React.FC<Props> = ({
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
          <CTextInput
            placeholder={placeholder}
            onChange={(text: string) => onChange(text)}
            secureTextEntry={secureTextEntry}
            disable={disable}
            onBlur={onBlur}
            value={value}
            style={style}
          />
        )}
      />
      {/* 공통 에러 */}
      {errors[name]?.type === 'required' && (
        <CText style={styles.errorText}>값이 비어있습니다</CText>
      )}
      {errors[name]?.type === 'invalid' && (
        <CText style={styles.errorText}>{errors[name].message}</CText>
      )}
      {errors[name]?.type === 'existing' && (
        <CText style={styles.errorText}>{errors[name].message}</CText>
      )}
      {/* 이메일 에러 */}
      {errors[name]?.type === 'pattern' && (
        <CText style={styles.errorText}>{errors[name].message}</CText>
      )}
      {errors[name]?.type === 'existingEmail' && (
        <CText style={styles.errorText}>{errors[name].message}</CText>
      )}
      {/* 패스워드 에러 */}
      {errors[name]?.type === 'minLength' && (
        <CText
          style={
            styles.errorText
          }>{`Password should contain minimum ${minLength} characters.`}</CText>
      )}
      {errors[name]?.type === 'samePassword' && (
        <CText style={styles.errorText}>{errors[name].message}</CText>
      )}
      {/* verification code 에러 */}
      {errors[name]?.type === 'isCorrectCode' && (
        <CText style={styles.errorText}>{errors[name].message}</CText>
      )}
    </>
  );
};

export default CTextInputValid;

const styles = StyleSheet.create({
  errorText: {
    marginBottom: 8,
    fontSize: 12,
    fontWeight: '500',
    color: palatte.darkOrange,
  },
});
