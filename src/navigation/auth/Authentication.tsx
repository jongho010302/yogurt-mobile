import React, { useState, useEffect } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import BaseButton from '../../components/base/BaseButton';
import BaseInput from '../../components/base/BaseInput';
import colors from '../../styles/colors';
import { passwordRegex, usernameRegex } from '../../utils/regex';
import { useUser } from '../../hooks';
import { AsyncStatus } from '../../modules/types';
import { NavigationProps } from '../../types';
import iPhoneSize from '../../helpers/utils';

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

const Authentication: React.FC<NavigationProps> = ({ navigation }) => {
  const { navigate } = navigation;

  const { user, handleLogIn, handleChangeField } = useUser();
  const [username, setUsername] = useState('');
  const [isUsernameValidated, setUsernameValidation] = useState(false);
  const [password, setPassword] = useState('');
  const [isPasswordValidatde, setPasswordValidation] = useState(false);

  useEffect(() => {
    if (user.logIn.status === AsyncStatus.SUCCESS) {
      navigate('App');
    }
  }, [user.logIn.status, navigate]);

  useEffect(() => {
    return () => {
      handleChangeField('logIn', {
        status: AsyncStatus.INIT,
        errorMessage: '',
      });
    };
  }, [handleChangeField]);

  const handleUsernameChange = (paramUsername: string) => {
    setUsername(paramUsername);

    if (usernameRegex.test(paramUsername)) {
      setUsernameValidation(true);
    } else {
      setUsernameValidation(false);
    }
  };

  const handlePasswordChange = (paramPassword: string) => {
    setPassword(paramPassword);

    if (passwordRegex.test(paramPassword)) {
      setPasswordValidation(true);
    } else {
      setPasswordValidation(false);
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
          <View
            style={{
              flexDirection: 'row',
              paddingTop: '10%',
              paddingBottom: '20%',
            }}>
            <View style={{ flexDirection: 'column' }}>
              <TouchableOpacity onPress={() => navigate('EmailSearch')}>
                <Text
                  style={{ fontSize: 15, fontWeight: '400', color: '#4485F7' }}>
                  아이디 찾기
                </Text>
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
            handleClick={() => handleLogIn(username, password)}
            disabled={!(isUsernameValidated && isPasswordValidatde)}
            backgroundColor={colors.lightSkyBlue}
          />
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Authentication;
