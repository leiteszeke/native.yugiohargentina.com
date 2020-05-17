// Dependencies
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, Button, NoticeBar } from '@ant-design/react-native';
import Image from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
// Components
import Layout from '#components/Layout';
import Input from '#components/Input';
// Services
import * as User from '#services/users';
// Helpers
import { setSession } from '#helpers/session';
// Images
import Logo from '#images/logo.png';
// Hooks
import { useUser } from '#contexts/User';
// Styles
import styles from './styles';

const Register = () => {
  const { navigate } = useNavigation();
  const { fetchUser, handleSession } = useUser();
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const setValue = name => e => {
    const value = e.nativeEvent.text;
    setData({ ...data, [name]: value });

    setErrors(prev => ({
      ...prev,
      [name]: false,
    }));
  };

  const registerUser = () => {
    setIsLoading(true);
    setShowAlert(false);

    User.register(data.name, data.lastname, data.email, data.password)
      .then(async res => {
        await setSession(res.data);
        await fetchUser();
        setIsLoading(false);
        handleSession();
      })
      .catch(res => {
        if (res.message === 'email_in_use') {
          setShowAlert(true);
        }

        setErrors(res.data);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Layout background noScroll title="Ingresar">
      {isLoading && <ActivityIndicator toast text="Cargando..." />}
      <View>
        <Image style={styles.logo} resizeMode="contain" source={Logo} />
        <Input
          placeholderTextColor={errors.name ? '#FF0000' : '#000000'}
          style={[styles.textInput, errors.name ? styles.inputError : {}]}
          onChange={setValue('name')}
          placeholder="Nombre"
          value={data?.name}
        />
        <View style={styles.separator} />
        <Input
          placeholderTextColor={errors.lastname ? '#FF0000' : '#000000'}
          style={[styles.textInput, errors.lastname ? styles.inputError : {}]}
          onChange={setValue('lastname')}
          placeholder="Apellido"
          value={data?.lastname}
        />
        <View style={styles.separator} />
        <Input
          placeholderTextColor={errors.email ? '#FF0000' : '#000000'}
          style={[styles.textInput, errors.email ? styles.inputError : {}]}
          onChange={setValue('email')}
          placeholder="Email"
          value={data?.email}
        />
        <View style={styles.separator} />
        <Input
          placeholderTextColor={errors.password ? '#FF0000' : '#000000'}
          style={[styles.textInput, errors.password ? styles.inputError : {}]}
          secureTextEntry={true}
          onChange={setValue('password')}
          placeholder="Contraseña"
          value={data?.password}
        />
        {showAlert && (
          <NoticeBar
            icon={false}
            style={styles.alert}
            marqueeProps={{ loop: false, style: styles.marquee }}>
            El email ya se encuentra en uso.
          </NoticeBar>
        )}
      </View>
      <View style={styles.container} />
      <View style={styles.buttons}>
        <Button onPress={registerUser} type="primary">
          CREAR CUENTA
        </Button>
        <TouchableOpacity
          onPress={() => navigate('Login')}
          style={styles.flatButton}>
          <Text style={styles.flatButtonText}>YA TENGO CUENTA</Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
};

export default Register;
