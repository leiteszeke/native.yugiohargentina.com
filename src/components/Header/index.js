// Dependencies
import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { withNavigation } from 'react-navigation';

const Header = ({ navigation, title }) => {
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
        }}
      >
        <Icon onPress={navigation.openDrawer} name="ios-menu" color="#000000" size={32} />
        <Text style={{flex: 1, fontWeight: 'bold', marginLeft: 20, fontSize: 30}}>{ title }</Text>
      </View>
      <View
        style={{
          backgroundColor: '#f0f2f5',
          height: 2,
          width: '100%',
          shadowOffset:{
            height: 3,
            width: 0,
          },
          elevation: 0,
          shadowColor: '#000000',
          shadowOpacity: 1,
          position: 'relative',
          zIndex: -1
        }}
      />
    </>
  )
}

export default withNavigation(Header);