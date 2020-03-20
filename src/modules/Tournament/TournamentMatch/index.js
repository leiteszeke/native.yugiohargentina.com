// Dependencies
import React from 'react';
import {Text, View, Alert, Linking} from 'react-native';
import {Button} from '@ant-design/react-native';
import {CommonActions, useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
// Components
import Input from '#components/Input';
import Layout from '#components/Layout';
// Styles
import styles from './styles';
// Services
import {report} from '#services/tournaments';
// Utils
import {parseMatchState, getPlayers} from '#utils/challonge';

const MATCH_OPEN = 'open';

const TournamentMatch = () => {
  const navigation = useNavigation();
  const {
    params: {tournament, match},
  } = useRoute();
  const [result, setResult] = React.useState({player1: 0, player2: 0});
  const [replayId, setReplayId] = React.useState(null);

  const setReplay = e => setReplayId(e.nativeEvent.text);

  const goToReplay = () => {
    const replay = '';
    Linking.openURL(`https://www.duelingbook.com/replay?id=${replay}`);
  };

  const add = player => () => {
    if (result[player] === 2) return false;
    if (result.player1 + result.player2 >= 3) return false;
    setResult(prev => ({...prev, [player]: prev[player] + 1}));
  };

  const remove = player => () => {
    if (result[player] === 0) return false;
    setResult(prev => ({...prev, [player]: prev[player] - 1}));
  };

  const matchPlayers = getPlayers(tournament.players, match);

  const submitResult = () => {
    let loserId = 'tie';
    let winnerId = 'tie';

    if (result.player2 > result.player1) {
      loserId = matchPlayers.player1.challongeId;
      winnerId = matchPlayers.player2.challongeId;
    }

    if (result.player1 > result.player2) {
      loserId = matchPlayers.player2.challongeId;
      winnerId = matchPlayers.player1.challongeId;
    }

    report(tournament.id, {
      loserId,
      replayId,
      winnerId,
      matchId: match.id,
      player1Matches: result.player1,
      player2Matches: result.player2,
    }).then(() => {
      navigation.dispatch(CommonActions.setParams({refresh: true}));
      navigation.goBack();
    });
  };

  const onSubmit = () => {
    let resultMessage = '';
    let winner = null;
    let winnerResult = '';

    if (result.player2 > result.player1) {
      winner = matchPlayers.player2;
      winnerResult = `${result.player2}-${result.player1}`;
    }

    if (result.player1 > result.player2) {
      winner = matchPlayers.player1;
      winnerResult = `${result.player1}-${result.player2}`;
    }

    resultMessage = '¿Estas seguro que el resultado ha sido ';
    resultMessage += !winner
      ? 'un empate?'
      : `que ${winner?.name} ha ganado por ${winnerResult}?`;

    Alert.alert(
      'Reportar resultado',
      resultMessage,
      [
        {text: 'Cancelar', style: 'cancel'},
        {text: 'Aceptar', onPress: submitResult},
      ],
      {cancelable: true},
    );
  };

  const PlayerItem = ({player}) => {
    const playerIndex = `player${player}`;
    const selectedPlayer = matchPlayers[playerIndex];

    return (
      <View
        style={{
          alignContent: 'center',
          alignItems: 'center',
          borderRadius: 8,
          borderColor: 'black',
          borderWidth: 1,
          flexDirection: 'row',
          marginBottom: 12,
          backgroundColor: '#FAFAFA',
          padding: 8,
        }}>
        <View style={{flex: 1}}>
          <Text style={{fontSize: 20, marginBottom: 4}}>
            {selectedPlayer.name}
          </Text>
          <Text style={{fontSize: 18, marginBottom: 4}}>
            {selectedPlayer.cossy}
          </Text>
          <Text style={{fontSize: 18}}>{selectedPlayer.deck}</Text>
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            width: match.state === MATCH_OPEN ? 90 : 'auto',
            marginRight: 6,
          }}>
          {match.state === MATCH_OPEN && (
            <Icon onPress={remove(playerIndex)} name="ios-remove" size={40} />
          )}
          <Text
            style={{
              fontSize: 30,
              fontWeight: 'bold',
              width: 30,
              textAlign: 'center',
            }}>
            {result[playerIndex]}
          </Text>
          {match.state === MATCH_OPEN && (
            <Icon onPress={add(playerIndex)} name="ios-add" size={40} />
          )}
        </View>
      </View>
    );
  };

  return (
    <Layout header title={tournament.title} withBack style={styles.layout}>
      <View style={{flex: 1}}>
        <Text style={{fontSize: 24, marginBottom: 8}}>Ronda {match.round}</Text>
        <Text style={{fontSize: 20, marginBottom: 20}}>
          Estado:{' '}
          <Text style={{fontWeight: 'bold'}}>
            {parseMatchState(match.state).toUpperCase()}
          </Text>
        </Text>
        <PlayerItem player={1} />
        <PlayerItem player={2} />
        {match.state === MATCH_OPEN && (
          <Input onChange={setReplay} placeholder="Replay ID" />
        )}
      </View>
      {match.state === MATCH_OPEN && (
        <View style={{height: 60, justifyContent: 'flex-end'}}>
          <Button onPress={onSubmit} type="primary">
            REPORTAR RESULTADO
          </Button>
        </View>
      )}
      {match.state !== MATCH_OPEN && (
        <View style={{height: 60, justifyContent: 'flex-end'}}>
          <Button type="primary" onPress={goToReplay}>
            VER REPETICIÓN
          </Button>
        </View>
      )}
    </Layout>
  );
};

export default TournamentMatch;
