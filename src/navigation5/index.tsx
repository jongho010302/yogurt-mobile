import React from 'react';
import colors from '../styles/colors';
import Footer from '../components/layout/Footer';

// App
import Home from './Home';
import Notification from './Notification';
import Profile from './Profile';
import Booking from '../screen/app/home/BookingScreen';
import NotificationDetails from '../components/notification/NotificationDetails';

// Setting
import Setting from './setting/Setting';
import PersonalInfo from './setting/PersonalInfo';
import ProfileInfo from './setting/ProfileInfo';
import PhoneNumberInfo from './setting/PhoneNumberInfo';
import EmailInfo from './setting/EmailInfo';
import PasswordInfo from './setting/PasswordInfo';
import NotificationSettings from './setting/NotificationSettings';
import CustomerService from '../screen/app/setting/CustomerServiceScreen';
import TermsOfService from './setting/TermsOfService';
import PrivacyPolicy from './setting/PrivacyPolicy';

// Auth
import Authentication from '../screen/auth/LoginScreen';
import TermsAndConditions from './auth/TermsAndConditions';
import SignUp from './auth/SignUp';
import AuthLoading from './auth/AuthLoading';
import BookingDetails from '../screen/app/home/BookingDetailsScreen';
import EmailSearch from './auth/EmailSearch';
import PasswordSearch from './auth/PasswordSearch';
import PasswordReset from './auth/PasswordReset';

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
        headerBackTitleVisible: false,
      },
    },
    BookingDetails: {
      screen: BookingDetails,
      navigationOptions: {
        headerTitle: '이용내역 상세보기',
        headerTintColor: 'white',
        headerBackTitleVisible: false,
        headerStyle: { backgroundColor: colors.lightSkyBlue },
      },
    },
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      cardStyle: {
        backgroundColor: '#ffffff',
      },
    },
  },
);

HomeNavigator.navigationOptions = (: any) => {
  if (navigation.state.index > 0) {
    return {
      tabBarVisible: false,
    };
  }
  return {
    tabBarVisible: true,
  };
};

const NotificationNavigator = createStackNavigator(
  {
    Notification: {
      screen: Notification,
      navigationOptions: {
        headerTitle: '서울숲필라테스 알림',
        headerBackTitleVisible: false,
      },
    },
    NotificationDetails: {
      screen: NotificationDetails,
      navigationOptions: {
        headerTitle: '알림 상세보기',
        headerBackTitleVisible: false,
      },
    },
  },
  {
    initialRouteName: 'Notification',
    defaultNavigationOptions: {
      cardStyle: {
        backgroundColor: '#ffffff',
      },
    },
  },
);

const ProfileNavigator = createStackNavigator(
  {
    Profile: {
      screen: Profile,
      navigationOptions: {
        headerShown: false,
        headerBackTitleVisible: false,
      },
    },
  },
  {
    initialRouteName: 'Profile',
    defaultNavigationOptions: {
      cardStyle: {
        backgroundColor: '#ffffff',
      },
    },
  },
);

const SettingNavigation = createStackNavigator(
  {
    Setting: {
      screen: Setting,
      navigationOptions: {
        headerShown: false,
        headerBackTitleVisible: false,
      },
    },
    PersonalInfo: {
      screen: PersonalInfo,
      navigationOptions: {
        headerTitle: '회원정보변경',
        headerBackTitleVisible: false,
      },
    },
    ProfileInfo: {
      screen: ProfileInfo,
      navigationOptions: {
        headerTitle: '',
        headerBackTitleVisible: false,
      },
    },
    PhoneNumberInfo: {
      screen: PhoneNumberInfo,
      navigationOptions: {
        headerTitle: '휴대폰 번호 변경',
        headerBackTitleVisible: false,
      },
    },
    EmailInfo: {
      screen: EmailInfo,
      navigationOptions: {
        headerTitle: '이메일 변경',
        headerBackTitleVisible: false,
      },
    },
    PasswordInfo: {
      screen: PasswordInfo,
      navigationOptions: {
        headerTitle: '비밀번호 재설정',
        headerBackTitleVisible: false,
      },
    },
    NotificationSettings: {
      screen: NotificationSettings,
      navigationOptions: {
        headerTitle: '알림 설정',
        headerBackTitleVisible: false,
      },
    },
    CustomerService: {
      screen: CustomerService,
      navigationOptions: {
        headerTitle: '고객센터',
        headerBackTitleVisible: false,
      },
    },
    TermsOfService: {
      screen: TermsOfService,
      navigationOptions: {
        headerShown: false,
        headerBackTitleVisible: false,
      },
    },
    PrivacyPolicy: {
      screen: PrivacyPolicy,
      navigationOptions: {
        headerShown: false,
        headerTitle: '',
        headerBackTitleVisible: false,
      },
    },
  },
  {
    initialRouteName: 'Setting',
    defaultNavigationOptions: {
      cardStyle: {
        backgroundColor: '#ffffff',
      },
    },
  },
);

const AppNavigator = createBottomTabNavigator(
  {
    Home: { screen: HomeNavigator },
    Notification: { screen: NotificationNavigator },
    Profile: { screen: ProfileNavigator },
    Setting: { screen: SettingNavigation },
  },
  {
    initialRouteName: 'Home',
    tabBarComponent: (props) => {
      return <Footer {...props} />;
    },
    tabBarOptions: {
      activeTintColor: colors.lightSkyBlue,
    },
  },
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
        headerTitle: '이메일 인증',
        headerBackTitle: ' ',
      },
    },
    PasswordReset: {
      screen: PasswordReset,
      navigationOptions: {
        headerTitle: '비밀번호 재설정',
        headerBackTitle: ' ',
      },
    },
  },
  {
    initialRouteName: 'Authentication',
    defaultNavigationOptions: {},
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
    },
  ),
);
