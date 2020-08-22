import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableHighlight,
  Text,
} from 'react-native';
import BaseText from '../../components/base/BaseText';
import { NavigationProps } from '../../types';
import { PasswordInput } from '../../components/form/PasswordInput';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
  Wrapper: {
    flex: 1,
    marginTop: '10%',
    margin: '10%',
  },
  passwordWrapper: {
    flex: 1,
    justifyContent: 'space-between',
    marginTop: '20%',
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

const PasswordInfo: React.FC<NavigationProps> = () => {
  const instructionMessage =
    '변경 할 비밀번호를 입력하고 이메일 변경하기 버튼을 누르세요.';
  const changeEmailMessage = '입력된 값으로 비밀번호가 변경됩니다.';
  const [password, setPassword] = useState('');
  const [secondPassword, setSecondPassword] = useState('');
  const [isPasswordValidated, setPasswordValidation] = useState(false);
  const [isSecondPasswordValidated, setSecondPasswordValidation] = useState(
    false,
  );

  const printBottomText = (text: string, color: string) => {
    return (
      <View style={{ paddingTop: -10 }}>
        <BaseText text={text} customStyle={{ fontSize: 11, color }} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.Wrapper}>
      <ScrollView>
        <BaseText text={instructionMessage} />
        <View style={styles.passwordWrapper}>
          <View style={{ marginBottom: '10%' }}>
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
            {printBottomText(changeEmailMessage, colors.lightGray)}
          </View>
          <View style={styles.button}>
            <TouchableHighlight
              style={[
                {
                  opacity:
                    isPasswordValidated &&
                    isSecondPasswordValidated &&
                    password === secondPassword
                      ? 1
                      : 0.2,
                },
              ]}
              onPress={() => console.log('change password api')}
              disabled={
                !isPasswordValidated &&
                !isSecondPasswordValidated &&
                password !== secondPassword
              }>
              <View>
                <Text
                  style={{
                    color: colors.white,
                    fontSize: 11,
                    fontWeight: '700',
                  }}>
                  비밀번호 변경하기
                </Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PasswordInfo;
