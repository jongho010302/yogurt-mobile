import React from 'react';
import { StyleSheet, View, Text, GestureResponderEvent, StyleProp, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { palatte } from '~/style/palatte';
import CText from '../Common/Text/CText';

interface Props {
  onPress: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
}

const TicketCard: React.FC<Props> = ({ onPress, style }) => {
  Icon.loadFont();

  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <CText style={styles.headerText}>횟수제 · 그룹형 · 3:1</CText>
      <Text style={styles.centerText}>3:1 그룹 레슨 50회</Text>
      <Text style={styles.bottomText}>그룹 수업 주2회 24회</Text>
      <Text style={styles.bottomText}>예약가능 94 · 취소가능 100 · 잔여 94</Text>
    </TouchableOpacity>
  );
};

export default TicketCard;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: '85%',
    borderRadius: 10,
    backgroundColor: palatte.logoColor,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    padding: 17,
  },
  headerText: {
    fontSize: 14,
    color: 'white',
    marginBottom: 10,
  },
  centerText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 30,
  },
  bottomText: {
    fontSize: 14,
    color: 'white',
  },
});
