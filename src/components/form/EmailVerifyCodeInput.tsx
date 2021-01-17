import React from 'react';
import BaseInput from '../base/BaseInput';
import colors from '../../..';

interface Props {
  verificationCode: string;
  setVerifyCode: (code: string) => void;
}

export const EmailVerifyCodeInput: React.FC<Props> = ({ verificationCode, setVerifyCode }) => {
  const onVerfiyCodeChange = (paramVerifyCode: string) => {
    setVerifyCode(paramVerifyCode);
  };

  return (
    <BaseInput
      inputValue={verificationCode}
      labelText="인증번호를 입력하세요"
      placeholder=""
      labelTextSize={12}
      labelColor={palatte.logoColor}
      textColor={colors.lightBlack}
      borderBottomColor={colors.lightGray}
      inputType="text"
      onChangeText={onVerfiyCodeChange}
      autoFocus
      inputStyle={{ width: 200 }}
    />
  );
};
