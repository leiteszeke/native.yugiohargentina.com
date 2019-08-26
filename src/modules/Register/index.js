// Dependencies
import React, { useState } from 'react';
import { View } from 'react-native';
// Components
import Button from '../../components/Button';
import Input from '../../components/Input';
import Layout from '../../components/Layout';

const Register = () => {
    const [data, setData] = useState({});

    const setValue = e => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    }

    return (
        <Layout noScroll title="Crear cuenta">
            <View style={{ flex: 1, paddingTop: 20 }}>
                <Input name="username" onChange={ setValue } placeholder="Usuario" />
                <Input name="email" onChange={ setValue } placeholder="Email" />
                <Input name="password" onChange={ setValue } placeholder="Contraseña" secure={ true } />
            </View>
            <View style={{ height: 40, marginTop: 12 }}>
                <Button text="Crear cuenta" />
            </View>
        </Layout>
    )
}

export default Register;