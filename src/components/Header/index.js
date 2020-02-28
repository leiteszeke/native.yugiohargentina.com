// Dependencies
import React from 'react';
import { Platform, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const shadowStyle = Platform.OS === 'ios' ? {} : {
  shadowOffset:{
    height: 3,
    width: 0,
  },
  elevation: 10,
  shadowColor: '#000000',
  shadowOpacity: 1,
  position: 'relative',
  zIndex: -1
}

const Header = ({ actions, noIcon, onBack, title, withBack }) => {
  const { openDrawer } = useNavigation();

  return (
    <>
      <View
        style={{
          alignItems: 'center',
          backgroundColor: '#f0f2f5',
          flexDirection: 'row',
          height: 52,
          paddingVertical: 6,
          paddingHorizontal: 12,
          width: '100%',
          ...shadowStyle
        }}
      >
        {!noIcon && (
          withBack ? (
            <Icon onPress={onBack} name="ios-arrow-back" color="#000000" size={32} />
          ) : (
            <Icon onPress={openDrawer} name="ios-menu" color="#000000" size={32} />
          )
        )}
        <Text numberOfLines={1} style={{flex: 1, fontWeight: 'bold', marginLeft: noIcon ? 0 : 20, fontSize: 30}}>{ title }</Text>
        <>{actions}</>
      </View>
      {Platform.OS === 'ios' && (
        <View
          style={{
            backgroundColor: '#f0f2f5',
            elevation: 0,
            height: 2,
            position: 'relative',
            shadowOffset: {
              height: 3,
              width: 0,
            },
            shadowColor: '#000000',
            shadowOpacity: 1,
            width: '100%',
            zIndex: -1,
          }}
        />
      )}
    </>
  )
}

export default Header;