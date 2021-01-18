import React from 'react';
import { GestureResponderEvent, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { hitSlopNull } from '~/style/common';

interface HitSlop {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

interface Props {
  children?: Element;
  style?: any;
  disabled?: boolean;
  customHitSlop?: HitSlop;
  hasHitSlop?: boolean;
  onPress: (event: GestureResponderEvent) => void;
}

const CTouchableWrapper: React.FC<Props> = ({
  children,
  onPress,
  style,
  customHitSlop,
  hasHitSlop = true,
  disabled,
  ...props
}) => {
  const setHitSlop = () => {
    if (!hasHitSlop) {
      return hitSlopNull;
    }

    if (customHitSlop) {
      return customHitSlop;
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      hitSlop={setHitSlop()}
      disabled={disabled}
      {...props}>
      {children}
    </TouchableOpacity>
  );
};

export default React.memo(CTouchableWrapper);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
});
