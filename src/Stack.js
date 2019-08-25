// Dependencies
import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';
// Modules
import Login from './modules/Login';
import Register from './modules/Register';
import Events from './modules/Events';
import Stores from './modules/Stores';

const AppStack = createStackNavigator({
    Login: Login,
    Events: Events,
    Stores: Stores,
    Register: Register,
}, {
    defaultNavigationOptions: { header: null },
});

const Stack = createAppContainer(
    createSwitchNavigator({
        App: AppStack,
    }, {
        initialRouteName: 'App',
    })
);

export default Stack;