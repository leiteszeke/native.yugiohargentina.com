// Dependencies
import React from 'react';
import { Text, TouchableOpacity, TextStyle, ViewStyle } from 'react-native';
// Styles
import styles from './TextBadge.style';

export type TextBadgeProps = {
  label: string;
  onPress?: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  variant?: string;
};

const TextBadge = ({
  label,
  variant = 'white',
  onPress,
  textStyle,
  style,
}: TextBadgeProps) => {
  const handlePress = () => {
    if (onPress) {
      onPress();
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[styles(variant).container, style]}>
      <Text style={[styles(variant).text, textStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

export default TextBadge;
