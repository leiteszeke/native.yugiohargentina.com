// Dependencies
import React from 'react';
// Stack
import Stack from './Stack';
// Providers
import { Provider as DrawerProvider } from './modules/Drawer/context';
import NavigationProvider from './components/Navigation/context';

const App = () => {
  return (
    <NavigationProvider>
      <DrawerProvider>
        <Stack />
      </DrawerProvider>
    </NavigationProvider>
  )
};

export default App;