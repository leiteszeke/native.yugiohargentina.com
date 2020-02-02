// Dependencies
import React from 'react';
import { Button } from '@ant-design/react-native';
import { FlatList, Modal, Text, TouchableOpacity, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
// Components
import CardListModal from '#components/CardListModal';
import FeatureHide from '#components/FeatureHide';
import Layout from '#components/Layout';
// Services
import * as WishlistService from '#services/wishlist-cards';
// Styles
import styles from './styles';
// Contexts
import { useLoader } from '#contexts/Loader';
import { useUser } from '#contexts/User';
// Helpers
import { removeSession } from '#helpers/session';

const Wanted = ({ navigation }) => {
  const { user } = useUser();
  const { isLoading, showLoader, hideLoader } = useLoader();
  const [wishlist, setWishlist] = React.useState({});
  const [showModal, setShowModal] = React.useState(false);
  const [prev, setPrev] = React.useState(null);

  const logout = () => {
    removeSession();
    navigation.navigate('Auth');
  }

  const goTo = React.useCallback((route, params) => () => navigation.navigate(route, params), []);
  const openCard = (id, name) => goTo('Card', { id, name });
  const fetchCards = () => {
    showLoader();
    WishlistService.all()
      .then(res => setWishlist(res.data[0]))
      .finally(() => hideLoader());
  };

  React.useEffect(() => {
    if (user.id > 0) {
      fetchCards();
    }
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

  if (user.id <= 0) {
    return (
      <Layout header noScroll title="Lista de Deseos">
        <View style={{ flex: 1 }}>
          <FeatureHide style={{ height: '100%' }}>
            <Text style={{ marginBottom: 20 }}>Para ver tu lista de deseos, primero debes iniciar sesión.</Text>
            <Button onPress={logout} type="primary">INICIAR SESIÓN</Button>
          </FeatureHide>
        </View>
      </Layout>
    )
  }

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