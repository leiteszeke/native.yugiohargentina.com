// Dependencies
import React from 'react';
import { Button } from '@ant-design/react-native';
import { View, Text, Alert, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
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
import { useUser } from '#contexts/User';
// Styles
import styles, { dropdownStyle } from './styles';
// Helpers
import { removeSession } from '#helpers/session';
// Types
import { CountryProps, UserProps, StateProps } from '#types';

const Account = () => {
  const { navigate } = useNavigation();
  const { user, updateUser } = useUser();
  const [data, setData] = React.useState<UserProps | null>(null);
  const [states, setStates] = React.useState<Array<StateProps> | null>(null);
  const [countries, setCountries] = React.useState<Array<CountryProps> | null>(null);

  const logout = () => {
    removeSession();
    navigate('Auth');
  };

  const saveData = () => {
    if (data) {
      Users.update(data.id, data).then(res => {
        setData(res.data);
        updateUser();

        Alert.alert('Actualizar Usuario', 'Se han actualizado tus datos.');
      });
    }
  };

  const setValue = (name: string) => (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    if (typeof e.persist === 'function') {
      e.persist();
    }

    const newData: UserProps | null = data;

    if (newData !== null) {
      newData[name] = e.nativeEvent.text;
      setData(newData);
    }
  };

  const setSelectValue = (name: string) => (value: string | number) => {
    const newData: UserProps | null = data;

    if (newData !== null) {
      if (name === 'countryId' && value !== 1) {
        newData.stateId = null
      }

      newData[name] = value;

      setData(newData);
    }
  }

  const fetchUser = () => Users.me().then(res => setData(res.data));
  const fetchStates = () => States.all().then(({ data }) => setStates(data));

  const fetchCountries = () => Countries.all()
    .then(({ data }) => {
      const countriesSorted = data.sort((a: CountryProps, b: CountryProps) => {
        if (a.name > b.name) return 1;
        if (b.name > a.name) return -1;
        return 0;
      });
      setCountries(countriesSorted);
    });

  React.useEffect(() => {
    fetchUser();
    fetchStates();
    fetchCountries();
  }, []);


  const actions = (
    <Icon onPress={saveData} name="ios-save" color="#000000" size={32} />
  );

  if (user.id <= 0) {
    return (
      <Layout header noScroll title="Mi cuenta" withBack>
        <View style={{ flex: 1, padding: 16 }}>
          <FeatureHide style={{ height: '100%', margin: 16 }}>
            <Text style={{ marginBottom: 20 }}>
              Para ver tu cuenta, primero debes iniciar sesión.
            </Text>
            <Button onPress={logout} type="primary">
              INICIAR SESIÓN
            </Button>
          </FeatureHide>
        </View>
      </Layout>
    );
  }

  if (data === null) {
    return null;
  }

  return (
    <Layout header headerActions={actions} title="Mi cuenta" withBack>
      <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
        <Text style={styles.title}>
          {data.name} {data.lastname}
        </Text>
      </View>
      <View style={{ flex: 1, paddingBottom: 16, paddingHorizontal: 16 }}>
        <Input
          onChange={setValue('cossyId')}
          maxLength={10}
          placeholder="COSSY ID"
          value={data?.cossyId || ''}
        />
        <Input
          onChange={setValue('duelLinksId')}
          placeholder="Duel Links ID"
          value={data?.duelLinksId || ''}
        />
        <Input
          onChange={setValue('duelingBookId')}
          placeholder="Dueling Book User"
          value={data?.duelingBookId || ''}
        />
        <Input
          onChange={setValue('discordId')}
          placeholder="Discord User"
          value={data?.discordId || ''}
        />
        <Input
          onChange={setValue('challongeId')}
          placeholder="Challonge User"
          value={data?.challongeId || ''}
        />
        <View style={styles.dropdown}>
          <RNPickerSelect
            items={
              countries
                ? countries.map(country => ({
                    label: country.name,
                    value: country.id,
                  }))
                : []
            }
            onValueChange={setSelectValue('countryId')}
            placeholder={{
              color: 'black',
              label: 'Seleccione un Pais',
              value: null,
            }}
            style={dropdownStyle}
            value={data?.countryId}
          />
        </View>
        {(typeof data?.countryId === 'undefined' || data?.countryId === 1) && (
          <View style={styles.dropdown}>
            <RNPickerSelect
              items={
                states
                  ? states.map(state => ({
                      label: state.name,
                      value: state.id,
                    }))
                  : []
              }
              onValueChange={setSelectValue('stateId')}
              placeholder={{
                color: 'black',
                label: 'Seleccione una Provincia',
                value: null,
              }}
              style={dropdownStyle}
              value={data?.stateId}
            />
          </View>
        )}
        <Input
          onChange={setValue('city')}
          placeholder="Ciudad"
          value={data?.city || ''}
        />
      </View>
    </Layout>
  );
};

export default Account;
