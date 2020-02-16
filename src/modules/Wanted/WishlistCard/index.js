// Dependencies
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Button, ActivityIndicator, } from '@ant-design/react-native';
import Modal from "react-native-modal";
import { useNavigation, useRoute } from '@react-navigation/native';
// Components
import Layout from '#components/Layout';
import { Title } from '#components/Text';
// Services
import * as CardsService from '#services/cards';
import * as LanguagesService from '#services/languages';
import * as WishlistService from '#services/wishlist-cards';
// Contexts
import { useLoader } from '#contexts/Loader';

const flagsImages = {
  ES: require('#images/flags/es.png'),
  FR: require('#images/flags/fr.png'),
  IT: require('#images/flags/it.png'),
  PT: require('#images/flags/pt.png'),
  EN: require('#images/flags/us.png'),
  DE: require('#images/flags/de.png'),
  JO: require('#images/flags/jp.png'),
  KO: require('#images/flags/kr.png'),
}

const WishlistCard = () => {
  const route = useRoute();
  const { isLoading, showLoader, hideLoader } = useLoader();
  const { id, name } = route.params;
  const [wishlist, setWishlist] = React.useState([]);
  const [card, setCard] = React.useState({});
  const [singles, setSingles] = React.useState({});
  const [selected, setSelected] = React.useState(null);
  const [flags, setFlags] = React.useState(null);
  const [languages, setLanguages] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [action, setAction] = React.useState(null);

  const fetchWishlist = () => {
    WishlistService.all()
      .then(res => setWishlist(res.data[0]))
      .finally(() => hideLoader());
  }

  const handleAddCard = item => () => {
    setSelected(item.id);
    setShowModal(true);
    setAction('CREATE');
  }

  const handleModify = item => () => {
    const wishlisted = wishlist.cards.find(c => c.singleId === item.id);
    const langs = wishlisted.langs.split(",").map(a => parseInt(a, 10));
    wishlisted.langs = flags.filter(f => langs.includes(f.id));
    setLanguages(wishlisted.langs.map(l => l.code));
    setSelected(item.id);
    setShowModal(true);
    setAction('UPDATE');
  }

  const closeModal = () => {
    setSelected(null);
    setShowModal(false);
    setLanguages([]);
    setAction(null);
  }

  const addCard = () => {
    setLoading(true);

    WishlistService.add({
      wishlistId: wishlist.id,
      cardId: card.id,
      languages: flags.filter(f => languages.includes(f.code)).map(f => f.id),
      singleId: selected
    })
      .then(() => {
        fetchWishlist();
        fetchCard();
        closeModal();
      });
  }

  const updateCard = () => {
    setLoading(true);
    WishlistService.update({
      wishlistId: wishlist.id,
      cardId: card.id,
      languages: flags.filter(f => languages.includes(f.code)).map(f => f.id),
      singleId: selected
    })
      .then(() => {
        fetchWishlist();
        fetchCard();
        closeModal();
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
        setCard(res.data);
        setSingles({ loading: false, index: null });
        setLoading(false);
      });
  };

  const toggleLanguage = code => () => {
    if (languages.includes(code)) {
      setLanguages(prev => prev.filter(lang => lang !== code))
    } else {
      setLanguages(prev => ([...prev, code]));
    }
  }

  const fetchLanguages = () => {
    LanguagesService.all()
      .then(res => setFlags(res.data));
  }

  React.useEffect(() => {
    if (card && flags && wishlist) hideLoader()
  }, [card, flags, wishlist]);

  React.useEffect(() => {
    showLoader();
    fetchCard();
    fetchWishlist();
    fetchLanguages();
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
            {wishlist?.cards?.find(c => c.singleId === single.id) ? (
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Button
                  onPress={removeCard(single, index)}
                  type="warning"
                  style={{ flex: 1, marginRight: 8 }}
                >
                  {singles.index === index && singles.loading ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <Text>QUITAR</Text>
                  )}
                </Button>
                <Button
                  onPress={handleModify(single)}
                  type="primary"
                  style={{ flex: 1, marginLeft: 8 }}
                >
                  <Text>MODIFICAR</Text>
                </Button>
              </View>
            ) : (
              <Button onPress={handleAddCard(single)} type="primary">AGREGAR</Button>
            )}
          </View>
        </React.Fragment>
      ))}

      <Modal hasBackdrop={true} isVisible={showModal}>
        <View style={{ backgroundColor: 'white', borderRadius: 4, padding: 12 }}>
          <Title style={{ textAlign: 'center' }}>Selecciona el/los idiomas</Title>
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 20, flexWrap: 'wrap' }}>
            {flags?.map(flag => (
              <TouchableOpacity
                key={flag.id}
                onPress={toggleLanguage(flag.code)}
                style={{ borderColor: languages.includes(flag.code) ? 'black' : 'transparent', margin: 12, borderRadius: 4, padding: 4, borderWidth: 2 }}
              >
                <Image
                  source={flagsImages[flag.code]}
                  style={{ borderRadius: 4 }}
                />
              </TouchableOpacity>
            ))}
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Button
              onPress={closeModal}
              type="warning"
              style={{ flex: 1, marginHorizontal: 8 }}
            >
              CANCELAR
            </Button>
            <Button
              disabled={languages.length === 0}
              onPress={action === 'CREATE' ? addCard : updateCard}
              type="primary"
              style={{ flex: 1, marginHorizontal: 8 }}
            >
              {loading ?
                <ActivityIndicator color="white" />
                : action === 'CREATE'
                  ? <Text>AGREGAR</Text>
                  : <Text>GUARDAR</Text>
              }
            </Button>
          </View>
        </View>
      </Modal>
    </Layout>
  )
}

export default WishlistCard;