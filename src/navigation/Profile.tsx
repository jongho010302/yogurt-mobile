import React from 'react';
import { Text, View } from 'react-native';
import { Thumbnail } from 'native-base';

// Etc
import { navigationProps } from '../types';

const Profile: React.FC<navigationProps> = () => {

  return (
    <View>
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
