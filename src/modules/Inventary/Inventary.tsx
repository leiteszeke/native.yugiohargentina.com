/* eslint-disable react-hooks/exhaustive-deps */
// Dependencies
import * as React from 'react';
import { Button } from '@ant-design/react-native';
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
import CardListModal from '#components/CardListModal/CardListModal';
import FeatureHide from '#components/FeatureHide';
import Layout from '#components/Layout';
// Services
import * as InventaryCardService from '#services/inventary-cards';
// Styles
import styles from './Inventary.styles';
// Contexts
import { useUser } from '#contexts/User';
// Helpers
import { removeSession } from '#helpers/session';
// Types
import { InventaryCardProps } from '#types';

const Inventary = () => {
  const { navigate } = useNavigation();
  const { handleSession, user } = useUser();
  const focused = useIsFocused();
  const [cards, setCards] = React.useState<Array<InventaryCardProps> | null>(null);
  const [showModal, setShowModal] = React.useState(false);
  const [prev, setPrev] = React.useState<Partial<InventaryCardProps> | null>(null);
  const [scrollEnabled, setScrollEnabled] = React.useState<boolean>(false);
  const HEADER_HEIGHT = 50;
  const CONTENT_PADDING = 32;

  const onContentChange = (width: number, height: number) =>
    setScrollEnabled(
      height > Dimensions.get('window').height - HEADER_HEIGHT - CONTENT_PADDING,
    );

  const logout = () => {
    removeSession();
    handleSession();
  };

  const openCard = (id: number, name: string) => () => navigate('InventaryCard', { id, name });
  const fetchCards = () => InventaryCardService.all({ flatten: true }).then(res => setCards(res.data))

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

  const actions = <Icon onPress={openListModal} name="ios-add" color="#000000" size={32} />

  const renderItem = ({ item: { card, single } }: { item: InventaryCardProps }) => (
    <TouchableOpacity
      onPress={openCard(card.id, card.name)}
      style={styles.card}>
      <Text numberOfLines={2} style={styles.cardName}>
        {card.name} - {single.rarity} - {single.expansionCode}-
        {single.expansionNumber}
      </Text>
    </TouchableOpacity>
  );

  React.useEffect(() => {
    if (focused) {
      fetchCards();
    }
  }, [focused])

  return (
    <>
      <Layout
        {...{
          header: true,
          headerActions: actions,
          noScroll: true,
          style: { padding: 16, flex: 1 },
          title: 'Mi inventario',
          withBack: true,
        }}>
        {cards && cards?.length > 0 ? (
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
        <CardListModal title="Mi inventario" openModal={openModal} closeModal={closeModal} />
      </Modal>
    </>
  );
};

export default Inventary;
