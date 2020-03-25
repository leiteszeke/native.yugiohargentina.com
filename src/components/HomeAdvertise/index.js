// Dependencies
import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
// Contexts
import {useUser} from '#contexts/User';
// Styles
import styles from './styles';
// Images
import Logo from '#images/logo.png';

const HomeAdvertise = advertise => {
  const {navigate} = useNavigation();
  const {user} = useUser();
  const image = advertise.image ? {uri: advertise.image} : Logo;

  const goToEntity = () => {
    if (advertise.entityType === 'Tournament') {
      const isRegistered = advertise.entity.players.find(
        f => f.userId === user.id,
      );

      if (isRegistered) {
        navigate('TournamentInscription', {
          tournamentId: advertise.entity.id,
        });
      } else {
        navigate('TournamentLanding', {
          advertisingId: advertise.id,
          tournament: advertise.entity,
        });
      }
    }
  };

  return (
    <TouchableOpacity onPress={goToEntity} style={styles.wrapper}>
      <View style={styles.imageContainer}>
        <Image source={image} resizeMode="contain" style={styles.image} />
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>{advertise.title}</Text>
        <Text style={styles.text}>{advertise.subtitle}</Text>
        <Text style={styles.more}>Más info</Text>
      </View>
    </TouchableOpacity>
  );
};

export default HomeAdvertise;
