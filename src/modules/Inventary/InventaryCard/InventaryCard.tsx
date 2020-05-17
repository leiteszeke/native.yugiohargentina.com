// Dependencies
import React from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import { Button } from '@ant-design/react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import { useNavigation, useRoute, useIsFocused, RouteProp } from '@react-navigation/native';
// Components
import Layout from '#components/Layout';
import { Title } from '#components/Text/Text';
// Services
import * as CardsService from '#services/cards';
import * as InventaryCardService from '#services/inventary-cards';
// Styles
import styles from './InventaryCard.styles';
// Types
import { RootStackParamList, InventaryCardProps, CardProps, SingleProps, MyObject, FlagProps, StatusProps } from '#types'
// Contexts
import { useLanguage } from '#contexts/Language';
import { useCardStatus } from '#contexts/CardStatus';

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

const InventaryCard = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'InventaryCard'>>();
  const { navigate } = useNavigation();
  const isFocused = useIsFocused()
  const { languages } = useLanguage()
  const { statuses: cardStatuses } = useCardStatus()
  const { id, name } = route.params;
  const [card, setCard] = React.useState<CardProps | null>(null);
  const [selected, setSelected] = React.useState<number | null>(null);
  const [quantity, setQuantity] = React.useState<number>(0);
  const [flags, setFlags] = React.useState<Array<FlagProps>>([]);
  const [currentStatus, setCurrentStatus] = React.useState<number | null>(null);
  const [inventary, setInventary] = React.useState<Array<InventaryCardProps> | null>(null);
  const [statuses, setStatuses] = React.useState<Array<StatusProps> | null>(null);
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

  const handleAddCard = (item: SingleProps) => () => {
    setSelected(item.id);
    setShowModal(true);
  };

  const add = () => setQuantity(quantity + 1);
  const remove = () => quantity > 0 && setQuantity(quantity - 1);
  const toggleSell = () => setSell(!sell);
  const togglePublic = () => setIsPublic(!isPublic);
  const setCardCurrency = (code: string) => () => setCurrency(code);

  const closeModal = () => {
    setSelected(null);
    setShowModal(false);
    setLanguage([]);
  };

  const updateCard = () => {
    setLoading(true);

    if (card) {
      InventaryCardService.update({
        cardId: card.id,
        languageId: flags
          .filter((f: FlagProps) => language.indexOf(f.code) >= 0)
          .map(f => f.id)[0],
        statusId: currentStatus,
        inSale: sell,
        price: parseFloat(price ? price.toString() : '0'),
        currencyId: currency === 'ARS' ? 1 : 2,
        singleId: selected,
        quantity,
      })
        .then(() => {
          closeModal()
          fetchInventary();
          fetchCard();
        })
    }
  };

  const fetchCard = () => {
    CardsService.get(id).then(res => {
      setCard(res.data);
      setLoading(false);
    });
  };

  const setLang = (code: string) => () => setLanguage([code]);
  const setStatus = (id: number) => () => setCurrentStatus(id);
  const showSingle = (single: SingleProps) => () =>
    navigate('InventarySingle', { card, inventary, single });
  const setPriceValue = (value: string) => setPrice(parseFloat(value))

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

  React.useEffect(() => {
    if (isFocused) {
      fetchCard();
      fetchInventary();
      setIsPublic(false);
      setPrice(null);
      setCurrency('ARS');
      setLanguage([]);
      setQuantity(0);
      setCurrentStatus(null);
    }
  }, [isFocused])

  React.useEffect(() => {
    setFlags(languages)
  }, [languages])

  React.useEffect(() => {
    setStatuses(cardStatuses)
  }, [cardStatuses])

  return (
    <Layout header title={card?.name || name} style={{ padding: 16 }} withBack>
      {card?.singles?.map((single, index) => (
        <React.Fragment key={single.id}>
          <View style={{ flexDirection: 'row', marginTop: 12 }}>
            <View style={{ width: 85 }}>
              <Image
                resizeMode="contain"
                source={{ uri: single.image ? single.image : `https://storage.googleapis.com/ygoprodeck.com/pics/${single.cardCode}.jpg` }}
                style={{ height: 120, width: 85 }}
              />
            </View>
            <View style={{ flex: 1, paddingHorizontal: 12 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                {card.name}
              </Text>
              <Text style={{ fontSize: 16 }}>{single.expansion?.name}</Text>
              <Text style={{ fontSize: 16 }}>
                {single.expansionCode}-{single.expansionNumber}
              </Text>
              <Text style={{ fontSize: 16 }}>{single.rarity}</Text>
            </View>
          </View>
          <View style={{ marginVertical: 20, width: '100%' }}>
            {inventary?.find(c => c.singleId === single.id) ? (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Button
                  onPress={showSingle(single)}
                  type="ghost"
                  style={{ flex: 1, marginRight: 8 }}>
                  <Text>MODIFICAR</Text>
                </Button>
                <Button
                  onPress={handleAddCard(single)}
                  type="primary"
                  style={{ flex: 1, marginLeft: 8 }}>
                  <Text>AGREGAR</Text>
                </Button>
              </View>
            ) : (
              <View style={{ width: '100%' }}>
                <Button onPress={handleAddCard(single)} type="primary">
                  <Text>AGREGAR</Text>
                </Button>
              </View>
            )}
          </View>
        </React.Fragment>
      ))}

      <Modal hasBackdrop={true} isVisible={showModal}>
        <KeyboardAvoidingView behavior="position">
          <View
            style={{ backgroundColor: 'white', borderRadius: 4, padding: 12 }}>
            <Title>Selecciona el idioma</Title>
            <View style={styles.row}>
              {flags?.map(flag => (
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
                    style={{ width: 24, height: 24 }}
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
                onPress={updateCard}
                type="primary"
                style={{ flex: 1, marginHorizontal: 8 }}>
                <Text>AGREGAR</Text>
              </Button>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </Layout>
  );
};

export default InventaryCard;
