import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  Alert,
} from 'react-native';
import { NavigationProps } from '../../types';
import BaseButton from '../../components/base/BaseButton';
import BaseBottomText from '../../components/base/BaseBottomText';
import { yogurtAlert } from '../../utils/common';
import { PasswordInput } from '../../components/form/PasswordInput';
import { useUser } from '../../hooks';
import { AsyncStatus } from '../../modules/types';
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
    marginTop: '10%',
  },
  button: {
    backgroundColor: colors.lightSkyBlue,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: '10%',
    padding: '4%',
    height: '20%',
    position: 'relative',
  },
});

const PasswordReset: React.FC<NavigationProps> = ({ navigation }) => {
  const changePasswordMessage = '입력된 값으로 비밀번호가 변경됩니다.';
  const { navigate } = navigation;
  const [password, setPassword] = useState('');
  const [secondPassword, setSecondPassword] = useState('');
  const [isPasswordValidated, setPasswordValidation] = useState(false);
  const [isSecondPasswordValidated, setSecondPasswordValidation] = useState(
    false,
  );
  const { user, handleChangeField, handleFindPassword } = useUser();

  useEffect(() => {
    if (user.findPassword.status === AsyncStatus.SUCCESS) {
      navigate('AuthLoading');
    } else if (user.findPassword.status === AsyncStatus.FAILURE) {
      yogurtAlert('비밀번호를 변경할 수 없습니다.');
    }
  }, [user.findPassword.status, navigate]);

  useEffect(() => {
    return () => {
      handleChangeField('findPassword', {
        status: AsyncStatus.INIT,
        errorMessage: '',
      });
      handleChangeField('verifyFindPasswordCode', {
        status: AsyncStatus.INIT,
        errorMessage: '',
      });
    };
  }, [handleChangeField]);

  const onChangePassword = () => {
    const verifiedEmail = navigation.getParam('verifiedEmail');
    const verifyCode = navigation.getParam('verifyCode');

    handleFindPassword(verifiedEmail, password, verifyCode);
  };

  const confirmChangePasswordDialog = () => {
    Alert.alert('', '비밀번호를 변경하시겠습니까?', [
      {
        text: '취소',
        onPress: () =>
          console.log('function confirmChangePasswordDialog: Click Cancel'),
      },
      {
        text: '확인',
        onPress: () => onChangePassword(),
      },
    ]);
  };

  const isButtonEnabled = () => {
    return (
      isPasswordValidated &&
      isSecondPasswordValidated &&
      password === secondPassword
    );
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: colors.white }}>
      <ScrollView style={styles.scrollView}>
        <View>
          <Text>이메일로 비밀번호 변경 정보를 보내드립니다.</Text>
          <Text>이메일과 아이디와 입력해주세요.</Text>
        </View>
        <View style={{ marginTop: '10%' }}>
          <PasswordInput
            password={password}
            setPassword={setPassword}
            setPasswordValidation={setPasswordValidation}
          />
        </View>
        <View>
          <PasswordInput
            password={secondPassword}
            setPassword={setSecondPassword}
            setPasswordValidation={setSecondPasswordValidation}
          />
          <BaseBottomText
            text={changePasswordMessage}
            color={colors.lightGray}
          />
        </View>
      </ScrollView>
      <BaseButton
        handleClick={() => confirmChangePasswordDialog()}
        disabled={!isButtonEnabled()}
        text="비밀번호 바꾸기"
        backgroundColor={colors.lightSkyBlue}
        customStyle={{
          margin: '10%',
          marginBottom: '15%',
        }}
      />
    </KeyboardAvoidingView>
  );
};

export default PasswordReset;
