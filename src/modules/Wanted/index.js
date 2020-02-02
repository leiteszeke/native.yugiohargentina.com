// Dependencies
import React from 'react';
import { FlatList, Modal, Text, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
// Components
import CardListModal from '#components/CardListModal';
import Layout from '#components/Layout';
// Services
import * as WishlistService from '#services/wishlist-cards';
// Styles
import styles from './styles';
// Contexts
import { useLoader } from '#contexts/Loader';

const Wanted = ({ navigation }) => {
  const { isLoading, showLoader, hideLoader } = useLoader();
  const [wishlist, setWishlist] = React.useState({});
  const [showModal, setShowModal] = React.useState(false);
  const [prev, setPrev] = React.useState(null);

  const goTo = React.useCallback((route, params) => () => navigation.navigate(route, params), []);
  const openCard = (id, name) => goTo('Card', { id, name });
  const fetchCards = () => {
    showLoader();
    WishlistService.all()
      .then(res => setWishlist(res.data[0]))
      .finally(() => hideLoader());
  };

  React.useEffect(() => {
    fetchCards();
  }, []);

  React.useEffect(() => {
    if (prev?.id && prev?.name) openCard(prev.id, prev.name)();
  }, [prev]);

  const toggleModal = (id, name) => {
    if (id && name) {
      setPrev({ id, name });
    } else {
      setPrev(null)
    }

    setShowModal(prev => !prev);
  }

  if (isLoading) return null

  const actions = (
    <Icon onPress={toggleModal} name="ios-add" color="#000000" size={32} />
  )

  const renderItem = ({ item: { card, single } }) => (
    <TouchableOpacity onPress={openCard(card.id, card.name)} style={styles.card}>
      <Text style={styles.cardName}>
        {card.name} - {single.expansion.code}-{single.number?.toString().padStart(4, '0')}
      </Text>
    </TouchableOpacity>
  );

  const events = {
    onWillFocus: () => fetchCards()
  }

  return (
    <>
      <Layout events={events} header noScroll headerActions={actions} title="Lista de Deseos">
        {wishlist?.cards?.length >= 0 && (
          <FlatList
            data={wishlist.cards}
            keyExtractor={card => card.id.toString()}
            renderItem={renderItem}
            style={styles.list}
          />
        )}
      </Layout>
      <Modal visible={showModal}>
        <CardListModal onClose={toggleModal} />
      </Modal>
    </>
  )
}

export default withNavigation(Wanted);