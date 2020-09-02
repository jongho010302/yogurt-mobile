import React, { useState, useEffect } from 'react';
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
import { Dropdown, DropDownData } from 'react-native-material-dropdown-v2';
import DatePicker from 'react-native-datepicker';
import BaseInput from '../../components/base/BaseInput';
import { EmailInput } from '../../components/form/EmailInput';
import { EmailVerifyCodeInput } from '../../components/form/EmailVerifyCodeInput';
import { yogurtAlert } from '../../utils/common';
import { formatDate } from '../../utils/date';
import {
  passwordRegex,
  emailRegex,
  usernameRegex,
  nameRegex,
} from '../../utils/regex';
import { NavigationProps } from '../../types';
import colors from '../../styles/colors';
import { useUser } from '../../hooks';
import { AsyncStatus } from '../../modules/types';
import BaseBottomText from '../../components/base/BaseBottomText';

const styles = StyleSheet.create({
  scrollView: {
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 20,
    flex: 1,
  },
});

const SignUp: React.FC<NavigationProps> = ({ navigation }) => {
  const { navigate } = navigation;

  const {
    user,
    handleChangeField,
    handleGetStudios,
    handleVerifyUsername,
    handleSendSignUpCode,
    handleVerifySignUpCode,
    handleSignUp,
  } = useUser();

  // name
  const [name, setName] = useState('');
  const [isNameVaildated, setNameValidated] = useState(false);
  // userName
  const [username, setUsername] = useState('');
  const [
    isUsernameValidationVisible,
    setUsernameValidationVisibility,
  ] = useState(false);
  const [isUsernameValidated, setUsernameValidated] = useState(false);
  // password
  const [password, setPassword] = useState('');
  const [secondPassword, setSecondPassword] = useState('');
  const [isPasswordValidated, setPasswordValidation] = useState(false);
  const [isPasswordSame, setIsPasswordSame] = useState(false);
  // email
  const [email, setEmail] = useState('');
  const [isEmailValidated, setEmailValidated] = useState(false);
  // verifyCode
  const [verifyCode, setVerifyCode] = useState('');
  const [isVerifyCodeSend, setIsVerifyCodeSend] = useState(false);
  const [isEmailVerified, setEmailVerified] = useState(false);
  // gender
  const [gender, setGender] = useState('');
  // studio
  const [studios, setStudios] = useState<DropDownData[]>();
  const [selectedStudio, setSelectedStudio] = useState<number>();
  // birthday
  const [birthDay, setBirthDay] = useState(formatDate(new Date()));
  // phone
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isPhoneNumberAvailable, setPhoneNumberAvailability] = useState(false);

  // 회원가입 버튼 활성화 여부
  const signUpAvailable =
    isNameVaildated &&
    isUsernameValidated &&
    isEmailValidated &&
    isPasswordValidated &&
    isPasswordSame &&
    isPhoneNumberAvailable &&
    gender &&
    selectedStudio &&
    birthDay;

  useEffect(() => {
    handleGetStudios();
  }, [handleGetStudios]);

  useEffect(() => {
    return () => {
      handleChangeField('getStudios', {
        status: AsyncStatus.INIT,
        errorMessage: '',
      });

      handleChangeField('verifyUsername', {
        status: AsyncStatus.INIT,
        errorMessage: '',
      });

      handleChangeField('sendSignUpCode', {
        status: AsyncStatus.INIT,
        errorMessage: '',
      });
      handleChangeField('verifySignUpCode', {
        status: AsyncStatus.INIT,
        errorMessage: '',
      });

      handleChangeField('signUp', {
        status: AsyncStatus.INIT,
        errorMessage: '',
      });
    };
  }, [handleChangeField]);

  // 센터 가져오기
  useEffect(() => {
    if (user.getStudios.status === AsyncStatus.SUCCESS) {
      if (!user.getStudios.data) {
        yogurtAlert('이용 가능한 센터가 존재하지 않습니다.');
        return;
      }
      const studioData: DropDownData[] = user.getStudios.data.map((studio) => ({
        value: studio.id.toString(),
        label: studio.name,
      }));

      studioData.unshift({
        value: '',
        label: '선택',
      });

      setStudios(studioData);
    }
  }, [user.getStudios]);

  // 아이디 중복 검사
  useEffect(() => {
    if (user.verifyUsername.status === AsyncStatus.SUCCESS) {
      setUsernameValidated(true);
    }
  }, [user.verifyUsername]);

  // 이메일 인증코드 인증
  useEffect(() => {
    if (user.verifySignUpCode.status === AsyncStatus.SUCCESS) {
      setEmailVerified(true);
    } else if (user.verifySignUpCode.status === AsyncStatus.FAILURE) {
      setEmailVerified(false);
    }
  }, [user.verifySignUpCode.status]);

  // 회원가입 성공
  useEffect(() => {
    if (user.signUp.status === AsyncStatus.SUCCESS) {
      navigate('AuthLoading');
    }
  }, [user.signUp.status, navigate]);

  const onNameChange = (paramName: string) => {
    setName(paramName);

    if (nameRegex.test(paramName)) {
      setNameValidated(true);
    } else {
      setNameValidated(false);
    }
  };

  const onUsernameChange = (paramUsername: string) => {
    setUsername(paramUsername);
    setUsernameValidated(false);

    if (usernameRegex.test(paramUsername)) {
      setUsernameValidationVisibility(true);
    } else {
      setUsernameValidationVisibility(false);
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

  // email, must do validation check to proceed to sign up
  const onEmailChange = (paramEmail: string) => {
    setIsVerifyCodeSend(false);
    setEmail(paramEmail);
    setEmailVerified(false);
    setVerifyCode('');

    if (emailRegex.test(paramEmail)) {
      setEmailValidated(true);
    } else {
      setEmailValidated(false);
    }
  };

  const onVerfiyCodeChange = (paramVerifyCode: string) => {
    setVerifyCode(paramVerifyCode);
    setEmailVerified(false);
  };

  // TODO: phone number to be displayed with a format(010-1234-1234)
  const onPhoneNumberChange = (paramPhoneNumber: string) => {
    const phoneNumberCheckRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
    const parsingPhoneNumber = paramPhoneNumber
      .replace(/[^0-9]/g, '')
      .replace(
        /(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/,
        '$1-$2-$3',
      )
      .replace('--', '-');
    setPhoneNumber(parsingPhoneNumber);

    if (phoneNumberCheckRegex.test(parsingPhoneNumber)) {
      setPhoneNumberAvailability(true);
    } else {
      setPhoneNumberAvailability(false);
    }
  };

  const onSendSignUpCodeClick = () => {
    setIsVerifyCodeSend(true);
    handleSendSignUpCode(email);
  };

  const onVerifySignUpCodeClick = () => {
    handleVerifySignUpCode(email, verifyCode);
  };

  const completeSignUp = () => {
    Alert.alert(
      '',
      '회원가입을 완료하시겠습니까?\n 완료 후 로그인 페이지로 이동합니다.',
      [
        {
          text: '취소',
          onPress: () => console.log('function completeSignUp: Click Cancel'),
        },
        {
          text: '확인',
          onPress: () => {
            console.log(selectedStudio);
            handleSignUp(
              selectedStudio!,
              username,
              password,
              email,
              name,
              gender,
              birthDay,
              phoneNumber,
              'https://seoulforest-image.s3.ap-northeast-2.amazonaws.com/default_profile.png',
              verifyCode,
            );
          },
        },
      ],
    );
  };

  // gender
  const printGenderDropdownBox = () => {
    const genders = [
      { value: '', label: '' },
      { value: 'M', label: '남' },
      { value: 'F', label: '여' },
    ];

    return (
      <View>
        <Dropdown
          useNativeDriver
          value=""
          data={genders}
          onChangeText={(value) => setGender(value)}
          textColor={colors.lightBlack}
          fontSize={12}
        />
      </View>
    );
  };

  const printStudioDropdownBox = () => {
    return (
      <View>
        <Dropdown
          useNativeDriver
          value=""
          data={studios!}
          onChangeText={(value) => setSelectedStudio(value as any)}
          textColor={colors.lightBlack}
          fontSize={12}
        />
      </View>
    );
  };

  // birthday
  const printBirthDatePicker = () => {
    return (
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
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.white }}
      behavior="padding">
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
              <BaseBottomText
                text="이름이 올바릅니다."
                color={colors.lightSkyBlue}
              />
            ) : (
              <BaseBottomText
                text="올바른 이름을 입력해주세요."
                color={colors.darkOrange}
              />
            )
          ) : null}
        </View>

        {/* 아이디 */}
        <View style={{ marginBottom: '6%' }}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
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
              <BaseBottomText
                text="형식에 맞는 아이디를 입력해주세요."
                color={colors.darkOrange}
              />
            ) : isUsernameValidated ? (
              <BaseBottomText
                text="사용 가능한 아이디입니다."
                color={colors.lightSkyBlue}
              />
            ) : (
              <BaseBottomText
                text="중복검사를 해주세요."
                color={colors.darkOrange}
              />
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
              <BaseBottomText
                text="형식이 올바릅니다."
                color={colors.lightSkyBlue}
              />
            ) : (
              <BaseBottomText
                text="비밀번호 형식이 올바르지 않습니다."
                color={colors.darkOrange}
              />
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
              <BaseBottomText
                text="비밀번호가 같습니다."
                color={colors.lightSkyBlue}
              />
            ) : (
              <BaseBottomText
                text="비밀번호가 다릅니다."
                color={colors.darkOrange}
              />
            )
          ) : null}
        </View>

        {/* 이메일 주소 */}
        <View style={{ marginBottom: '6%' }}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <EmailInput
              email={email}
              setEmail={setEmail}
              setEmailValidated={setEmailValidated}
              setEmailVerified={setEmailVerified}
              setIsVerifyCodeSend={setIsVerifyCodeSend}
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
                onPress={onSendSignUpCodeClick}
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
              <BaseBottomText
                text="형식에 맞는 이메일을 입력해주세요."
                color={colors.darkOrange}
              />
            ) : !isVerifyCodeSend ? (
              <BaseBottomText
                text="인증번호를 전송해 주세요."
                color={colors.darkOrange}
              />
            ) : (
              <BaseBottomText
                text="인증번호가 전송되었습니다."
                color={colors.lightSkyBlue}
              />
            )
          ) : null}
        </View>

        {/* 이메일 인증번호 */}
        <View style={{ marginBottom: '6%' }}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <EmailVerifyCodeInput
              verifyCode={verifyCode}
              isVerifyCodeSend={isVerifyCodeSend}
              setVerifyCode={setVerifyCode}
              setEmailVerified={setEmailVerified}
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
                onPress={onVerifySignUpCodeClick}
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
          {isVerifyCodeSend ? (
            !isEmailVerified ? (
              <BaseBottomText text="인증해주세요." color={colors.darkOrange} />
            ) : (
              <BaseBottomText
                text="인증돠었습니다."
                color={colors.lightSkyBlue}
              />
            )
          ) : null}
        </View>

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
          {printGenderDropdownBox()}
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
          {printStudioDropdownBox()}
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
          <View style={{ alignItems: 'center' }}>{printBirthDatePicker()}</View>
        </View>

        {/* 핸드폰 번호 */}
        <View style={{ marginBottom: '10%' }}>
          <BaseInput
            inputValue={phoneNumber}
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

export default SignUp;
