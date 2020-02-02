// Dependencies
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import debounce from 'lodash.debounce';
import { withNavigation } from 'react-navigation';
// Components
import Layout from '#components/Layout';
import Input from '#components/Input';
// Services
import * as CardsService from '#services/cards';
import * as WishlistService from '#services/wishlist-cards';
import { goTo } from '#navigation';
// Styles
import styles from './styles';
// Contexts
import { useLoader } from '#contexts/Loader';
import { Button } from '@ant-design/react-native';

const Card = ({ navigation }) => {
  const { isLoading, showLoader, hideLoader } = useLoader();
  const { id, name } = navigation.state.params;
  const [wishlist, setWishlist] = React.useState([]);
  const [card, setCard] = React.useState({});

  const fetchWishlist = () => {
    WishlistService.all()
      .then(res => setWishlist({ ...res.data[0], cards: res.data[0].cards.map(c => c.singleId) }))
      .finally(() => hideLoader());
  }

  const addCard = item => () => {
    WishlistService.add({
      wishlistId: wishlist.id,
      cardId: card.id,
      languageId: 1,
      singleId: item.id
    })
      .then(() => {
        fetchWishlist();
        fetchCard();
      });
  }

  const removeCard = item => () => {
    WishlistService.remove(item.id)
      .then(() => {
        fetchWishlist();
        fetchCard();
      });
  }

  const fetchCard = () => {
    CardsService.get(id)
      .then(res => setCard(res));
  };

  React.useEffect(() => {
    if (card && wishlist) hideLoader()
  }, [card, wishlist]);

  React.useEffect(() => {
    showLoader();
    fetchCard();
    fetchWishlist();
  }, [id]);

  if (isLoading) return null;

  const events = {
    onWillFocus: () => {
      showLoader();
      fetchCard()
      fetchWishlist();
    }
  }

  return (
    <Layout header events={events} title={name}>
      {card?.singles?.map(single => (
        <React.Fragment key={single.id}>
          <View style={{ flexDirection: 'row', marginTop: 12 }}>
            <View style={{ width: 85 }}>
              <Image
                resizeMode="contain"
                source={{ uri: single.image }}
                style={{ height: 120, width: 85 }}
              />
            </View>
            <View style={{ flex: 1, paddingHorizontal: 12 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{single.name}</Text>
              <Text style={{ fontSize: 16 }}>{single.expansion?.name}</Text>
              <Text style={{ fontSize: 16 }}>{single.expansion?.code}-{single?.number?.padStart(4, '0')}</Text>
              <Text style={{ fontSize: 16 }}>{single.rarity}</Text>
            </View>
          </View>
          <View style={{ marginVertical: 20, width: '100%'}}>
            {wishlist?.cards?.includes(single.id) ? (
              <Button onPress={removeCard(single)} type="warning">QUITAR</Button>
            ) : (
              <Button onPress={addCard(single)} type="primary">AGREGAR</Button>
            )}
          </View>
        </React.Fragment>
      ))}
    </Layout>
  )
}

export default Card;