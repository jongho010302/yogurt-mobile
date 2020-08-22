import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import BaseText from '../../components/base/BaseText';
import { PhoneNumberInput } from '../../components/form/PhoneNumberInput';
import { yogurtAlert } from '../../utils/common';
import { NavigationProps } from '../../types';
import colors from '../../styles/colors';
import { useUser } from '../../hooks';
import { AsyncStatus } from '../../modules/types';

const styles = StyleSheet.create({
  Wrapper: {
    flex: 1,
    marginTop: '10%',
    margin: '10%',
  },
  phoneNumberWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '20%',
  },
  button: {
    backgroundColor: colors.lightSkyBlue,
    borderRadius: 10,
    alignItems: 'center',
    padding: '4%',
    paddingLeft: '8%',
    paddingRight: '8%',
    height: '70%',
    position: 'relative',
  },
});

const PhoneNumberInfo: React.FC<NavigationProps> = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const {
    user,
    handleCheckUser,
    handleChangePhone,
    handleChangeField,
  } = useUser();
  const [isPhoneNumberAvailable, setPhoneNumberAvailability] = useState(false);

  const userData = user.data!;
  const instructionMessage =
    '변경 할 휴대폰 번호를 입력하고 번호 변경하기 버튼을 누르세요.';
  const changePhoneNumberMessage = '입력된 값으로 휴대폰 번호가 변경됩니다.';

  useEffect(() => {
    if (user.changePhone.status === AsyncStatus.SUCCESS) {
      yogurtAlert('핸드폰 번호가 성공적으로 변경되었습니다.');
      navigation.navigate('PersonalInfo');
    }
  }, [user.changePhone.status, handleCheckUser, navigation]);

  useEffect(() => {
    return () => {
      handleChangeField('changeName', {
        status: AsyncStatus.INIT,
        errorMessage: '',
      });
    };
  }, [handleChangeField]);

  const printBottomText = (text: string, color: string) => {
    return (
      <View style={{ paddingTop: -10 }}>
        <BaseText text={text} customStyle={{ fontSize: 11, color }} />
      </View>
    );
  };

  const savePhoneNumberInfo = async () => {
    handleChangePhone(phoneNumber);
  };

  return (
    <SafeAreaView style={styles.Wrapper}>
      <ScrollView>
        <BaseText text={instructionMessage} customStyle={{}} />
        <View style={styles.phoneNumberWrapper}>
          <View>
            <PhoneNumberInput
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              setPhoneNumberAvailability={setPhoneNumberAvailability}
              placeholder={userData.phone}
            />
            {printBottomText(changePhoneNumberMessage, colors.lightGray)}
          </View>
          <View style={styles.button}>
            <TouchableHighlight
              style={[{ opacity: isPhoneNumberAvailable ? 1 : 0.2 }]}
              onPress={() => savePhoneNumberInfo()}
              disabled={!isPhoneNumberAvailable}>
              <View>
                <Text
                  style={{
                    color: colors.white,
                    fontSize: 11,
                    fontWeight: '700',
                  }}>
                  번호 변경하기
                </Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PhoneNumberInfo;
