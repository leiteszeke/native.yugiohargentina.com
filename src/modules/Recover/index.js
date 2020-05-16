// Dependencies
import React, { useState } from 'react';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, Button, NoticeBar } from '@ant-design/react-native';
import { useNavigation } from '@react-navigation/native';
// Components
import Layout from '#components/Layout';
import Input from '#components/Input';
// Services
import * as User from '#services/users';
// Images
import Logo from '#images/logo.png';
// Styles
import styles from './styles';

const Recover = () => {
  const [step, setStep] = useState('RECOVER');
  const { goBack, navigate } = useNavigation();
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const setValue = name => value => {
    setShowAlert(false);
    setData(prev => ({ ...prev, [name]: value }));

    setErrors(prev => ({
      ...prev,
      [name]: false,
    }));
  };

  const showCode = () => setStep('CODE');
  const showForm = () => setStep('RECOVER');

  const validateCode = () => {
    setShowAlert(false);

    if (!data.code) {
      setErrors({ code: true });
      setShowAlert(true);
      return true;
    }

    setIsLoading(true);

    User.validateCode(data.code)
      .then(() => setStep('REDEEM'))
      .catch(err => {
        const errorMessage =
          err.message === 'code_not_found'
            ? 'El código ingresado es inválido.'
            : 'Ha ocurrido un error, vuelve a intentar';

        Alert.alert('Recuperar Contraseña', errorMessage, [{ text: 'OK' }], {
          cancelable: true,
        });
      })
      .finally(() => setIsLoading(false));
  };

  const updatePassword = () => {
    setShowAlert(false);

    if (!data.password) {
      setErrors({ password: true });
      setShowAlert(true);
      return true;
    }

    if (data.password !== data.rePassword) {
      setErrors({ password: true, rePassword: true });
      setShowAlert(true);
      return true;
    }

    setIsLoading(true);

    User.updatePassword({ code: data.code, password: data.password })
      .then(() => {
        Alert.alert(
          'Recuperar Contraseña',
          'Tu contraseña ha sido actualizada correctamente.',
          [{ text: 'Ingresar', onPress: () => navigate('Login') }],
          { cancelable: true },
        );
      })
      .catch(() => {
        Alert.alert(
          'Recuperar Contraseña',
          'Ha ocurrido un error, vuelve a intentar',
          [{ text: 'OK' }],
          { cancelable: true },
        );
      })
      .finally(() => setIsLoading(false));
  };

  const recoverPassword = () => {
    setShowAlert(false);

    if (!data.email) {
      setErrors({ email: true });
      setShowAlert(true);
      return true;
    }

    setIsLoading(true);

    User.recover({ email: data.email })
      .then(() => {
        Alert.alert(
          'Recuperar Contraseña',
          'La solicitud ha sido exitosa. Revisa tu correo para continuar el proceso.',
          [{ text: 'OK', onPress: () => setData({}) }],
          { cancelable: true },
        );
      })
      .catch(err => {
        const errorMessage =
          err.message === 'user_not_found'
            ? 'El email ingresado es incorrecto.'
            : 'Ha ocurrido un error, vuelve a intentar';

        Alert.alert('Recuperar Contraseña', errorMessage, [{ text: 'OK' }], {
          cancelable: true,
        });
      })
      .finally(() => setIsLoading(false));
  };

  const getErrorMessage = () => {
    if (step === 'RECOVER') {
      if (data.email === '') {
        return 'Debes completar con el email.';
      }
      return 'El email ingresado es incorrecto.';
    }

    if (step === 'CODE') {
      if (data.code === '') {
        return 'Debes completar con el código.';
      }
      return 'El código ingresado es incorrecto.';
    }

    if (step === 'REDEEM') {
      if (data.password === '') {
        return 'Debes ingresar la nueva contraseña.';
      }
      return 'Las contraseñas no coinciden';
    }

    return '';
  };

  React.useEffect(() => {
    setErrors({});
    setShowAlert(false);
  }, [step]);

  return (
    <Layout background noScroll title="Ingresar">
      {isLoading && <ActivityIndicator toast text="Cargando..." />}
      <View>
        <Image style={styles.logo} resizeMode="contain" source={Logo} />
        {step === 'RECOVER' && (
          <Input
            placeholderTextColor={errors.email ? '#FF0000' : '#000000'}
            style={[styles.textInput, errors.email ? styles.inputError : {}]}
            onChange={setValue('email')}
            placeholder="Email"
            placeholderTextColor="#FFFFFF"
            value={data?.email}
          />
        )}
        {step === 'CODE' && (
          <Input
            placeholderTextColor={errors.code ? '#FF0000' : '#000000'}
            style={[styles.textInput, errors.code ? styles.inputError : {}]}
            onChange={setValue('code')}
            placeholder="Código"
            value={data?.code}
            placeholderTextColor="#FFFFFF"
          />
        )}
        {step === 'REDEEM' && (
          <>
            <Input
              placeholderTextColor={errors.password ? '#FF0000' : '#000000'}
              style={[
                styles.textInput,
                errors.password ? styles.inputError : {},
              ]}
              onChange={setValue('password')}
              placeholder="Contraseña"
              placeholderTextColor="#FFFFFF"
              secureTextEntry={true}
              value={data.password}
            />
            <Input
              autoCapitalize="none"
              placeholderTextColor={errors.rePassword ? '#FF0000' : '#000000'}
              style={[
                styles.textInput,
                errors.rePassword ? styles.inputError : {},
              ]}
              onChange={setValue('rePassword')}
              placeholder="Confirmar contraseña"
              placeholderTextColor="#FFFFFF"
              secureTextEntry={true}
              value={data.rePassword}
            />
          </>
        )}
        {showAlert && (
          <NoticeBar
            icon={false}
            style={styles.alert}
            marqueeProps={{ loop: false, style: styles.marquee }}>
            {getErrorMessage()}
          </NoticeBar>
        )}
      </View>
      <View style={styles.container} />
      <View style={styles.buttons}>
        {step === 'RECOVER' && (
          <>
            <Button onPress={recoverPassword} type="primary">
              RECUPERAR
            </Button>
            <Button onPress={showCode} type="primary">
              YA TENGO UN CÓDIGO
            </Button>
          </>
        )}
        {step === 'CODE' && (
          <>
            <Button onPress={validateCode} type="primary">
              VALIDAR
            </Button>
            <Button onPress={showForm} type="primary">
              CANCELAR
            </Button>
          </>
        )}
        {step === 'REDEEM' && (
          <>
            <Button onPress={updatePassword} type="primary">
              CAMBIAR CONTRASEÑA
            </Button>
            <Button onPress={showForm} type="primary">
              CANCELAR
            </Button>
          </>
        )}
        <View style={styles.inlineButtons}>
          <TouchableOpacity onPress={goBack} style={styles.flatButton}>
            <Text style={styles.flatButtonText}>INGRESAR</Text>
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

export default Recover;
