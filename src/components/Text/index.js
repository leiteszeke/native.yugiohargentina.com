// Dependencies
import React from 'react';
import { Text } from 'react-native';
// Styles
import styles from './styles';

export const Title = ({ children, style, ...props }) => (
  <Text style={[styles.title, style]} {...props}>
    {children}
  </Text>
);

export const Subtitle = ({ children, style, ...props }) => (
  <Text style={[styles.subtitle, style]} {...props}>
    {children}
  </Text>
);

export const BigNumber = ({ children, style, ...props }) => (
  <Text style={[styles.bigNumber, style]} {...props}>
    {children}
  </Text>
);

export default { Title, Subtitle };
