import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  flex: {
    alignContent: 'flex-start',
    flex: 1,
  },

  safeArea: {
    alignContent: 'flex-start',
    backgroundColor: 'transparent',
    flex: 1,
  },

  safeAreaWithPadding: {
    alignContent: 'flex-start',
    backgroundColor: 'transparent',
    flex: 1,
    paddingBottom: 16,
  },

  safeAreaBackground: {
    backgroundColor: '#f0f2f5',
  },

  content: {
    alignContent: 'flex-start',
    flex: 1,
    padding: 16,
    width: '100%',
  },

  container: {
    alignContent: 'flex-start',
    flex: 1,
    paddingBottom: 16,
  },

  fullWidth: {
    width: '100%',
  },

  contentWithScroll: {
    marginBottom: 16,
  },
});
