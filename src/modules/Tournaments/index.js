// Dependencies
import React from 'react';
import dayjs from 'dayjs';
import { Linking, Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';
// Components
import TextBadge from '#components/TextBadge/TextBadge';
import Layout from '#components/Layout';
// Contexts
import { useLoader } from '#contexts/Loader';
// Styles
import styles from './styles';
// Services
import { all } from '#services/tournaments';
// Utils
import { getCurrentRound, parseTournamentState } from '#utils/challonge';
// Images
import Logo from '#images/logo.png';

const Tournaments = () => {
  const [tournaments, setTournaments] = React.useState(null);
  const { isLoading, showLoader, hideLoader } = useLoader();

  const fetchTournaments = () => {
    all()
      .then(res => setTournaments(res.data))
      .finally(() => hideLoader());
  };

  const openTournament = id => () =>
    Linking.openURL(`https://yugiohargentina.com/tournaments/${id}`);

  React.useEffect(() => {
    fetchTournaments();
  }, [fetchTournaments]);

  return (
    <Layout header title="Torneos" withBack style={styles.layout}>
      {tournaments?.map(tournament => (
        <TouchableOpacity
          key={tournament.id}
          onPress={openTournament(tournament.id)}
          style={{
            alignItems: 'flex-start',
            backgroundColor: 'white',
            flexDirection: 'row',
            borderRadius: 8,
            marginBottom: 20,
            paddingHorizontal: 4,
            shadowColor: 'rgba(0, 0, 0, 0.6)',
            elevation: 4,
            shadowOffset: {
              height: 3,
              width: 0,
            },
            shadowOpacity: 1,
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: 100,
            }}>
            <FastImage
              source={tournament.image ? { uri: tournament.image } : Logo}
              style={{ height: 90, width: 90, borderRadius: 8, marginTop: 8 }}
              resizeMode="contain"
            />
          </View>
          <View style={{ flex: 1, padding: 4, marginTop: 4 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 8 }}>
              {tournament.title}
            </Text>
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                marginBottom: 8,
              }}>
              <Icon size={24} name="md-people" />
              <Text
                style={{
                  fontSize: 20,
                  marginLeft: 6,
                  flex: 1,
                  marginBottom: 4,
                }}>
                {tournament.players.length}
              </Text>
              <TextBadge
                variant="info"
                label={parseTournamentState(
                  tournament?.challonge?.state,
                  tournament,
                ).toUpperCase()}
              />
            </View>
            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                {tournament.rounds > 0 && (
                  <>
                    <Icon size={24} name="logo-game-controller-b" />
                    <Text
                      style={{
                        fontSize: 20,
                        marginHorizontal: 6,
                        marginBottom: 4,
                      }}>
                      {tournament.rounds}
                    </Text>
                    {!!tournament.top && (
                      <>
                        <Icon size={24} name="ios-podium" />
                        <Text style={{ fontSize: 20, marginLeft: 6, flex: 1 }}>
                          {tournament.top.players.length}
                        </Text>
                      </>
                    )}
                  </>
                )}
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}>
                {dayjs().isBefore(dayjs(tournament.dateFrom)) ? (
                  <>
                    <Icon size={24} name="md-time" />
                    <Text style={{ fontSize: 20, marginLeft: 6 }}>
                      {dayjs(tournament.dateFrom).format('DD/MM HH:mm')}
                    </Text>
                  </>
                ) : (
                  <>
                    <Icon size={24} name="ios-calendar" />
                    <Text style={{ fontSize: 20, marginLeft: 6 }}>
                      {dayjs(tournament.dateFrom).format('DD/MM/YY')}
                    </Text>
                  </>
                )}
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </Layout>
  );
};

export default Tournaments;
