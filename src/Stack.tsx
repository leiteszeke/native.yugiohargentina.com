// Dependencies
import React from 'react';
import {ImageBackground} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import * as Sentry from '@sentry/react-native';
// Helpers
import {getSession} from '#helpers/session';
// Services
import {navigate} from '#services/navigation';
// Modules
import Account from '#modules/Account/Account';
import Dashboard from '#modules/Dashboard';
import Login from '#modules/Login';
import Eras from '#modules/Eras/Eras';
import Sets from '#modules/Sets/Sets';
import Register from '#modules/Register';
import Recover from '#modules/Recover';
import Events from '#modules/Events';
import Stores from '#modules/Stores';
import Inventary from '#modules/Inventary';
import InventaryCard from '#modules/Inventary/InventaryCard';
import InventarySingle from '#modules/Inventary/InventarySingle';
import Wanted from '#modules/Wanted';
import WishlistCard from '#modules/Wanted/WishlistCard';
import Tournaments from '#modules/Tournaments';
import TournamentLanding from '#modules/Tournament/TournamentLanding';
import TournamentInscription from '#modules/Tournament/TournamentInscription';
import TournamentMatch from '#modules/Tournament/TournamentMatch';
// Components
import Sidebar from './components/Sidebar';
// Contexts
import {CardStatusProvider} from '#contexts/CardStatus';
import {LanguageProvider} from '#contexts/Language';
// Images
import bgImage from '#images/bg.png';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

type WithSession = {
  onSession?: () => any;
}

const AppStack = ({ onSession }: WithSession) => (
  <LanguageProvider>
    <CardStatusProvider>
      <Drawer.Navigator
        initialRouteName="Cards"
        drawerContent={props => <Sidebar {...{...props, onSession}} />}>
        <Drawer.Screen name="Dashboard" component={Dashboard} />

        <Drawer.Screen name="Cards" component={Eras} />
        <Drawer.Screen name="Sets" component={Sets} />

        <Drawer.Screen name="Events" component={Events} />
        <Drawer.Screen name="Stores" component={Stores} />
        <Drawer.Screen name="Account" component={Account} />
        <Drawer.Screen name="Inventary" component={Inventary} />
        <Drawer.Screen name="InventaryCard" component={InventaryCard} />
        <Drawer.Screen name="InventarySingle" component={InventarySingle} />
        <Drawer.Screen name="Wanted" component={Wanted} />
        <Drawer.Screen name="WishlistCard" component={WishlistCard} />
        <Drawer.Screen name="Tournaments" component={Tournaments} />
        <Drawer.Screen name="TournamentLanding" component={TournamentLanding} />
        {/* <Drawer.Screen name="TournamentMatch" component={TournamentMatch} /> */}
        <Drawer.Screen
          name="TournamentInscription"
          component={TournamentInscription}
        />
      </Drawer.Navigator>
    </CardStatusProvider>
  </LanguageProvider>
);

const AuthStack = ({ onSession }: WithSession) => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="Login">
      {props => <Login {...{...props, onSession}} />}
    </Stack.Screen>
    <Stack.Screen name="Register">
      {props => <Register {...{...props, onSession}} />}
    </Stack.Screen>
    <Stack.Screen name="Recover" component={Recover} />
  </Stack.Navigator>
);

const App = () => {
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

      return navigate('App');
    }

    return navigate('Auth');
  };

  React.useEffect(() => {
    handleSession();
  }, []);

  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Loading">
        {() => <ImageBackground source={bgImage} style={{flex: 1}} />}
      </Stack.Screen>
      <Stack.Screen name="Auth">
        {props => <AuthStack {...props} onSession={handleSession} />}
      </Stack.Screen>
      <Stack.Screen name="App">
        {props => <AppStack {...props} onSession={handleSession} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default App;
