// Dependencies
import React from 'react';
import { View } from 'react-native';
// Styles
import styles from './styles';

const FeatureHide = ({ children, style }) => (
  <View style={[styles.container, style]}>
    {children}
  </View>
)

export default FeatureHide;
