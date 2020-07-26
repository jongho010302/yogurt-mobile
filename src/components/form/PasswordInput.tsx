import React from 'react';

// Component
import BaseInput from '../base/BaseInput';

// Etc
import colors from '../../styles/colors';

interface Props {
  password: string;
  setPassword: (password: string) => void;
  setPasswordValidation: (validated: boolean) => void;
}

const PasswordInput: React.FC<Props> = ({
  password,
  setPassword,
  setPasswordValidation, 
}) => {

  // password
  const handlePasswordChange = (paramPassword: string) => {
    // 특수문자 / 문자 / 숫자 포함 형태의 8~15자리 이내의 암호 정규식
    const passwordCheckRegex = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
    setPassword(paramPassword);

    if(!passwordCheckRegex.test(paramPassword)) {
      return setPasswordValidation(false);
    }

    setPasswordValidation(true);
  };

  
  return (
    <BaseInput
      inputValue={password}
      labelText="비밀번호를 입력하세요"
      placeholder="특수문자, 문자, 숫자 포함 형태의 8~15자리를 입력해주세요."
      labelTextSize={12}
      labelColor={colors.lightSkyBlue}
      textColor={colors.lightBlack}
      borderBottomColor={colors.lightGray}
      inputType="password"
      onChangeText={handlePasswordChange}
      autoFocus
    />
  );
};

export default PasswordInput;
