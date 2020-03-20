export const parseTournamentState = state => {
  if (state === 'pending') return 'En inscripción';
  if (state === 'in_progress' || state === 'underway') return 'Jugando';
  if (state === 'ended') return 'Finalizado';
  return 'Desconocido';
};

export const parseMatchState = state => {
  if (state === 'open') return 'En juego';
  if (state === 'complete') return 'Finalizado';
  return 'Desconocido';
};

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
