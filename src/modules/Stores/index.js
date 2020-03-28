// Dependencies
import React from 'react';
import { View, Image, Text, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SITE_URL } from 'react-native-dotenv';
// Components
import Layout from '#components/Layout';
// Services
import * as StoresService from '#services/stores';
// Images
import Logo from '#images/logo.png';
// Styles
import styles from './styles';
// Contexts
import {useLoader} from '#contexts/Loader';

const Store = store => {
  const imagesUrl = `${SITE_URL}/images/stores/`;
  const image = store.image ? { uri: `${imagesUrl}${store.image}` } : Logo;

  const goTo = React.useCallback(
    link => () => {
      Linking.openURL(link);
    },
    [],
  );

  const parseType = type => {
    if (type === 'facebook') return 'logo-facebook';
    if (type === 'instagram') return 'logo-instagram';
    if (type === 'enviroment') return 'ios-map';
    return 'ios-home';
  };

  return (
    <View style={styles.storeContainer}>
      <Image
        source={image}
        alt={store.name}
        style={styles.storeImage}
        resizeMode="contain"
      />
      <View style={styles.storeData}>
        <Text style={{fontSize: 20}}>{store.name}</Text>
        <Text style={{fontSize: 14}}>
          {store.address}, {store.city}, {store.state.name}
        </Text>
        <View style={styles.iconContainer}>
          {store.links &&
            store.links.map(link => (
              <TouchableOpacity onPress={goTo(link.url)} key={link.id}>
                <Icon
                  color="#1890ff"
                  name={parseType(link.type)}
                  style={{marginRight: 12}}
                  size={20}
                />
              </TouchableOpacity>
            ))}
        </View>
      </View>
    </View>
  );
};

const Stores = () => {
  const {isLoading, showLoader, hideLoader} = useLoader();
  const [stores, setStores] = React.useState([]);

  React.useEffect(() => {
    showLoader();
    StoresService.all()
      .then(res => {
        setStores(
          res.data.sort((a, b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
          }),
        );
      })
      .finally(() => hideLoader());
  }, []);

  if (isLoading) return null;

  return (
    <Layout header title="Locales" withBack style={{padding: 16}}>
      {stores.map(store => (
        <Store key={store.id} {...store} />
      ))}
    </Layout>
  );
};

export default Stores;
