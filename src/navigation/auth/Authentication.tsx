import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, View, Text, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import BaseButton from '../../components/base/BaseButton';
import BaseInput from '../../components/base/BaseInput';
import { navigationProps } from '../../types';
import colors from '../../styles/colors';
import styles from '../styles/Authentication';
import { loginApi } from '../../api/auth';
import { passwordRegex, usernameRegex } from '../../utils/regex';
import { setToken, setAxiosHeaders, setUser } from '../..//utils/common';

const Authentication: React.FC<navigationProps> = ({ navigation }) => {
  const { navigate } = navigation;

  const [username, setUsername] = useState('');
  const [isUsernameValidated, setUsernameValidation] = useState(false);
  const [password, setPassword] = useState('');
  const [isPasswordValidatde, setPasswordValidation] = useState(false);

  const handleUsernameChange = (paramUsername: string) => {
    setUsername(paramUsername);

    if (!usernameRegex.test(paramUsername)) {
      return setUsernameValidation(false);
    }

    setUsernameValidation(true);
  };

  const handlePasswordChange = (paramPassword: string) => {
    setPassword(paramPassword);

    if (!passwordRegex.test(paramPassword)) {
      return setPasswordValidation(false);
    }

    setPasswordValidation(true);
  };

  const handleLogin = async () => {
    try {
      const res = await loginApi(username, password);

      if (!res.success) {
        return;
      }

      setToken(res.data.jwtToken);
      setUser(res.data.user);
      setAxiosHeaders(res.data.jwtToken);

      navigate('App');
    } catch (err) {
      throw err;
    }
  };

  return (
    <KeyboardAvoidingView style={styles.wrapper} behavior="padding">
      <View style={styles.scrollViewWrapper}>
        <Text style={styles.loginHeader}>로그인</Text>
        <ScrollView style={styles.scrollView}>
          <BaseInput
            inputValue={username}
            placeholder="아이디"
            labelTextSize={14}
            labelColor={colors.lightBlack}
            textColor={colors.black}
            borderBottomColor={colors.lightGray}
            inputType="text"
            customStyle={{ marginBottom: 30 }}
            onChangeText={handleUsernameChange}
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
            onChangeText={handlePasswordChange}
          />
          <View style={{ flexDirection: 'row', paddingTop: '10%' }}>
            <Text>계정이 없으신가요? </Text>
            <TouchableOpacity onPress={() => navigate('TermsAndConditions')}>
              <Text style={styles.signinButton}>회원가입</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', paddingTop: '10%', paddingBottom: '20%' }}>
            <View style={{ flexDirection: 'column' }}>
              <TouchableOpacity onPress={() => navigate('EmailSearch')}>
                <Text style={{ fontSize: 15, fontWeight: '400', color: '#4485F7' }}>
                  아이디 찾기
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigate('PasswordSearch')}>
                <Text
                  style={{ fontSize: 15, fontWeight: '400', color: '#4485F7', paddingTop: '2%' }}>
                  비밀번호 찾기
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <BaseButton
            text="로그인"
            handleClick={handleLogin}
            disabled={!(isUsernameValidated && isPasswordValidatde)}
            backgroundColor={colors.lightSkyBlue}
          />
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Authentication;
