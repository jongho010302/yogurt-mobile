import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { palatte } from '~/style/palatte';

interface FooterMenuProps {
  name: string;
  isActive: boolean;
}

const Bottom: React.FC<FooterMenuProps> = ({ name, isActive }) => {
  return (
    <Icon
      style={{
        color: isActive ? palatte.logoColor : '#BDBDBD',
        fontSize: 25,
      }}
      name={name}
    />
  );
};

export default Bottom;
