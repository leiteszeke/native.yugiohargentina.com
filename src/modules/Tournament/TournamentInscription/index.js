// Dependencies
import React from 'react';
import {useRoute} from '@react-navigation/native';
// Services
import {get} from '#services/tournaments';
// Components
import Layout from '#components/Layout';
import ChallongeTournament from '../ChallongeTournament';
// Styles
import styles from './styles';

const TournamentLanding = () => {
  const {params} = useRoute();
  const [tournament, setTournament] = React.useState(null);

  const fetchTournament = () => {
    get(params?.tournamentId || 97).then(({data}) => setTournament(data));
  };

  React.useEffect(() => {
    fetchTournament();
  }, []);

  if (!tournament) return null;

  return (
    <Layout header title={tournament.title} withBack style={styles.layout}>
      {tournament.platformId === 2 && <ChallongeTournament {...tournament} />}
    </Layout>
  );
};

export default TournamentLanding;
