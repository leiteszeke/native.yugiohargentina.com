// Dependencies
import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
// Hooks
import { useDrawerActions } from "../../modules/Drawer/hooks";

const Header = ({ title }) => {
    const { open } = useDrawerActions();

    return (
        <View style={{
            backgroundColor: '#FFFFFF',
            borderTopWidth: 0,
            elevation: 1,
            flexDirection: 'row',
            height: 50,
            alignItems: 'center',
            paddingHorizontal: 16,
            paddingVertical: 8,
            position: 'relative',
            shadowColor: '#000000',
            shadowOffset: { height: 5, width: 0 },
            shadowOpacity: 0.5,
            shadowRadius: 2,
            width: '100%',
            zIndex: 1,
        }}>
            <Icon style={{ width: 32 }} name="ios-menu" size={ 24 } onPress={ open } color="#000000" />
            <View style={{ alignItems: 'center', flex: 1 }}>
                <Text style={{ fontSize: 24 }}>{ title }</Text>
            </View>
            <View style={{ width: 32 }} />
        </View>
    )
}

export default Header;