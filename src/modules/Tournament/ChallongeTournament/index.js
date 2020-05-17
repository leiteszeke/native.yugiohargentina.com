// Dependencies
import React from 'react';
import { Alert, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Button } from '@ant-design/react-native';
import {
  CommonActions,
  useNavigation,
  useIsFocused,
  useRoute,
} from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
// Services
import { create, remove } from '#services/players';
import { get } from '#services/tournaments';
// Contexts
import { useUser } from '#contexts/User';
import { useLoader } from '#contexts/Loader'; // TODO: Remove
// Styles
import styles, { dropdownStyle } from './styles';
// Utils
import {
  parseTournamentState,
  getCurrentRound,
  getMatches,
  getPlayers,
  isRegistered,
  canUnregister,
} from '#utils/challonge';

const TournamentLanding = ({ decklists, ...initialTournament }) => {
  const { user } = useUser();
  const isFocused = useIsFocused();
  const { params } = useRoute();
  const navigation = useNavigation();
  const { hideLoader } = useLoader();
  const [tournament, setTournament] = React.useState(initialTournament);
  const [decklistId, setDecklistId] = React.useState(null);
  const [activeTab, setActiveTab] = React.useState(1);

  const setTab = index => () => setActiveTab(index);
  const goAccount = () => navigation.navigate('Account');
  const goToMatch = match => () =>
    navigation.navigate('TournamentMatch', { match, tournament });

  const fetchTournament = () =>
    get(tournament.id).then(res => setTournament(res.data));

  const registerPlayer = () => {
    if (!decklistId) {
      return Alert.alert(
        'Oops!',
        'Debes seleccionar una decklist para poder continuar',
      );
    }
    create({
      tournamentId: tournament.id,
      userId: user.id,
      decklistId,
    }).then(() => fetchTournament());
  };

  const setDecklist = e => {
    setDecklistId(e);
  };

  const player = tournament.players.find(p => p.userId === user.id);
  const currentRound = getCurrentRound(tournament);

  const leaveTournament = () =>
    remove({ userId: user.id, tournamentId: tournament.id }).finally(() => {
      fetchTournament();
      navigation.dispatch(CommonActions.setParams({ refresh: true }));
      navigation.navigate('Dashboard');
    });

  const handleUnsuscribe = () => {
    Alert.alert('Desuscripción', '¿Estas seguro que queres salir del torneo?', [
      {
        text: 'Cancalar',
        style: 'cancel',
      },
      { text: 'Acepto', onPress: leaveTournament },
    ]);
  };

  const pageData = React.useMemo(
    () => ({
      canRegister:
        tournament?.gameTypeId === 4 &&
        !!user?.cossyId &&
        !!user?.duelingBookId,
      isRegistered: isRegistered(user.id, tournament),
      matches: getMatches(
        tournament?.matchesByRound,
        player?.challongePlayerId,
      ),
      canUnregister: canUnregister(user.id, tournament),
      state: parseTournamentState(tournament?.challonge.state, tournament),
      playersCount: tournament?.players.length,
      currentRound: tournament?.matchesByRound.length,
      totalRounds: tournament?.challonge.swiss_rounds,
    }),
    [player, tournament, user],
  );

  React.useEffect(() => {
    if (isFocused && params?.refresh) {
      navigation.dispatch(CommonActions.setParams({}));
      fetchTournament();
    }
  }, [fetchTournament, isFocused, navigation, params]);

  React.useEffect(() => {
    hideLoader();
  }, [hideLoader]);

  const UserHeader = React.useCallback(
    () => (
      <>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 12 }}>
          {user.name} {user.lastname} ({user.cossyId})
        </Text>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 12 }}>
          {user.duelingBookId}
        </Text>
      </>
    ),
    [user],
  );

  const Tabs = () => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 40,
        marginBottom: 12,
      }}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          {
            flex: 1,
            marginRight: 6,
            height: 40,
            borderWidth: 1,
            borderColor: 'gray',
            alignItems: 'center',
            justifyContent: 'center',
          },
          activeTab === 1 && { backgroundColor: '#cacaca' },
        ]}
        onPress={setTab(1)}>
        <Text style={{ fontSize: 16 }}>Rondas</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          {
            flex: 1,
            marginLeft: 6,
            height: 40,
            borderWidth: 1,
            borderColor: 'gray',
            alignItems: 'center',
            justifyContent: 'center',
          },
          activeTab === 2 && { backgroundColor: '#cacaca' },
        ]}
        onPress={setTab(2)}>
        <Text style={{ fontSize: 16 }}>Tabla de Posiciones</Text>
      </TouchableOpacity>
    </View>
  );

  const Player = player => (
    <View
      style={{
        alignItems: 'center',
        flexDirection: 'row',
        height: 40,
        borderColor: '#cacaca',
        borderWidth: player.user.id ? 1 : 0,
        marginBottom: 12,
      }}>
      <Text
        style={{
          fontSize: 18,
          textAlign: 'center',
          backgroundColor: player.user.id ? '#cacaca' : 'transparent',
          height: 40,
          justifyContent: 'center',
          lineHeight: 40,
          width: 32,
        }}>
        {player.position || 0}
      </Text>
      <Text style={{ fontSize: 18, flex: 1, marginLeft: 6 }}>
        {player.user.name} {player.user.lastname}
      </Text>
      <Text
        style={{
          fontSize: 18,
          textAlign: 'center',
          backgroundColor: player.user.id ? '#cacaca' : 'transparent',
          height: 40,
          justifyContent: 'center',
          lineHeight: 40,
          width: 32,
        }}>
        {player.plays || 0}
      </Text>
      <Text
        style={{
          fontSize: 18,
          textAlign: 'center',
          backgroundColor: player.user.id ? '#bfbfbf' : 'transparent',
          height: 40,
          justifyContent: 'center',
          lineHeight: 40,
          width: 32,
        }}>
        {player.wins || 0}
      </Text>
      <Text
        style={{
          fontSize: 18,
          textAlign: 'center',
          backgroundColor: player.user.id ? '#cacaca' : 'transparent',
          height: 40,
          justifyContent: 'center',
          lineHeight: 40,
          width: 32,
        }}>
        {player.draws || 0}
      </Text>
      <Text
        style={{
          fontSize: 18,
          textAlign: 'center',
          backgroundColor: player.user.id ? '#bfbfbf' : 'transparent',
          height: 40,
          justifyContent: 'center',
          lineHeight: 40,
          width: 32,
        }}>
        {player.loses || 0}
      </Text>
    </View>
  );

  if (!pageData.canRegister) {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={{ fontSize: 20, marginBottom: 20, textAlign: 'center' }}>
            Debes tener Cossy ID y usuario de Dueling Book en tu cuenta para
            poder registrarte
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'flex-end',
            height: 60,
          }}>
          <Button onPress={goAccount} type="primary">
            IR A MI CUENTA
          </Button>
        </View>
      </View>
    );
  }

  if (pageData.isRegistered) {
    return (
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 12 }}>
          {tournament.title}
        </Text>
        <UserHeader />
        <Text style={{ fontSize: 18, marginBottom: 12 }}>
          Estado del Torneo: {pageData.state}
        </Text>
        <Text style={{ fontSize: 18, marginBottom: 12 }}>
          Jugadores: {pageData.playersCount}
        </Text>
        {pageData.currentRound > 0 && (
          <>
            <Text style={{ fontSize: 18, marginBottom: 12 }}>
              Ronda Actual: {pageData.currentRound} | Rondas Totales:{' '}
              {pageData.totalRounds}
            </Text>
          </>
        )}
        <Tabs />
        <ScrollView style={{ flex: 1 }}>
          {activeTab === 1 && (
            <View style={{ flex: 1 }}>
              {!currentRound ? (
                <View
                  style={{
                    flex: 1,
                    padding: 12,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{ fontSize: 20, textAlign: 'center' }}>
                    El torneo aún no ha comenzado
                  </Text>
                </View>
              ) : (
                pageData.matches.map(match => {
                  const matchPlayers = getPlayers(tournament?.players, match);

                  return (
                    <View key={match.id} style={{ marginBottom: 12 }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginBottom: 8,
                        }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                          Ronda {match?.round}
                        </Text>
                        {pageData.currentRound === match.round &&
                          match.state === 'open' && (
                            <TouchableOpacity onPress={goToMatch(match)}>
                              <Text
                                style={{ fontSize: 18, fontWeight: 'bold' }}>
                                REPORTAR RESULTADO
                              </Text>
                            </TouchableOpacity>
                          )}
                      </View>
                      <Text style={{ fontSize: 16, marginBottom: 4 }}>
                        {matchPlayers.player1.name} ({matchPlayers.player1.wins}
                        )
                      </Text>
                      <Text style={{ fontSize: 16, marginBottom: 4 }}>
                        {matchPlayers.player2.name} ({matchPlayers.player2.wins}
                        )
                      </Text>
                    </View>
                  );
                })
              )}
            </View>
          )}
          {activeTab === 2 && (
            <View>
              <Player
                {...{
                  user: { name: 'Nombre y', lastname: 'Apellido' },
                  plays: 'PJ',
                  wins: 'PG',
                  draws: 'PE',
                  loses: 'PP',
                  position: ' ',
                }}
              />
              {tournament?.players?.map(player => (
                <Player key={player.id} {...player} />
              ))}
            </View>
          )}
        </ScrollView>
        {pageData.isRegistered && pageData.canUnregister && (
          <Button onPress={handleUnsuscribe} type="warning">
            DESINSCRIBIRME
          </Button>
        )}
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <UserHeader />
        <View style={styles.dropdown}>
          <Text style={{ fontSize: 18, marginRight: 4 }}>Decklist:</Text>
          <RNPickerSelect
            items={
              decklists
                ? decklists.map(decklist => ({
                    label: decklist.name,
                    value: decklist.id,
                  }))
                : []
            }
            onValueChange={setDecklist}
            placeholder={{
              color: 'black',
              label: 'Seleccione una Decklist',
              value: null,
            }}
            style={dropdownStyle}
            value={decklistId}
          />
        </View>
      </View>
      <View style={{ justifyContent: 'flex-end', height: 60 }}>
        <Button onPress={registerPlayer} type="primary">
          INSCRIBIRME
        </Button>
      </View>
    </View>
  );
};

export default TournamentLanding;
