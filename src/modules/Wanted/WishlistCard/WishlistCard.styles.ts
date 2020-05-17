// Dependencies
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  layout: {
    padding: 16,
  },

  cardContainer: {
    flexDirection: 'row',
    marginTop: 12,
  },

  imageContainer: {
    width: 85,
  },

  image: {
    height: 120,
    width: 85,
  },

  cardData: {
    flex: 1,
    paddingHorizontal: 12,
  },

  cardName: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  cardExpansion: {
    fontSize: 16,
  },

  wishlistContainer: {
    marginVertical: 20,
    width: '100%',
  },

  wishlistActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  wishlistButton: {
    flex: 1,
    marginRight: 8,
  },

  cardListContainer: {
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 12,
  },

  cardListTitle: {
    textAlign: 'center',
  },

  cardListContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    flexWrap: 'wrap',
  },

  cardListButton: {
    borderColor: 'transparent',
    margin: 12,
    borderRadius: 4,
    padding: 4,
    borderWidth: 2,
  },

  selectedButton: {
    borderColor: 'black',
  },

  icon: {
    borderRadius: 4,
  },

  button: {
    flex: 1,
    marginHorizontal: 8,
  },
});

export default styles;
