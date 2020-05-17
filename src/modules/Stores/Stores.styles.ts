// Dependencies
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  layout: {
    padding: 16,
  },

  storeContainer: {
    borderBottomColor: '#001529',
    borderBottomWidth: 1,
    flexDirection: 'row',
    marginBottom: 12,
    padding: 6,
  },

  storeImage: {
    height: 60,
    width: 60,
  },

  storeData: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },

  storeName: {
    fontSize: 20,
  },

  storeAddress: {
    fontSize: 14,
  },

  storeLinkIcon: {
    marginRight: 12,
  },

  iconContainer: {
    flexDirection: 'row',
    height: 20,
    marginTop: 12,
    width: '100%',
  },
});

export default styles;
