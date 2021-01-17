import React from 'react';
import BaseInput from '../base/BaseInput';
import colors from '../../..';

interface Props {
  password: string;
  setPassword: (password: string) => void;
  setPasswordValidation: (validated: boolean) => void;
}

export const PasswordInput: React.FC<Props> = ({
  password,
  setPassword,
  setPasswordValidation,
}) => {
  // password
  const handlePasswordChange = (paramPassword: string) => {
    // 특수문자 / 문자 / 숫자 포함 형태의 8~15자리 이내의 암호 정규식
    const passwordCheckRegex = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
    setPassword(paramPassword);

    if (passwordCheckRegex.test(paramPassword)) {
      setPasswordValidation(true);
    } else {
      setPasswordValidation(false);
    }
  };

  return (
    <BaseInput
      inputValue={password}
      labelText="비밀번호를 입력하세요"
      placeholder="특수문자, 문자, 숫자 포함 형태의 8~15자리를 입력해주세요."
      labelTextSize={12}
      labelColor={palatte.logoColor}
      textColor={colors.lightBlack}
      borderBottomColor={colors.lightGray}
      inputType="password"
      onChangeText={handlePasswordChange}
      autoFocus
    />
  );
};
