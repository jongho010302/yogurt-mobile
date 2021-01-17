import React, { useState, useCallback } from 'react';
import { Text, StyleSheet } from 'react-native';
import { useForm } from 'react-hook-form';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import BaseButton from '~/components/base/BaseButton';
import BaseInput from '~/components/base/BaseInput';
import { palatte } from '~/style/palatte';
import { emailRegex, passwordRegex } from '../../utils/regex';
import { useUser } from '~/hooks';
import iPhoneSize from '~/helpers/utils';
import { AsyncStatus } from '~/store/types';
import Layout from '~/components/Layout/Layout';
import CustomTextInput from '~/components/Common/TextInput/CustomTextInput';

const LoginScreen: React.FC = () => {
  const { navigate } = useNavigation();
  const { control, handleSubmit, errors, getValues, setError } = useForm<{
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

  const onLoginClick = async () => {
    await login(email, password);
    if (apiState.status === AsyncStatus.SUCCESS) {
      navigate('App');
    }
  };

  const onSubmit = async () => {
    const { email, password } = getValues();
    await login(email, password);
    if (apiState.status === AsyncStatus.SUCCESS) {
      navigate('App');
    }
  };

  return (
    <Layout>
      <FastImage
        source={require('~/img/logo.jpg')}
        style={{ width: '25%', height: '10%', alignSelf: 'center' }}
      />
      <Text style={styles.headerText}>로그인</Text>
      <CustomTextInput
        name="email"
        placeholder="이메일"
        control={control}
        pattern={{ value: emailRegex, message: 'fe' }}
        style={styles.inputContainer}
        errors={errors}
      />
      <CustomTextInput
        name="password"
        placeholder="비밀번호"
        control={control}
        pattern={passwordRegex}
        errors={errors}
        style={styles.inputContainer}
        secureTextEntry
      />
      {/* <BaseInput
        inputValue={email}
        placeholder="아이디"
        labelTextSize={14}
        labelColor={palatte.lightBlack}
        textColor={palatte.black}
        borderBottomColor={palatte.lightGray}
        inputType="email"
        customStyle={{ marginBottom: 30 }}
        onChangeText={onEmailChange}
      />
      <BaseInput
        inputValue={password}
        placeholder="비밀번호"
        labelTextSize={14}
        labelColor={palatte.lightBlack}
        textColor={palatte.black}
        borderBottomColor={palatte.lightGray}
        inputType="password"
        onChangeText={onPasswordChange}
      /> */}
      <TouchableOpacity style={{ marginLeft: 'auto' }} onPress={() => navigate('PasswordSearch')}>
        <Text style={styles.findPasswordText}>비밀번호 찾기</Text>
      </TouchableOpacity>
      <BaseButton
        text="로그인"
        handleClick={handleSubmit(onSubmit)}
        style={{ marginTop: 40 }}
        // disabled={!(isEmailValidated && isPasswordValidatde)}
        backgroundColor={palatte.lightSkyBlue}
      />
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
  headerText: {
    fontSize: iPhoneSize() === 'small' ? 26 : 30,
    color: palatte.black,
    fontWeight: '400',
    marginBottom: 40,
    marginLeft: '40%',
  },
  inputContainer: {
    marginTop: 35,
  },
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
