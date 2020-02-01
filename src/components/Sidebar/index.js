// Dependencies
import React from 'react';
import { Image, View, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView, withNavigation } from 'react-navigation';
import { Icon } from '@ant-design/react-native';
// Images
import Logo from '#images/logo.png';
// Styles
import styles from './styles';
// Helpers
import { removeSession } from '#helpers/session';

const Sidebar = ({ navigation }) => {
  const logoutUser = React.useCallback(() => {
    removeSession();
    navigation.navigate('Auth');
  }, []);

  const navigateTo = React.useCallback(route => () => {
    navigation.navigate(route);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <Image style={styles.logo} resizeMode="contain" source={ Logo } />
        </View>
        <View style={styles.wrapper}>
          <TouchableOpacity onPress={navigateTo('Dashboard')} style={styles.menuItem}>
            <Icon name="home" size={20} color="#FFFFFF" />
            <Text style={styles.menuItemText}>Dashboard</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={navigateTo('Events')} style={styles.menuItem}>
            <Icon name="calendar" size={20} color="#FFFFFF" />
            <Text style={styles.menuItemText}>Eventos</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={navigateTo('Wanted')} style={styles.menuItem}>
            <Icon name="credit-card" size={20} color="#FFFFFF" />
            <Text style={styles.menuItemText}>Lista de Deseos</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={navigateTo('Stores')} style={styles.menuItem}>
            <Icon name="shop" size={20} color="#FFFFFF" />
            <Text style={styles.menuItemText}>Locales</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={navigateTo('Account')} style={styles.menuItem}>
            <Icon name="user" size={20} color="#FFFFFF" />
            <Text style={styles.menuItemText}>Mi cuenta</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity onPress={logoutUser} style={styles.menuItem}>
            <Icon name="logout" size={20} color="#FFFFFF" />
            <Text style={styles.menuItemText}>Salir</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
};

export default withNavigation(Sidebar);