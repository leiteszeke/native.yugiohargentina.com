// Dependencies
import { Platform, StyleSheet } from 'react-native';

export const dropdownStyle = StyleSheet.create({
  inputIOS: {
    color: 'black',
    fontSize: 18,
    height: 40,
    margin: 0,
  },

  inputAndroid: {
    color: 'black',
    fontSize: 20,
    height: 40,
    margin: 0,
    padding: 0,
  },

  placeholder: {
    color: 'black',
    fontSize: 18,
  },
});

export default StyleSheet.create({
  title: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },

  textInput: {
    height: 39,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    color: 'black',
    fontSize: 18,
    marginBottom: 8,
    paddingHorizontal: 4,
  },

  placeholder: {
    color: 'black',
    fontSize: 18,
    lineHeight: 38,
  },

  dropdown: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    height: 40,
    justifyContent: 'center',
    marginBottom: 4,
    padding: 0,
    paddingHorizontal: Platform.OS === 'ios' ? 4 : 0,
  },

  picker: {
    flex: 1,
    width: '100%',
  },
});
