import {StyleSheet} from 'react-native';

export const dropdownStyle = StyleSheet.create({
  inputIOS: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
    height: 40,
    margin: 0,
  },

  inputIOSContainer: {},

  viewContainer: {
    flex: 1,
  },

  inputAndroid: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    height: 40,
    margin: 0,
    padding: 0,
  },

  placeholder: {
    color: 'gray',
    fontSize: 18,
  },
});

export default StyleSheet.create({
  layout: {padding: 16},

  dropdown: {
    alignItems: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
    padding: 0,
    paddingHorizontal: Platform.OS === 'ios' ? 4 : 0,
  },

  picker: {
    flex: 1,
    width: '100%',
  },
});
