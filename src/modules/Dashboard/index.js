// Dependencies
import React from 'react';
import { Button } from '@ant-design/react-native';
import { View, Text } from 'react-native';
import { withNavigation } from 'react-navigation';
// Components
import Layout from '#components/Layout';
import { Title } from '#components/Text';
import Event from '#components/Event';
import FeatureHide from '#components/FeatureHide';
import Card from '#components/Card';
// Contexts
import { useLoader } from '#contexts/Loader';
// Services
import * as EventsService from '#services/events';
import * as StatisticsService from '#services/statistics';
// Hooks
import { useUser } from '#contexts/User';
// Helpers
import { removeSession } from '#helpers/session';

const Dashboard = ({ navigation }) => {
  const { user } = useUser()
  const { hideLoader, showLoader } = useLoader();
  const [event, setEvent] = React.useState(null);
  const [statistics, setStatistics] = React.useState({});

  const fetchEvent = () => {
    showLoader();
    EventsService.all({ limit: 1 })
      .then(res => setEvent(res.data));
  }

  const fetchStatistics = () => {
    if (user.id > 0) {
      StatisticsService.all()
        .then(res => setStatistics(res.data))
    }
  }

  const logout = () => {
    removeSession();
    navigation.navigate('Auth');
  }

  React.useEffect(() => {
    showLoader();
    fetchEvent();
    fetchStatistics();
  }, []);

  React.useEffect(() => {
    if (event !== null && user !== null) hideLoader()
  }, [event, user])

  if (user === null) return null;

  const events = {
    onWillFocus: () => {
      fetchStatistics();
    }
  }

  return (
    <Layout header events={events} title="Dashboard">
      <View>
        <Title>Próximo Evento</Title>
        <Event {...event} />
      </View>
      <View>
        <Title>Mis estadísticas</Title>
        <View style={{ flexDirection: 'row', marginBottom: 16 }}>
          <Card title="Cartas buscando" value={statistics.wanted || 0} style={{ marginRight: 8 }} />
          <Card title="Torneos jugando" value={statistics.playing || 0} style={{ marginLeft: 8 }} />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Card title="Ranking YGO Arg" value={statistics.ranking || 0} style={{ marginRight: 8 }} />
          <Card title="Partidos invicto" value={statistics.inbeated || 0} style={{ marginLeft: 8 }} />
        </View>
        {user.id <= 0 && (
          <FeatureHide>
            <Title>Mis estadísticas</Title>
            <Text style={{ marginBottom: 20 }}>Si quieres ver tus estadísticas debes iniciar sesión.</Text>
            <Button onPress={logout} type="primary">INICIAR SESIÓN</Button>
          </FeatureHide>
        )}
      </View>
    </Layout>
  )
}

export default withNavigation(Dashboard);