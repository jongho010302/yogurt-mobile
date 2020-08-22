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
  TermsOfServiceWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '20%',
  },
});

const TermsOfService: React.FC<NavigationProps> = ({ navigation }) => {
  const instructionMessage = '이용약관';

  return (
    <SafeAreaView style={styles.Wrapper}>
      <ScrollView>
        <BaseStatusBar backgroundColor="#ffffff" barStyle="dark-content" />
        <BaseText
          text={instructionMessage}
          customStyle={{ fontSize: 25, fontWeight: '800' }}
        />
        <View style={styles.TermsOfServiceWrapper} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default TermsOfService;
