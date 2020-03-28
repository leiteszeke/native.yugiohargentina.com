// Dependencies
import AsyncStorage from '@react-native-community/async-storage';

const SESSION_KEY = 'ygoArgentina';

export const setSession = user =>
  AsyncStorage.setItem(SESSION_KEY, JSON.stringify(user));
export const removeSession = () => AsyncStorage.removeItem(SESSION_KEY);

export const getSession = async () => {
  const session = await AsyncStorage.getItem(SESSION_KEY);
  if (!session) return null;
  return JSON.parse(session);
};

export const isAdmin = user => user.roleId === 1;
