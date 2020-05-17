// Dependencies
import React from 'react';
import { TextInput, View, TextInputProps, ViewStyle } from 'react-native';
// Styles
import styles from './styles';

type InputProps = TextInputProps & {
  containerStyle?: ViewStyle;
  style?: ViewStyle;
};

const Input = ({ containerStyle, style, ...props }: InputProps) => (
  <View style={[styles.container, containerStyle]}>
    <TextInput
      autoCapitalize="none"
      placeholderTextColor="#000000"
      style={[styles.input, style]}
      underlineColorAndroid="transparent"
      {...props}
    />
  </View>
);

export default Input;
