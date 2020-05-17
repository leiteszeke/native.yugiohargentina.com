// Dependencies
import React from 'react';
import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import { Button } from '@ant-design/react-native';
import Image from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import { useRoute, useIsFocused, RouteProp } from '@react-navigation/native';
// Components
import Layout from '#components/Layout';
import { Title } from '#components/Text/Text';
// Services
import * as CardsService from '#services/cards';
import * as InventaryCardService from '#services/inventary-cards';
// Helpers
import { format } from '#helpers/number';
// Contexts
import { useCardStatus } from '#contexts/CardStatus';
import { useLanguage } from '#contexts/Language';
// Styles
import styles from './InventarySingle.styles';
// Types
import { CardProps, RootStackParamList, MyObject, InventaryCardProps, FlagProps, InventarySingleProps, SingleProps, StatusProps } from '#types';

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

const statusIcon: MyObject = {
  mint: require('#images/status/mint.png'),
  'near-mint': require('#images/status/near-mint.png'),
  excellent: require('#images/status/excellent.png'),
  good: require('#images/status/good.png'),
  'light-played': require('#images/status/light-played.png'),
  played: require('#images/status/played.png'),
  poor: require('#images/status/poor.png'),
};

const InventarySingle = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'InventarySingle'>>();
  const focused = useIsFocused();
  const { getById, languages: flags } = useLanguage();
  const { getIconById, statuses } = useCardStatus();
  const {
    card: { id, name },
    single,
  } = route.params;
  const [card, setCard] = React.useState<CardProps | null>(null);
  const [quantity, setQuantity] = React.useState<number>(0);
  const [currentStatus, setCurrentStatus] = React.useState<number | null>(null);
  const [inventary, setInventary] = React.useState<Array<InventaryCardProps> | null>(null);
  const [language, setLanguage] = React.useState<Array<string>>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [sell, setSell] = React.useState<boolean>(false);
  const [isPublic, setIsPublic] = React.useState<boolean>(false);
  const [price, setPrice] = React.useState<number | null>(null);
  const [currency, setCurrency] = React.useState<string>('ARS');

  const fetchInventary = () =>
    InventaryCardService.all()
      .then(res => setInventary(res.data))

  const add = () => setQuantity(quantity + 1);
  const remove = () => quantity > 0 && setQuantity(quantity - 1);
  const toggleSell = () => setSell(!sell);
  const togglePublic = () => setIsPublic(!isPublic);
  const setCardCurrency = (code: string) => () => setCurrency(code);
  const setPriceValue = (value: string) => setPrice(parseFloat(value));

  const handleModify = (item: InventaryCardProps) => () => {
    const lang = flags.find((f: FlagProps) => f.id === item.languageId);
    setIsPublic(item.isPublic);
    setPrice(item.price);
    setCurrency(item.currencyId === 1 ? 'ARS' : 'USD');
    setLanguage([lang.code]);
    setSell(item.inSale);
    setQuantity(item.quantity);
    setCurrentStatus(item.statusId);
    setShowModal(true);
  };

  const updateCard = () => {
    setLoading(true);

    if (card) {
      InventaryCardService.update({
        cardId: card.id,
        languageId: flags
          .filter((f: FlagProps) => language.indexOf(f.code) >= 0)
          .map((f: FlagProps) => f.id)[0],
        statusId: currentStatus,
        inSale: sell,
        price: parseFloat(price ? price.toString() : '0'),
        currencyId: currency === 'ARS' ? 1 : 2,
        singleId: single.id,
        quantity,
      })
        .then(() => {
          closeModal()
          fetchInventary()
        })
    }
  };

  const deleteCard = (item: InventaryCardProps) => () =>
    InventaryCardService.remove(item.id)
      .then(() => {
        fetchInventary()
        setLoading(false)
      })

  const handleRemove = (item: InventaryCardProps) => () =>
    Alert.alert(
      'Eliminar',
      '¿Estas seguro que quieres eliminar esta carta de tu inventario?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          onPress: deleteCard(item),
        },
      ],
      { cancelable: false },
    );

  const closeModal = () => {
    setShowModal(false);
    setLanguage([]);
    setLoading(false);
  };

  const fetchCard = () => CardsService.get(id).then(res => {
    setCard(res.data);
    setLoading(false);
  });

  const setLang = (code: string) => () => setLanguage([code]);
  const setStatus = (id: number) => () => setCurrentStatus(id);

  React.useEffect(() => {
    if (focused) {
      fetchCard();
      fetchInventary();
      setIsPublic(false);
      setPrice(null);
      setCurrency('ARS');
      setLanguage([]);
      setQuantity(0);
      setCurrentStatus(null);
    }
  }, [focused]);

  const canSubmit = React.useMemo(
    () =>
      (language.length > 0 &&
        quantity > 0 &&
        currentStatus !== null &&
        !sell) ||
      (language.length > 0 &&
        quantity > 0 &&
        currentStatus !== null &&
        sell &&
        parseFloat(price ? price.toString() : '0') > 0),
    [language, quantity, currentStatus, sell, price],
  );

  const cardSingle: SingleProps | null = React.useMemo(() => card?.singles?.find(f => f.id === single.id) || null, [card, single]);

  const inventaryCards = React.useMemo(() => {
    if (!inventary) return [];
    return inventary?.filter(f => f.singleId === single.id);
  }, [inventary, single.id]);

  if (cardSingle === null) {
    return null;
  }

  return (
    <Layout
      header
      title={name}
      style={{ padding: 16 }}
      withBack>
      <View style={{ flexDirection: 'row', marginVertical: 12 }}>
        <View style={{ width: 85 }}>
          <Image
            resizeMode="contain"
            source={{ uri: cardSingle.image ? cardSingle.image : `https://storage.googleapis.com/ygoprodeck.com/pics/${cardSingle.cardCode}.jpg` }}
            style={{ height: 120, width: 85 }}
          />
        </View>
        <View style={{ flex: 1, paddingHorizontal: 12 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
            {card?.name}
          </Text>
          <Text style={{ fontSize: 16 }}>
            {cardSingle.expansion.name}
          </Text>
          <Text style={{ fontSize: 16 }}>
            {cardSingle.expansionCode}-
            {cardSingle.expansionNumber}
          </Text>
          <Text style={{ fontSize: 16 }}>{cardSingle.rarity}</Text>
        </View>
      </View>

      {inventaryCards?.map(iCard => (
        <View key={iCard.id} style={styles.cardContainer}>
          <Image
            source={flagsImages[getById(iCard.languageId).code]}
            style={styles.flag}
          />
          <View style={styles.cardData}>
            <Image
              source={statusIcon[getIconById(iCard.statusId)]}
              style={{ borderRadius: 4, width: 24, height: 24 }}
            />
            <Text style={styles.cardDetail}>
              Cant: {iCard.quantity}
              {iCard.inSale && <> x {format(iCard.price)}</>}
            </Text>
          </View>
          <View style={styles.iconContainer}>
            <Icon
              onPress={handleModify(iCard)}
              color="#000000"
              name="ios-brush"
              size={30}
              style={styles.iconLeft}
            />
            <Icon
              onPress={handleRemove(iCard)}
              color="#000000"
              name="ios-trash"
              size={30}
              style={styles.iconRight}
            />
          </View>
        </View>
      ))}

      <Modal hasBackdrop={true} isVisible={showModal}>
        <KeyboardAvoidingView behavior="position">
          <View
            style={{ backgroundColor: 'white', borderRadius: 4, padding: 12 }}>
            <Title>Selecciona el idioma</Title>
            <View style={styles.row}>
              {flags?.map((flag: FlagProps) => (
                <TouchableOpacity
                  key={flag.id}
                  onPress={setLang(flag.code)}
                  style={{
                    borderColor: language.indexOf(flag.code) >= 0
                      ? 'black'
                      : 'transparent',
                    marginHorizontal: 4,
                    borderRadius: 4,
                    padding: 4,
                    borderWidth: 2,
                    flex: 1,
                  }}>
                  <Image
                    source={flagsImages[flag.code]}
                    style={{ borderRadius: 4, width: 'auto', height: 32 }}
                  />
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.row}>
              <Title style={styles.buttonText}>Cantidad</Title>
              <View style={styles.buttonContainer}>
                <Icon
                  onPress={remove}
                  name="ios-remove"
                  size={32}
                  color="#000000"
                />
                <Text style={{ fontSize: 30, textAlign: 'center', width: 50 }}>
                  {quantity}
                </Text>
                <Icon onPress={add} name="ios-add" size={32} color="#000000" />
              </View>
            </View>
            <Title>Selecciona el estado</Title>
            <View style={styles.row}>
              {statuses?.map((status: StatusProps) => (
                <TouchableOpacity
                  key={status.id}
                  onPress={setStatus(status.id)}
                  style={{
                    borderColor:
                      currentStatus === status.id ? 'black' : 'transparent',
                    marginHorizontal: 4,
                    borderRadius: 20,
                    padding: 4,
                    borderWidth: 2,
                    flex: 1,
                  }}>
                  <Image
                    source={statusIcon[status.icon]}
                    style={{ width: 30, height: 30 }}
                  />
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.row}>
              <Title style={styles.buttonText}>¿En venta?</Title>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={toggleSell}
                  style={[styles.leftButton, !sell && styles.buttonOn]}>
                  <Text style={[styles.switchButton, !sell && styles.textOn]}>
                    NO
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={toggleSell}
                  style={[styles.rightButton, sell && styles.buttonOn]}>
                  <Text style={[styles.switchButton, sell && styles.textOn]}>
                    SI
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {sell && (
              <>
                <View style={styles.row}>
                  <Title style={styles.buttonText}>¿Precio?</Title>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      onPress={setCardCurrency('ARS')}
                      style={[
                        styles.leftMiniButton,
                        currency === 'ARS' && styles.buttonOn,
                      ]}>
                      <Text
                        style={[
                          styles.switchButton,
                          currency === 'ARS' && styles.textOn,
                        ]}>
                        $
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={setCardCurrency('USD')}
                      style={[
                        styles.rightMiniButton,
                        currency === 'USD' && styles.buttonOn,
                      ]}>
                      <Text
                        style={[
                          styles.switchButton,
                          currency === 'USD' && styles.textOn,
                        ]}>
                        USD
                      </Text>
                    </TouchableOpacity>
                    <TextInput
                      defaultValue={price ? price.toString() : '0'}
                      keyboardType="decimal-pad"
                      onChangeText={setPriceValue}
                      placeholder="0"
                      style={styles.input}
                    />
                  </View>
                </View>
                <View style={styles.row}>
                  <Title style={styles.buttonText}>¿Público?</Title>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      onPress={togglePublic}
                      style={[styles.leftButton, !isPublic && styles.buttonOn]}>
                      <Text
                        style={[
                          styles.switchButton,
                          !isPublic && styles.textOn,
                        ]}>
                        NO
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={togglePublic}
                      style={[styles.rightButton, isPublic && styles.buttonOn]}>
                      <Text
                        style={[
                          styles.switchButton,
                          isPublic && styles.textOn,
                        ]}>
                        SI
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Button
                onPress={closeModal}
                disabled={loading}
                type="warning"
                style={{ flex: 1, marginHorizontal: 8 }}>
                CANCELAR
              </Button>
              <Button
                disabled={!canSubmit || loading}
                type="primary"
                onPress={updateCard}
                style={{ flex: 1, marginHorizontal: 8 }}>
                <Text>GUARDAR</Text>
              </Button>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </Layout>
  );
};

export default InventarySingle;
