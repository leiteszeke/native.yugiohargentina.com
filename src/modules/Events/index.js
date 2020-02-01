// Dependencies
import React from 'react';
import { View, Text, Image, Linking, TouchableOpacity } from 'react-native';
import { Icon } from '@ant-design/react-native';
import moment from 'moment-timezone';
// Components
import Layout from '#components/Layout';
import Event from '#components/Event';
// Services
import * as EventsService from '#services/events';
// Images
import Logo from '#images/logo.png';
// Contexts
import { useLoader } from '#contexts/Loader';

const Events = () => {
  const { showLoader, hideLoader } = useLoader();
  const [events, setEvents] = React.useState([]);

  React.useEffect(() => {
    showLoader();
    EventsService.all()
      .then(res => {
        setEvents(res.data.sort((a, b) => {
          if (a.dateFrom < b.dateFrom) return 1;
          if (a.dateFrom > b.dateFrom) return -1;
          return 0;
        }));
      })
      .finally(() => hideLoader());
  }, []);

  return (
    <Layout header title="Eventos">
      {events.map(event => <Event key={event.id} {...event} />)}
    </Layout>
  )
}

export default Events;