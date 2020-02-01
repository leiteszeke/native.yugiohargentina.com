// Dependencies
import { Dimensions, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    borderBottomColor: '#001529',
    borderBottomWidth: 1,
    flexWrap: 'wrap',
    marginBottom: 12,
    padding: 6
  },

  imageContainer: {
    height: 200,
    width: Dimensions.get('screen').width - 44
  },

  image: {
    flex: 1,
  },

  title: {
    fontSize: 20,
  },

  text: {
    fontSize: 14,
    marginTop: 4,
  },

  container: {
    paddingVertical: 6,
    flex: 1
  }
});

export default styles;