import React from 'react';
import { SafeAreaView, ScrollView, View, StyleSheet } from 'react-native';

import { NavigationProps } from '../../types';
import BaseText from '../../components/base/BaseText';
import BaseStatusBar from '../../components/base/StatusBar';

const styles = StyleSheet.create({
  Wrapper: {
    flex: 1,
    marginTop: '20%',
    margin: '10%',
  },
  PrivacyPolicyWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '20%',
  },
});

const PrivacyPolicy: React.FC = () => {
  const instructionMessage = '개인정보처리방침';

  return (
    <SafeAreaView style={styles.Wrapper}>
      <ScrollView>
        <BaseText text={instructionMessage} customStyle={{ fontSize: 25, fontWeight: '800' }} />
        <View style={styles.PrivacyPolicyWrapper} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrivacyPolicy;
