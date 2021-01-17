import React, { useCallback } from 'react';
import { Text, StyleSheet } from 'react-native';
import { useForm } from 'react-hook-form';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import BaseButton from '~/components/base/BaseButton';
import { palatte } from '~/style/palatte';
import { emailRegex, passwordRegex } from '../../utils/regex';
import { useUser } from '~/hooks';
import iPhoneSize from '~/helpers/utils';
import Layout from '~/components/Layout/Layout';
import CustomTextInput from '~/components/Common/TextInput/CustomTextInput';
import CustomButton from '~/components/Common/Button/CustomButton';

const LoginScreen: React.FC = () => {
  const { navigate } = useNavigation();
  const { control, handleSubmit, errors, getValues } = useForm<{
    email: string;
    password: string;
  }>();
  const { apiState, login, initializeApiState } = useUser();

  useFocusEffect(
    useCallback(() => {
      return () => {
        initializeApiState();
      };
    }, [initializeApiState]),
  );

  const onSubmit = async () => {
    const { email, password } = getValues();
    await login(email, password);
    if (apiState.isSucess()) {
      navigate('App');
    }
  };

  return (
    <Layout>
      <FastImage source={require('~/img/logo.jpg')} style={styles.logoContainer} />
      <Text style={styles.headerText}>로그인</Text>
      <CustomTextInput
        name="email"
        placeholder="이메일"
        control={control}
        pattern={{ value: emailRegex, message: '이메일의 형식을 맞춰주세요.' }}
        style={styles.input}
        errors={errors}
      />
      <CustomTextInput
        name="password"
        placeholder="비밀번호"
        control={control}
        pattern={{ value: passwordRegex, message: '비밀번호의 형식을 맞춰주세요.' }}
        errors={errors}
        style={styles.input}
        secureTextEntry
      />
      <TouchableOpacity style={{ marginLeft: 'auto' }} onPress={() => navigate('PasswordSearch')}>
        <Text style={styles.findPasswordText}>비밀번호 찾기</Text>
      </TouchableOpacity>
      <CustomButton text="로그인" onPress={handleSubmit(onSubmit)} style={styles.loginButton} />
      <TouchableOpacity
        style={{ paddingTop: '10%', flexDirection: 'row' }}
        onPress={() => navigate('TermsAndConditions')}>
        <Text>계정이 없으신가요? </Text>
        <Text style={styles.signupText}>회원가입</Text>
      </TouchableOpacity>
    </Layout>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  logoContainer: { width: '25%', height: '10%', alignSelf: 'center' },
  headerText: {
    fontSize: iPhoneSize() === 'small' ? 26 : 30,
    color: palatte.black,
    fontWeight: '400',
    marginBottom: 40,
    marginLeft: '40%',
  },
  input: {
    marginTop: 35,
  },
  loginButton: { marginTop: 40 },
  findPasswordText: {
    fontSize: 13,
    color: '#4485F7',
    paddingTop: '1%',
  },
  signupText: {
    fontSize: 15,
    fontWeight: '400',
    color: '#4485F7',
  },
});
