// Dependencies
import React from 'react';
import { Button } from '@ant-design/react-native';
import { View, Text } from 'react-native';
import {
  CommonActions,
  useNavigation,
  useRoute,
  RouteProp,
  useIsFocused,
} from '@react-navigation/native';
// Components
import Layout from '#components/Layout';
import { Title } from '#components/Text/Text';
import HomeAdvertise from '#components/HomeAdvertise';
import Event from '#components/Event';
import FeatureHide from '#components/FeatureHide';
import Card from '#components/Card';
// Services
import Advertising from '#services/advertisings';
import Events from '#services/events';
import Statistics from '#services/statistics';
// Hooks
import { useUser } from '#contexts/User';
// Helpers
import { removeSession } from '#helpers/session';
// Types
import { RootStackParamList, EventProps } from '#types';

type StatsProps = {
  wanted: number;
  inventary: number;
  credits: number;
  inbeated: number;
}

type AdvertisingProps = {
  id: number;
  title: string;
}

const Dashboard = () => {
  const navigation = useNavigation();
  const { user } = useUser();
  const isFocused = useIsFocused();
  const { params } = useRoute<RouteProp<RootStackParamList, 'Dashboard'>>();

  const [stats, setStats] = React.useState<StatsProps | null>(null);
  const [advertising, setAdvertising] = React.useState<AdvertisingProps | null>(null);
  const [event, setEvent] = React.useState<EventProps | null>(null);
  const [fetchingStatistics, setFetchingStatistics] = React.useState<boolean>(false);

  const fetchEvent = () => Events.all({ limit: 1 }).then(res => {
    if (res.data.length > 0) setEvent(res.data);
  });

  const fetchStatistics = () => {
    if (user.id > 0) Statistics.all().then(res => setStats(res.data))
  };

  const fetchAdvertising = () => Advertising.all().then(res => setAdvertising(res.data || {}));

  const logout = () => {
    removeSession();
    navigation.navigate('Auth');
  };

  const init = () => {
    fetchAdvertising();
    fetchEvent();
  }

  React.useEffect(() => {
    init()
  }, []);

  React.useEffect(() => {
    if (params?.refresh) {
      init();
      navigation.dispatch(CommonActions.setParams({}));
    }
  }, [isFocused, navigation, params]);

  React.useEffect(() => {
    if (user?.id > 0 && stats === null && !fetchingStatistics) {
      setFetchingStatistics(true);
      fetchStatistics();
    }
  }, [fetchingStatistics, fetchStatistics, stats, user]);

  if (user === null) {
    return null;
  }

  return (
    <Layout header title="Dashboard">
      {advertising?.id && (
        <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
          <Title>{advertising.title}</Title>
          <HomeAdvertise {...{ ...advertising }} />
        </View>
      )}

      {event !== null && advertising && !advertising?.id && (
        <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
          <Event {...event} />
        </View>
      )}

      <View style={{ paddingBottom: 16, marginTop: 16, paddingHorizontal: 16 }}>
        <Title>Mis estadísticas</Title>
        <View style={{ flexDirection: 'row', marginBottom: 16 }}>
          <Card
            title="Cartas buscando"
            value={stats?.wanted || 0}
            style={{ marginRight: 8 }}
          />
          <Card
            title="Cartas en inventario"
            value={stats?.inventary || 0}
            style={{ marginLeft: 8 }}
          />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Card
            title="Créditos"
            value={stats?.credits || 0}
            style={{ marginRight: 8 }}
          />
          <Card
            title="Partidos invicto"
            value={stats?.inbeated || 0}
            style={{ marginLeft: 8 }}
          />
        </View>
        {user.id <= 0 && (
          <FeatureHide style={{ marginHorizontal: 16 }}>
            <Title>Mis estadísticas</Title>
            <Text style={{ marginBottom: 20 }}>
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
