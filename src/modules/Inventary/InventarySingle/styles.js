// Dependencies
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  card: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 6,
  },

  row: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'space-between',
  },

  buttonText: {
    marginBottom: 0,
  },

  input: {
    borderBottomWidth: 1,
    borderColor: '#000000',
    fontSize: 24,
    marginLeft: 12,
    paddingRight: 4,
    textAlign: 'right',
    width: 70,
  },

  buttonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  leftButton: {
    alignItems: 'center',
    borderBottomLeftRadius: 8,
    borderColor: '#000000',
    borderRightWidth: 0,
    borderTopLeftRadius: 8,
    borderWidth: 2,
    height: 40,
    justifyContent: 'center',
    width: 60,
  },

  leftMiniButton: {
    alignItems: 'center',
    borderBottomLeftRadius: 8,
    borderColor: '#000000',
    borderRightWidth: 0,
    borderTopLeftRadius: 8,
    borderWidth: 2,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },

  rightButton: {
    alignItems: 'center',
    borderBottomRightRadius: 8,
    borderColor: '#000000',
    borderTopRightRadius: 8,
    borderWidth: 2,
    height: 40,
    justifyContent: 'center',
    width: 60,
  },

  rightMiniButton: {
    alignItems: 'center',
    borderBottomRightRadius: 8,
    borderColor: '#000000',
    borderTopRightRadius: 8,
    borderWidth: 2,
    height: 40,
    justifyContent: 'center',
    width: 60,
  },

  switchButton: {
    fontSize: 20, 
    fontWeight: 'bold',
  },

  buttonOn: {
    backgroundColor: 'brown',
  },

  textOn: {
    color: '#FFFFFF',
  },

  cardContainer: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'black',
    flexDirection: 'row',
    height: 60,
    paddingHorizontal: 4,
  },

  flag: {
    borderRadius: 4,
    height: 30,
    width: 50,
  },

  cardData: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },

  cardDetail: {
    fontSize: 20,
    textAlign: 'right',
  },

  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  iconLeft: {
    marginRight: 4,
  },

  iconRight: {
    marginLeft: 4,
  },
});

export default styles;