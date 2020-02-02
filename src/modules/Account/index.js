// Dependencies
import React from 'react';
import { Button } from '@ant-design/react-native';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-community/picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { withNavigation } from 'react-navigation';
// Components
import Input from '#components/Input';
import Layout from '#components/Layout';
import FeatureHide from '#components/FeatureHide';
// Services
import * as Countries from '#services/countries';
import * as Users from '#services/users';
import * as States from '#services/states';
import { TouchableOpacity } from 'react-native-gesture-handler';
// Contexts
import { useLoader } from '#contexts/Loader';
import { useUser } from '#contexts/User';
// Styles
import styles from './styles';
// Helpers
import { removeSession } from '#helpers/session';

const Account = ({ navigation }) => {
  const { showLoader, isLoading, hideLoader } = useLoader();
  const { user } = useUser();
  const [data, setData] = React.useState({});
  const [states, setStates] = React.useState(null);
  const [countries, setCountries] = React.useState(null);
  const [showPicker, setShowPicker] = React.useState({});

  const logout = () => {
    removeSession();
    navigation.navigate('Auth');
  }

  const saveData = () => {
    const {
     city,
      cossyId,
      challongeId,
      countryId,
      duelLinksId,
      duelingBookId,
      discordId,
      stateId
    } = data;

    showLoader();

    Users.update(data.id, {
      challongeId,
      city,
      countryId,
      cossyId,
      discordId,
      duelingBookId,
      duelLinksId,
      stateId
    }).then(({ data: user }) => {
      hideLoader()
      setData(user);

      // notification.success({
      //   message: 'Actualizar Usuario',
      //   description: 'Se han actualizado tus datos.',
      //   placement: 'bottomRight'
      // });
    });
  }

  const togglePicker = name => e => {
    setShowPicker(prev => ({
      ...prev,
      [name]: !prev[name]
    }))
  }

  const setValue = name => e => {
    const value = e.nativeEvent ? e.nativeEvent.text : e;

    togglePicker(name)()

    setData(prev => ({
      ...prev,
      stateId: name === 'countryId' && value !== 1 ? null : prev.stateId,
      [name]: value,
    }));
  };

  React.useEffect(() => {
    showLoader();
    Users.me().then(user => setData(user));
    States.all().then(data => setStates(data));
    Countries.all().then(data => setCountries(data.sort((a, b) => {
      if (a.name > b.name) return 1;
      if (b.name > a.name) return -1;
      return 0;
    })));
  }, []);

  React.useEffect(() => {
    if (data !== null && states !== null && countries !== null) hideLoader();
  }, [data, states, countries]);

  if (isLoading) return null

  const actions = (
    <Icon onPress={saveData} name="ios-save" color="#000000" size={32} />
  )

  if (user.id <= 0) {
    return (
      <Layout header noScroll title="Mi cuenta">
        <View style={{ flex: 1 }}>
          <FeatureHide style={{ height: '100%' }}>
            <Text style={{ marginBottom: 20 }}>Para ver tu cuenta, primero debes iniciar sesión.</Text>
            <Button onPress={logout} type="primary">INICIAR SESIÓN</Button>
          </FeatureHide>
        </View>
      </Layout>
    )
  }

  return (
    <Layout header headerActions={actions} title="Mi cuenta">
      <View>
        <Text style={styles.title}>{data.name} {data.lastname}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Input
          onChange={setValue('cossyId')}
          maxLength={10}
          placeholder="COSSY ID"
          value={data.cossyId || ''}
        />
        <Input
          onChange={setValue('duelLinksId')}
          placeholder="Duel Links ID"
          value={data.duelLinksId || ''}
        />
        <Input
          onChange={setValue('duelingBookId')}
          placeholder="Dueling Book User"
          value={data.duelingBookId || ''}
        />
        <Input
          onChange={setValue('discordId')}
          placeholder="Discord User"
          value={data.discordId || ''}
        />
        <Input
          onChange={setValue('challongeId')}
          placeholder="Challonge User"
          value={data.challongeId || ''} 
        />
        <View>
          <TouchableOpacity
            onPress={togglePicker('countryId')}
            style={styles.textInput}
          >
            <Text style={styles.placeholder}>
              Pais: {countries && countries.find(c => c.id === data.countryId)?.name}
            </Text>
          </TouchableOpacity>
        </View>
        {(typeof data.countryId === 'undefined' || data.countryId === 1) && (
          <View>
            <TouchableOpacity
              onPress={togglePicker('stateId')}
              style={styles.textInput}
            >
              <Text style={styles.placeholder}>
                Provincia: {states && states.find(s => s.id === data.stateId)?.name}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        <Input
          onChange={setValue('city')}
          placeholder="Ciudad"
          value={data.city || ''} 
        />
      </View>
      {showPicker.countryId && (
        <Picker
          mode="dialog"
          onValueChange={setValue('countryId')}
          selectedValue={data.countryId}
          style={styles.picker}
        >
          {countries && countries.map(country =>
            <Picker.Item label={country.name} key={country.id} value={country.id} />
          )}
        </Picker>
      )}
      {showPicker.stateId && (
        <Picker
          enabled={(typeof data.countryId === 'undefined' || data.countryId === 1)}
          onValueChange={setValue('stateId')}
          selectedValue={data.stateId}
        >
          {states && states.map(state =>
            <Picker.Item label={state.name} key={state.id} value={state.id} />
          )}
        </Picker>
      )}
    </Layout>
  )
}

export default withNavigation(Account);