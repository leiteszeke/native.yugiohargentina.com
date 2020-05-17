// Dependencies
import React from 'react';
import dayjs from 'dayjs';
import { Linking, Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';
// Components
import TextBadge from '#components/TextBadge/TextBadge';
import Layout from '#components/Layout';
// Styles
import styles from './Tournaments.styles';
// Services
import { all } from '#services/tournaments';
// Utils
import { parseTournamentState } from '#utils/challonge';
// Images
import Logo from '#images/logo.png';
// Types
import { TournamentProps } from '#types';

const Tournaments = () => {
  const [tournaments, setTournaments] = React.useState<Array<TournamentProps> | null>(null);

  const fetchTournaments = () => all().then(res => setTournaments(res.data));

  const openTournament = (id: number) => () =>
    Linking.openURL(`https://yugiohargentina.com/tournaments/${id}`);

  React.useEffect(() => {
    fetchTournaments();
  }, []);

  return (
    <Layout header title="Torneos" withBack style={styles.layout}>
      {tournaments && tournaments?.map((tournament: TournamentProps) => (
        <TouchableOpacity
          key={tournament.id}
          onPress={openTournament(tournament.id)}
          style={styles.tournamentContainer}>
          <View
            style={styles.tournamentImageContainer}>
            <FastImage
              source={tournament.image ? { uri: tournament.image } : Logo}
              style={styles.tournamentImage}
              resizeMode="contain"
            />
          </View>
          <View style={styles.tournamentData}>
            <Text style={styles.tournamentTitle}>
              {tournament.title}
            </Text>
            <View
              style={styles.tournamentPlayers}>
              <Icon size={24} name="md-people" />
              <Text style={styles.tournamentPlayersCount}>
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
            <View style={styles.tournamentRounds}>
              <View style={styles.tournamentRoundsData}>
                {tournament.rounds > 0 && (
                  <>
                    <Icon size={24} name="logo-game-controller-b" />
                    <Text
                      style={styles.tournamentRoundsCount}>
                      {tournament.rounds}
                    </Text>
                    {!!tournament.top && (
                      <>
                        <Icon size={24} name="ios-podium" />
                        <Text style={styles.tournamentPlayersTopCount}>
                          {tournament?.top?.players.length}
                        </Text>
                      </>
                    )}
                  </>
                )}
              </View>
              <View
                style={styles.tournamentDateContainer}>
                {dayjs().isBefore(dayjs(tournament.dateFrom)) ? (
                  <>
                    <Icon size={24} name="md-time" />
                    <Text style={styles.tournamentDate}>
                      {dayjs(tournament.dateFrom).format('DD/MM HH:mm')}
                    </Text>
                  </>
                ) : (
                  <>
                    <Icon size={24} name="ios-calendar" />
                    <Text style={styles.tournamentDate}>
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
