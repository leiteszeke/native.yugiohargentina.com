// Dependencies
import React from 'react';
import { View, Text, Image, Linking, TouchableOpacity } from 'react-native';
import { Icon } from '@ant-design/react-native';
import moment from 'moment-timezone';
// Styles
import styles from './styles';
// Images
import Logo from '#images/logo.png';

const Event = event => {
  const image = event.image ? { uri: event.image } : Logo;

  const goToEvent = React.useCallback(async () => {
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

export default Event;