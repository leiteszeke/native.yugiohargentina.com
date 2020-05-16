/* eslint-disable react-hooks/exhaustive-deps */
// Dependencies
import * as React from 'react';
import { Button, Modal as AntModal } from '@ant-design/react-native';
import {
  Dimensions,
  FlatList,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
// Components
import CardListModal from '#components/CardListModal';
import FeatureHide from '#components/FeatureHide';
import Layout from '#components/Layout';
// Services
import * as InventaryCardService from '#services/inventary-cards';
// Styles
import styles from './styles';
// Contexts
import { useLoader } from '#contexts/Loader';
import { useUser } from '#contexts/User';
// Helpers
import { removeSession } from '#helpers/session';

const Inventary = ({ onSession }) => {
  const { navigate } = useNavigation();
  const { user } = useUser();
  const focused = useIsFocused();
  const { isLoading, hideLoader } = useLoader();
  const [cards, setCards] = React.useState({});
  const [showModal, setShowModal] = React.useState(false);
  const [prev, setPrev] = React.useState(null);
  const [scrollEnabled, setScrollEnabled] = React.useState(false);
  const HEADER_HEIGHT = 50;
  const CONTENT_PADDING = 32;

  const onContentChange = (width, height) => {
    setScrollEnabled(
      height >
        Dimensions.get('window').height - HEADER_HEIGHT - CONTENT_PADDING,
    );
  };

  const logout = () => {
    removeSession();
    onSession();
  };

  const openCard = (id, name) => () => {
    navigate('InventaryCard', { id, name });
  };

  const fetchCards = () => {
    InventaryCardService.all({ flatten: true })
      .then(res => {
        setCards(res.data);
      })
      .finally(() => hideLoader());
  };

  React.useEffect(() => {
    if (focused && user.id > 0) {
      fetchCards();
    }
  }, [fetchCards, focused, user.id]);

  React.useEffect(() => {
    if (prev?.id && prev?.name) {
      openCard(prev.id, prev.name)();
    }
  }, [openCard, prev]);

  const toggleModal = (id, name) => {
    if (id && name) {
      setPrev({ id, name });
    } else {
      setPrev(null);
    }

    setShowModal(prev => !prev);
  };

  if (isLoading) {
    return null;
  }

  if (user.id <= 0) {
    return (
      <Layout header noScroll title="Mi inventario">
        <View style={{ flex: 1, padding: 16 }}>
          <FeatureHide style={{ margin: 16, height: '100%' }}>
            <Text style={{ marginBottom: 20 }}>
              Para ver tu inventario, primero debes iniciar sesión.
            </Text>
            <Button onPress={logout} type="primary">
              INICIAR SESIÓN
            </Button>
          </FeatureHide>
        </View>
      </Layout>
    );
  }

  const actions = (
    <Icon onPress={toggleModal} name="ios-add" color="#000000" size={32} />
  );

  const renderItem = ({ item: { card, single } }) => (
    <TouchableOpacity
      onPress={openCard(card.id, card.name)}
      style={styles.card}>
      <Text numberOfLines={2} style={styles.cardName}>
        {card.name} - {single.rarity} - {single.expansion.code}-
        {single?.number?.toString().padStart(4, '0')}
      </Text>
    </TouchableOpacity>
  );

  const events = {
    onWillFocus: () => fetchCards(),
  };

  return (
    <>
      <Layout
        {...{
          events,
          header: true,
          headerActions: actions,
          noScroll: true,
          style: { padding: 16, flex: 1 },
          title: 'Mi inventario',
          withBack: true,
        }}>
        {cards?.length > 0 ? (
          <>
            <FlatList
              data={cards}
              keyExtractor={c => c?.id?.toString()}
              renderItem={renderItem}
              style={styles.list}
              onContentSizeChange={onContentChange}
              scrollEnabled={scrollEnabled}
            />
          </>
        ) : (
          <View style={styles.emptyPage}>
            <Text style={styles.emptyMessage}>
              Aún no tienes cartas en tu inventario.
            </Text>
          </View>
        )}
      </Layout>
      <Modal visible={showModal}>
        <CardListModal title="Mi inventario" onClose={toggleModal} />
      </Modal>
    </>
  );
};

export default Inventary;
