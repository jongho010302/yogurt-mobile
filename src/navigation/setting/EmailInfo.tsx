import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, TouchableHighlight, Text } from 'react-native';

import { NavigationProps } from '../../types';
import BaseText from '../../components/base/BaseText';
import BaseBottomText from '../../components/base/BaseBottomText';
import { EmailInput } from '../../components/form/EmailInput';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
  Wrapper: {
    flex: 1,
    marginTop: '10%',
    margin: '10%',
  },
  emailWrapper: {
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

const EmailInfo: React.FC<NavigationProps> = ({ navigation }) => {
  const instructionMessage = '변경 할 이메일을 입력하고 이메일 변경하기 버튼을 누르세요.';
  const changeEmailMessage = '입력된 값으로 이메일이 변경됩니다.';
  const [email, setEmail] = useState('');
  const [isEmailAvailable, setEmailAvailability] = useState(false);
  const [isEmailValidationVisible, setEmailValidationVisibility] = useState(false);

  return (
    <SafeAreaView style={styles.Wrapper}>
      <ScrollView>
        <BaseText text={instructionMessage} customStyle={{}} />
        <View style={styles.emailWrapper}>
          <View>
            <EmailInput email={email} setEmail={setEmail} setEmailAvailability={setEmailAvailability} setEmailValidationVisibility={setEmailValidationVisibility} />
            <BaseBottomText text={changeEmailMessage} color={colors.lightGray} />
          </View>
          <View style={styles.button}>
            <TouchableHighlight style={[{ opacity: isEmailAvailable ? 1 : 0.2 }]} onPress={() => console.log('change phone number api')} disabled={!isEmailAvailable}>
              <View>
                <Text
                  style={{
                    color: colors.white,
                    fontSize: 11,
                    fontWeight: '700',
                  }}>
                  이메일 변경하기
                </Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EmailInfo;
