// Dependencies
import React from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import debounce from 'lodash.debounce';
import Icon from 'react-native-vector-icons/Ionicons';
// Components
import Layout from '#components/Layout';
import Input from '#components/Input';
// Services
import * as CardsService from '#services/cards';
// Styles
import styles from './CardListModal.styles';
// Types
import { CardProps } from '#types';

export type CardListModalProps = {
  title: string;
  openModal: (id: number, name: string) => void;
  closeModal: () => void;
};

type QueryProps = {
  page: number;
  q?: string;
};

const CardListModal = ({
  title,
  openModal,
  closeModal,
}: CardListModalProps) => {
  const [cards, setCards] = React.useState<Array<CardProps> | null>(null);
  const [q, setQ] = React.useState<QueryProps>({ page: 0 });

  const searchFunction = (value: string) => setQ({ q: value, page: 0 });
  const search = React.useCallback(debounce(searchFunction, 2000), []);
  const onSearch = (e: NativeSyntheticEvent<TextInputChangeEventData>) =>
    search(e.nativeEvent.text);
  const nextPage = () =>
    setQ(prev => ({ ...prev, page: (prev.page || 0) + 1 }));
  const openCard = (id: number, name: string) => () => openModal(id, name);

  const fetchCards = () => {
    CardsService.all(q).then(res => {
      if (q.page === 0) {
        setCards(res.data);
      } else {
        setCards(prev => [...(prev || []), ...res.data]);
      }
    });
  };

  React.useEffect(() => {
    fetchCards();
  }, [q]);

  const renderItem = ({ item: card }: { item: CardProps }) => (
    <TouchableOpacity
      onPress={openCard(card.id, card.name)}
      style={styles.card}>
      <Text style={styles.cardName}>{card.name}</Text>
    </TouchableOpacity>
  );

  const actions = (
    <Icon onPress={closeModal} name="ios-close" color="#000000" size={32} />
  );

  return (
    <Layout
      header
      noScroll
      containerStyle={styles.container}
      headerActions={actions}
      title={title}
      style={styles.layout}
      noIcon>
      <Input
        containerStyle={styles.searchInput}
        onChange={onSearch}
        placeholder="Buscar carta"
      />
      {cards !== null && cards.length >= 0 && (
        <FlatList
          data={cards}
          keyExtractor={card => card.id.toString()}
          renderItem={renderItem}
          onEndReached={nextPage}
          onEndReachedThreshold={0.5}
          style={styles.list}
        />
      )}
    </Layout>
  );
};

export default CardListModal;
