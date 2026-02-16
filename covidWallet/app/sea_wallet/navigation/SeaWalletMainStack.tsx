import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomNavigationTabBar from './BottomNavigationTabBar';
import NewQRScreen from '../../screens/qr/NewQRScreen';
import ViewProfileScreen from '../screens/profile/ViewProfileScreen';
import LanguageSelectionScreen from '../../screens/settings/LanguageSelectionScreen';
import VerificationRequestScreen from '../../screens/verification_request_screen/VerificationRequestScreen';
import ConnectionAccept from '../../screens/qr/ConnectionAccept';
import VerifyQRScreen from '../../screens/verification_request_screen/VerifyQRScreen';
import ConnectionBaseVerificationScreen from '../../screens/verification_request_screen/ConnectionBaseVerificationScreen';
import { AppRoutes, SeaWalletMainStackParamList } from './Types';

const Stack = createNativeStackNavigator<SeaWalletMainStackParamList>();

const SeaWalletMainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={AppRoutes.SeaWalletMain}
        component={BottomNavigationTabBar}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={AppRoutes.ScanQR}
        component={NewQRScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={AppRoutes.VerifyRequest}
        component={VerificationRequestScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={AppRoutes.ConnectionAccept}
        component={ConnectionAccept}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={AppRoutes.VerifyQR}
        component={VerifyQRScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={AppRoutes.ConnectionBaseVerification}
        component={ConnectionBaseVerificationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={AppRoutes.Profile}
        component={ViewProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={AppRoutes.Language}
        component={LanguageSelectionScreen}
        options={{
          headerShown: true,
          title: 'Language',
        }}
      />
    </Stack.Navigator>
  );
};

export default SeaWalletMainStack;
