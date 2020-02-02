// Dependencies
import React from 'react';
import { TextInput, View } from 'react-native';
// Styles
import styles from './styles';

const Input = ({ containerStyle, style, ...props }) => (
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
