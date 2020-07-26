import { StyleSheet } from 'react-native';
import iPhoneSize from '../../helpers/utils';
import colors from '../../styles/colors';

let headingTextSize = 30;
if (iPhoneSize() === 'small') {
  headingTextSize = 26;
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flex: 1,
    backgroundColor: colors.white
  },
  scrollViewWrapper: {
    marginTop: '10%',
    flex: 1,
    padding: 0,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  scrollView: {
    paddingLeft: 40,
    paddingRight: 40,
    flex: 1,
  },
  loginHeader: {
    fontSize: headingTextSize,
    color: colors.black,
    fontWeight: '400',
    marginBottom: 40,
    marginLeft: '40%',
  },
  notificationWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  signinButton: {
    fontSize: 15,
    fontWeight: '400',
    color: '#4485F7',
  },
  button: {
    borderColor: 'white',
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 10,
    marginLeft: '5%',
    marginRight: '5%',
  },
});

export default styles;
