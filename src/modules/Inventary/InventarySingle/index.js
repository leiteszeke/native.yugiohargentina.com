// Dependencies
import React from 'react';
import { Alert, Image, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView } from 'react-native';
import { Button, ActivityIndicator, Icon } from '@ant-design/react-native';
import Modal from "react-native-modal";
import { useRoute } from '@react-navigation/native';
// Components
import Layout from '#components/Layout';
import { Title } from '#components/Text';
// Services
import * as CardsService from '#services/cards';
import * as InventaryCardService from '#services/inventary-cards';
// Helpers
import { format } from '#helpers/number';
// Contexts
import { useCardStatus } from '#contexts/CardStatus';
import { useLoader } from '#contexts/Loader';
import { useLanguage } from '#contexts/Language';
// Styles
import styles from './styles';

const flagsImages = {
  ES: require('#images/flags/es.png'),
  FR: require('#images/flags/fr.png'),
  IT: require('#images/flags/it.png'),
  PT: require('#images/flags/pt.png'),
  EN: require('#images/flags/us.png'),
  DE: require('#images/flags/de.png'),
  JO: require('#images/flags/jp.png'),
  KO: require('#images/flags/kr.png'),
}

const statusIcon = {
  mint: require('#images/status/mint.png'),
  'near-mint': require('#images/status/near-mint.png'),
  excellent: require('#images/status/excellent.png'),
  good: require('#images/status/good.png'),
  'light-played': require('#images/status/light-played.png'),
  played: require('#images/status/played.png'),
  poor: require('#images/status/poor.png'),
}

const defaultParams = { card: { id: null, name: null }, single: null };

const InventarySingle = () => {
  const route = useRoute();
  const { showLoader, hideLoader } = useLoader();
  const { getById, languages: flags } = useLanguage();
  const { getIconById, statuses } = useCardStatus();
  const { card: { id, name }, single } = route.params || defaultParams;
  const [card, setCard] = React.useState(null);
  const [quantity, setQuantity] = React.useState(0);
  const [currentStatus, setCurrentStatus] = React.useState(null);
  const [inventary, setInventary] = React.useState(null);
  const [language, setLanguage] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [sell, setSell] = React.useState(false);
  const [isPublic, setIsPublic] = React.useState(false);
  const [price, setPrice] = React.useState(null);
  const [currency, setCurrency] = React.useState('ARS');

  const fetchInventary = () =>
    InventaryCardService.all()
      .then(res => setInventary(res.data))
      .finally(() => hideLoader());

  const add = () => setQuantity(quantity + 1);
  const remove = () => quantity > 0 && setQuantity(quantity - 1);
  const toggleSell = () => setSell(!sell);
  const togglePublic = () => setIsPublic(!isPublic);
  const setCardCurrency = code => () => setCurrency(code);

  const handleModify = item => () => {
    const lang = flags.find(f => f.id === item.languageId);
    setIsPublic(item.isPublic);
    setPrice(item.price);
    setCurrency(item.currencyId === 1 ? 'ARS' : 'USD');
    setLanguage([lang.code]);
    setSell(item.inSale);
    setQuantity(item.quantity);
    setCurrentStatus(item.statusId);
    setShowModal(true);
  }

  const updateCard = () => {
    setLoading(true);

    InventaryCardService.update({
      cardId: card.id,
      languageId: flags.filter(f => language.includes(f.code)).map(f => f.id)[0],
      statusId: currentStatus,
      inSale: sell,
      price: parseFloat(price),
      currencyId: currency === 'ARS' ? 1 : 2,
      singleId: single.id,
      quantity,
    })
      .then(() => closeModal())
      .finally(() => fetchInventary());
  }

  const deleteCard = item => () =>
    InventaryCardService.remove(item.id)
      .then(() => fetchInventary())
      .finally(() => setLoading(false));

  const handleRemove = item => () =>
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
          onPress: deleteCard(item)
        },
      ],
      { cancelable: false },
    );

  const closeModal = () => {
    setShowModal(false);
    setLanguage([]);
    setLoading(false);
  }

  const fetchCard = () => {
    CardsService.get(id)
      .then(res => {
        setCard(res.data);
        setLoading(false);
      });
  };

  const setLang = code => () => setLanguage([code]);
  const setStatus = id => () => setCurrentStatus(id);

  React.useEffect(() => {
    if (card && flags && inventary && statuses) hideLoader()
  }, [card, flags, statuses]);

  React.useEffect(() => {
    showLoader();
    fetchCard();
    fetchInventary();
  }, [id]);

  React.useEffect(() => {
    if (!sell) {
      setIsPublic(false);
      setPrice(null);
      setCurrency('ARS');
    }
  }, [sell])

  React.useEffect(() => {
    if (!showModal) {
      setIsPublic(false);
      setPrice(null);
      setCurrency('ARS');
      setLanguage([]);
      setQuantity(0);
      setCurrentStatus(null);
    }
  }, [showModal]);

  const canSubmit = React.useMemo(() => (
      language.length > 0 && quantity > 0 && currentStatus !== null && !sell
      || language.length > 0 && quantity > 0 && currentStatus !== null && sell && parseFloat(price) > 0
    ), [language, quantity, currentStatus, sell, price]);

  const events = {
    onWillFocus: () => {
      showLoader();
      fetchCard()
    }
  }

  const currentCard = React.useMemo(() => {
    if (!card || !card.id) return null

    return {
      ...card,
      single: card?.singles?.find(f => f.id === single.id)
    }
  }, [card, single]);

  const inventaryCards = React.useMemo(() =>
    inventary?.filter(f => f.singleId === single.id)
  , [inventary])

  if (!currentCard) return null

  return (
    <Layout header events={events} title={name} style={{ padding: 16 }} withBack>
      <View style={{ flexDirection: 'row', marginVertical: 12 }}>
        <View style={{ width: 85 }}>
          <Image
            resizeMode="contain"
            source={{ uri: currentCard.single.image }}
            style={{ height: 120, width: 85 }}
          />
        </View>
        <View style={{ flex: 1, paddingHorizontal: 12 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{currentCard.single.name}</Text>
          <Text style={{ fontSize: 16 }}>{currentCard.single.expansion?.name}</Text>
          <Text style={{ fontSize: 16 }}>{currentCard.single.expansion?.code}-{currentCard.single?.number?.padStart(4, '0')}</Text>
          <Text style={{ fontSize: 16 }}>{currentCard.single.rarity}</Text>
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
            <Icon onPress={handleModify(iCard)} color="#000000" name="edit" size={30} style={styles.iconLeft} />
            <Icon onPress={handleRemove(iCard)} color="#000000" name="delete" size={30} style={styles.iconRight} />
          </View>
        </View>
      ))}

      <Modal hasBackdrop={true} isVisible={showModal}>
        <KeyboardAvoidingView behavior="position">
          <View style={{ backgroundColor: 'white', borderRadius: 4, padding: 12 }}>
            <Title>Selecciona el idioma</Title>
            <View style={styles.row}>
              {flags?.map(flag => (
                <TouchableOpacity
                  key={flag.id}
                  onPress={setLang(flag.code)}
                  style={{ borderColor: language.includes(flag.code) ? 'black' : 'transparent', marginHorizontal: 4, borderRadius: 4, padding: 4, borderWidth: 2, flex: 1 }}
                >
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
                <Icon onPress={remove} name="minus" size={32} color="#000000" />
                <Text style={{ fontSize: 30, textAlign: 'center', width: 50 }}>{quantity}</Text>
                <Icon onPress={add} name="plus" size={32} color="#000000" />
              </View>
            </View>
            <Title>Selecciona el estado</Title>
            <View style={styles.row}>
              {statuses?.map(status => (
                <TouchableOpacity
                  key={status.id}
                  onPress={setStatus(status.id)}
                  style={{ borderColor: currentStatus === status.id ? 'black' : 'transparent', marginHorizontal: 4, borderRadius: 20, padding: 4, borderWidth: 2, flex: 1 }}
                >
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
                  style={[styles.leftButton, !sell && styles.buttonOn]}
                >
                  <Text style={[styles.switchButton, !sell && styles.textOn]}>NO</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={toggleSell}
                  style={[styles.rightButton, sell && styles.buttonOn]}
                >
                  <Text style={[styles.switchButton, sell && styles.textOn]}>SI</Text>
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
                      style={[styles.leftMiniButton, currency === 'ARS' && styles.buttonOn]}
                    >
                      <Text style={[styles.switchButton, currency === 'ARS' && styles.textOn]}>$</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={setCardCurrency('USD')}
                      style={[styles.rightMiniButton, currency === 'USD' && styles.buttonOn]}
                    >
                      <Text style={[styles.switchButton, currency === 'USD' && styles.textOn]}>USD</Text>
                    </TouchableOpacity>
                    <TextInput
                      defaultValue={price && price.toString()}
                      keyboardType="decimal-pad"
                      onChangeText={setPrice}
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
                      style={[styles.leftButton, !isPublic && styles.buttonOn]}
                    >
                      <Text style={[styles.switchButton, !isPublic && styles.textOn]}>NO</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={togglePublic}
                      style={[styles.rightButton, isPublic && styles.buttonOn]}
                    >
                      <Text style={[styles.switchButton, isPublic && styles.textOn]}>SI</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Button
                onPress={closeModal}
                disabled={loading}
                type="warning"
                style={{ flex: 1, marginHorizontal: 8 }}
              >
                CANCELAR
              </Button>
              <Button
                disabled={!canSubmit || loading}
                type="primary"
                onPress={updateCard}
                style={{ flex: 1, marginHorizontal: 8 }}
              >
                <Text>GUARDAR</Text>
              </Button>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </Layout>
  )
}

export default InventarySingle;