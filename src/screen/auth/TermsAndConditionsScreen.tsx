import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { CheckBox } from 'react-native-elements';
import BaseButton from '../../components/base/BaseButton';
import { NavigationProps } from '../../types';
import colors from '../../..';

const TermsAndConditionsScreen: React.FC = () => {
  const { navigate } = navigation;
  const [isFirstCheckBox, setFirstCheckBox] = useState<boolean>(false);
  const [isSecondCheckBox, setSecondCheckBox] = useState<boolean>(false);

  const SetFirstCheckBox = () => {
    return setFirstCheckBox(!isFirstCheckBox);
  };

  const SetSecondCheckBox = () => {
    return setSecondCheckBox(!isSecondCheckBox);
  };

  const setButtonDisabled = () => {
    if (isFirstCheckBox && isSecondCheckBox) {
      return false;
    }
    return true;
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 0.45 }}>
          <CheckBox
            title="Yogurt Studio 이용약관 동의"
            checked={isFirstCheckBox}
            onIconPress={() => SetFirstCheckBox()}
          />
          <View style={{ borderColor: colors.white }}>
            <Text>Yogurt-Studio 이용약관</Text>
            <Text />
            <Text />
            <Text />
            <Text />
            <Text />
            <Text />
            <Text />
            <Text />
          </View>
        </View>
        <View style={{ flex: 0.45 }}>
          <CheckBox
            title="Yogurt Studio 개인정보 수집 및 이용 동의"
            checked={isSecondCheckBox}
            onIconPress={() => SetSecondCheckBox()}
          />
          <View style={{ borderColor: colors.white }}>
            <Text>Yogurt-Studio 이용약관</Text>
            <Text />
            <Text />
            <Text />
            <Text />
            <Text />
            <Text />
            <Text />
            <Text />
            <Text />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'stretch',
            justifyContent: 'space-evenly',
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
            <BaseButton handleClick={() => navigate('AuthLoading')} disabled={false} text="취소" />
          </View>
          <View
            style={{
              backgroundColor: colors.lightSkyBlue,
              borderRadius: 10,
              alignItems: 'center',
              padding: '4%',
              paddingLeft: '15%',
              paddingRight: '15%',
            }}>
            <BaseButton handleClick={() => navigate('SignUp')} disabled={setButtonDisabled()} text="동의" />
          </View>
        </View>
      </View>
    </View>
  );
};

export default TermsAndConditionsScreen;
