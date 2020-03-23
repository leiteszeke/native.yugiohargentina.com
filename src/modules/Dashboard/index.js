// Dependencies
import React from 'react';
import {Button} from '@ant-design/react-native';
import {View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
// Components
import Layout from '#components/Layout';
import {Title} from '#components/Text';
import HomeAdvertise from '#components/HomeAdvertise';
import FeatureHide from '#components/FeatureHide';
import Card from '#components/Card';
// Contexts
import {useLoader} from '#contexts/Loader';
// Services
import {all} from '#services/statistics';
// Hooks
import {useUser} from '#contexts/User';
// Helpers
import {removeSession} from '#helpers/session';

const Dashboard = () => {
  const {navigate} = useNavigation();
  const {user} = useUser();
  const {hideLoader, showLoader} = useLoader();
  const [statistics, setStatistics] = React.useState(null);

  const fetchStatistics = () => {
    if (user.id > 0) {
      all()
        .then(res => setStatistics(res))
        .finally(() => hideLoader());
    }
  };

  const logout = () => {
    removeSession();
    navigate('Auth');
  };

  React.useEffect(() => {
    showLoader();
  }, []);

  React.useEffect(() => {
    if (user !== null && statistics === null) fetchStatistics();
  }, [user]);

  if (user === null) return null;

  const events = {
    onWillFocus: () => {
      fetchStatistics();
    },
  };

  const yacsEvent = {
    image:
      'https://s3-us-west-2.amazonaws.com/yugiohargentina.com/images/advertise/yacs-dueling-book.jpg',
    title: 'Yu-Gi-Oh! Argentina Championship Series - Crush Corona Virus',
    subtitle:
      'Se parte del 1er torneo online organizado por Yu-Gi-Oh! Argentina y enfrentemos al Corona Virus jugando desde casa.',
    tournamentId: 97,
  };

  return (
    <Layout header events={events} title="Dashboard">
      <View style={{paddingHorizontal: 16, paddingTop: 16}}>
        <Title>YACS is back bitches</Title>
        <HomeAdvertise {...{...yacsEvent}} />
      </View>
      <View style={{paddingBottom: 16, paddingHorizontal: 16}}>
        <Title>Mis estadísticas</Title>
        <View style={{flexDirection: 'row', marginBottom: 16}}>
          <Card
            title="Cartas buscando"
            value={statistics?.wanted || 0}
            style={{marginRight: 8}}
          />
          <Card
            title="Cartas en inventario"
            value={statistics?.inventary || 0}
            style={{marginLeft: 8}}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Card
            title="Ranking YGO Arg"
            value={statistics?.ranking || 0}
            style={{marginRight: 8}}
          />
          <Card
            title="Partidos invicto"
            value={statistics?.inbeated || 0}
            style={{marginLeft: 8}}
          />
        </View>
        {user.id <= 0 && (
          <FeatureHide style={{marginHorizontal: 16}}>
            <Title>Mis estadísticas</Title>
            <Text style={{marginBottom: 20}}>
              Si quieres ver tus estadísticas debes iniciar sesión.
            </Text>
            <Button onPress={logout} type="primary">
              INICIAR SESIÓN
            </Button>
          </FeatureHide>
        )}
      </View>
    </Layout>
  );
};

export default Dashboard;
