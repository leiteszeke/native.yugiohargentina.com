// Dependencies
import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, Button, InputItem, NoticeBar } from '@ant-design/react-native';
import { useNavigation } from '@react-navigation/native';
// Components
import Layout from '#components/Layout';
// Services
import * as User from '#services/users';
// Helpers
import { setSession } from '#helpers/session';
// Images
import Logo from '#images/logo.png';
// Styles
import styles from './styles';

const Register = () => {
  const { navigate } = useNavigation();
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const setValue = name => value => {
    setData({ ...data, [name]: value });

    setErrors(prev => ({
      ...prev,
      [name]: false,
    }));
  }

  const registerUser = () => {
    setIsLoading(true);
    setShowAlert(false);

    User.register(data.name, data.lastname, data.email, data.password)
      .then(async res => {
        if (!res.error) {
          await setSession(res.data);
          return navigate('App');
        } else {
          if (res.message === 'email_in_use') {
            setShowAlert(true);
          }
          setErrors(res.data);
        }
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <Layout background noScroll title="Ingresar">
      {isLoading && <ActivityIndicator toast text="Cargando..." />}
      <View>
        <Image style={ styles.logo } resizeMode="contain" source={ Logo } />
        <InputItem
          autoCapitalize="none"
          placeholderTextColor={ errors.name ? '#FF0000' : '#000000' }
          style={[styles.textInput, errors.name ? styles.inputError : {}]}
          onChange={ setValue('name') }
          placeholder="Nombre"
          placeholderTextColor="#FFFFFF"
        />
        <View style={styles.separator} />
        <InputItem
          autoCapitalize="none"
          placeholderTextColor={ errors.lastname ? '#FF0000' : '#000000' }
          style={[styles.textInput, errors.lastname ? styles.inputError : {}]}
          onChange={ setValue('lastname') }
          placeholder="Apellido"
          placeholderTextColor="#FFFFFF"
        />
        <View style={styles.separator} />
        <InputItem
          autoCapitalize="none"
          placeholderTextColor={ errors.email ? '#FF0000' : '#000000' }
          style={[styles.textInput, errors.email ? styles.inputError : {}]}
          onChange={ setValue('email') }
          placeholder="Email"
          placeholderTextColor="#FFFFFF"
        />
        <View style={styles.separator} />
        <InputItem
          autoCapitalize="none"
          placeholderTextColor={ errors.password ? '#FF0000' : '#000000' }
          style={[styles.textInput, errors.password ? styles.inputError : {}]}
          type="password"
          onChange={ setValue('password') }
          placeholder="Contraseña"
          placeholderTextColor="#FFFFFF"
        />
        {showAlert && (
          <NoticeBar
            icon={false}
            style={ styles.alert }
            marqueeProps={{ loop: false, style: styles.marquee }}
          >
            El email ya se encuentra en uso.
          </NoticeBar>
        )}
      </View>
      <View style={ styles.container } />
      <View style={ styles.buttons }>
        <Button onPress={registerUser} type="primary">CREAR CUENTA</Button>
        <TouchableOpacity onPress={() => navigate('Login')} style={ styles.flatButton }>
          <Text style={styles.flatButtonText}>YA TENGO CUENTA</Text>
        </TouchableOpacity>
      </View>
    </Layout>
  )
}

export default Register;