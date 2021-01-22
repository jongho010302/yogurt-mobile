import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useForm } from 'react-hook-form';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { emailRegex, passwordRegex } from '../../utils/regex';
import { useUser } from '~/hooks';
import Layout from '~/components/Layout/Layout';
import CTextInputValid from '~/components/Common/TextInput/CTextInputValid';
import CButton from '~/components/Common/Button/CButton';
import CText from '~/components/Common/Text/CText';
import Logo from '~/components/base/Logo';
import { palatte } from '~/style/palatte';

const LoginScreen: React.FC = observer(() => {
  const { navigate } = useNavigation();
  const { control, handleSubmit, errors, getValues } = useForm<{
    email: string;
    password: string;
  }>();
  const { login, initializeApiState } = useUser();

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
  };

  return (
    <Layout padding={[80, 40, 0, 40]}>
      <Logo />
      <CTextInputValid
        name="email"
        placeholder="이메일"
        control={control}
        pattern={{ value: emailRegex, message: '이메일의 형식을 맞춰주세요.' }}
        style={styles.input}
        errors={errors}
      />
      <CTextInputValid
        name="password"
        placeholder="비밀번호"
        control={control}
        pattern={{ value: passwordRegex, message: '비밀번호의 형식을 맞춰주세요.' }}
        errors={errors}
        style={styles.input}
        secureTextEntry
      />
      <CButton onPress={handleSubmit(onSubmit)} style={styles.login}>
        로그인
      </CButton>
      <TouchableOpacity style={styles.forgotFassword} onPress={() => navigate('FindPassword')}>
        <CText>비밀번호를 잊으셨나요? </CText>
        <CText style={styles.signupText}>비밀번호 찾기</CText>
      </TouchableOpacity>
      <TouchableOpacity style={styles.noEmail} onPress={() => navigate('Signup')}>
        <CText>계정이 없으신가요? </CText>
        <CText style={styles.signupText}>회원가입</CText>
      </TouchableOpacity>
    </Layout>
  );
});

export default LoginScreen;

const styles = StyleSheet.create({
  input: {
    marginTop: 35,
  },
  login: { marginTop: 40 },
  findPasswordText: {
    fontSize: 13,
    color: palatte.strongBlue,
  },
  signupText: {
    fontSize: 15,
    color: palatte.strongBlue,
  },
  forgotFassword: {
    flexDirection: 'row',
    marginTop: '10%',
  },
  noEmail: {
    flexDirection: 'row',
    marginTop: '5%',
  },
});
