import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, TouchableHighlight, Text } from 'react-native';

import { NavigationProps } from '../../types';
import colors from '../../styles/colors';
import { useUser } from '../../hooks';
import { AsyncStatus } from '../../modules/types';
import BaseText from '../../components/base/BaseText';
import BaseBottomText from '../../components/base/BaseBottomText';
import { EmailInput } from '../../components/form/EmailInput';
import { EmailVerifyCodeInput } from '../../components/form/EmailVerifyCodeInput';
import { yogurtAlert } from '../../utils/common';

const styles = StyleSheet.create({
  Wrapper: {
    flex: 1,
    marginTop: '10%',
    margin: '10%',
  },
  emailWrapper: {
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
    height: '80%',
    position: 'relative',
  },
});

const EmailInfoScreen: React.FC = () => {
  const instructionMessage = '변경 할 이메일을 입력하고 이메일 변경하기 버튼을 누르세요.';
  const { navigate } = navigation;
  const [email, setEmail] = useState('');
  const [verifiedEmail, setVerifiedEmail] = useState('');
  const [isEmailValidated, setEmailValidated] = useState(false);
  const [verificationCode, setVerifyCode] = useState('');
  const [isVerifyCodeSent, setIsVerifyCodeSent] = useState(false);

  const { user, handleSendVerificationCode, handleChangeEmail, handleChangeField } = useUser();

  // 이메일 인증코드 인증
  useEffect(() => {
    if (user.sendVerificationCode.status === AsyncStatus.SUCCESS) {
      setIsVerifyCodeSent(true);
    } else if (user.sendVerificationCode.status === AsyncStatus.FAILURE) {
      setIsVerifyCodeSent(false);
    }
  }, [user.sendVerificationCode.status]);

  useEffect(() => {
    if (user.changeEmail.status === AsyncStatus.SUCCESS) {
      yogurtAlert('이메일이 성공적으로 변경되었습니다.');
      navigate('PersonalInfo');
    }
  }, [user.changeEmail.status, navigate]);

  useEffect(() => {
    return () => {
      handleChangeField('sendVerificationCode', {
        status: AsyncStatus.INIT,
        errorMessage: '',
      });
      handleChangeField('changeEmail', {
        status: AsyncStatus.INIT,
        errorMessage: '',
      });
    };
  }, [handleChangeField]);

  const onSendSignUpCodeClick = () => {
    setVerifiedEmail(email);
    handleSendVerificationCode(email);
  };

  const onVerifySignUpCodeClick = () => {
    handleChangeEmail(verifiedEmail, verificationCode);
  };

  return (
    <SafeAreaView style={styles.Wrapper}>
      <ScrollView>
        <BaseText text={instructionMessage} customStyle={{}} />
        <View style={styles.emailWrapper}>
          <View>
            <EmailInput
              email={email}
              setEmail={setEmail}
              setEmailValidated={setEmailValidated}
              setIsVerifyCodeSent={setIsVerifyCodeSent}
            />
          </View>
          <View style={styles.button}>
            <TouchableHighlight
              style={[{ opacity: isEmailValidated ? 1 : 0.2 }]}
              onPress={() => onSendSignUpCodeClick()}
              disabled={!isEmailValidated}>
              <View>
                <Text
                  style={{
                    color: colors.white,
                    fontSize: 11,
                    fontWeight: '700',
                  }}>
                  인증번호 전송
                </Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
        {email ? (
          !isEmailValidated ? (
            <BaseBottomText text="형식에 맞는 이메일을 입력해주세요." color={colors.darkOrange} />
          ) : !isVerifyCodeSent ? (
            <BaseBottomText text="인증번호를 전송해 주세요." color={colors.darkOrange} />
          ) : (
            <BaseBottomText text="인증번호가 전송되었습니다." color={colors.lightSkyBlue} />
          )
        ) : null}
        <View style={styles.emailWrapper}>
          <View>
            <EmailVerifyCodeInput verificationCode={verificationCode} setVerifyCode={setVerifyCode} />
          </View>
          <View style={styles.button}>
            <TouchableHighlight
              style={[{ opacity: isVerifyCodeSent ? 1 : 0.2 }]}
              onPress={onVerifySignUpCodeClick}
              disabled={!isVerifyCodeSent}>
              <View>
                <Text
                  style={{
                    color: colors.white,
                    fontSize: 11,
                    fontWeight: '700',
                  }}>
                  인증
                </Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
        {isVerifyCodeSent ? <BaseBottomText text="인증해주세요." color={colors.darkOrange} /> : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default EmailInfoScreen;
