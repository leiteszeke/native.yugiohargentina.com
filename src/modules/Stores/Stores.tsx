// Dependencies
import React from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import Image from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';
import { SITE_URL } from 'react-native-dotenv';
// Components
import Layout from '#components/Layout';
// Services
import * as StoresService from '#services/stores';
// Images
import Logo from '#images/logo.png';
// Styles
import styles from './Stores.styles';
// Types
import { StoreProps } from '#types';

const renderStore = (store: StoreProps) => {
  const imagesUrl = `${SITE_URL}/images/stores/`;
  const image = store.image ? { uri: `${imagesUrl}${store.image}` } : Logo;

  const goTo = (link: string) => () => Linking.openURL(link);

  const parseType = (type: string) => {
    if (type === 'facebook') {
      return 'logo-facebook';
    }
    if (type === 'instagram') {
      return 'logo-instagram';
    }
    if (type === 'environment') {
      return 'ios-map';
    }
    return 'ios-home';
  };

  return (
    <View key={store.id} style={styles.storeContainer}>
      <Image source={image} style={styles.storeImage} resizeMode="contain" />
      <View style={styles.storeData}>
        <Text style={styles.storeName}>{store.name}</Text>
        <Text style={styles.storeAddress}>
          {store.address}, {store.city}, {store.state.name}
        </Text>
        <View style={styles.iconContainer}>
          {store.links &&
            store.links.map(link => (
              <TouchableOpacity onPress={goTo(link.url)} key={link.id}>
                <Icon
                  color="#1890ff"
                  name={parseType(link.type)}
                  style={styles.storeLinkIcon}
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
  const [stores, setStores] = React.useState<Array<StoreProps> | null>(null);

  const fetchStores = () =>
    StoresService.all().then(res => {
      setStores(
        res.data.sort((a: StoreProps, b: StoreProps) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        }),
      );
    });

  React.useEffect(() => {
    fetchStores();
  }, []);

  return (
    <Layout header title="Locales" withBack style={styles.layout}>
      {stores && stores.map(renderStore)}
    </Layout>
  );
};

export default Stores;
