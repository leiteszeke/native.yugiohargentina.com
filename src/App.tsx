// Dependencies
import React from 'react';
// import Config from 'react-native-config';
import { Provider } from '@ant-design/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// import * as Sentry from '@sentry/react-native';
import { NavigationContainer } from '@react-navigation/native';
import numeral from 'numeral';
// Stack
import Stack from './Stack';
// Services
import { navigationRef } from '#services/navigation';
// Contexts
import { LoaderProvider } from '#contexts/Loader';
import { UserProvider } from '#contexts/User';
// Versioning
// import { version } from '../package.json';
// Theme
import appTheme from '#theme';

// if (Config.SENTRY_DSN !== '') {
//   Sentry.init({
//     dsn: Config.SENTRY_DSN,
//   });
//
//   Sentry.configureScope((scope) => scope.setExtra('app_version', version));
// }

if (typeof numeral.locales.es === 'undefined') {
  numeral.register('locale', 'es', {
    delimiters: {
      thousands: '',
      decimal: ',',
    },
    abbreviations: {
      thousand: 'k',
      million: 'm',
      billion: 'b',
      trillion: 't',
    },
    ordinal: function (number) {
      return number === 1 ? 'er' : 'er';
    },
    currency: {
      symbol: '$',
    },
  });
}

numeral.locale('es');

const myTheme = {
  ...appTheme,
  border_color_base: '#FFFFFF',
};

const App = () => (
  <SafeAreaProvider>
    <NavigationContainer ref={navigationRef}>
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
