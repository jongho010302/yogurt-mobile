import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import colors from '../styles/colors';

// Components
import Footer from '../components/layout/Footer';

// App
import Home from './Home';
import Notification from './Notification';
import Profile from './Profile';
import Setting from './Setting';
import Booking from './Booking';
import NotificationDetails from '../components/notification/NotificationDetails';

// Auth
import Authentication from './auth/Authentication';
import TermsAndConditions from './auth/TermsAndConditions';
import SignUp from './auth/SignUp';
import AuthLoading from './auth/AuthLoading';
import BookingDetails from '../components/lecture/BookingDetails';
import EmailSearch from './auth/EmailSearch';
import PasswordSearch from './auth/PasswordSearch';

const HomeNavigator = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        headerTitle: '서울숲필라테스',
      },
    },
    Booking: {
      screen: Booking,
      navigationOptions: {
        headerTitle: '서울숲필라테스 수강권',
        headerTintColor: '',
        headerBackTitle: ' ',
      },
    },
    BookingDetails: {
      screen: BookingDetails,
      navigationOptions: {
        headerTitle: '이용내역 상세보기',
        headerTintColor: 'white',
        headerBackTitle: ' ',
        headerStyle: { backgroundColor: colors.lightSkyBlue },
      }
    },
    Notification: {
      screen: Notification,
      navigationOptions: {
        headerTitle: '서울숲필라테스 알림',
        headerBackTitle: ' ',
      },
    },
    NotificationDetails: {
      screen: NotificationDetails,
      navigationOptions: {
        headerTitle: '알림 상세보기',
        headerBackTitle: ' ',
      },
    }
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      cardStyle: {
        backgroundColor: '#ffffff',
      }
    },
  },
);

HomeNavigator.navigationOptions = ({ navigation }: any) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    return {
      tabBarVisible: false,
    };
  }
  return {
    tabBarVisible
  };
};

const AppNavigator = createBottomTabNavigator(
  {
    Home: { screen: HomeNavigator },
    Notification: { screen: Notification },
    Profile: { screen: Profile },
    Setting: { screen: Setting },
  },
  {
    initialRouteName: 'Home',
    tabBarComponent: (props) => {
      return <Footer {...props} />;
    },
    tabBarOptions: {
      activeTintColor: colors.lightSkyBlue,
    },
  }
);

const AuthNavigator = createStackNavigator(
  {
    Authentication: {
      screen: Authentication,
      navigationOptions: {
        headerTitle: '',
      },
    },
    TermsAndConditions: {
      screen: TermsAndConditions,
      navigationOptions: {
        headerTitle: '회원가입',
        headerBackTitle: ' ',
      },
    },
    SignUp: {
      screen: SignUp,
      navigationOptions: {
        headerTitle: '회원가입',
        headerBackTitle: ' ',
      },
    },
    EmailSearch: {
      screen: EmailSearch,
      navigationOptions: {
        headerTitle: '이메일 찾기',
        headerBackTitle: ' ',
      },
    },
    PasswordSearch: {
      screen: PasswordSearch,
      navigationOptions: {
        headerTitle: '비밀번호 보내기',
        headerBackTitle: ' ',
      },
    },
  },
  {
    initialRouteName: 'Authentication',
    defaultNavigationOptions: {
    },
  },
);

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading,
      Auth: AuthNavigator,
      App: AppNavigator,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);
