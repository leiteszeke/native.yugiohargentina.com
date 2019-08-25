// Dependencies
import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
// Components
import Layout from '../../components/Layout';
import Map from '../../components/Map';

const Store = store => (
    <View style={{ 
        borderColor: '#CCCCCC',
        borderRadius: 12,
        borderWidth: 1,
        marginBottom: 24,
        padding: 12,
        width: '100%',
    }}>
        <View style={{ height: 120, borderRadius: 12, width: '100%' }}>
            <Map latitude={ store.latitude } longitude={ store.longitude } />
        </View>
        <View style={{ flexDirection: 'row', marginTop: 12 }}>
            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{ store.name }</Text>
                <Text style={{ fontSize: 14, marginTop: 4 }}>{ store.address }, { store.city }, { store.province }</Text>
                <Text style={{ fontSize: 14, marginTop: 4 }}>{ store.phone }</Text>
            </View>
            <View style={{ alignItems: 'flex-end', justifyContent: 'center', width: 24 }}>
                <Icon name="ios-arrow-forward" size={ 30 } color="#000000" />
            </View>
        </View>
    </View>
)

const stores = [
    {
        id: 1,
        name: 'Dima Game',
        latitude: 41.379800,
        longitude: 2.140602,
        address: 'Calle Falsa 123',
        city: 'Caballito',
        province: 'Buenos Aires',
        phone: '+34 1234 1231',
        facebook: 'https://facebook.com',
    },
    {
        id: 2,
        name: 'Dima Game',
        latitude: 41.379800,
        longitude: 2.140602,
        address: 'Calle Falsa 123',
        city: 'Caballito',
        province: 'Buenos Aires',
        phone: '+34 1234 1231',
        facebook: 'https://facebook.com',
    },
    {
        id: 3,
        name: 'Dima Game',
        latitude: 41.379800,
        longitude: 2.140602,
        address: 'Calle Falsa 123',
        city: 'Caballito',
        province: 'Buenos Aires',
        phone: '+34 1234 1231',
        facebook: 'https://facebook.com',
    },
]

const Stores = () => {
    return (
        <Layout title="Locales">
            { stores.map(store =>
                <Store key={ store.id } { ...store } />
            )}
        </Layout>
    )
}

export default Stores;