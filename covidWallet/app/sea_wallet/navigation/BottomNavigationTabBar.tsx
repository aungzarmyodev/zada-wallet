import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import NotificationScreen from '../screens/NotificationScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SeaWalletColors } from '../../theme/SeaWalletColors';
import FloatingQRButton from '../components/FloatingQRButton';
import WalletScreen from '../screens/WalletScreen';

type TabName = 'Home' | 'Wallet' | 'Notifications' | 'Profile';

const TAB_ICONS: Record<TabName, string> = {
  Home: 'home',
  Wallet: 'wallet',
  Notifications: 'notifications',
  Profile: 'person',
};

const Tab = createBottomTabNavigator();

const DummyQRScreen = () => null;

const BottomNavigationTabBar = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: SeaWalletColors.TAB_BAR_ACTIVE_COLOR,
        tabBarInactiveTintColor: SeaWalletColors.TAB_BAR_INACTIVE_COLOR,
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'QRAction') return null;

          const iconName = TAB_ICONS[route.name as TabName];
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarLabelStyle: { fontSize: 12 },
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />

      <Tab.Screen name="Wallet" component={WalletScreen} />

      <Tab.Screen
        name="QRAction"
        component={DummyQRScreen}
        options={{
          tabBarButton: () => <FloatingQRButton />,
        }}
      />

      <Tab.Screen name="Notifications" component={NotificationScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomNavigationTabBar;
