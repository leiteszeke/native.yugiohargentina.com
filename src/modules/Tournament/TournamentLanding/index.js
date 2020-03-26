// Dependencies
import React from 'react';
import {Alert, View} from 'react-native';
import {Button} from '@ant-design/react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import WebView from 'react-native-webview';
import {LANDING_URL} from 'react-native-dotenv';
// Contexts
import {useUser} from '#contexts/User';
// Components
import Layout from '#components/Layout';
// Styles
import styles from './styles';

const TournamentLanding = () => {
  const {navigate} = useNavigation();
  const {params} = useRoute();
  const {user} = useUser();
  const {advertisingId, tournament} = params;

  const goToInscription = () => {
    if (user.id <= 0) {
      return Alert.alert(
        'Oops',
        'Debes ingresar a tu cuenta para poder inscribirte a un torneo',
      );
    }

    navigate('TournamentInscription', {tournamentId: tournament.id});
  };

  return (
    <Layout header withBack containerStyle={{flex: 1}} style={styles.layout}>
      <View style={{flex: 1}}>
        <WebView
          source={{uri: `${LANDING_URL}${advertisingId}`}}
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
