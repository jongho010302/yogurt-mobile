import React from 'react';
import { View } from 'react-native';
import {
  NavigationParams,
  NavigationAction,
  NavigationState,
} from 'react-navigation';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Footer as FooterBase, FooterTab } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationProps } from '../../types';
import colors from '../../styles/colors';
import BaseText from '../base/BaseText';

const Footer: React.FC<NavigationProps> = ({ navigation }) => {
  const { navigate } = navigation;

  const navState = navigation.state;
  // https://oblador.github.io/react-native-vector-icons/
  return (
    <View>
      <FooterBase>
        <FooterTab style={{ backgroundColor: colors.white }}>
          <FooterMenu
            navigateTo={navigate}
            navState={navState}
            routePath="Home"
            iconName="ios-home"
            navName="홈"
          />
          <FooterMenu
            navigateTo={navigate}
            navState={navState}
            routePath="Notification"
            iconName="ios-notifications"
            navName="알림"
          />
          <FooterMenu
            navigateTo={navigate}
            navState={navState}
            routePath="Profile"
            iconName="ios-person"
            navName="마이페이지"
          />
          <FooterMenu
            navigateTo={navigate}
            navState={navState}
            routePath="Setting"
            iconName="ios-settings"
            navName="설정"
          />
        </FooterTab>
      </FooterBase>
    </View>
  );
};

interface FooterMenuProps {
  navigateTo: (
    routeNameOrOptions: string,
    params?: NavigationParams,
    action?: NavigationAction,
  ) => boolean;
  navState: NavigationState & { params?: NavigationParams };
  routePath: string;
  iconName: string;
  navName?: string;
}

const FooterMenu: React.FC<FooterMenuProps> = ({
  navigateTo,
  navState,
  routePath,
  iconName,
  navName,
}) => {
  let isActive = false;
  if (
    navState.routes.findIndex((element) => element.routeName === routePath) ===
    navState.index
  ) {
    isActive = true;
  }

  const setNavName = (paramNavName?: string) => {
    if (paramNavName) {
      return <BaseText text={paramNavName} customStyle={{ fontSize: 10 }} />;
    }
    return null;
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}>
      <TouchableHighlight onPress={() => navigateTo(routePath)}>
        <Icon
          style={{
            color: isActive ? colors.lightSkyBlue : '#BDBDBD',
            fontSize: 25,
          }}
          name={iconName}
        />
      </TouchableHighlight>
      <View>{setNavName(navName)}</View>
    </View>
  );
};

export default Footer;
