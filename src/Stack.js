// Dependencies
import React from 'react';
import {View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import * as Sentry from '@sentry/react-native';
// Helpers
import {getSession} from '#helpers/session';
// Modules
import Account from './modules/Account';
import Dashboard from './modules/Dashboard';
import Login from './modules/Login';
import Register from './modules/Register';
import Events from './modules/Events';
import Stores from './modules/Stores';
import Inventary from './modules/Inventary';
import InventaryCard from './modules/Inventary/InventaryCard';
import InventarySingle from './modules/Inventary/InventarySingle';
import Wanted from './modules/Wanted';
import WishlistCard from './modules/Wanted/WishlistCard';
import TournamentLanding from './modules/Tournament/TournamentLanding';
import TournamentInscription from './modules/Tournament/TournamentInscription';
import TournamentMatch from './modules/Tournament/TournamentMatch';
// Components
import Sidebar from './components/Sidebar';
// Contexts
import {CardStatusProvider} from '#contexts/CardStatus';
import {LanguageProvider} from '#contexts/Language';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const AppStack = ({onSession}) => (
  <LanguageProvider>
    <CardStatusProvider>
      <Drawer.Navigator
        drawerContent={props => <Sidebar {...{...props, onSession}} />}>
        <Drawer.Screen
          name="TournamentInscription"
          component={TournamentInscription}
        />
        <Drawer.Screen name="Dashboard" component={Dashboard} />
        <Drawer.Screen name="Events" component={Events} />
        <Drawer.Screen name="Stores" component={Stores} />
        <Drawer.Screen name="Account" component={Account} />
        <Drawer.Screen name="Inventary" component={Inventary} />
        <Drawer.Screen name="InventaryCard" component={InventaryCard} />
        <Drawer.Screen name="InventarySingle" component={InventarySingle} />
        <Drawer.Screen name="Wanted" component={Wanted} />
        <Drawer.Screen name="WishlistCard" component={WishlistCard} />
        <Drawer.Screen name="TournamentLanding" component={TournamentLanding} />
        <Drawer.Screen name="TournamentMatch" component={TournamentMatch} />
      </Drawer.Navigator>
    </CardStatusProvider>
  </LanguageProvider>
);

const AuthStack = ({onSession}) => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="Login">
      {props => <Login {...{...props, onSession}} />}
    </Stack.Screen>
    <Stack.Screen name="Register">
      {props => <Register {...{...props, onSession}} />}
    </Stack.Screen>
  </Stack.Navigator>
);

const App = () => {
  const [navigateTo, setNavigateTo] = React.useState(null);
  const handleSession = async () => {
    const session = await getSession();

    if (session && session.id) {
      if (session.id > 0) {
        Sentry.configureScope(scope =>
          scope.setUser({
            id: session?.id,
            email: session?.email,
          }),
        );
      }

      return setNavigateTo('App');
    }

    return setNavigateTo('Auth');
  };

  React.useEffect(() => {
    handleSession();
  }, []);

  if (navigateTo === null) return <View style={{backgroundColor: 'green'}} />;

  if (navigateTo === 'Auth') return <AuthStack onSession={handleSession} />;

  return <AppStack onSession={handleSession} />;
};

export default App;
