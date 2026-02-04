import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import NotificationScreen from '../screens/NotificationScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SeaWalletColors } from '../../theme/SeaWalletColors';

type TabName = 'Home' | 'Notifications' | 'Profile';

const TAB_ICONS: Record<TabName, string> = {
  Home: 'home',
  Notifications: 'notifications',
  Profile: 'person',
};

const Tab = createBottomTabNavigator();

const BottomNavigationTabBar = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: SeaWalletColors.TAB_BAR_ACTIVE_COLOR,
        tabBarInactiveTintColor: SeaWalletColors.TAB_BAR_INACTIVE_COLOR,
        tabBarIcon: ({ color, size }) => {
          const iconName = TAB_ICONS[route.name as TabName];
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Notifications" component={NotificationScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomNavigationTabBar;
