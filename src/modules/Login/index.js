// Dependencies
import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { NavigationActions, StackActions, withNavigation } from 'react-navigation';
// Components
import Layout from '../../components/Layout';

const Login = ({ navigation }) => {
    const goToRoute = url => () => {
        navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: url })],
        }));
    };

    return (
        <Layout noScroll title="Ingresar">
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
            <View style={{ height: 72, marginTop: 12 }}>
                <TouchableOpacity style={{ alignItems: 'center', height: 40, justifyContent: 'center', borderRadius: 4, backgroundColor: 'red' }}>
                    <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' }}>INGRESAR</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={ goToRoute('Register') }
                    style={{ alignItems: 'center', height: 20, justifyContent: 'center', marginTop: 8 }}
                >
                    <Text style={{ color: '#000000', fontSize: 16 }}>CREAR CUENTA</Text>
                </TouchableOpacity>
            </View>
        </Layout>
    )
}

export default withNavigation(Login);