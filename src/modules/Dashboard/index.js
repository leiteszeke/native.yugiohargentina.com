// Dependencies
import React from 'react';
import {Button} from '@ant-design/react-native';
import {View, Text} from 'react-native';
import {
  CommonActions,
  useNavigation,
  useRoute,
  useIsFocused,
} from '@react-navigation/native';
// Components
import Layout from '#components/Layout';
import {Title} from '#components/Text';
import HomeAdvertise from '#components/HomeAdvertise';
import Event from '#components/Event';
import FeatureHide from '#components/FeatureHide';
import Card from '#components/Card';
// Contexts
import {useLoader} from '#contexts/Loader';
// Services
import Advertising from '#services/advertisings';
import Events from '#services/events';
import Statistics from '#services/statistics';
// Hooks
import {useUser} from '#contexts/User';
// Helpers
import {removeSession} from '#helpers/session';

const Dashboard = () => {
  const navigation = useNavigation();
  const {user} = useUser();
  const isFocused = useIsFocused();
  const {hideLoader, showLoader} = useLoader();
  const [stats, setStats] = React.useState(null);
  const [advertising, setAdvertising] = React.useState(null);
  const [event, setEvent] = React.useState(null);
  const {params} = useRoute();

  const fetchEvent = () =>
    Events.all({limit: 1}).then(res => setEvent(res.data));

  const fetchStatistics = () => {
    if (user.id > 0) {
      Statistics.all()
        .then(res => setStats(res.data))
        .finally(() => hideLoader());
    }
  };

  const fetchAdvertising = () =>
    Advertising.all().then(res => setAdvertising(res.data || {}));

  const logout = () => {
    removeSession();
    navigation.navigate('Auth');
  };

  React.useEffect(() => {
    showLoader();
    fetchAdvertising();
    fetchEvent();
  }, []);

  React.useEffect(() => {
    if (params?.refresh) {
      showLoader();
      fetchAdvertising();
      fetchEvent();
      navigation.dispatch(CommonActions.setParams({}));
    }
  }, [isFocused]);

  React.useEffect(() => {
    if (user !== null && stats === null) fetchStatistics();
  }, [user]);

  React.useEffect(() => {
    if (event !== null && advertising !== null && user !== null) hideLoader();
  }, [advertising, event, user]);

  if (user === null) return null;

  const events = {
    onWillFocus: () => {
      fetchStatistics();
    },
  };

  return (
    <Layout header events={events} title="Dashboard">
      {advertising?.id && (
        <View style={{paddingHorizontal: 16, paddingTop: 16}}>
          <Title>{advertising.title}</Title>
          <HomeAdvertise {...{...advertising}} />
        </View>
      )}

      {event?.length > 0 && advertising && !advertising?.id && (
        <View style={{paddingHorizontal: 16, paddingTop: 16}}>
          <Event {...event} />
        </View>
      )}

      <View style={{paddingBottom: 16, marginTop: 16, paddingHorizontal: 16}}>
        <Title>Mis estadísticas</Title>
        <View style={{flexDirection: 'row', marginBottom: 16}}>
          <Card
            title="Cartas buscando"
            value={stats?.wanted || 0}
            style={{marginRight: 8}}
          />
          <Card
            title="Cartas en inventario"
            value={stats?.inventary || 0}
            style={{marginLeft: 8}}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Card
            title="Ranking YGO Arg"
            value={stats?.ranking || 0}
            style={{marginRight: 8}}
          />
          <Card
            title="Partidos invicto"
            value={stats?.inbeated || 0}
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
