import React from 'react';
import { View, StyleProp, TextStyle, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { palatte } from '~/style/palatte';

interface Props {
  isScrollView?: boolean;
  padding?: [number, number, number, number];
  style?: StyleProp<TextStyle>;
}

const Layout: React.FC<Props> = ({ padding = [0, 40, 0, 40], isScrollView = false, children }) => {
  const [paddingTop, paddingRight, paddingBottom, paddingLeft] = padding;
  const paddingStyle = { paddingTop, paddingRight, paddingBottom, paddingLeft };

  if (isScrollView) {
    return (
      <SafeAreaView style={[styles.safeAreaContainer, paddingStyle]}>
        <ScrollView>
          <View style={styles.viewContainer}>{children}</View>
        </ScrollView>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={[styles.safeAreaContainer, paddingStyle]}>
        <View style={styles.viewContainer}>{children}</View>
      </SafeAreaView>
    );
  }
};

export default Layout;

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: palatte.white,
  },
  viewContainer: {
    flex: 1,
    backgroundColor: palatte.white,
  },
});
