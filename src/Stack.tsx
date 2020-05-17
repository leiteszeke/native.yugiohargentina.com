// Dependencies
import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
// Modules
import Account from '#modules/Account/Account';
import Dashboard from '#modules/Dashboard/Dashboard';
import Login from '#modules/Login';
import Eras from '#modules/Eras/Eras';
import Sets from '#modules/Sets/Sets';
import Register from '#modules/Register';
import Recover from '#modules/Recover';
import Events from '#modules/Events/Events';
import Stores from '#modules/Stores/Stores';
import Inventary from '#modules/Inventary/Inventary';
import InventaryCard from '#modules/Inventary/InventaryCard/InventaryCard';
import InventarySingle from '#modules/Inventary/InventarySingle/InventarySingle';
import Wanted from '#modules/Wanted/Wanted';
import WishlistCard from '#modules/Wanted/WishlistCard/WishlistCard';
import Tournaments from '#modules/Tournaments/Tournaments';
import TournamentLanding from '#modules/Tournament/TournamentLanding';
import TournamentInscription from '#modules/Tournament/TournamentInscription';
import TournamentMatch from '#modules/Tournament/TournamentMatch';
// Components
import Sidebar from './components/Sidebar';
// Contexts
import { CardStatusProvider } from '#contexts/CardStatus';
import { LanguageProvider } from '#contexts/Language';
// Images
import bgImage from '#images/bg.png';
import { useUser } from '#contexts/User';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const AppStack = () => (
  <LanguageProvider>
    <CardStatusProvider>
      <Drawer.Navigator drawerContent={props => <Sidebar {...{ ...props }} />}>
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

const AuthStack = () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Register" component={Register} />
    <Stack.Screen name="Recover" component={Recover} />
  </Stack.Navigator>
);

const App = () => {
  const { handleSession } = useUser();

  React.useEffect(() => {
    handleSession();
  }, []);

  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Loading">
        {() => <ImageBackground source={bgImage} style={styles.flex} />}
      </Stack.Screen>
      <Stack.Screen name="Auth" component={AuthStack} />
      <Stack.Screen name="App" component={AppStack} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});

export default App;
