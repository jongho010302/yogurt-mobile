import React from 'react';
import { TouchableOpacity, StyleSheet, GestureResponderEvent } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CText from '../Common/Text/CText';

interface Props {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
}

const SettingMenu: React.FC<Props> = ({ title, onPress }) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <CText style={styles.text}>{title}</CText>
    <Icon name="md-checkmark" style={{ fontSize: 17 }} />
  </TouchableOpacity>
);

export default SettingMenu;

const styles = StyleSheet.create({
  container: {
    margin: '5%',
    marginHorizontal: '10%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 17,
    fontWeight: '500',
  },
});
