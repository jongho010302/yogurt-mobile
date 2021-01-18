import React from 'react';
import { ActivityIndicator } from 'react-native';
import { palatte } from '~/style/palatte';

interface Props {
  color?: string;
}

const CActivityIndicator: React.FC<Props> = ({ color }) => {
  return <ActivityIndicator color={color || palatte.logoColor} />;
};

export default CActivityIndicator;
