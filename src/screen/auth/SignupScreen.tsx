import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import DatePicker from 'react-native-datepicker';
import BaseInput from '../../components/base/BaseInput';
import { EmailInput } from '../../components/form/EmailInput';
import { EmailVerifyCodeInput } from '../../components/form/EmailVerifyCodeInput';
import { formatDate } from '../../utils/date';
import { passwordRegex, nameRegex } from '../../utils/regex';
import colors from '../../styles/colors';
import { useUser } from '../../hooks';
import BaseBottomText from '../../components/base/BaseBottomText';
import useStudio from '~/hooks/useStudio';
import { AsyncStatus } from '~/store/types';

const SignupScreen: React.FC = () => {
  const { navigate } = useNavigation();

  const {
    apiState,
    initializeApiState: initializeUserApiState,
    sendCodeForSignUp,
    verifyCodeForSignUp,
    signup,
  } = useUser();
  const { getStudios, initializeApiState: initializeStudioApiState } = useStudio();

  // name
  const [name, setName] = useState('');
  const [isNameVaildated, setNameValidated] = useState(false);

  // password
  const [password, setPassword] = useState('');
  const [secondPassword, setSecondPassword] = useState('');
  const [isPasswordValidated, setPasswordValidation] = useState(false);
  const [isPasswordSame, setIsPasswordSame] = useState(false);

  // email
  const [email, setEmail] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  // verificationCode
  const [verificationCode, setVerifyCode] = useState('');
  const [isVerifyCodeSent, setIsVerifyCodeSent] = useState(false);

  // gender
  const [gender, setGender] = useState('');

  // birthday
  const [birthDay, setBirthDay] = useState(formatDate(new Date()));

  // phone
  const [phone, setPhone] = useState('');
  const [isPhoneNumberAvailable, setPhoneAvailability] = useState(false);

  // 회원가입 버튼 활성화 여부
  const signUpAvailable =
    isNameVaildated &&
    isEmailVerified &&
    isPasswordValidated &&
    isPasswordSame &&
    isPhoneNumberAvailable &&
    gender &&
    birthDay;

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

  const onNameChange = (paramName: string) => {
    setName(paramName);

    if (nameRegex.test(paramName)) {
      setNameValidated(true);
    } else {
      setNameValidated(false);
    }
  };

  const onPasswordChange = (paramPassword: string) => {
    setPassword(paramPassword);

    if (passwordRegex.test(paramPassword)) {
      setPasswordValidation(true);
    } else {
      setPasswordValidation(false);
    }
  };

  const onSecondPasswordChange = (paramPassword: string) => {
    setSecondPassword(paramPassword);

    if (password === paramPassword) {
      setIsPasswordSame(true);
    } else {
      setIsPasswordSame(false);
    }
  };

  // TODO: phone number to be displayed with a format(010-1234-1234)
  const onPhoneNumberChange = (paramPhoneNumber: string) => {
    const phoneCheckRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
    const parsingPhoneNumber = paramPhoneNumber
      .replace(/[^0-9]/g, '')
      .replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/, '$1-$2-$3')
      .replace('--', '-');
    setPhone(parsingPhoneNumber);

    if (phoneCheckRegex.test(parsingPhoneNumber)) {
      setPhoneAvailability(true);
    } else {
      setPhoneAvailability(false);
    }
  };

  const onSendSignUpCodeClick = async () => {
    await sendCodeForSignUp(email);
    if (apiState.status === AsyncStatus.SUCCESS) {
      setIsVerifyCodeSent(true);
    } else {
      setIsVerifyCodeSent(false);
    }
  };

  const onVerifySignUpCodeClick = async () => {
    await verifyCodeForSignUp(email, verificationCode);
    if (apiState.status === AsyncStatus.SUCCESS) {
      setIsEmailVerified(true);
    } else {
      setIsEmailVerified(false);
    }
  };

  const completeSignUp = () => {
    Alert.alert('', '회원가입을 완료하시겠습니까?\n 완료 후 로그인 페이지로 이동합니다.', [
      {
        text: '취소',
      },
      {
        text: '확인',
        onPress: async () => {
          await signup(email, password, name, gender, birthDay, phone, verificationCode);
          if (apiState.status === AsyncStatus.SUCCESS) {
            navigate('AuthLoading');
          }
        },
      },
    ]);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: colors.white }} behavior="padding">
      <ScrollView style={styles.scrollView}>
        {/* 이름 */}
        <View style={{ marginBottom: '6%' }}>
          <BaseInput
            inputValue={name}
            labelText="이름을 입력하세요"
            labelTextSize={12}
            labelColor={colors.lightSkyBlue}
            textColor={colors.lightBlack}
            borderBottomColor={colors.lightGray}
            inputType="text"
            onChangeText={onNameChange}
            autoFocus
          />
          {name ? (
            isNameVaildated ? (
              <BaseBottomText text="이름이 올바릅니다." color={colors.lightSkyBlue} />
            ) : (
              <BaseBottomText text="올바른 이름을 입력해주세요." color={colors.darkOrange} />
            )
          ) : null}
        </View>

        {/* 아이디 */}
        <View style={{ marginBottom: '6%' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <BaseInput
              inputValue={username}
              labelText="아이디를 입력하세요"
              placeholder="영문 8자 이상"
              labelTextSize={12}
              labelColor={colors.lightSkyBlue}
              textColor={colors.lightBlack}
              borderBottomColor={colors.lightGray}
              inputType="text"
              onChangeText={onUsernameChange}
              autoFocus
              inputStyle={{ width: 200 }}
            />
            <View
              style={{
                backgroundColor: colors.lightSkyBlue,
                borderRadius: 10,
                alignItems: 'center',
                padding: '4%',
                paddingLeft: '8%',
                paddingRight: '8%',
                height: '80%',
                position: 'relative',
              }}>
              <TouchableHighlight
                style={[{ opacity: isUsernameValidationVisible ? 1 : 0.2 }]}
                onPress={() => handleVerifyUsername(username)}
                disabled={!isUsernameValidationVisible}>
                <View>
                  <Text
                    style={{
                      color: colors.white,
                      fontSize: 11,
                      fontWeight: '700',
                    }}>
                    중복확인
                  </Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
          {username ? (
            !isUsernameValidationVisible ? (
              <BaseBottomText text="형식에 맞는 아이디를 입력해주세요." color={colors.darkOrange} />
            ) : isUsernameValidated ? (
              <BaseBottomText text="사용 가능한 아이디입니다." color={colors.lightSkyBlue} />
            ) : (
              <BaseBottomText text="중복검사를 해주세요." color={colors.darkOrange} />
            )
          ) : null}
        </View>

        {/* 비밀번호 */}
        <View style={{ marginBottom: '6%' }}>
          <BaseInput
            inputValue={password}
            labelText="비밀번호를 입력하세요"
            placeholder="특수문자, 문자, 숫자 포함 형태의 8~15자리를 입력해주세요."
            labelTextSize={12}
            labelColor={colors.lightSkyBlue}
            textColor={colors.lightBlack}
            borderBottomColor={colors.lightGray}
            inputType="password"
            onChangeText={onPasswordChange}
            autoFocus
          />
          {password ? (
            isPasswordValidated ? (
              <BaseBottomText text="형식이 올바릅니다." color={colors.lightSkyBlue} />
            ) : (
              <BaseBottomText text="비밀번호 형식이 올바르지 않습니다." color={colors.darkOrange} />
            )
          ) : null}
        </View>

        {/* 중복 비밀번호 */}
        <View style={{ marginBottom: '6%' }}>
          <BaseInput
            inputValue={secondPassword}
            labelText="비밀번호를 다시 입력 해주세요."
            placeholder="특수문자, 문자, 숫자 포함 형태의 8~15자리를 입력해주세요."
            labelTextSize={12}
            labelColor={colors.lightSkyBlue}
            textColor={colors.lightBlack}
            borderBottomColor={colors.lightGray}
            inputType="password"
            onChangeText={onSecondPasswordChange}
            autoFocus
          />
          {secondPassword ? (
            isPasswordSame ? (
              <BaseBottomText text="비밀번호가 같습니다." color={colors.lightSkyBlue} />
            ) : (
              <BaseBottomText text="비밀번호가 다릅니다." color={colors.darkOrange} />
            )
          ) : null}
        </View>

        {/* 이메일 주소 */}
        {/* <View style={{ marginBottom: '6%' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <EmailInput
              email={email}
              setEmail={setEmail}
              // setEmailValidated={setEmailValidated}
              setIsVerifyCodeSent={setIsVerifyCodeSent}
            />
            <View
              style={{
                backgroundColor: colors.lightSkyBlue,
                borderRadius: 10,
                alignItems: 'center',
                padding: '4%',
                paddingLeft: '8%',
                paddingRight: '8%',
                height: '80%',
                position: 'relative',
              }}>
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
        </View> */}

        {/* 이메일 인증번호
        <View style={{ marginBottom: '6%' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <EmailVerifyCodeInput verificationCode={verificationCode} setVerifyCode={setVerifyCode} />
            <View
              style={{
                backgroundColor: colors.lightSkyBlue,
                borderRadius: 10,
                alignItems: 'center',
                padding: '4%',
                paddingLeft: '8%',
                paddingRight: '8%',
                height: '80%',
                position: 'relative',
              }}>
              <TouchableHighlight
                style={[{ opacity: isEmailValidated ? 1 : 0.2 }]}
                onPress={() => onVerifySignUpCodeClick()}
                disabled={!isEmailValidated}>
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
        </View> */}

        {/* 성별 */}
        <View style={{ marginBottom: '6%' }}>
          <Text
            style={{
              color: colors.lightSkyBlue,
              fontSize: 12,
              fontWeight: '700',
              marginBottom: -20,
            }}>
            성별을 선택하세요
          </Text>
          <Dropdown
            useNativeDriver
            value=""
            data={[
              { value: '', label: '' },
              { value: 'M', label: '남' },
              { value: 'F', label: '여' },
            ]}
            onChangeText={(value) => setGender(value)}
            textColor={colors.lightBlack}
            fontSize={12}
          />
        </View>

        {/* 지점 */}
        <View style={{ marginBottom: '6%' }}>
          <Text
            style={{
              color: colors.lightSkyBlue,
              fontSize: 12,
              fontWeight: '700',
              marginBottom: -20,
            }}>
            등록하는 지점을 선택하세요
          </Text>
        </View>

        {/* 생일 */}
        <View style={{ marginBottom: '10%', flexDirection: 'column' }}>
          <Text
            style={{
              color: colors.lightSkyBlue,
              fontSize: 12,
              fontWeight: '700',
              marginBottom: '2%',
            }}>
            생년월일을 선택하세요
          </Text>
          <View style={{ alignItems: 'center' }}>
            {' '}
            <DatePicker
              style={{ width: '100%', height: '5%' }}
              date={birthDay}
              mode="date"
              placeholder="생년월일을 선택해주세요."
              format="YYYY-MM-DD"
              minDate="1900-01-01"
              maxDate={formatDate(new Date())}
              confirmBtnText="확인"
              cancelBtnText="취소"
              showIcon={false}
              customStyles={{
                dateInput: {
                  borderRadius: 10,
                  borderColor: colors.lightSkyBlue,
                  backgroundColor: colors.lightSkyBlue,
                },
                dateText: {
                  color: colors.white,
                  fontSize: 14,
                  fontWeight: 'bold',
                },
              }}
              onDateChange={(date) => setBirthDay(date)}
            />
          </View>
        </View>

        {/* 핸드폰 번호 */}
        <View style={{ marginBottom: '10%' }}>
          <BaseInput
            inputValue={phone}
            labelText="핸드폰 번호를 입력하세요"
            placeholder="010-7570-3529"
            labelTextSize={12}
            labelColor={colors.lightSkyBlue}
            textColor={colors.lightBlack}
            borderBottomColor={colors.lightGray}
            inputType="phone"
            onChangeText={onPhoneNumberChange}
            autoFocus
          />
        </View>

        {/* 회원가입 */}
        <View
          style={{
            flex: 0.1,
            flexDirection: 'row',
            alignItems: 'stretch',
            justifyContent: 'space-evenly',
            marginBottom: 20,
          }}>
          <View
            style={{
              backgroundColor: colors.lightSteelGray,
              borderRadius: 10,
              alignItems: 'center',
              padding: '4%',
              paddingLeft: '15%',
              paddingRight: '15%',
            }}>
            <TouchableOpacity onPress={() => navigate('AuthLoading')}>
              <Text
                style={{
                  color: colors.white,
                  fontSize: 15,
                  fontWeight: '700',
                }}>
                취소
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: colors.lightSkyBlue,
              borderRadius: 10,
              alignItems: 'center',
              padding: '4%',
              paddingLeft: '12%',
              paddingRight: '12%',
            }}>
            <TouchableHighlight
              style={[{ opacity: signUpAvailable ? 1 : 0.2 }]}
              onPress={() => completeSignUp()}
              disabled={!signUpAvailable}>
              <View>
                <Text
                  style={{
                    color: colors.white,
                    fontSize: 15,
                    fontWeight: '700',
                  }}>
                  회원가입
                </Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  scrollView: {
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 20,
    flex: 1,
  },
});
