// Dependencies
import React from 'react';
// Stack
import Stack from './Stack';
// Providers
import { setTopLevelNavigator } from './NavigationService';


const App = () => (
  <Stack
    ref={navigatorRef => {
      setTopLevelNavigator(navigatorRef);
    }}
  />
);

export default App;