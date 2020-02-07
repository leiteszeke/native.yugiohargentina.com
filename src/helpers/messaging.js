// Dependencies
import messaging from '@react-native-firebase/messaging';
import { requestNotifications } from 'react-native-permissions';

export const getToken = async () => {
  try {
    await messaging().requestPermission();
    await requestNotifications(['alert', 'badge', 'sound']);

    const fcmToken = await messaging().getToken();
    return Promise.resolve(fcmToken);
  } catch (error) {
    return Promise.resolve(false)
  }
};

export const onTokenRefresh = () => messaging().onTokenRefresh();