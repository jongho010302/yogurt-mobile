import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, StyleSheet, TouchableHighlight } from 'react-native';
import BaseBottomText from '../../components/base/BaseBottomText';
import { EmailInput } from '../../components/form/EmailInput';
import { EmailVerifyCodeInput } from '../../components/form/EmailVerifyCodeInput';
import { useUser } from '../../hooks';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
  scrollView: {
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 20,
    flex: 1,
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

const PasswordSearchScreen: React.FC = () => {
  const { navigate } = navigation;
  const [email, setEmail] = useState('');
  const [verifiedEmail, setVerifiedEmail] = useState('');
  const [isEmailValidated, setEmailValidated] = useState(false);
  const [verificationCode, setVerifyCode] = useState('');
  const [isVerifyCodeSent, setIsVerifyCodeSent] = useState(false);
  const { user, handleSendFindPasswordCode, handleVerifyFindPasswordCode, handleChangeField } = useUser();

  // 이메일 인증코드 인증
  useEffect(() => {
    if (user.sendFindPasswordCode.status === AsyncStatus.SUCCESS) {
      setIsVerifyCodeSent(true);
    } else if (user.sendFindPasswordCode.status === AsyncStatus.FAILURE) {
      setIsVerifyCodeSent(false);
    }
  }, [user.sendFindPasswordCode.status]);

  useEffect(() => {
    if (user.verifyFindPasswordCode.status === AsyncStatus.SUCCESS) {
      setVerifiedEmail(email);
      navigate('PasswordReset', { verifiedEmail, verificationCode });
    } else if (user.verifyFindPasswordCode.status === AsyncStatus.FAILURE) {
      setVerifiedEmail('');
    }
  }, [user.verifyFindPasswordCode, navigate, email, verifiedEmail, verificationCode]);

  useEffect(() => {
    return () => {
      handleChangeField('sendFindPasswordCode', {
        status: AsyncStatus.INIT,
        errorMessage: '',
      });
      handleChangeField('verifyFindPasswordCode', {
        status: AsyncStatus.INIT,
        errorMessage: '',
      });
    };
  }, [handleChangeField]);

  const onSendSignUpCodeClick = async () => {
    setVerifiedEmail(email);
    handleSendFindPasswordCode(email);
    if (apiState.status === AsyncStatus.SUCCESS) {
      navigate('App');
    }
  };

  const onVerifyPasswordCodeClick = async () => {
    handleVerifyFindPasswordCode(verifiedEmail, verificationCode);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: colors.white }}>
      <ScrollView style={styles.scrollView}>
        <View>
          <Text>이메일로 인증번호를 보내드립니다.</Text>
          <Text>인증번호를 입력해주세요.</Text>
        </View>
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
              onPress={() => onVerifyPasswordCodeClick()}
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
        {verifiedEmail ? (
          <BaseBottomText text="인증돠었습니다." color={colors.lightSkyBlue} />
        ) : (
          <BaseBottomText text="인증해주세요." color={colors.darkOrange} />
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default PasswordSearchScreen;
