import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, KeyboardAvoidingView } from 'react-native';
import BaseInput from '../../components/base/BaseInput';
import BaseButton from '../../components/base/BaseButton';
import { NavigationProps } from '../../types';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
  scrollView: {
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 20,
    flex: 1,
  },
});

const EmailSearchScreen: React.FC = () => {
  const [isEmailValid, setEmailValidation] = useState(false);
  const [email, setEmailAdress] = useState('');

  const handleEmailChange = (paramEmail: string) => {
    const emailCheckRegex = /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    setEmailAdress(paramEmail);

    if (!isEmailValid) {
      if (emailCheckRegex.test(paramEmail)) {
        setEmailValidation(true);
      } else {
        setEmailValidation(false);
      }
    }
  };

  const toggleNextButtonState = (): boolean => {
    if (isEmailValid) {
      return false;
    }
    return true;
  };

  const setBottomText = (text: string, color: string) => {
    return (
      <View style={{ paddingTop: -30 }}>
        <Text style={{ fontSize: 11, color }}>{text}</Text>
      </View>
    );
  };

  const handleNextButton = async (): Promise<void> => {};

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: colors.white }}>
      <ScrollView style={styles.scrollView}>
        <View>
          <Text>이메일로 아이디 정보를 보내드립니다.</Text>
          <Text>이메일을 입력해주세요.</Text>
        </View>
        <View>
          <BaseInput
            inputValue={email}
            placeholder="support@yogurt-studio.com"
            labelTextSize={14}
            labelColor={colors.lightBlack}
            textColor={colors.black}
            borderBottomColor={colors.lightGray}
            inputType="email"
            customStyle={{}}
            onChangeText={handleEmailChange}
            autoFocus
          />
        </View>
        {isEmailValid
          ? setBottomText('이메일을 입력해주세요.', colors.lightSkyBlue)
          : setBottomText('형식에 맞는 이메일을 입력해주세요.', colors.darkOrange)}
      </ScrollView>
      <BaseButton
        handleClick={handleNextButton}
        disabled={toggleNextButtonState()}
        text="이메일 찾기"
        backgroundColor={colors.lightSkyBlue}
        customStyle={{ margin: '10%', marginBottom: '15%' }}
      />
    </KeyboardAvoidingView>
  );
};

export default EmailSearchScreen;
