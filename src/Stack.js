// Dependencies
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
// Pages
import AuthLoadingScreen from './AuthLoadingScreen';
// Modules
import Account from './modules/Account';
import Dashboard from './modules/Dashboard';
import Login from './modules/Login';
import Register from './modules/Register';
import Events from './modules/Events';
import Stores from './modules/Stores';
import Wanted from './modules/Wanted';
import Card from './modules/Card';
// Components
import Sidebar from './components/Sidebar';

const AppStack = createDrawerNavigator({
  Dashboard: Dashboard,
  Events: Events,
  Stores: Stores,
  Account: Account,
  Wanted: Wanted,
  Card: Card,
}, {
  contentComponent: Sidebar,
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