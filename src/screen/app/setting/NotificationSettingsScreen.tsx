import React, { useCallback } from 'react';
import { View, StyleSheet, Linking } from 'react-native';
import { NavigationProps } from '../../types';
import BaseButton from '../../components/base/BaseButton';
import BaseText from '../../components/base/BaseText';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
  Wrapper: {
    flex: 1,
    marginTop: '10%',
    margin: '10%',
  },
  settingsButtonWrapper: {
    flex: 1,
    justifyContent: 'space-between',
    marginTop: '20%',
  },
});

const NotificationSettingsScreen: React.FC = () => {
  const instructionMessage = '설정에서 알림(PUSH) 수신을 변경할 수 있습니다.';
  const handleClick = useCallback(async () => {
    await Linking.openSettings();
  }, []);

  return (
    <View style={styles.Wrapper}>
      <BaseText text="알림 수신" customStyle={{ fontSize: 15, fontWeight: '700' }} />
      <BaseText text={instructionMessage} />
      <View style={styles.settingsButtonWrapper}>
        <BaseButton
          text="알림 설정으로 이동하기"
          handleClick={() => handleClick()}
          disabled={false}
          backgroundColor={palatte.logoColor}
        />
      </View>
    </View>
  );
};
export default NotificationSettingsScreen;
