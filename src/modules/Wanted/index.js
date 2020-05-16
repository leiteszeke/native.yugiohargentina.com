// Dependencies
import React from 'react';
import { Button, Modal as AntModal } from '@ant-design/react-native';
import {
  Dimensions,
  FlatList,
  Modal,
  Text,
  TouchableOpacity,
  View,
  Switch,
} from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
// Components
import CardListModal from '#components/CardListModal';
import FeatureHide from '#components/FeatureHide';
import Layout from '#components/Layout';
// Services
import * as WishlistService from '#services/wishlist-cards';
import * as UserService from '#services/users';
// Styles
import styles from './styles';
// Contexts
import { useLoader } from '#contexts/Loader';
import { useUser } from '#contexts/User';
// Helpers
import { getDeviceInfo } from '#helpers/device';
import { removeSession } from '#helpers/session';
import { getToken } from '#helpers/messaging';

const Wanted = ({ onSession }) => {
  const { navigate } = useNavigation();
  const { user } = useUser();
  const focused = useIsFocused();
  const { isLoading, hideLoader } = useLoader();
  const [notify, setNotify] = React.useState(false);
  const [wishlist, setWishlist] = React.useState({});
  const [showModal, setShowModal] = React.useState(false);
  const [prev, setPrev] = React.useState(null);
  const [scrollEnabled, setScrollEnabled] = React.useState(false);
  const HEADER_HEIGHT = 50;
  const CONTENT_PADDING = 32;

  const onContentChange = (width, height) =>
    setScrollEnabled(
      height >
        Dimensions.get('window').height - HEADER_HEIGHT - CONTENT_PADDING,
    );

  const logout = () => {
    removeSession();
    onSession();
  };

  const openCard = (id, name) => () => {
    navigate('WishlistCard', { id, name });
  };
  const fetchCards = () =>
    WishlistService.all()
      .then(res => setWishlist(res.data[0]))
      .finally(() => hideLoader());

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

  const handleNotification = async () => {
    const token = await getToken();
    const deviceInfo = await getDeviceInfo();

    if (token && user.id > 0) {
      UserService.updateDevice(user.id, { token, ...deviceInfo });
    } else {
      AntModal.alert(
        '¡Oops!',
        'Debes permitir las push notifications para poder activar esta opción',
        [{ text: 'OK' }],
      );

      setNotify(false);
    }
  };

  React.useEffect(() => {
    if (notify) {
      handleNotification();
    }
  }, [handleNotification, notify]);

  if (isLoading) {
    return null;
  }

  if (user.id <= 0) {
    return (
      <Layout header noScroll title="Lista de Deseos">
        <View style={{ flex: 1, padding: 16 }}>
          <FeatureHide style={{ margin: 16, height: '100%' }}>
            <Text style={{ marginBottom: 20 }}>
              Para ver tu lista de deseos, primero debes iniciar sesión.
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
      <Text style={styles.cardName}>
        {card.name} - {single.expansion.code}-
        {single.number?.toString().padStart(4, '0')}
      </Text>
    </TouchableOpacity>
  );

  const toggleNotify = () => setNotify(prev => !prev);

  const showFooter = true;

  return (
    <>
      <Layout
        {...{
          header: true,
          headerActions: actions,
          noScroll: true,
          style: { padding: 16, flex: 1 },
          title: 'Lista de Deseos',
          withBack: true,
        }}>
        {wishlist?.cards?.length > 0 ? (
          <>
            <FlatList
              data={wishlist.cards}
              keyExtractor={card => card.id.toString()}
              renderItem={renderItem}
              style={styles.list}
              onContentSizeChange={onContentChange}
              scrollEnabled={scrollEnabled}
            />
            {showFooter && (
              <View style={styles.listOptions}>
                <Text style={styles.listOptionText}>
                  Recibir notificaciones de mi lista
                </Text>
                <Switch onValueChange={toggleNotify} value={notify} />
              </View>
            )}
          </>
        ) : (
          <View style={styles.emptyPage}>
            <Text style={styles.emptyMessage}>
              Aún no tienes cartas en tu lista de deseos.
            </Text>
          </View>
        )}
      </Layout>
      <Modal visible={showModal}>
        <CardListModal title="Lista de Deseos" onClose={toggleModal} />
      </Modal>
    </>
  );
};

export default Wanted;
