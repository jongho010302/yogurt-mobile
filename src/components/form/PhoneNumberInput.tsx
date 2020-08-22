import React from 'react';

import BaseInput from '../base/BaseInput';
import colors from '../../styles/colors';

interface Props {
  phoneNumber: string;
  setPhoneNumber: (phoneNumber: string) => void;
  setPhoneNumberAvailability: (isAvailable: boolean) => void;
  placeholder?: string;
}

export const PhoneNumberInput: React.FC<Props> = ({
  phoneNumber,
  setPhoneNumber,
  setPhoneNumberAvailability,
  placeholder,
}) => {
  const handlePhoneNumberChange = (paramPhoneNumber: string) => {
    const phoneNumberCheckRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
    const parsingPhoneNumber = paramPhoneNumber
      .replace(/[^0-9]/g, '')
      .replace(
        /(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/,
        '$1-$2-$3',
      )
      .replace('--', '-');
    setPhoneNumber(parsingPhoneNumber);

    if (phoneNumberCheckRegex.test(parsingPhoneNumber)) {
      setPhoneNumberAvailability(true);
    } else {
      setPhoneNumberAvailability(false);
    }
  };

  return (
    <BaseInput
      inputValue={phoneNumber}
      labelText="변경 할 휴대폰 번호"
      labelTextSize={12}
      labelColor={colors.lightSkyBlue}
      textColor={colors.lightBlack}
      borderBottomColor={colors.lightGray}
      inputType="phone"
      onChangeText={handlePhoneNumberChange}
      autoFocus
      placeholder={placeholder}
    />
  );
};
