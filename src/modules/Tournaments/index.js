// Dependencies
import React from 'react';
import {Text, Image, View} from 'react-native';
// Components
import Layout from '#components/Layout';
// Contexts
import {useLoader} from '#contexts/Loader';
// Styles
import styles from './styles';
// Services
import {all} from '#services/tournaments';
// Utils
import {parseTournamentState} from '#utils/challonge';
// Images
import Logo from '#images/logo.png';

const Tournaments = () => {
  const [tournaments, setTournaments] = React.useState(null);
  const {isLoading, showLoader, hideLoader} = useLoader();

  const fetchTournaments = () => {
    all()
      .then(res => setTournaments(res.data))
      .finally(() => hideLoader());
  };

  React.useEffect(() => {
    fetchTournaments();
  }, []);

  return (
    <Layout header title="Torneos" withBack style={styles.layout}>
      {tournaments?.map(tournament => (
        <View
          key={tournament.id}
          style={{
            flexDirection: 'row',
            height: 100,
            marginBottom: 10,
          }}>
          <View
            style={{
              height: 100,
              alignItems: 'center',
              justifyContent: 'center',
              width: 100,
            }}>
            <Image
              source={tournament.image ? {uri: tournament.image} : Logo}
              style={{height: 90, width: 90}}
              resizeMode="contain"
            />
          </View>
          <View style={{flex: 1, padding: 4}}>
            <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 4}}>
              {tournament.title}
            </Text>
            <Text style={{fontSize: 16, marginBottom: 4}}>
              Jugadores {tournament.players.length}
            </Text>
            <View
              style={{
                borderWidth: 1,
                padding: 4,
                borderRadius: 4,
                alignSelf: 'flex-start',
              }}>
              <Text
                style={{
                  fontSize: 14,
                  borderColor: 'black',
                }}>
                {parseTournamentState(
                  tournament.challonge.state,
                  tournament,
                ).toUpperCase()}
              </Text>
            </View>
          </View>
        </View>
      ))}
    </Layout>
  );
};

export default Tournaments;
