import React from 'react';
import { ActivityIndicator } from 'react-native';
import { palatte } from '~/style/palatte';

interface Props {
  color?: string;
}

const CustomActivityIndicator: React.FC<Props> = ({ color }) => {
  return <ActivityIndicator color={color || palatte.lightSkyBlue} />;
};

export default CustomActivityIndicator;
