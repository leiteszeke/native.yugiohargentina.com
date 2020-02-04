// Dependencies
import { Dimensions, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    borderBottomColor: '#001529',
    borderBottomWidth: 1,
    flexWrap: 'wrap',
    marginBottom: 12,
  },

  imageContainer: {
    height: 200,
    position: 'relative',
    width: '100%',
  },

  image: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },

  title: {
    fontSize: 20,
  },

  text: {
    fontSize: 14,
    marginTop: 4,
  },

  container: {
    paddingHorizontal: 6,
    paddingVertical: 12,
    flex: 1
  }
});

export default styles;