import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

import { navigationProps } from '../../types';
import BaseText from '../../components/base/BaseText';
import BaseInput from '../../components/base/BaseInput';
import BaseButton from '../../components/base/BaseButton';
import colors from '../../styles/colors';

const PhoneNumberInfo: React.FC<navigationProps> = ({ navigation }) => {
  const instructionMessage = '변경 할 휴대폰 번호를 입력하고 휴대폰 인증을 해주세요.';
  const sendVerificationCodeMessage = '입력된 번호로 인증번호가 전송 됩니다.';
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isPhoneNumberAvailable, setPhoneNumberAvailability] = useState(false);
  const [verificationCode, setVerificationCode] = useState();

  const input = React.createRef();
  const printBottomText = (text: string, color: string) => {
    return (
      <View style={{ paddingTop: -10 }}>
        <BaseText text={text} customStyle={{ fontSize: 11, color }} />
      </View>
    );
  };

  const handlePhoneNumberChange = (paramPhoneNumber: string) => {
    const phoneNumberCheckRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
    const parsingPhoneNumber = paramPhoneNumber
      .replace(/[^0-9]/g, '')
      .replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/, '$1-$2-$3')
      .replace('--', '-');
    setPhoneNumber(parsingPhoneNumber);

    if (!phoneNumberCheckRegex.test(parsingPhoneNumber)) {
      return setPhoneNumberAvailability(false);
    }

    setPhoneNumberAvailability(true);
  };

  return (
    <SafeAreaView style={styles.Wrapper}>
      <ScrollView>
        <BaseText text={instructionMessage} customStyle={{}} />
        <View style={styles.phoneNumberWrapper}>
          <View>
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
              placeholder="01012341234"
            />
            {printBottomText(sendVerificationCodeMessage, colors.lightGray)}
          </View>
          <View style={styles.button}>
            <TouchableHighlight
              style={[{ opacity: isPhoneNumberAvailable ? 1 : 0.2 }]}
              onPress={() => console.log('send verification code')}
              disabled={!isPhoneNumberAvailable}>
              <View>
                <Text style={{ color: colors.white, fontSize: 11, fontWeight: '700' }}>
                  인증번호 발송
                </Text>
              </View>
            </TouchableHighlight>
            <TextInput
              style={{
                position: 'absolute',
                fontSize: 32,
                textAlign: 'center',
                width: 32,
                backgroundColor: 'transparent',
                top: 0,
                bottom: 0,
              }}
              value={verificationCode}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PhoneNumberInfo;

const styles = StyleSheet.create({
  Wrapper: {
    flex: 1,
    marginTop: '10%',
    margin: '10%',
  },
  phoneNumberWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '20%',
  },
  button: {
    backgroundColor: colors.lightSkyBlue,
    borderRadius: 10,
    alignItems: 'center',
    padding: '4%',
    paddingLeft: '8%',
    paddingRight: '8%',
    height: '70%',
    position: 'relative',
  },
});
