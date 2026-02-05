import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { changeLanguage } from 'i18next';

export type SeaWalletMainStackParamList = {
  BottomNavigationBar: undefined;
  ScanQR: undefined;
  ViewProfile: undefined;
  ChangeLanguage: undefined;
};

export const AppRoutes = {
  BottomNavigationBar: 'BottomNavigationBar',
  ScanQR: 'ScanQR',
  ViewProfile: 'ViewProfile',
  ChangeLanguage: 'ChangeLanguage',
} as const;

export type AppNavigationProp = NativeStackNavigationProp<SeaWalletMainStackParamList>;

export const useAppNavigation = () => useNavigation<AppNavigationProp>();
