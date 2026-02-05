import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BottomNavigationTabBar from './BottomNavigationTabBar';
import NewQRScreen from '../../screens/qr/NewQRScreen';
import ViewProfileScreen from '../screens/ViewProfileScreen';

const Stack = createNativeStackNavigator();

const SeaWalletMainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BottomNavigationBar"
        component={BottomNavigationTabBar}
        options={{ headerShown: false }}
      />

      <Stack.Screen name="ScanQR" component={NewQRScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="ViewProfile"
        component={ViewProfileScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default SeaWalletMainStack;
