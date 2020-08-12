import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, TouchableHighlight } from 'react-native';

import { navigationProps } from '../../types';
import BaseText from '../../components/base/BaseText';
import { PhoneNumberInput } from '../../components/form/PhoneNumberInput';
import colors from '../../styles/colors';

const PhoneNumberInfo: React.FC<navigationProps> = ({ navigation }) => {
  const instructionMessage = '변경 할 휴대폰 번호를 입력하고 번호 변경하기 버튼을 누르세요.';
  const changePhoneNumberMessage = '입력된 값으로 휴대폰 번호가 변경됩니다.';
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isPhoneNumberAvailable, setPhoneNumberAvailability] = useState(false);

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
        <BaseText text={instructionMessage} customStyle={{}} />
        <View style={styles.phoneNumberWrapper}>
          <View>
            <PhoneNumberInput
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              setPhoneNumberAvailability={setPhoneNumberAvailability}
            />
            {printBottomText(changePhoneNumberMessage, colors.lightGray)}
          </View>
          <View style={styles.button}>
            <TouchableHighlight
              style={[{ opacity: isPhoneNumberAvailable ? 1 : 0.2 }]}
              onPress={() => console.log('change phone number api')}
              disabled={!isPhoneNumberAvailable}>
              <View>
                <Text style={{ color: colors.white, fontSize: 11, fontWeight: '700' }}>
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