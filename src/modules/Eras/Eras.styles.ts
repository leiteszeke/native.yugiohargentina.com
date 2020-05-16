import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  layout: {
    padding: 16,
    marginTop: 6,
  },

  eraContainer: {
    flexDirection: 'row',
    height: 92,
    marginBottom: 20,
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'white',

    shadowColor: 'rgba(0, 0, 0, 0.6)',
    elevation: 4,
    shadowOffset: {
      height: 3,
      width: 0,
    },
    shadowOpacity: 1,
  },

  eraImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
  },

  eraImage: {
    height: 60,
    width: 110,
  },

  eraDataContainer: {
    flex: 1,
    marginLeft: 12,
  },

  eraName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
