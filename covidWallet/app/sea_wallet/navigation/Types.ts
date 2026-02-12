import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

export type SeaWalletMainStackParamList = {
  BottomNavigationBar: undefined;
  NewQRScreen: undefined;
  ViewProfile: undefined;
  ChangeLanguage: undefined;
};

export const AppRoutes = {
  BottomNavigationBar: 'BottomNavigationBar',
  ScanQR: 'NewQRScreen',
  ViewProfile: 'ViewProfile',
  ChangeLanguage: 'ChangeLanguage',
} as const;

export type AppNavigationProp = NativeStackNavigationProp<SeaWalletMainStackParamList>;

export const useAppNavigation = () => useNavigation<AppNavigationProp>();

export type BottomTabParamList = {
  Home: undefined;
  Wallet: undefined;
  ScanQR: undefined;
  ServiceAndTip: undefined;
  Profile: undefined;
};

export const TabRoutes = {
  Home: 'Home',
  Wallet: 'Wallet',
  ScanQR: 'ScanQR',
  ServiceAndTip: 'ServiceAndTip',
  Profile: 'Profile',
} as const;

export type TabNavigationProp = BottomTabNavigationProp<BottomTabParamList>;

export const useTabNavigation = () => useNavigation<TabNavigationProp>();
