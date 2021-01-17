import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../styles/colors';

const TicketExample: React.FC = () => {
  Icon.loadFont();

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          padding: '1%',
          justifyContent: 'space-evenly',
        }}>
        <Text style={styles.headerText}>그룹형 수업 전용 · 횟수제</Text>
        <View style={styles.button}>
          <Text
            style={{
              fontSize: 10,
              color: colors.lightSkyBlue,
              paddingRight: '2%',
              paddingLeft: '2%',
            }}>
            사용중
          </Text>
        </View>
      </View>
      <Text style={styles.centerText}>그룹 수업 주2회 24회</Text>
      <View style={styles.bottomTextRow}>
        <Icon style={styles.icon} name="md-time" />
        <Text style={styles.bottomText}>그룹 수업 주2회 24회</Text>
      </View>
      <View style={styles.bottomTextRow}>
        <Text style={styles.bottomText}>현재 이용권의 잔여 횟수</Text>
        <Text style={styles.bottomText}> 10회 남음</Text>
      </View>
    </View>
  );
};

export default TicketExample;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    marginLeft: '5%',
    marginRight: '5%',
    height: '85%',
    width: '70%',
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
    fontSize: 10,
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
    fontSize: 15,
    color: 'white',
    marginLeft: '5%',
    marginBottom: '20%',
  },
  bottomText: {
    fontSize: 10,
    color: 'white',
  },
  bottomTextRow: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginLeft: '5%',
  },
  icon: {
    fontSize: 13,
    alignSelf: 'auto',
    marginRight: 10,
    color: 'white',
  },
});
