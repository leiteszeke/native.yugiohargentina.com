// Dependencies
import React from 'react';
import {Text, View} from 'react-native';
// Components
import Layout from '#components/Layout';
import Event from '#components/Event';
// Services
import * as EventsService from '#services/events';
// Contexts
import {useLoader} from '#contexts/Loader';

const Events = () => {
  const {showLoader, hideLoader} = useLoader();
  const [events, setEvents] = React.useState([]);

  React.useEffect(() => {
    showLoader();
    EventsService.all()
      .then(({data}) =>
        setEvents(
          data?.sort((a, b) => {
            if (a.dateFrom > b.dateFrom) return 1;
            if (a.dateFrom < b.dateFrom) return -1;
            return 0;
          }) || [],
        ),
      )
      .finally(() => hideLoader());
  }, []);

  return (
    <Layout header title="Eventos" withBack style={{flex: 1, padding: 16}}>
      {events.length > 0 ? (
        events.map(event => <Event key={event.id} {...event} />)
      ) : (
        <View style={styles.emptyPage}>
          <Text style={styles.emptyMessage}>
            Aún no tienes cartas en tu lista de deseos.
          </Text>
        </View>
      )}
    </Layout>
  );
};

export default Events;
