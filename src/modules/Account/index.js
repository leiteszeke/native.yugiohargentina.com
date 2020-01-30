// Dependencies
import React from 'react';
import { TextInput, View, Text, KeyboardAvoidingView } from 'react-native';
import { Picker } from '@react-native-community/picker';
// Components
import Icon from 'react-native-vector-icons/Ionicons';
import Layout from '#components/Layout';
// Services
import * as Countries from '#services/countries';
import * as Users from '#services/users';
import * as States from '#services/states';
import { TouchableOpacity } from 'react-native-gesture-handler';
// Contexts
import { useLoader } from '#contexts/Loader';

const styles = {
  title: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },

  textInput: {
    height: 39,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    color: 'black',
    fontSize: 18,
    marginBottom: 8,
    paddingHorizontal: 4,
  },

  placeholder: {
    color: 'black',
    fontSize: 18,
    lineHeight: 38,
  },

  picker: {
    flex: 1,
    width: '100%'
  }
};

const Account = () => {
  const { showLoader, isLoading, hideLoader } = useLoader();
  const [data, setData] = React.useState({});
  const [states, setStates] = React.useState(null);
  const [countries, setCountries] = React.useState(null);
  const [showPicker, setShowPicker] = React.useState({});

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

  return (
    <Layout header headerActions={actions} title="Mi cuenta">
      <KeyboardAvoidingView>
        <View>
          <Text style={styles.title}>{data.name} {data.lastname}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <View>
            <TextInput
              onChange={setValue('cossyId')}
              maxLength={10}
              placeholder="COSSY ID"
              placeholderTextColor="black"
              style={styles.textInput}
              value={data.cossyId || ''}
            />
          </View>
          <View>
            <TextInput
              onChange={setValue('duelLinksId')}
              placeholder="Duel Links ID"
              placeholderTextColor="black"
              style={styles.textInput}
              value={data.duelLinksId || ''}
            />
          </View>
          <View>
            <TextInput
              onChange={setValue('duelingBookId')}
              placeholder="Dueling Book User"
              placeholderTextColor="black"
              style={styles.textInput}
              value={data.duelingBookId || ''}
            />
          </View>
          <View>
            <TextInput
              onChange={setValue('discordId')}
              placeholder="Discord User"
              placeholderTextColor="black"
              style={styles.textInput}
              value={data.discordId || ''}
            />
          </View>
          <View>
            <TextInput
              onChange={setValue('challongeId')}
              placeholder="Challonge User"
              placeholderTextColor="black"
              style={styles.textInput}
              value={data.challongeId || ''} 
            />
          </View>
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
          <View>
            <TextInput
              onChange={setValue('city')}
              placeholder="Ciudad"
              placeholderTextColor="black"
              style={styles.textInput}
              value={data.city || ''} 
            />
          </View>
        </View>
      </KeyboardAvoidingView>
      {showPicker.countryId && (
        <Picker
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

export default Account;