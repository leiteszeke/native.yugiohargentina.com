// Dependencies
import { StyleSheet } from 'react-native';
// Theme
import theme from '#theme';

export default (variant: string) =>
  StyleSheet.create({
    container: {
      borderWidth: 2,
      padding: 4,
      borderRadius: 4,
      borderColor: theme.colors[variant] || 'black',
      paddingHorizontal: 4,
      alignSelf: 'flex-start',
    },

    text: {
      fontSize: 14,
      fontWeight: 'bold',
      color: theme.colors[variant] || 'black',
    },
  });
