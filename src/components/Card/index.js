// Dependencies
import React from 'react';
import { View } from 'react-native';
// Components
import { BigNumber, Subtitle } from '#components/Text';
// Styles
import styles from './styles';

const Card = ({ style, title, value }) => (
  <View style={[styles.container, style]}>
    <Subtitle style={styles.title}>{title}</Subtitle>
    <BigNumber style={styles.number}>{value}</BigNumber>
  </View>
)

  export default Card;