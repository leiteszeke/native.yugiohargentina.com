// Dependencies
import React from 'react';
// Components
import Layout from '#components/Layout';
import Event from '#components/Event';
// Services
import * as EventsService from '#services/events';
// Contexts
import { useLoader } from '#contexts/Loader';

const Events = () => {
  const { showLoader, hideLoader } = useLoader();
  const [events, setEvents] = React.useState([]);

  React.useEffect(() => {
    showLoader();
    EventsService.all()
      .then(({ data }) => setEvents(data?.sort((a, b) => {
        if (a.dateFrom < b.dateFrom) return 1;
        if (a.dateFrom > b.dateFrom) return -1;
        return 0;
      }) || []))
    .finally(() => hideLoader());
  }, []);

  return (
    <Layout header title="Eventos" withBack style={{ padding: 16 }}>
      {events.map(event => <Event key={event.id} {...event} />)}
    </Layout>
  )
}

export default Events;