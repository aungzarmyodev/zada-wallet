import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BottomNavigationTabBar from './BottomNavigationTabBar';
import WalletScreen from '../screens/WalletScreen';

const Stack = createNativeStackNavigator();

const SeaWalletMainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BottomNavigationBar"
        component={BottomNavigationTabBar}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="WalletScreen"
        component={WalletScreen}
        options={{ headerShown: true, title: 'WAllet' }}
      />
    </Stack.Navigator>
  );
};

export default SeaWalletMainStack;
