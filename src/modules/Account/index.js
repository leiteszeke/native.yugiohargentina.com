// Dependencies
import React from 'react';
import { Button } from '@ant-design/react-native';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
// Components
import Input from '#components/Input';
import Layout from '#components/Layout';
import FeatureHide from '#components/FeatureHide';
// Services
import * as Countries from '#services/countries';
import * as Users from '#services/users';
import * as States from '#services/states';
// Contexts
import { useLoader } from '#contexts/Loader';
import { useUser } from '#contexts/User';
// Styles
import styles, { dropdownStyle } from './styles';
// Helpers
import { removeSession } from '#helpers/session';

const Account = () => {
  const { navigate } = useNavigation();
  const { showLoader, isLoading, hideLoader } = useLoader();
  const { user } = useUser();
  const [data, setData] = React.useState({});
  const [states, setStates] = React.useState(null);
  const [countries, setCountries] = React.useState(null);

  const logout = () => {
    removeSession();
    navigate('Auth');
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

  const setValue = name => e => {
    const value = e?.nativeEvent?.text || e;

    setData(prev => ({
      ...prev,
      stateId: name === 'countryId' && value !== 1 ? null : prev.stateId,
      [name]: value,
    }));
  };

  React.useEffect(() => {
    showLoader();
    Users.me().then(user => setData(user));
    States.all().then(({ data }) => setStates(data));
    Countries.all().then(({ data }) => setCountries(data?.sort((a, b) => {
      if (a.name > b.name) return 1;
      if (b.name > a.name) return -1;
      return 0;
    }) || []));
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
      <Layout header noScroll title="Mi cuenta" withBack>
        <View style={{ flex: 1, padding: 16 }}>
          <FeatureHide style={{ height: '100%', margin: 16 }}>
            <Text style={{ marginBottom: 20 }}>Para ver tu cuenta, primero debes iniciar sesión.</Text>
            <Button onPress={logout} type="primary">INICIAR SESIÓN</Button>
          </FeatureHide>
        </View>
      </Layout>
    )
  }

  return (
    <Layout header headerActions={actions} title="Mi cuenta" withBack>
      <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
        <Text style={styles.title}>{data.name} {data.lastname}</Text>
      </View>
      <View style={{ flex: 1, paddingBottom: 16, paddingHorizontal: 16 }}>
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
        <View style={styles.dropdown}>
          <RNPickerSelect
            items={countries ? countries.map(country => ({ label: country.name, value: country.id })) : []}
            onValueChange={setValue('countryId')}
            placeholder={{ color: 'black', label: "Seleccione un Pais", value: null }}
            style={dropdownStyle}
            value={data.countryId}
          />
        </View>
        {(typeof data.countryId === 'undefined' || data.countryId === 1) && (
          <View style={styles.dropdown}>
            <RNPickerSelect
              items={states ? states.map(state => ({ label: state.name, value: state.id })) : []}
              onValueChange={setValue('stateId')}
              placeholder={{ color: 'black', label: "Seleccione una Provincia", value: null }}
              style={dropdownStyle}
              value={data.stateId}
            />
          </View>
        )}
        <Input
          onChange={setValue('city')}
          placeholder="Ciudad"
          value={data.city || ''} 
        />
      </View>
    </Layout>
  )
}

export default Account;