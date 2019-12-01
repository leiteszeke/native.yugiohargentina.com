// Dependencies
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#001529',
    flex: 1,
    overflow: 'hidden',
  },

  wrapper: {
    flex: 1
  },

  header: {
    height: 52,
    marginBottom: 20,
    width: '100%'
  },

  logo: {
    height: 52,
    width: 100
  },

  menuItem: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 40,
    marginBottom: 4,
    marginTop: 12,
    paddingLeft: 24,
    paddingRight: 12
  },

  menuItemText: {
    color: '#FFFFFF',
    flex: 1,
    fontSize: 14,
    marginLeft: 10
  },

  footer: {
    height: 52,
    width: '100%'
  },
});

export default styles;