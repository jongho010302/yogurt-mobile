import React from 'react';
import { Text, View } from 'react-native';
import { Thumbnail } from 'native-base';

import { navigationProps } from '../types';
import BaseStatusBar from '../components/base/StatusBar';

const Profile: React.FC<navigationProps> = () => {

  return (
    <View style={{ flex: 1 }}>
      <BaseStatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      <View style={{ marginLeft: 'auto', marginRight: 'auto' }}>
        <Thumbnail
          source={{ uri: 'https://img.favpng.com/12/15/11/plastic-surgery-cosmetics-woman-face-png-favpng-vJisC1hDWYZTjmWpshaNWspE6.jpg'}}
          large
        />
      </View>
      <Text>Profile</Text>
    </View>
  );
};

export default Profile;
