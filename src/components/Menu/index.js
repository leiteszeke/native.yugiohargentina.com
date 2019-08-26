// Dependencies
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
// Hooks
import { useNavigation } from '../Navigation/hooks';

const menuItems = [
    { icon: 'ios-calendar', name: 'Eventos', url: 'Events' },
    { icon: 'ios-home', name: 'Locales', url: 'Stores' },
];

const Menu = () => {
    const { goTo } = useNavigation();

    return (
        <SafeAreaView style={{ height: '100%', padding: 12, width: '100%' }}>
            <View style={{ flex: 1 }}>
                { menuItems.map((menuItem, index) =>
                    <TouchableOpacity
                        key={ index }
                        onPress={ goTo(menuItem.url) }
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
                )}
            </View>
            <View style={{ height: 40 }}>
                <TouchableOpacity
                    onPress={ goTo('Login') }
                    style={{ height: 40, justifyContent: 'center' }}
                >
                    <Text style={{
                        fontFamily: 'Futura',
                        fontSize: 20,
                        textAlign: 'center',
                    }}>INGRESAR</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default Menu;