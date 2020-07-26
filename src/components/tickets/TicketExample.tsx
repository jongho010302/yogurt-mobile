import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import colors from '../../styles/colors';
// Component
import { View } from 'react-native';

const TicketExample: React.FC = () => {
  Icon.loadFont();

  return (
    <View style={styles.wrapper}>
      <View style={{ flexDirection: 'row', padding: '1%', justifyContent: 'space-evenly' }}>
        <Text style={styles.headerText}>그룹형 수업 전용 · 횟수제</Text>
        <View style={styles.button}>
          <Text style={{ fontSize: 10, color: colors.lightSkyBlue, paddingRight: '2%', paddingLeft: '2%' }}>사용중</Text>
        </View>
      </View>
      <Text style={styles.centerText}>그룹 수업 주2회 24회</Text>
      <View style={styles.bottomTextRow}>
        <Icon style={styles.icon} name="md-time" />
        <Text style={styles.bottomText}>그룹 수업 주2회 24회</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: 'center',
    marginLeft: '5%',
    marginRight: '5%',
    marginBottom: '10%',
    height: '80%',
    width: '80%',
    borderRadius: 10,
    backgroundColor: colors.lightSkyBlue,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  headerText: {
    fontSize: 13,
    color: 'white',
    marginLeft: '5%',
    marginTop: '5%',
    marginBottom: '5%',
  },
  button: {
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 10,
    marginLeft: '5%',
    marginTop: '5%',
    marginBottom: '5%',
  },
  centerText: {
    fontSize: 20,
    color: 'white',
    marginLeft: '5%',
    marginBottom: '20%',
  },
  bottomText: {
    fontSize: 12,
    color: 'white',
    marginBottom: '15%',

  },
  bottomTextRow: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginLeft: '5%',
    marginBottom: '20%',
  },
  icon: {
    fontSize: 13,
    alignSelf: 'auto',
    marginRight: 10,
    marginBottom: '15%',
    color: 'white',
  },
});

export default TicketExample;
