import React from 'react';
import { ImageStyle, StyleProp } from 'react-native';
import { createImageProgress } from 'react-native-image-progress';
import FastImage from 'react-native-fast-image';
import CustomActivityIndicator from '../indicator/CustomActivityIndicator';

const Image = createImageProgress(FastImage);

interface Props {
  uri?: string | undefined;
  style?: StyleProp<ImageStyle>;
}

const CustomFastImage: React.FC<Props> = ({ uri, style }) => {
  return <Image source={{ uri }} indicator={CustomActivityIndicator} style={style} />;
};

export default CustomFastImage;
