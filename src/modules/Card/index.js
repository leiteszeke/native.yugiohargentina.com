// Dependencies
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Button, ActivityIndicator } from '@ant-design/react-native';
// Components
import Layout from '#components/Layout';
// Services
import * as CardsService from '#services/cards';
import * as WishlistService from '#services/wishlist-cards';
// Contexts
import { useLoader } from '#contexts/Loader';

const Card = ({ navigation }) => {
  const { isLoading, showLoader, hideLoader } = useLoader();
  const { id, name } = navigation.state.params;
  const [wishlist, setWishlist] = React.useState([]);
  const [card, setCard] = React.useState({});
  const [singles, setSingles] = React.useState({});

  const fetchWishlist = () => {
    WishlistService.all()
      .then(res => setWishlist({ ...res.data[0], cards: res.data[0].cards.map(c => c.singleId) }))
      .finally(() => hideLoader());
  }

  const addCard = (item, index) => () => {
    setSingles({ loading: true, index });

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

  const removeCard = (item, index) => () => {
    setSingles({ loading: true, index });

    WishlistService.remove(item.id)
      .then(() => {
        fetchWishlist();
        fetchCard();
      });
  }

  const fetchCard = () => {
    CardsService.get(id)
      .then(res => {
        setCard(res);
        setSingles({ loading: false, index: null });
      });
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
    <Layout header events={events} title={name} style={{ padding: 16 }} withBack>
      {card?.singles?.map((single, index) => (
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
              <Button
                onPress={removeCard(single, index)}
                type="warning"
              >
                {singles.index === index && singles.loading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  'QUITAR'
                )}
              </Button>
            ) : (
              <Button
                onPress={addCard(single, index)}
                type="primary"
              >
                {singles.index === index && singles.loading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  'AGREGAR'
                )}
              </Button>
            )}
          </View>
        </React.Fragment>
      ))}
    </Layout>
  )
}

export default Card;