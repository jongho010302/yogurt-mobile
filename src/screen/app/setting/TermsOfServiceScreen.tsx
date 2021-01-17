import React from 'react';
import { SafeAreaView, ScrollView, View, StyleSheet } from 'react-native';
import BaseText from '~/components/base/BaseText';

const TermsOfServiceScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.Wrapper}>
      <ScrollView>
        <BaseText style={{ fontSize: 25, fontWeight: '800' }}>이용약관</BaseText>
        <View style={styles.TermsOfServiceWrapper} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default TermsOfServiceScreen;

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
