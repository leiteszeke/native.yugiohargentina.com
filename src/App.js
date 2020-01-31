// Dependencies
import React from 'react';
import { Provider, theme } from '@ant-design/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// Stack
import Stack from './Stack';
// Providers
import { setTopLevelNavigator } from './NavigationService';
// Contexts
import { LoaderProvider } from '#contexts/Loader';
import { UserProvider } from '#contexts/User';

const myTheme = {
  ...theme,
  border_color_base: '#FFFFFF',
}

const App = () => (
  <SafeAreaProvider>
    <Provider theme={myTheme}>
      <LoaderProvider>
        <UserProvider>
          <Stack
            ref={navigatorRef => {
              setTopLevelNavigator(navigatorRef);
            }}
          />
        </UserProvider>
      </LoaderProvider>
    </Provider>
  </SafeAreaProvider>
);

export default App;