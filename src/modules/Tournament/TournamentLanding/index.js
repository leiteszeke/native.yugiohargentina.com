// Dependencies
import React from 'react';
import {Text, View} from 'react-native';
import {Button} from '@ant-design/react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
// Components
import Layout from '#components/Layout';
// Styles
import styles from './styles';

const TournamentLanding = () => {
  const {navigate} = useNavigation();
  const {params} = useRoute();

  const goToInscription = () =>
    navigate('TournamentInscription', {tournamentId: params?.tournamentId});

  return (
    <Layout header title="Inscribite al YACS" withBack style={styles.layout}>
      <View>
        <Text style={styles.title}>
          Yu-Gi-Oh! Argentina Championship Series - Crush Corona Virus
        </Text>
        <Text style={styles.subtitle}>
          Tenemos el agrado de anunciar la prueba piloto de los YACS de manera
          online utilizando Dueling Book como plataforma. A medida que vayamos
          haciendo más ediciones iremos mejorando la metodología y los premios
          de los mismos.
        </Text>
        <Text style={styles.sectionTitle}>Requisitos</Text>
        <Text style={styles.listItem}>Cossy ID</Text>
        <Text style={[styles.listItem, styles.separator]}>Dueling Book ID</Text>
        <Text style={styles.sectionTitle}>¿Como funciona?</Text>
        <Text style={styles.text}>
          Al momento de inscribirse, tendrán que ingresar su decklist en formato
          YDK (el mismo se exporta desde Dueling Book)
        </Text>
        <Text style={styles.text}>
          El formato de juego será Advanced con las cartas disponibles para la
          región a la fecha del torneo, tal cual el TCG.
        </Text>
        <Text style={styles.text}>
          Se jugaran rondas de 40 minutos. Una vez pasado los 40 minutos, el
          sistema solo permitirá subir los resultados en los próximos 10
          minutos, de lo contrario, se dará el partido como double loss.
        </Text>
        <Text style={styles.text}>
          El resultado constará en que el jugador ganador reporte quien gano, el
          resultado en partidos, y subir el replay del partido.
        </Text>
        <Text style={styles.text}>
          Una vez reportados todos los partidos, se generará la nueva ronda.
        </Text>
        <Text style={styles.text}>
          Utilizaremos Discord como nuestro método de comunicación principal.
          Para este torneo asignaremos
          <Text style={{fontWeight: 'bold'}}> #yacs-corona-virus</Text>
        </Text>
        <Button onPress={goToInscription} type="primary">
          Inscribirme
        </Button>
      </View>
    </Layout>
  );
};

export default TournamentLanding;
