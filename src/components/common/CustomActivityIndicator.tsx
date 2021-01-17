import React from 'react';
import { ActivityIndicator } from 'react-native';

import colors from '~/styles/colors/index';

interface Props {
  color?: string;
}

const CustomActivityIndicator: React.FC<Props> = ({ color }) => {
  return <ActivityIndicator color={color || colors.lightSkyBlue} />;
};

export default CustomActivityIndicator;
