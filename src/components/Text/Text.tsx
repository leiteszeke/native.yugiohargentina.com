// Dependencies
import React from 'react';
import { Text, TextStyle, TextProps } from 'react-native';
// Styles
import styles from './Text.styles';

type TitleProps = TextProps & {
  children: string;
  style?: TextStyle;
};

type SubtitleProps = TitleProps;

type BigNumberProps = TitleProps;

export const Title = ({ children, style, ...props }: TitleProps) => (
  <Text style={[styles.title, style]} {...props}>
    {children}
  </Text>
);

export const Subtitle = ({ children, style, ...props }: SubtitleProps) => (
  <Text style={[styles.subtitle, style]} {...props}>
    {children}
  </Text>
);

export const BigNumber = ({ children, style, ...props }: BigNumberProps) => (
  <Text style={[styles.bigNumber, style]} {...props}>
    {children}
  </Text>
);

export default { Title, Subtitle };
