// Dependencies
import React from 'react';
// Stack
import Stack from './Stack';
// Providers
import { Provider as DrawerProvider } from './modules/Drawer/context';
import { setTopLevelNavigator } from './NavigationService';


const App = () => {
  return (
    <DrawerProvider>
      <Stack
        ref={navigatorRef => {
          setTopLevelNavigator(navigatorRef);
        }}
      />
    </DrawerProvider>
  )
};

export default App;