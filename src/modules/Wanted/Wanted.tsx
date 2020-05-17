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
import CardListModal from '#components/CardListModal/CardListModal';
import FeatureHide from '#components/FeatureHide';
import Layout from '#components/Layout';
// Services
import * as WishlistService from '#services/wishlist-cards';
import * as UserService from '#services/users';
// Styles
import styles from './Wanted.styles';
// Contexts
import { useUser } from '#contexts/User';
// Helpers
import { getDeviceInfo } from '#helpers/device';
import { removeSession } from '#helpers/session';
import { getToken } from '#helpers/messaging';
// Types
import { WishlistProps, WishlistCardProps } from '#types';

const Wanted = () => {
  const { navigate } = useNavigation();
  const { user, handleSession } = useUser();
  const focused = useIsFocused();
  const [notify, setNotify] = React.useState<boolean>(false);
  const [wishlist, setWishlist] = React.useState<WishlistProps | null>(null);
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [prev, setPrev] = React.useState<Partial<WishlistCardProps> | null>(null);
  const [scrollEnabled, setScrollEnabled] = React.useState<boolean>(false);
  const HEADER_HEIGHT = 50;
  const CONTENT_PADDING = 32;

  const onContentChange = (width: number, height: number) =>
    setScrollEnabled(
      height >
        Dimensions.get('window').height - HEADER_HEIGHT - CONTENT_PADDING,
    );

  const logout = () => {
    removeSession();
    handleSession();
  };

  const openCard = (id: number, name: string) => () => navigate('WishlistCard', { id, name });
  const fetchCards = () => WishlistService.all().then(res => setWishlist(res.data[0]))

  React.useEffect(() => {
    if (prev?.id && prev?.name) {
      openCard(prev.id, prev.name)();
    }
  }, [openCard, prev]);

  const openModal = (id: number, name: string) => {
    setPrev({ id, name });
    setShowModal(false);
  };

  const openListModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleNotification = async () => {
    const token = await getToken();
    const deviceInfo = await getDeviceInfo();

    if (token && user?.id > 0) {
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

  React.useEffect(() => {
    if (focused) {
      setPrev(null);
      fetchCards();
    } else {
      setPrev(null)
    }
  }, [focused])

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

  const renderItem = ({ item: { card, single } }: { item: WishlistCardProps }) => (
    <TouchableOpacity
      onPress={openCard(card.id, card.name)}
      style={styles.card}>
      <Text style={styles.cardName}>
        {card.name} - {single.expansionCode}-
        {single.expansionNumber}
      </Text>
    </TouchableOpacity>
  )

  const toggleNotify = () => setNotify(prev => !prev);

  const actions = (
    <Icon onPress={openListModal} name="ios-add" color="#000000" size={32} />
  );

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
        {wishlist && wishlist.cards?.length > 0 ? (
          <>
            <FlatList
              data={wishlist.cards}
              keyExtractor={card => card?.id.toString()}
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
        <CardListModal title="Lista de Deseos" openModal={openModal} closeModal={closeModal} />
      </Modal>
    </>
  );
};

export default Wanted;
