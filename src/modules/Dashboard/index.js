// Dependencies
import React from 'react';
import { Button } from '@ant-design/react-native';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
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

const Dashboard = () => {
  const { navigate } = useNavigation();
  const { user } = useUser()
  const { hideLoader, showLoader } = useLoader();
  const [event, setEvent] = React.useState(null);
  const [statistics, setStatistics] = React.useState(null);

  const fetchEvent = () => {
    showLoader();
    EventsService.all({ limit: 1 })
      .then(res => setEvent(res.data));
  }

  const fetchStatistics = () => {
    if (user.id > 0) {
      StatisticsService.all()
        .then(res => setStatistics(res.data));
    }
  }

  const logout = () => {
    removeSession();
    navigate('Auth');
  }

  React.useEffect(() => {
    showLoader();
    fetchEvent();
  }, []);

  React.useEffect(() => {
    if (user !== null && statistics === null) fetchStatistics()
  }, [user])

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
      {event?.id && (
        <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
          <Title>Próximo Evento</Title>
          <Event {...{...event, home: true }} />
        </View>
      )}
      <View style={{ paddingBottom: 16, paddingHorizontal: 16 }}>
        <Title>Mis estadísticas</Title>
        <View style={{ flexDirection: 'row', marginBottom: 16 }}>
          <Card title="Cartas buscando" value={statistics?.wanted || 0} style={{ marginRight: 8 }} />
          <Card title="Cartas en inventario" value={statistics?.inventary || 0} style={{ marginLeft: 8 }} />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Card title="Ranking YGO Arg" value={statistics?.ranking || 0} style={{ marginRight: 8 }} />
          <Card title="Partidos invicto" value={statistics?.inbeated || 0} style={{ marginLeft: 8 }} />
        </View>
        {user.id <= 0 && (
          <FeatureHide style={{ marginHorizontal: 16 }}>
            <Title>Mis estadísticas</Title>
            <Text style={{ marginBottom: 20 }}>Si quieres ver tus estadísticas debes iniciar sesión.</Text>
            <Button onPress={logout} type="primary">INICIAR SESIÓN</Button>
          </FeatureHide>
        )}
      </View>
    </Layout>
  )
}

export default Dashboard;