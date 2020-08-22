import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import BaseText from '../base/BaseText';

const styles = StyleSheet.create({
  navigationButtonWrapper: {
    flex: 1,
    margin: '5%',
    marginLeft: '10%',
    marginRight: '10%',
  },
  navigationButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export const CreateSettingComponent = (item: any) => {
  return (
    <View style={styles.navigationButtonWrapper}>
      <TouchableOpacity
        style={styles.navigationButton}
        onPress={() => item.method(item.screen)}>
        <View>
          <BaseText
            text={item.name}
            customStyle={{ fontSize: 17, fontWeight: '500' }}
          />
        </View>
        <View>
          <Icon name="md-checkmark" style={{ fontSize: 17 }} />
        </View>
      </TouchableOpacity>
    </View>
  );
};
