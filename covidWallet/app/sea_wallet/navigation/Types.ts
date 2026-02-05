import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type SeaWalletMainStackParamList = {
  BottomNavigationBar: undefined;
  ScanQR: undefined;
  ViewProfile: undefined;
};

export const AppRoutes = {
  BottomNavigationBar: 'BottomNavigationBar',
  ScanQR: 'ScanQR',
  ViewProfile: 'ViewProfile',
} as const;

export type AppNavigationProp = NativeStackNavigationProp<SeaWalletMainStackParamList>;

export const useAppNavigation = () => useNavigation<AppNavigationProp>();
