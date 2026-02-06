import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

export type SeaWalletMainStackParamList = {
  BottomNavigationBar: undefined;
  ScanQR: undefined;
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
  ScanQRTab: undefined;
  Notifications: undefined;
  Profile: undefined;
};

export type TabNavigationProp = BottomTabNavigationProp<BottomTabParamList>;

export const useTabNavigation = () => useNavigation<TabNavigationProp>();
