import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { IActionObject } from '../../store/actions/interface';

export const AppRoutes = {
  SeaWalletMain: 'SeaWalletMainScreen',
  ScanQR: 'NewQRScreen',
  VerifyRequest: 'VerificationRequestScreen',
  ConnectionAccept: 'ConnectionAccept',
  ConnectionBaseVerification: 'ConnectionBaseVerificationScreen',
  VerifyQR: 'VerifyQRScreen',
  ViewProfile: 'ViewProfile',
  ChangePin: 'ChangePin',
  ChangeLanguage: 'ChangeLanguage',
  CredentialDetail: 'CredentialDetail',
} as const;

export type SeaWalletMainStackParamList = {
  [AppRoutes.SeaWalletMain]: undefined;
  [AppRoutes.ViewProfile]: undefined;
  [AppRoutes.ChangePin]: undefined;
  [AppRoutes.ChangeLanguage]: undefined;
  [AppRoutes.ScanQR]: undefined;
  [AppRoutes.VerifyRequest]: {
    data: {
      metadata?: any;
      type?: string;
      imageUrl?: string;
      organizationName?: string;
      connectionId?: string;
      scanData?: string;
    };
  };
  [AppRoutes.ConnectionAccept]: { qrJSON: any };
  [AppRoutes.VerifyQR]: {
    credential: any;
    values: Array<{ key: string; value: string }>;
  };
  [AppRoutes.ConnectionBaseVerification]: {
    data: IActionObject;
  };
  [AppRoutes.CredentialDetail]: { credentialId: string };
};

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
