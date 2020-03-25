// Dependencies
import React from 'react';
import {View} from 'react-native';
import {Button} from '@ant-design/react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import WebView from 'react-native-webview';
// Contexts
import {useUser} from '#contexts/User';
// Components
import Layout from '#components/Layout';
// Styles
import styles from './styles';

const TournamentLanding = () => {
  const {navigate} = useNavigation();
  const {params} = useRoute();
  const {advertisingId, tournament} = params;

  const goToInscription = () =>
    navigate('TournamentInscription', {tournamentId: tournament.id});

  return (
    <Layout header withBack containerStyle={{flex: 1}} style={styles.layout}>
      <View style={{flex: 1}}>
        <WebView
          source={{uri: `http://192.168.1.16:8001/landings/${advertisingId}`}}
          style={{
            backgroundColor: 'transparent',
            marginBottom: 12,
            flex: 1,
          }}
        />
        <Button onPress={goToInscription} type="primary">
          INSCRIBIRME
        </Button>
      </View>
    </Layout>
  );
};

export default TournamentLanding;
