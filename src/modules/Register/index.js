// Dependencies
import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
// Components
import Layout from '../../components/Layout';

const Register = () => {
    return (
        <Layout noScroll title="Crear cuenta">
            <View style={{ flex: 1, paddingTop: 20 }}>
                <View style={{ height: 40, marginBottom: 12 }}>
                    <TextInput
                        placeholder="Usuario"
                        placeholderTextColor="black"
                        style={{
                            borderBottomColor: 'black',
                            borderBottomWidth: 2,
                            height: 40,
                            width: '100%',
                        }}
                    />
                </View>
                <View style={{ height: 40, marginBottom: 12 }}>
                    <TextInput
                        placeholder="Contraseña"
                        placeholderTextColor="black"
                        secureTextEntry={ true }
                        style={{
                            borderBottomColor: 'black',
                            borderBottomWidth: 2,
                            height: 40,
                        }}
                    />
                </View>
            </View>
            <View style={{ height: 40, marginTop: 12 }}>
                <TouchableOpacity
                    style={{ alignItems: 'center', height: 40, justifyContent: 'center', borderRadius: 4, backgroundColor: 'red' }}
                >
                    <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' }}>CREAR CUENTA</Text>
                </TouchableOpacity>
            </View>
        </Layout>
    )
}

export default Register;