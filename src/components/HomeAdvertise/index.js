// Dependencies
import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
// Styles
import styles from './styles';
// Images
import Logo from '#images/logo.png';

const HomeAdvertise = advertise => {
  const {navigate} = useNavigation();
  const image = advertise.image ? {uri: advertise.image} : Logo;
  const goToTournament = () =>
    navigate('TournamentLanding', {tournamentId: advertise.tournamentId});

  return (
    <TouchableOpacity onPress={goToTournament} style={styles.wrapper}>
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
