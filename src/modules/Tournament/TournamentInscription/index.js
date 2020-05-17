// Dependencies
import React from 'react';
import { useRoute } from '@react-navigation/native';
// Services
import { all } from '#services/decklists';
import { get } from '#services/tournaments';
// Components
import Layout from '#components/Layout';
import ChallongeTournament from '../ChallongeTournament';
// Styles
import styles from './styles';

const TournamentLanding = () => {
  const { params } = useRoute();
  const [tournament, setTournament] = React.useState(null);
  const [decklists, setDecklists] = React.useState(null);

  const fetchTournament = () =>
    get(params?.tournamentId).then(({ data }) => setTournament(data));

  const fetchDecklists = () => all().then(({ data }) => setDecklists(data));

  React.useEffect(() => {
    fetchTournament();
    fetchDecklists();
  }, [fetchTournament]);

  if (!tournament) {
    return null;
  }

  return (
    <Layout
      header
      title="Torneo"
      withBack
      containerStyle={{ flex: 1 }}
      style={styles.layout}>
      {tournament.platformId === 2 && (
        <ChallongeTournament {...{ ...tournament, decklists }} />
      )}
    </Layout>
  );
};

export default TournamentLanding;
