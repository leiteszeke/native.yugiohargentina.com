// Dependencies
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
// Pages
import AuthLoadingScreen from './AuthLoadingScreen';
// Modules
import Login from './modules/Login';
import Register from './modules/Register';
import Events from './modules/Events';
import Stores from './modules/Stores';

const AppStack = createStackNavigator({
  Events: Events,
  Stores: Stores,
}, {
  defaultNavigationOptions: { header: null },
});


const AuthStack = createStackNavigator(
  {
    Login: Login,
    Register: Register,
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
  },
);

const Stack = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
);

export default Stack;