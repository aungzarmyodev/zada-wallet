import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BottomNavigationTabBar from './BottomNavigationTabBar';
import NewQRScreen from '../../screens/qr/NewQRScreen';
import ViewProfileScreen from '../screens/ViewProfileScreen';
import LanguageSelectionScreen from '../../screens/settings/LanguageSelectionScreen';
import { AppRoutes } from './Types';

const Stack = createNativeStackNavigator();

const SeaWalletMainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={AppRoutes.BottomNavigationBar}
        component={BottomNavigationTabBar}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={AppRoutes.ScanQR}
        component={NewQRScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={AppRoutes.ViewProfile}
        component={ViewProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={AppRoutes.ChangeLanguage}
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
