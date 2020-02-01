// Dependencies
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
import AsyncStorage from '@react-native-community/async-storage';
import SafeAreaView from 'react-native-safe-area-view';
import * as Sentry from '@sentry/react-native';
import PropTypes from 'prop-types';
// Components
import MyButton from '#components/MyButton';
import MyInput from '#components/MyInput';
import MyLoading from '#components/MyLoading';
import MyStatusBar from '#components/MyStatusBar';
import Toast from '#components/Toast';
// Helpers
import Colors from '#helpers/colors';
import Routes from '#helpers/routes';
import i18n from '#helpers/i18n';
// Styles
import styles from './styles';

const backgroundImage = require('./../../images/background.jpg');
const LogoImage = require('./../../images/logo.png');

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [showLoading, setShowLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [password, setPassword] = useState('');

  const loginWithFacebook = () => {
    setShowLoading(true);

    LoginManager.logInWithPermissions(['public_profile', 'email'])
      .then(response => {
        if (!response.isCancelled) {
          AccessToken.getCurrentAccessToken().then(data => {
            const infoRequest = new GraphRequest(
              '/me',
              {
                accessToken: data.accessToken,
                parameters: {
                  fields: {
                    string: 'id,name,email,birthday,picture.type(large)',
                  },
                },
              },
              (error, result) => {
                if (error !== null) {
                  return Sentry.captureMessage(JSON.stringify(error));
                }

                const body = {
                  fbuid: result.id,
                };

                if (typeof result.email !== 'undefined') {
                  body.email = result.email;
                }

                return fetch(Routes.Api.facebookLogin, {
                  method: 'POST',
                  headers: {
                    Accept: 'q=0.8;application/json;q=0.9',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(body),
                })
                  .then(resp => resp.json())
                  .then(resp => {
                    if (!resp.error) {
                      AsyncStorage.setItem(
                        'mas1',
                        JSON.stringify({
                          session: true,
                          user: resp.data.user,
                          token: resp.data.token,
                        }),
                      );

                      return navigation.navigate('App');
                    }

                    return navigation.navigate('Register', {
                      facebookUser: {
                        email: result.email,
                        fbuid: result.id,
                        image: result.picture.data.url,
                        name: result.name,
                      },
                    });
                  })
                  .catch(err => Sentry.captureMessage(JSON.stringify(err)))
                  .finally(() => setShowLoading(false));
              },
            );

            new GraphRequestManager().addRequest(infoRequest).start();
          });

          return true;
        }

        return setShowLoading(false);
      })
      .catch(err => Sentry.captureMessage(JSON.stringify(err)));
  };

  const loginWithCredentials = () => {
    setShowLoading(true);

    const body = {
      email,
      password,
    };

    fetch(Routes.Api.login, {
      method: 'POST',
      headers: {
        Accept: 'q=0.8;application/json;q=0.9',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(res => res.json())
      .then(res => {
        if (!res.error) {
          AsyncStorage.setItem(
            'mas1',
            JSON.stringify({
              session: true,
              user: res.data.user,
              token: res.data.token,
            }),
          );

          return navigation.navigate('App');
        }

        setShowLoading(false);
        setShowToast(true);
        setModalMessage(i18n.translate(`errors.${res.message}`));
        return true;
      })
      .catch(err => Sentry.captureException(err))
      .finally(() => setShowLoading(false));
  };

  const goToRegister = () => navigation.navigate('Register');
  const goToRecover = () => navigation.navigate('Recover');
  const closeToast = () => setShowToast(false);
  const setEmailValue = (name, value) => setEmail(value);
  const setPasswordValue = (name, value) => setPassword(value);

  const {
    containerImage,
    inputContainer,
    content,
    loginContainer,
    loginFacebook,
    loginFooter,
    loginFooterText,
    loginLogo,
    loginLogoImage,
    loginSubmit,
  } = styles;

  if (showLoading) return <MyLoading />;

  return (
    <ImageBackground
      style={loginContainer}
      imageStyle={containerImage}
      source={backgroundImage}
    >
      <SafeAreaView style={{ flex: 1 }} forceInset={{ bottom: 'always' }}>
        <KeyboardAvoidingView
          contentContainerStyle={content}
          behavior="position"
          style={{ flex: 1 }}
        >
          <View style={loginLogo}>
            <Image
              style={loginLogoImage}
              resizeMode="contain"
              source={LogoImage}
            />
          </View>
          <View style={loginFacebook}>
            <MyButton
              backgroundColor={Colors.facebookBlue}
              label={i18n.translate('login.facebook_connect')}
              onClick={loginWithFacebook}
              testId="login-facebook"
              uppercase={false}
            />
          </View>
          <View style={inputContainer}>
            <MyInput
              onChange={setEmailValue}
              name="email"
              value={email}
              testId="login-email"
              holder={i18n.translate('login.email')}
              icon="profile"
            />
            <MyInput
              onChange={setPasswordValue}
              name="password"
              value={password}
              testId="login-password"
              holder={i18n.translate('login.password')}
              icon="key"
              secure={true}
            />
          </View>
          <View style={loginSubmit}>
            <MyButton
              label={i18n.translate('login.sign_in')}
              onClick={loginWithCredentials}
              testId="login-submit"
            />
          </View>
          <View style={loginFooter}>
            <TouchableOpacity
              testID="login-register"
              onPress={goToRegister}
              style={{ marginBottom: 12 }}
            >
              <Text style={loginFooterText}>
                {i18n.translate('login.not_account')}
                &nbsp;
                {i18n.translate('login.register_free')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity testID="login-recover" onPress={goToRecover}>
              <Text style={loginFooterText}>
                {i18n.translate('login.forgot_password')}
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
      <Toast closeToast={closeToast} text={modalMessage} visible={showToast} />
    </ImageBackground>
  );
};

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
