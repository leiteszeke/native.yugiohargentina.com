// Dependencies
import React from 'react';
import { Text, Image, TouchableOpacity, View } from 'react-native';
import { Button } from '@ant-design/react-native';
import Modal from 'react-native-modal';
import { useRoute, RouteProp, useIsFocused } from '@react-navigation/native';
// Components
import Layout from '#components/Layout';
import { Title } from '#components/Text/Text';
// Services
import * as CardsService from '#services/cards';
import * as WishlistService from '#services/wishlist-cards';
// Types
import { MyObject, CardProps, RootStackParamList, SingleProps, FlagProps, WishlistProps } from '#types';
import { useLanguage } from '#contexts/Language';
// Styles
import styles from './WishlistCard.styles';

const flagsImages: MyObject = {
  ES: require('#images/flags/es.png'),
  FR: require('#images/flags/fr.png'),
  IT: require('#images/flags/it.png'),
  PT: require('#images/flags/pt.png'),
  EN: require('#images/flags/us.png'),
  DE: require('#images/flags/de.png'),
  JO: require('#images/flags/jp.png'),
  KO: require('#images/flags/kr.png'),
};

const WishlistCard = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'WishlistCard'>>();
  const { id, name } = route.params;
  const { languages } = useLanguage();
  const focused = useIsFocused();
  const [wishlist, setWishlist] = React.useState<WishlistProps | null>(null);
  const [card, setCard] = React.useState<CardProps | null>(null);
  const [langs, setLangs] = React.useState<Array<string>>([]);
  const [selected, setSelected] = React.useState<number | null>(null);
  const [flags, setFlags] = React.useState<Array<FlagProps> | null>(null);
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [action, setAction] = React.useState<string | null>(null);

  const fetchWishlist = () => WishlistService.all().then(res => setWishlist(res.data[0]))
  const fetchCard = () => CardsService.get(id).then(res => setCard(res.data))

  const handleAddCard = (item: SingleProps) => () => {
    setSelected(item.id);
    setShowModal(true);
    setAction('CREATE');
  };

  const handleModify = (item: SingleProps) => () => {
    if (wishlist) {
      const wishlisted = wishlist.cards.find(c => c.singleId === item.id);

      if (wishlisted) {
        const langs: Array<number> = wishlisted.langs.split(',').map(a => parseInt(a, 10));
        const wishlistedLangs = flags?.filter(f => langs.indexOf(f.id) >= 0) || [];
        setLangs(wishlistedLangs.map(l => l.code));
        setSelected(item.id);
        setShowModal(true);
        setAction('UPDATE');
      }
    }
  };

  const closeModal = () => {
    setSelected(null);
    setShowModal(false);
    setLangs([]);
    setAction(null);
  };

  const addCard = () => {
    if (wishlist && card && flags) {
      WishlistService.add({
        wishlistId: wishlist.id,
        cardId: card.id,
        languages: flags.filter(f => langs.indexOf(f.code) >= 0).map(f => f.id),
        singleId: selected,
      }).then(() => {
        fetchWishlist();
        fetchCard();
        closeModal();
      });
    }
  };

  const updateCard = () => {
    if (wishlist && card && flags) {
      WishlistService.update({
        wishlistId: wishlist.id,
        cardId: card.id,
        languages: flags.filter(f => langs.indexOf(f.code) >= 0).map(f => f.id),
        singleId: selected,
      }).then(() => {
        fetchWishlist();
        fetchCard();
        closeModal();
      });
    }
  };

  const removeCard = (item: SingleProps) => () =>
    WishlistService.remove(item.id).then(() => {
      fetchWishlist();
      fetchCard();
    });

  const toggleLanguage = (code: string) => () => {
    if (langs.indexOf(code) >= 0) {
      setLangs(prev => prev.filter(lang => lang !== code));
    } else {
      setLangs(prev => [...prev, code]);
    }
  };

  React.useEffect(() => {
    if (focused) {
      fetchCard();
      fetchWishlist();
    } else {
      setCard(null)
    }
  }, [focused]);

  React.useEffect(() => {
    setFlags(languages)
  }, [languages])

  return (
    <Layout
      header
      title={name}
      style={styles.layout}
      withBack>
      {card?.singles?.map((single, index) => (
        <React.Fragment key={single.id}>
          <View style={styles.cardContainer}>
            <View style={styles.imageContainer}>
              <Image
                resizeMode="contain"
                source={{ uri: single.image ? single.image : `https://storage.googleapis.com/ygoprodeck.com/pics/${single.cardCode}.jpg` }}
                style={styles.image}
              />
            </View>
            <View style={styles.cardData}>
              <Text style={styles.cardName}>
                {card.name}
              </Text>
              <Text style={styles.cardExpansion}>{single.expansion?.name}</Text>
              <Text style={styles.cardExpansion}>
                {single.expansionCode}-{single.expansionNumber}
              </Text>
              <Text style={styles.cardExpansion}>{single.rarity}</Text>
            </View>
          </View>
          <View style={styles.wishlistContainer}>
            {wishlist?.cards?.find(c => c.singleId === single.id) ? (
              <View
                style={styles.wishlistActions}>
                <Button
                  onPress={removeCard(single)}
                  type="warning"
                  style={styles.wishlistButton}>
                  <Text>QUITAR</Text>
                </Button>
                <Button
                  onPress={handleModify(single)}
                  type="primary"
                  style={styles.wishlistButton}>
                  <Text>MODIFICAR</Text>
                </Button>
              </View>
            ) : (
              <Button onPress={handleAddCard(single)} type="primary">
                <Text>AGREGAR</Text>
              </Button>
            )}
          </View>
        </React.Fragment>
      ))}

      <Modal hasBackdrop={true} isVisible={showModal}>
        <View
          style={styles.cardListContainer}>
          <Title style={styles.cardListTitle}>
            Selecciona el/los idiomas
          </Title>
          <View
            style={styles.cardListContent}>
            {flags?.map(flag => (
              <TouchableOpacity
                key={flag.id}
                onPress={toggleLanguage(flag.code)}
                style={[styles.cardListButton, langs.indexOf(flag.code) >= 0 && styles.selectedButton]}>
                <Image
                  source={flagsImages[flag.code]}
                  style={styles.icon}
                />
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.wishlistActions}>
            <Button
              onPress={closeModal}
              type="warning"
              style={styles.button}>
              CANCELAR
            </Button>
            <Button
              disabled={langs.length === 0}
              onPress={action === 'CREATE' ? addCard : updateCard}
              type="primary"
              style={styles.button}>
              {action === 'CREATE' ? (
                <Text>AGREGAR</Text>
              ) : (
                <Text>GUARDAR</Text>
              )}
            </Button>
          </View>
        </View>
      </Modal>
    </Layout>
  );
};

export default WishlistCard;
