// Dependencies
import React from 'react';
// Stack
import Stack from './Stack';
// Providers
import { Provider as DrawerProvider } from './modules/Drawer/context';

const App = () => {
  return (
    <DrawerProvider>
      <Stack />
    </DrawerProvider>
  )
};

export default App;