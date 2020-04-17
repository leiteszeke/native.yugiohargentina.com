// Dependencies
import React from 'react';
import {Text, View} from 'react-native';
// Theme
import theme from '#theme';

const TextBadge = ({label, variant}) => (
  <View
    style={{
      borderWidth: 2,
      padding: 4,
      borderRadius: 4,
      borderColor: theme.colors[variant] || 'black',
      paddingHorizontal: 4,
      alignSelf: 'flex-start',
    }}>
    <Text
      style={{
        fontSize: 14,
        fontWeight: 'bold',
        color: theme.colors[variant] || 'black',
      }}>
      {label}
    </Text>
  </View>
);

export default TextBadge;
