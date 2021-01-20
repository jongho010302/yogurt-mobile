import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { StyleSheet, Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import { useFocusEffect } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useUser } from '../../hooks';
import useStudio from '~/hooks/useStudio';
import { palatte } from '~/style/palatte';
import Layout from '~/components/Layout/Layout';
import CTextInputValid from '~/components/Common/TextInput/CTextInputValid';
import CButton from '~/components/Common/Button/CButton';
import Logo from '~/components/base/Logo';
import CText from '~/components/Common/Text/CText';
import CTextInput from '~/components/Common/TextInput/CTextInput';
import { emailRegex, passwordRegex } from '~/utils/regex';
import CDropdownValid from '~/components/Common/Dropdown/CDropdownValid';

const SignupScreen: React.FC = observer(() => {
  const { control, errors, getValues, handleSubmit } = useForm<{
    email: string;
    password: string;
    name: string;
    phone: string;
    studioId: number;
  }>();
  const {
    apiState,
    initializeApiState: initializeUserApiState,
    sendCodeForSignUp,
    signup,
  } = useUser();
  const { studios, getStudios, initializeApiState: initializeStudioApiState } = useStudio();
  const [code, setCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);

  const studiosData = useMemo(
    () => studios.map((studio) => ({ label: studio.name, value: studio.id })),
    [studios],
  );

  useEffect(() => {
    getStudios();
  }, [getStudios]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        initializeUserApiState();
        initializeStudioApiState();
      };
    }, [initializeUserApiState, initializeStudioApiState]),
  );

  const onSubmit = async () => {
    if (!isCodeSent) {
      await sendCode();
      if (apiState.isSucess()) {
        Alert.alert('인증번호가 전송되었습니다.');
      }
    } else {
      completeSignup();
    }
  };

  const sendCode = async () => {
    const { email } = getValues();
    await sendCodeForSignUp(email);
    if (apiState.isSucess()) {
      setIsCodeSent(true);
    } else {
      setIsCodeSent(false);
    }
  };

  const completeSignup = async () => {
    const { email, studioId, password, name, phone } = getValues();
    await signup(studioId, email, password, name, phone, code);
  };

  return (
    <Layout padding={[80, 40, 0, 40]}>
      <Logo />
      <CDropdownValid
        name="studioId"
        items={studiosData}
        control={control}
        placeholder={{ label: '센터를 선택해주세요.', value: '' }}
        errors={errors}
        style={{ inputIOS: styles.dropdown, inputAndroid: styles.dropdown }}
      />
      <CTextInputValid
        name="email"
        placeholder="이메일"
        control={control}
        pattern={{ value: emailRegex, message: '이메일의 형식을 맞춰주세요.' }}
        errors={errors}
        style={styles.input}
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
      <CTextInputValid
        name="name"
        placeholder="이름"
        control={control}
        errors={errors}
        style={styles.input}
      />
      <CTextInputValid
        name="phone"
        placeholder="핸드폰 번호"
        control={control}
        errors={errors}
        style={styles.input}
      />
      <CTextInput
        onChange={setCode}
        placeholder="인증번호"
        disable={!isCodeSent}
        style={styles.input}
      />
      <CButton onPress={handleSubmit(onSubmit)} style={styles.button}>
        {!isCodeSent ? '인증번호 전송' : '회원가입'}
      </CButton>
      {isCodeSent && (
        <TouchableOpacity onPress={sendCode}>
          <CText style={styles.resend}>인증번호 재전송</CText>
        </TouchableOpacity>
      )}
    </Layout>
  );
});

export default SignupScreen;

const styles = StyleSheet.create({
  input: {
    marginTop: 35,
  },
  dropdown: {
    marginTop: 35,
    borderBottomWidth: 1,
    borderBottomColor: palatte.lightGray,
  },
  button: {
    marginTop: 35,
  },
  buttonText: {
    color: palatte.white,
    fontSize: 15,
    fontWeight: 'bold',
  },
  resend: {
    marginTop: 5,
    alignSelf: 'center',
    fontSize: 14,
    color: palatte.strongBlue,
  },
});
