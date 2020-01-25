// Dependencies
import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, Button, InputItem, NoticeBar } from '@ant-design/react-native';
import { withNavigation } from 'react-navigation';
// Components
import Layout from '../../components/Layout';
// Services
import { goTo } from '../../NavigationService';
import * as User from '../../services/users';
// Helpers
import { setSession } from '../../helpers/session';
// Images
import Logo from '../../images/logo.png';

const styles = {
  container: {
    flex: 1,
    paddingTop: 20,
  },
  logo: {
    height: 140,
    marginBottom: 20,
    width: 'auto',
  },
  textInput: {
    marginTop: 12,
    flex: 1,
  },
  inputError: {
    borderBottomColor: '#FF0000',
    borderBottomWidth: 1,
    color: '#FF0000',
  },
  alert: {
    backgroundColor: '#fff1f0',
    borderColor: '#ffa39e',
    borderRadius: 4,
    borderWidth: 1,
    marginTop: 12,
    paddingVertical: 4,
  },
  marquee: {
    color: '#000000',
    fontSize: 14,
  },
  buttons: {
    height: 72,
    marginTop: 12
  },
  flatButton: {
    alignItems: 'center',
    height: 20,
    justifyContent: 'center',
    marginTop: 8,
  },
  flatButtonText: {
    color: '#1890ff',
    fontSize: 16
  },
};

const Register = ({ navigation }) => {
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
          return navigation.navigate('App');
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
    <Layout noScroll title="Ingresar">
      {isLoading && <ActivityIndicator toast text="Cargando..." />}
      <View style={ styles.container }>
        <Image style={ styles.logo } resizeMode="contain" source={ Logo } />
        <InputItem
          placeholderTextColor={ errors.name ? '#FF0000' : '#000000' }
          style={[styles.textInput, errors.name ? styles.inputError : {}]}
          onChange={ setValue('name') }
          placeholder="Nombre"
        />
        <InputItem
          placeholderTextColor={ errors.lastname ? '#FF0000' : '#000000' }
          style={[styles.textInput, errors.lastname ? styles.inputError : {}]}
          onChange={ setValue('lastname') }
          placeholder="Apellido"
        />
        <InputItem
          placeholderTextColor={ errors.email ? '#FF0000' : '#000000' }
          style={[styles.textInput, errors.email ? styles.inputError : {}]}
          onChange={ setValue('email') }
          placeholder="Email"
        />
        <InputItem
          placeholderTextColor={ errors.password ? '#FF0000' : '#000000' }
          style={[styles.textInput, errors.password ? styles.inputError : {}]}
          type="password"
          onChange={ setValue('password') }
          placeholder="Contraseña"
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
      <View style={ styles.buttons }>
        <Button onPress={registerUser} type="primary">CREAR CUENTA</Button>
        <TouchableOpacity onPress={ () => goTo('Login') } style={ styles.flatButton }>
          <Text style={styles.flatButtonText}>Ya tengo cuenta</Text>
        </TouchableOpacity>
      </View>
    </Layout>
  )
}

export default withNavigation(Register);