// Dependencies
import dayjs from 'dayjs';
// Helpers
import {getUser} from '#helpers/session';

export const parseTournamentState = (state, tournament) => {
  const now = dayjs();

  if (tournament.preInscriptionDateFrom) {
    if (now.isBefore(dayjs(tournament.preInscriptionDateFrom))) {
      return 'En preparación';
    }

    if (
      now.isAfter(dayjs(tournament.preInscriptionDateFrom)) &&
      now.isBefore(dayjs(tournament.preInscriptionDateTo))
    ) {
      return 'En preinscripción';
    }
  }

  if (tournament.inscriptionDateFrom) {
    if (now.isBefore(dayjs(tournament.inscriptionDateFrom))) {
      return 'En preparación';
    }

    if (
      now.isAfter(dayjs(tournament.inscriptionDateFrom)) &&
      now.isBefore(dayjs(tournament.inscriptionDateTo))
    ) {
      return 'En inscripción';
    }
  }

  if (tournament?.top) {
    if (now.isBefore(dayjs(tournament?.top?.dateTo))) {
      return 'Jugando Top';
    }
    return 'Finalizado';
  }

  if (state === 'pending') return 'En inscripción';
  if (state === 'in_progress' || state === 'underway') return 'Jugando';
  if (state === 'complete') return 'Finalizado';
  return 'Desconocido';
};

export const parseMatchState = state => {
  if (state === 'open') return 'En juego';
  if (state === 'complete') return 'Finalizado';
  return 'Desconocido';
};

export const isRegistered = (userId, tournament) => {
  if (userId <= 0) return false;
  return !!tournament.players.find(p => p.userId === userId);
};

export const canUnregister = (userId, tournament) => {
  if (userId <= 0) return false;

  const now = dayjs();
  const isPlaying = !!tournament.players.find(p => p.userId === userId);

  if (!isPlaying) return false;

  return now.isBefore(tournament.dateFrom);
};

export const getMatch = (matches, match) =>
  matches.find(m => m.matchId === match.id);

export const getMatches = (rounds, playerId) => {
  const matches = [];

  rounds?.forEach(round => {
    const match = round?.matches?.find(
      m => m?.player1_id === playerId || m?.player2_id === playerId,
    );

    if (match) {
      matches.push(match);
    }
  });

  return matches;
};

export const isPlaying = players => {
  const userId = getUser().id;
  if (userId <= 0) return false;
  if (userId === players.player1.userId) return true;
  if (userId === players.player2.userId) return true;
  return false;
};

export const getCurrentRound = tournament => {
  if (!tournament?.matchesByRound) return null;

  if (tournament?.top) {
    if (!tournament?.top?.matchesByRound) return null;

    return (
      tournament.rounds +
      tournament.top.matchesByRound[tournament.top.matchesByRound.length - 1]
        ?.round
    );
  }

  return tournament.matchesByRound[tournament.matchesByRound.length - 1]?.round;
};

export const getPlayers = (players, match) => {
  if (!players || !match) return {};

  const player1 = players.find(p => p.challongePlayerId === match.player1_id);
  const player2 = players.find(p => p.challongePlayerId === match.player2_id);
  const [player1Win, player2Win] = match.scores_csv.split('-');

  return {
    player1: {
      challongeId: match.player1_id,
      deck: player1?.decklist?.name || null,
      name: `${player1?.user?.name || ''} ${player1?.user?.lastname || ''}`,
      cossy: player1?.user.cossyId,
      wins: player1Win || 0,
    },
    player2: {
      challongeId: match.player2_id,
      deck: player2?.decklist?.name || null,
      name: `${player2?.user?.name || ''} ${player2?.user?.lastname || ''}`,
      cossy: player2?.user.cossyId,
      wins: player2Win || 0,
    },
  };
};
