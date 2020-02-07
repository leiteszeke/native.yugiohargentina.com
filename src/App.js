// Dependencies
import React from 'react';
import { SENTRY_DSN } from 'react-native-dotenv';
import { Provider, theme } from '@ant-design/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Sentry from '@sentry/react-native';
import { NavigationContainer } from '@react-navigation/native';
// Stack
import Stack from './Stack';
// Contexts
import { LoaderProvider } from '#contexts/Loader';
import { UserProvider } from '#contexts/User';

if (SENTRY_DSN !== "") {
  Sentry.init({
    dsn: SENTRY_DSN,
  });
}

const myTheme = {
  ...theme,
  border_color_base: '#FFFFFF',
}

const App = () => (
  <SafeAreaProvider>
    <NavigationContainer>
      <Provider theme={myTheme}>
        <LoaderProvider>
          <UserProvider>
            <Stack />
          </UserProvider>
        </LoaderProvider>
      </Provider>
    </NavigationContainer>
  </SafeAreaProvider>
);

export default App;