import React from 'react';
import BaseInput from '../base/BaseInput';
import colors from '../../styles/colors';

interface Props {
  verifyCode: string;
  isVerifyCodeSend: boolean;
  setVerifyCode: (code: string) => void;
  setEmailVerified: (isVerified: boolean) => void;
}

export const EmailVerifyCodeInput: React.FC<Props> = ({
  verifyCode,
  isVerifyCodeSend,
  setVerifyCode,
  setEmailVerified,
}) => {
  const onVerfiyCodeChange = (paramVerifyCode: string) => {
    setVerifyCode(paramVerifyCode);
    setEmailVerified(false);
  };

  return (
    <BaseInput
      inputValue={verifyCode}
      labelText="인증번호를 입력하세요"
      placeholder=""
      labelTextSize={12}
      labelColor={colors.lightSkyBlue}
      textColor={colors.lightBlack}
      borderBottomColor={colors.lightGray}
      inputType="text"
      onChangeText={onVerfiyCodeChange}
      autoFocus
      inputStyle={{ width: 200 }}
      disable={!isVerifyCodeSend}
    />
  );
};
