// Dependencies
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
// Hooks
import { useNavigation } from '../Navigation/hooks';
// Helpers
import { isLogged, removeSession } from '../../helpers/session';

const MenuItem = menuItem => (
    <TouchableOpacity
        onPress={ menuItem.onPress }
        style={{
            alignItems: 'center',
            flexDirection: 'row',
            height: 40,
            marginBottom: 4,
            padding: 8,
        }}
    >
        <Icon name={ menuItem.icon } size={ 24 } />
        <Text style={{ fontFamily: 'Futura', fontSize: 14, marginLeft: 16 }}>{ menuItem.name }</Text>
    </TouchableOpacity>
)

const BottomItem = menuItem => (
    <TouchableOpacity
        onPress={ menuItem.onPress }
        style={{ height: 40, justifyContent: 'center' }}
    >
        <Text
            style={{
                fontFamily: 'Futura',
                fontSize: 20,
                textAlign: 'center',
            }}
        >
            { menuItem.name.toUpperCase() }
        </Text>
    </TouchableOpacity>
);

const Menu = () => {
    const bottomItems = [];
    const { goTo } = useNavigation();
    const logout = () => {
        removeSession();
        goTo('Events');
    }

    const menuItems = [
        { icon: 'ios-calendar', name: 'Eventos', onPress: () => goTo('Events') },
        { icon: 'ios-home', name: 'Locales', onPress: () => goTo('Stores') },
    ];

    if (isLogged()) {
        bottomItems.push({ name: 'Salir', onPress: logout });
        menuItems.push()
    } else {
        bottomItems.push({ name: 'Ingresar', onPress: () => goTo('Login') });
    }

    return (
        <SafeAreaView style={{ height: '100%', padding: 12, width: '100%' }}>
            <View style={{ flex: 1 }}>
                { menuItems.map((menuItem, index) => <MenuItem key={ index } { ...menuItem } />) }
            </View>
            <View style={{ height: 40 }}>
                { bottomItems.map((menuItem, index) => <BottomItem key={ index } { ...menuItem } />) }
            </View>
        </SafeAreaView>
    );
}

export default Menu;