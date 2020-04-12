// Dependencies
import React from 'react';
import {Image, View, TouchableOpacity, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
// Images
import Logo from '#images/logo.png';
// Styles
import styles from './styles';
// Helpers
import {removeSession} from '#helpers/session';

const Sidebar = ({onSession, navigation}) => {
  const logoutUser = React.useCallback(() => {
    removeSession();
    onSession();
  }, []);

  const navigateTo = React.useCallback(
    route => () => navigation.navigate(route),
    [],
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <Image style={styles.logo} resizeMode="contain" source={Logo} />
        </View>
        <View style={styles.wrapper}>
          <TouchableOpacity
            onPress={navigateTo('Dashboard')}
            style={styles.menuItem}>
            <Icon name="ios-home" size={20} color="#FFFFFF" />
            <Text style={styles.menuItemText}>Dashboard</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={navigateTo('Events')}
            style={styles.menuItem}>
            <Icon name="ios-calendar" size={20} color="#FFFFFF" />
            <Text style={styles.menuItemText}>Eventos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={navigateTo('Wanted')}
            style={styles.menuItem}>
            <Icon name="ios-heart" size={20} color="#FFFFFF" />
            <Text style={styles.menuItemText}>Lista de Deseos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={navigateTo('Stores')}
            style={styles.menuItem}>
            <Icon name="ios-business" size={20} color="#FFFFFF" />
            <Text style={styles.menuItemText}>Locales</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={navigateTo('Inventary')}
            style={styles.menuItem}>
            <Icon name="ios-folder-open" size={20} color="#FFFFFF" />
            <Text style={styles.menuItemText}>Mi Inventario</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={navigateTo('Account')}
            style={styles.menuItem}>
            <Icon name="ios-contact" size={20} color="#FFFFFF" />
            <Text style={styles.menuItemText}>Mi cuenta</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={navigateTo('Tournaments')}
            style={styles.menuItem}>
            <Icon name="logo-game-controller-b" size={20} color="#FFFFFF" />
            <Text style={styles.menuItemText}>Torneos</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity onPress={logoutUser} style={styles.menuItem}>
            <Icon name="ios-log-out" size={20} color="#FFFFFF" />
            <Text style={styles.menuItemText}>Salir</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Sidebar;
