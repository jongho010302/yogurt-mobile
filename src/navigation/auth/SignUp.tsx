import React, { useState, useEffect } from 'react';
import { View, Text, KeyboardAvoidingView, ScrollView, StyleSheet, TouchableOpacity, TouchableHighlight, Alert } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import DatePicker from 'react-native-datepicker';

// components
import BaseInput from '../../components/base/BaseInput';

import { yogurtAlert, formatDate, passwordRegex, emailRegex, usernameRegex, nameRegex } from '../../utils';

// Etc
import { navigationProps } from '../../types';
import colors from '../../styles/colors';
import { getStudioListApi, validateUsernameApi, validateEmailApi, signUpApi } from '../../api';

const SignUp: React.FC<navigationProps> = ({ navigation }) => {
  const { navigate } = navigation;

  // name
  const [name, setName] = useState('');
  const [isNameAvailable, setNameAvailability] = useState(false);
  // userName
  const [username, setUsername] = useState('');
  const [isUsernameAvailable, setUsernameAvailability] = useState(false);
  const [isUsernameValidationVisible, setUsernameValidationVisibility] = useState(false);
  // password
  const [password, setPassword] = useState('');
  const [secondPassword, setSecondPassword] = useState('');
  const [isPasswordAvailable, setPasswordAvailability] = useState(false);
  const [isPasswordValidated, setPasswordValidation] = useState(false);
  // email
  const [email, setEmail] = useState('');
  const [isEmailAvailable, setEmailAvailability] = useState(false);
  const [isEmailValidationVisible, setEmailValidationVisibility] = useState(false);
  // gender  
  const [gender, setGender] = useState('여');
  // studio
  const [studios, setStudios] = useState<any>();
  const [studio, setStudio] = useState<any>({});
  // birthday
  const [birthDay, setBirthDay] = useState(formatDate(new Date()));
  // phone
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isPhoneNumberAvailable, setPhoneNumberAvailability] = useState(false);

  const signUpAvailable = isNameAvailable && isUsernameAvailable && isEmailAvailable && isPasswordAvailable && isPhoneNumberAvailable && gender && birthDay;
  
  // Use Effect
  useEffect(() => {
    loadStudioList();
  }, []);

  const loadStudioList = async () => {
    const res = await getStudioListApi();

    const studioList = [{
      value: '',
      label: '선택'
    }];

    for (const studioItem of res.data) {
      studioList.push({
        value: studioItem,
        label: studioItem.name
      });
    }

    setStudios(studioList);
  };

  // When Change Name.
  const handleNameChange = (paramName: string) => {
    setName(paramName);

    if(!nameRegex.test(paramName)) {
      return setNameAvailability(false);
    }

    setNameAvailability(true);
  };
  
  // username, must do validation check to proceed to sign up 
  const handleChangeUsername = (paramUsername: string) => {
    setUsername(paramUsername);
    setUsernameAvailability(false);

    if(!usernameRegex.test(paramUsername)) {
      return setUsernameValidationVisibility(false);
    }

    setUsernameValidationVisibility(true);
  };

  const checkUsernameValidation = async () => {
    const res = await validateUsernameApi(username);

    if (!res.success) {
      return setUsernameAvailability(false);
    }

    setUsernameAvailability(true);
    yogurtAlert(res.message);
  };

  // isPasswordValidated

  // password
  const handlePasswordChange = (paramPassword: string) => {
    setPassword(paramPassword);

    if(!passwordRegex.test(paramPassword)) {
      return setPasswordValidation(false);
    }

    setPasswordValidation(true);
  };

  const handleDupPasswordChange = (paramPassword: string) => {
    setSecondPassword(paramPassword);

    if(!(password === paramPassword)) {
      return setPasswordAvailability(false);
    }

    setPasswordAvailability(true);
  };

  // email, must do validation check to proceed to sign up
  const handleEmailChange = (paramEmail: string) => {
    // setEmailValidatiion(false);
    setEmail(paramEmail);
    setEmailAvailability(false);

    if(!emailRegex.test(paramEmail)) {
      return setEmailValidationVisibility(false);
    }

    setEmailValidationVisibility(true);
  };

  const checkEmailValidation = async () => {
    const res = await validateEmailApi(email);

    if(!res.success) {
      return setEmailAvailability(false);
    }

    setEmailAvailability(true);
    yogurtAlert(res.message);
  };

  // gender
  const printGenderDropdownBox = () => {
    let genderList = [{ value: '', label: '선택' }, { value: 'M', label: '남' }, { value: 'F', label: '여' }];
    
    return (
      <View>
        <Dropdown
          useNativeDriver={true}
          value={''}
          data={genderList}
          onChangeText={value => setGender(value)}
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
          useNativeDriver={true}
          value={''}
          data={studios}
          onChangeText={value => setStudio(value)}
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
          }
        }}
        onDateChange={(date) => setBirthDay(date)}
      />
    );
  };

  // phone
  // TODO: phone number to be displayed with a format(010-1234-1234)
  const handlePhoneNumberChange = (paramPhoneNumber: string) => {
    const phoneNumberCheckRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
    const parsingPhoneNumber = paramPhoneNumber.replace(/[^0-9]/g, '').replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/, '$1-$2-$3').replace('--', '-');
    setPhoneNumber(parsingPhoneNumber);

    if(!phoneNumberCheckRegex.test(parsingPhoneNumber)) {
      return setPhoneNumberAvailability(false);
    }

    setPhoneNumberAvailability(true);
  };

  const handleSignUpSubmit = async () => {
    const res = await signUpApi(
      { id: studio.id },
      username,
      password,
      email,
      name,
      gender,
      birthDay,
      phoneNumber
    );

    yogurtAlert(res.message);
    navigate('AuthLoading');
  };

  const completeSignUp = () => {
    Alert.alert('', '회원가입을 완료하시겠습니까?\n 완료 후 로그인 페이지로 이동합니다.', [
      { text: '취소', onPress: () => console.log('function completeSignUp: Click Cancel') }, 
      { text: '확인', onPress: () => handleSignUpSubmit() }
    ]);
  };

  const printBottomText = (text: string, color: string) => {
    return (
      <View style={{ paddingTop: -10}}>
        <Text style={{ fontSize: 11, color }}>{text}</Text>
      </View>
    );
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
            onChangeText={handleNameChange}
            autoFocus
          />
          {
            isNameAvailable
              ? printBottomText('이름이 올바릅니다.', colors.lightSkyBlue)
              : printBottomText('올바른 이름을 입력해주세요.', colors.darkOrange)
          }
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
              onChangeText={handleChangeUsername}
              autoFocus
            />
            <View style={{ backgroundColor: colors.lightSkyBlue, borderRadius: 10, alignItems: 'center', padding: '4%', paddingLeft: '8%', paddingRight: '8%', height: '80%', position: 'relative' }}>
              <TouchableHighlight
                style={[{opacity: isUsernameValidationVisible ? 1 : 0.2 }]}
                onPress={() => checkUsernameValidation()}
                disabled={!isUsernameValidationVisible}
              >
                <View>
                  <Text style={{ color: colors.white, fontSize: 11, fontWeight: '700' }}>중복확인</Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
          {
            isUsernameValidationVisible
              ? printBottomText('올바른 형식입니다.', colors.lightSkyBlue)
              : printBottomText('형식에 맞는 아이디를 입력해주세요.', colors.darkOrange)
          }
        </View>

        {/* 비밀번호 */}
          <BaseInput
            inputValue={password}
            labelText="비밀번호를 입력하세요"
            placeholder="특수문자, 문자, 숫자 포함 형태의 8~15자리를 입력해주세요."
            labelTextSize={12}
            labelColor={colors.lightSkyBlue}
            textColor={colors.lightBlack}
            borderBottomColor={colors.lightGray}
            inputType="password"
            onChangeText={handlePasswordChange}
            autoFocus
          />
          {
            isPasswordValidated
              ? printBottomText('형식이 올바릅니다.', colors.lightSkyBlue)
              : printBottomText('비밀번호 형식이 올바르지 않습니다.', colors.darkOrange)
          }

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
            onChangeText={handleDupPasswordChange}
            autoFocus
          />
          {
            isPasswordAvailable
              ? printBottomText('비밀번호가 같습니다.', colors.lightSkyBlue)
              : printBottomText('비밀번호가 다릅니다.', colors.darkOrange)
          }
        </View>

        {/* 이메일 주소 */}
        <View style={{ marginBottom: '6%' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <BaseInput
              inputValue={email}
              labelText="이메일 주소를 입력하세요"
              placeholder="e.g. yogurt@yogurt-studio.com"
              labelTextSize={12}
              labelColor={colors.lightSkyBlue}
              textColor={colors.lightBlack}
              borderBottomColor={colors.lightGray}
              inputType="email"
              onChangeText={handleEmailChange}
              autoFocus
            />
            <View style={{backgroundColor: colors.lightSkyBlue, borderRadius: 10, alignItems: 'center', padding: '4%', paddingLeft: '8%', paddingRight: '8%', height: '80%', position: 'relative'}}>
              <TouchableHighlight
                style={[{opacity: isEmailValidationVisible ? 1 : 0.2}]}
                onPress={() => checkEmailValidation()}
                disabled={!isEmailValidationVisible}
              >
                <View>
                  <Text style={{ color: colors.white, fontSize: 11, fontWeight: '700' }}>중복확인</Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
          {
            isEmailValidationVisible
              ? printBottomText('이메일 형식이 올바릅니다.', colors.lightSkyBlue)
              : printBottomText('형식에 맞는 이메일을 입력해주세요.', colors.darkOrange)
          }
        </View> 

        {/* 성별 */}
        <View style={{ marginBottom: '6%' }}>
          <Text style={{ color: colors.lightSkyBlue, fontSize: 12, fontWeight: '700', marginBottom: -20 }}>성별을 선택하세요</Text>
          {printGenderDropdownBox()}
        </View>

        {/* 지점 */}
        <View style={{ marginBottom: '6%' }}>
          <Text style={{ color: colors.lightSkyBlue, fontSize: 12, fontWeight: '700', marginBottom: -20 }}>등록하는 지점을 선택하세요</Text>
          {printStudioDropdownBox()}
        </View>

        {/* 생일 */}
        <View style={{ marginBottom: '10%', flexDirection: 'column' }}>
          <Text style={{ color: colors.lightSkyBlue, fontSize: 12, fontWeight: '700', marginBottom: '2%' }}>생년월일을 선택하세요</Text>
          <View style={{ alignItems: 'center' }}>{printBirthDatePicker()}</View>
        </View>

        {/* 핸드폰 번호 */}
        <View style={{ marginBottom: '10%' }}>
          <BaseInput
            inputValue={phoneNumber}
            labelText="핸드폰 번호를 입력하세요"
            placeholder="010-xxxx-xxxx"
            labelTextSize={12}
            labelColor={colors.lightSkyBlue}
            textColor={colors.lightBlack}
            borderBottomColor={colors.lightGray}
            inputType="phone"
            onChangeText={handlePhoneNumberChange}
            autoFocus
          />
        </View>

        {/* 회원가입 */}
        <View style={{ flex: 0.1, flexDirection: 'row', alignItems: 'stretch', justifyContent: 'space-evenly' }}>
          <View style={{ backgroundColor: colors.lightSteelGray, borderRadius: 10, alignItems: 'center', padding: '4%', paddingLeft: '15%', paddingRight: '15%' }}>
            <TouchableOpacity onPress={() => navigate('AuthLoading')}>
              <Text style={{ color: colors.white, fontSize: 15, fontWeight: '700' }}>취소</Text>
            </TouchableOpacity>
          </View>
          <View style={{ backgroundColor: colors.lightSkyBlue, borderRadius: 10, alignItems: 'center', padding: '4%', paddingLeft: '12%', paddingRight: '12%' }}>
            <TouchableHighlight
              style={[{ opacity: signUpAvailable ? 1 : 0.2 }]}
              onPress={() => completeSignUp()}
              disabled={!signUpAvailable}
            >
              <View>
                <Text style={{ color: colors.white, fontSize: 15, fontWeight: '700' }}>회원가입</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 20,
    flex: 1,
  },
});

export default SignUp;
