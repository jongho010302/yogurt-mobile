import React from 'react';

import BaseInput from '../base/BaseInput';
import colors from '../../styles/colors';
import { emailRegex } from '../../utils';

interface Props {
  email: string;
  setEmail: (phoneNumber: string) => void;
  setEmailAvailability: (isAvailable: boolean) => void;
  setEmailValidationVisibility: (isAvailable: boolean) => void;
}

export const EmailInput: React.FC<Props> = ({
  email,
  setEmail,
  setEmailAvailability,
  setEmailValidationVisibility,
}) => {
  const handleEmailChange = (paramEmail: string) => {
    setEmail(paramEmail);
    setEmailAvailability(false);

    if (!emailRegex.test(paramEmail)) {
      return setEmailValidationVisibility(false);
    }

    setEmailValidationVisibility(true);
  };

  return (
    <BaseInput
      inputValue={email}
      labelText="이메일 주소를 입력하세요"
      placeholder="e.g. yogurt@yogurt-studio.com"
      labelTextSize={12}
      labelColor={colors.lightSkyBlue}
      textColor={colors.lightBlack}
      borderBottomColor={colors.lightGray}
      inputType="email"
      onChangeText={handleEmailChange}
      autoFocus
    />
  );
};
