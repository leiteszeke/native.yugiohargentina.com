// Dependencies
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },

  listOptions: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 40,
    justifyContent: 'space-between',
  },

  listOptionText: {
    fontSize: 20,
  },

  card: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    minHeight: 40,
    justifyContent: 'center',
    paddingHorizontal: 6,
    paddingVertical: 8,
  },

  cardName: {
    fontSize: 16,
  },

  emptyPage: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },

  emptyMessage: {
    fontSize: 20,
    textAlign: 'center',
  },
});

export default styles;