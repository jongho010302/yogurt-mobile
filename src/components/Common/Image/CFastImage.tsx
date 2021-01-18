import React from 'react';
import { ImageStyle, StyleProp } from 'react-native';
import { createImageProgress } from 'react-native-image-progress';
import FastImage from 'react-native-fast-image';
import CActivityIndicator from '../Indicator/CActivityIndicator';

const Image = createImageProgress(FastImage);

interface Props {
  uri?: string | undefined;
  style?: StyleProp<ImageStyle>;
}

const CFastImage: React.FC<Props> = ({ uri, style }) => {
  return <Image source={{ uri }} indicator={CActivityIndicator} style={style} />;
};

export default CFastImage;
