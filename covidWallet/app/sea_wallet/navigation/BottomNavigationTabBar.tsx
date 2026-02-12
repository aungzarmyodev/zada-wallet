import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/home/HomeScreen';
import WalletScreen from '../screens/wallet/WalletScreen';
import ServicesAndTipsScreen from '../screens/services_tips/ServicesAndTipsScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SeaWalletColors } from '../../theme/SeaWalletColors';
import { AppRoutes, BottomTabParamList, TabRoutes } from './Types';

type TabName = 'Home' | 'Wallet' | 'ScanQR' | 'ServiceAndTip' | 'Profile';

const TAB_ICONS: Record<TabName, string> = {
  Home: 'home',
  Wallet: 'wallet',
  ScanQR: 'scan',
  ServiceAndTip: 'compass-outline',
  Profile: 'person',
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

const DummyQRScreen = () => null;

const BottomNavigationTabBar = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: SeaWalletColors.TAB_BAR_ACTIVE_COLOR,
        tabBarInactiveTintColor: SeaWalletColors.TAB_BAR_INACTIVE_COLOR,
        tabBarIcon: ({ color, size }) => {
          const iconName = TAB_ICONS[route.name as TabName];
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarLabelStyle: { fontSize: 12 },
      })}>
      <Tab.Screen name={TabRoutes.Home} component={HomeScreen} />

      <Tab.Screen name={TabRoutes.Wallet} component={WalletScreen} />

      <Tab.Screen
        name={TabRoutes.ScanQR}
        component={DummyQRScreen}
        listeners={({ navigation }) => ({
          tabPress: e => {
            e.preventDefault();
            navigation.navigate(AppRoutes.ScanQR);
          },
        })}
      />

      <Tab.Screen name={TabRoutes.ServiceAndTip} component={ServicesAndTipsScreen} />
      <Tab.Screen name={TabRoutes.Profile} component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomNavigationTabBar;
