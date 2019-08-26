// Dependencies
import React from 'react';
// Components
import Layout from '../../components/Layout';
import Store from './components/Store';

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
            { stores.map(store => <Store key={ store.id } { ...store } />) }
        </Layout>
    )
}

export default Stores;