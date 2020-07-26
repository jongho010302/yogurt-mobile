import React from 'react';
import { View } from 'react-native';
import { NavigationParams, NavigationAction, NavigationState } from 'react-navigation';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Footer as FooterBase, FooterTab } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

import { navigationProps } from '../../types';
import colors from '../../styles/colors';

const Footer: React.FC<navigationProps> = ({ navigation }) => {
  const { navigate } = navigation;

  const navState = navigation.state;
  // https://oblador.github.io/react-native-vector-icons/
  return (
    <View>
      <FooterBase>
        <FooterTab style={{ backgroundColor: colors.white }}>
          <FooterMenu navigateTo={navigate} navState={navState} routePath="Home" iconName="ios-home" />
          <FooterMenu navigateTo={navigate} navState={navState} routePath="Notification" iconName="ios-notifications" />
          <FooterMenu navigateTo={navigate} navState={navState} routePath="Profile" iconName="ios-person" />
          <FooterMenu navigateTo={navigate} navState={navState} routePath="Setting" iconName="ios-settings" />
        </FooterTab>
      </FooterBase>
    </View>
  );
};

interface FooterMenuProps {
  navigateTo: (routeNameOrOptions: string, params?: NavigationParams, action?: NavigationAction) => boolean
  navState: NavigationState & { params?: NavigationParams }
  routePath: string
  iconName: string
}

const FooterMenu: React.FC<FooterMenuProps> = ({ navigateTo, navState, routePath, iconName }) => {
  let isActive = false;
  if (navState.routes.findIndex(element => element.routeName === routePath) === navState.index) {
    isActive = true;
  }

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <TouchableHighlight onPress={() => navigateTo(routePath)}>
        <Icon
          style={{ color: isActive ? colors.lightSkyBlue : '#BDBDBD', fontSize: 25 }}
          name={iconName}
        />
      </TouchableHighlight>
    </View>
    
  );
};

export default Footer;
