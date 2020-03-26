// Dependencies
import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {
  ActivityIndicator,
  Button,
  InputItem,
  NoticeBar,
} from '@ant-design/react-native';
import {useNavigation} from '@react-navigation/native';
// Components
import Layout from '#components/Layout';
// Services
import * as User from '#services/users';
// Helpers
import {setSession} from '#helpers/session';
// Images
import Logo from '#images/logo.png';
// Hooks
import {useUser} from '#contexts/User';
// Styles
import styles from './styles';

const Login = ({onSession}) => {
  const {navigate} = useNavigation();
  const {fetchUser} = useUser();
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const setValue = name => value => {
    setData(prev => ({...prev, [name]: value}));

    setErrors(prev => ({
      ...prev,
      [name]: false,
    }));
  };

  const loginAnonymous = async () => {
    await setSession({id: -1});
    await fetchUser();
    onSession();
  };

  const loginUser = () => {
    setIsLoading(true);
    setShowAlert(false);

    User.login(data.email, data.password)
      .then(async res => {
        await setSession(res.data);
        await fetchUser();
        setIsLoading(false);
        return onSession();
      })
      .catch(res => {
        if (res.message === 'user_not_found') {
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
        <InputItem
          autoCapitalize="none"
          placeholderTextColor={errors.email ? '#FF0000' : '#000000'}
          style={[styles.textInput, errors.email ? styles.inputError : {}]}
          onChange={setValue('email')}
          placeholder="Email"
          placeholderTextColor="#FFFFFF"
        />
        <View style={styles.separator} />
        <InputItem
          autoCapitalize="none"
          placeholderTextColor={errors.password ? '#FF0000' : '#000000'}
          style={[styles.textInput, errors.password ? styles.inputError : {}]}
          type="password"
          onChange={setValue('password')}
          placeholder="Contraseña"
          placeholderTextColor="#FFFFFF"
        />
        {showAlert && (
          <NoticeBar
            icon={false}
            style={styles.alert}
            marqueeProps={{loop: false, style: styles.marquee}}>
            Email y/o contraseña incorrectos.
          </NoticeBar>
        )}
      </View>
      <View style={styles.container} />
      <View style={styles.buttons}>
        <Button onPress={loginUser} type="primary">
          INGRESAR
        </Button>
        <View style={styles.inlineButtons}>
          <TouchableOpacity onPress={loginAnonymous} style={styles.flatButton}>
            <Text style={styles.flatButtonText}>ANÓNIMO</Text>
          </TouchableOpacity>
          <Text style={styles.flatButton}>&nbsp;&nbsp;|&nbsp;&nbsp;</Text>
          <TouchableOpacity
            onPress={() => navigate('Register')}
            style={styles.flatButton}>
            <Text style={styles.flatButtonText}>CREAR CUENTA</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Layout>
  );
};

export default Login;
