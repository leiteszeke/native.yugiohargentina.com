// Dependencies
import React from 'react';
import { FlatList, Text, TouchableOpacity } from 'react-native';
import debounce from 'lodash.debounce';
import Icon from 'react-native-vector-icons/Ionicons';
// Components
import Layout from '#components/Layout';
import Input from '#components/Input';
// Services
import * as CardsService from '#services/cards';
// Styles
import styles from './styles';

const CardListModal = ({ title, onClose }) => {
  const [cards, setCards] = React.useState([])
  const [q, setQ] = React.useState({ page: 0 });

  const searchFunction = value => setQ({ q: value, page: 0 });
  const search = React.useCallback(debounce(searchFunction, 2000), []);
  const onSearch = e => search(e.nativeEvent.text);
  const nextPage = () => setQ(prev => ({ ...prev, page: (prev.page || 0) + 1 }));
  const openCard = (id, name) => () => onClose(id, name);

  const fetchCards = () => {
    CardsService.all(q)
      .then(res => {
        if (q.page === 0) {
          setCards(res.data);
        } else {
          setCards(prev => [...prev, ...res.data]);
        }
      });
  };

  React.useEffect(() => {
    fetchCards();
  }, [q]);

  const renderItem = ({ item: card }) => (
    <TouchableOpacity onPress={openCard(card.id, card.name)} style={styles.card}>
      <Text style={styles.cardName}>{card.name}</Text>
    </TouchableOpacity>
  );

  const actions = (
    <Icon onPress={onClose} name="ios-close" color="#000000" size={32} />
  )

  return (
    <Layout header noScroll headerActions={actions} title={title} noIcon>
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
  )
}

export default CardListModal;