// Dependencies
import React from 'react';
import { Text, View } from 'react-native';
// Components
import Layout from '#components/Layout';
import Event from '#components/Event';
// Services
import * as EventsService from '#services/events';
// Styles
import styles from './Events.styles';
// Types
import { EventProps } from '#types';

const Events = () => {
  const [events, setEvents] = React.useState<Array<EventProps> | null>(null);

  const fetchEvents = () =>
    EventsService.all().then(({ data }) =>
      setEvents(
        data?.sort((a: EventProps, b:EventProps) => {
          if (a.dateFrom > b.dateFrom) {
            return 1;
          }
          if (a.dateFrom < b.dateFrom) {
            return -1;
          }
          return 0;
        }) || [],
      ),
    );

  React.useEffect(() => {
    fetchEvents();
  }, []);

  if (events === null) {
    return null;
  }

  return (
    <Layout header title="Eventos" withBack style={styles.layout}>
      {events.length > 0 ? (
        events.map(event => <Event key={event.id} {...event} />)
      ) : (
        <View style={styles.emptyPage}>
          <Text style={styles.emptyMessage}>
            En este momento no hay eventos futuros reportados.
          </Text>
        </View>
      )}
    </Layout>
  );
};

export default Events;
