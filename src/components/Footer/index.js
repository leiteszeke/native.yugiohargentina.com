// Dependencies
import React from 'react';
import { View } from 'react-native';

const Footer = ({ children }) => {
  return (
    <View
      style={{
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        height: 50,
        paddingHorizontal: 16,
        paddingVertical: 8,
        width: '100%',
      }}>
      {children}
    </View>
  );
};

export default Footer;
