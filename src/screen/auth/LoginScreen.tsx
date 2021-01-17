import React, { useState, useEffect, useCallback } from 'react';
import { KeyboardAvoidingView, ScrollView, View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import BaseButton from '../../components/base/BaseButton';
import BaseInput from '../../components/base/BaseInput';
import colors from '../../styles/colors';
import { emailRegex, passwordRegex } from '../../utils/regex';
import { useUser } from '../../hooks';
import iPhoneSize from '../../helpers/utils';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { AsyncStatus } from '~/store/types';

let headingTextSize = 30;
if (iPhoneSize() === 'small') {
  headingTextSize = 26;
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollViewWrapper: {
    marginTop: '10%',
    flex: 1,
    padding: 0,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  scrollView: {
    paddingLeft: 40,
    paddingRight: 40,
    flex: 1,
  },
  loginHeader: {
    fontSize: headingTextSize,
    color: colors.black,
    fontWeight: '400',
    marginBottom: 40,
    marginLeft: '40%',
  },
  notificationWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  signinButton: {
    fontSize: 15,
    fontWeight: '400',
    color: '#4485F7',
  },
  button: {
    borderColor: 'white',
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 10,
    marginLeft: '5%',
    marginRight: '5%',
  },
});

const LoginScreen: React.FC = () => {
  const { navigate } = useNavigation();

  const { apiState, login, initializeApiState } = useUser();
  const [email, setEmail] = useState('');
  const [isEmailValidated, setEmailValidation] = useState(false);
  const [password, setPassword] = useState('');
  const [isPasswordValidatde, setPasswordValidation] = useState(false);

  useFocusEffect(
    useCallback(() => {
      return () => {
        initializeApiState();
      };
    }, [initializeApiState]),
  );

  const onEmailChange = (pEmail: string) => {
    setEmail(pEmail);

    if (emailRegex.test(pEmail)) {
      setEmailValidation(true);
    } else {
      setEmailValidation(false);
    }
  };

  const onPasswordChange = (pPassword: string) => {
    setPassword(pPassword);

    if (passwordRegex.test(pPassword)) {
      setPasswordValidation(true);
    } else {
      setPasswordValidation(false);
    }
  };

  const onLoginClick = async () => {
    await login(email, password);
    if (apiState.status === AsyncStatus.SUCCESS) {
      navigate('App');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.wrapper} behavior="padding">
      <View style={styles.scrollViewWrapper}>
        <Text style={styles.loginHeader}>로그인</Text>
        <ScrollView style={styles.scrollView}>
          <BaseInput
            inputValue={email}
            placeholder="아이디"
            labelTextSize={14}
            labelColor={colors.lightBlack}
            textColor={colors.black}
            borderBottomColor={colors.lightGray}
            inputType="email"
            customStyle={{ marginBottom: 30 }}
            onChangeText={onEmailChange}
            autoFocus
          />
          <BaseInput
            inputValue={password}
            placeholder="비밀번호"
            labelTextSize={14}
            labelColor={colors.lightBlack}
            textColor={colors.black}
            borderBottomColor={colors.lightGray}
            inputType="password"
            customStyle={{ marginBottom: 30 }}
            onChangeText={onPasswordChange}
          />
          <View style={{ flexDirection: 'row', paddingTop: '10%' }}>
            <Text>계정이 없으신가요? </Text>
            <TouchableOpacity onPress={() => navigate('TermsAndConditions')}>
              <Text style={styles.signinButton}>회원가입</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingTop: '10%',
              paddingBottom: '20%',
            }}>
            <View style={{ flexDirection: 'column' }}>
              <TouchableOpacity onPress={() => navigate('EmailSearch')}>
                <Text style={{ fontSize: 15, fontWeight: '400', color: '#4485F7' }}>아이디 찾기</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigate('PasswordSearch')}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '400',
                    color: '#4485F7',
                    paddingTop: '2%',
                  }}>
                  비밀번호 찾기
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <BaseButton
            text="로그인"
            handleClick={onLoginClick}
            disabled={!(isEmailValidated && isPasswordValidatde)}
            backgroundColor={colors.lightSkyBlue}
          />
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
