// Dependencies
import React from 'react';
import { View, Text, Image, Linking, TouchableOpacity } from 'react-native';
import { Icon } from '@ant-design/react-native';
import moment from 'moment-timezone';
// Components
import Layout from '../../components/Layout';
// Services
import * as EventsService from '../../services/events';
// Styles
import styles from './styles';
// Images
import Logo from '../../images/logo.png';

const Event = event => {
  const image = event.image ? { uri: event.image } : Logo;

  const goToEvent = React.useCallback(() => {
    Linking.openURL(`https://facebook.com/events/${event.fbuid}`);
  }, []);

  return (
    <View style={styles.wrapper}>
      <View style={styles.imageContainer}>
        <Image source={image} resizeMode="contain" style={styles.image} />
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>{event.title}</Text>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.text}>{event.location}</Text>
            <Text style={styles.text}>{moment(event.dateFrom).tz('America/Argentina/Buenos_Aires').format("DD/MM/YYYY HH:mm")}</Text>
          </View>
          <TouchableOpacity onPress={goToEvent}>
            <Icon name="facebook" color="#1890ff" size={40} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const Events = () => {
  const [events, setEvents] = React.useState([]);

  React.useEffect(() => {
    EventsService.all().then(res => setEvents(res.data.sort((a, b) => {
      if (a.dateFrom < b.dateFrom) return 1;
      if (a.dateFrom > b.dateFrom) return -1;
      return 0;
    })));
  }, []);

  return (
    <Layout header title="Eventos">
      {events.map(event => <Event key={event.id} {...event} />)}
    </Layout>
  )
}

export default Events;