// Dependencies
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: { 
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    elevation: 8,
    flex: 1,
    justifyContent: 'center',
    padding: 8,
    shadowColor: '#000000',
    shadowOffset:{
      height: 3,
      width: 0,
    },
    shadowOpacity: 1,
  },

  title: {
    fontSize: 16,
    textAlign: 'center'
  },

  number: {
    marginTop: 6,
  },
});
