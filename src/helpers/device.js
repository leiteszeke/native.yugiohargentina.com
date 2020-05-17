// Dependencies
import { Dimensions } from 'react-native';
import DeviceInfo from 'react-native-device-info';

export const getDeviceInfo = async () => {
  const screen = Dimensions.get('screen');
  const window = Dimensions.get('window');
  const deviceId = await DeviceInfo.getDeviceId();
  const device = `${deviceId}:${DeviceInfo.getModel()}:${DeviceInfo.getSystemVersion()}:${DeviceInfo.getSystemVersion()}`;
  const windowSize = `${window.width}x${window.height}`;
  const screenSize = `${screen.width}x${screen.height}`;
  const uuid = await DeviceInfo.getUniqueId();

  return {
    device,
    screenSize,
    uuid,
    windowSize,
  };
};
