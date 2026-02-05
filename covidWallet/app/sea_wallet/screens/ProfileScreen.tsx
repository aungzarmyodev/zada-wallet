import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AppRoutes, useAppNavigation } from '../navigation/Types';
import { AppColors } from '../../theme/Colors';

const ProfileScreen = () => {
  const navigation = useAppNavigation();

  const [biometricEnabled, setBiometricEnabled] = useState(false);

  const userData = {
    name: 'John Doe ',
    phoneNumber: '+1 234 567 8900',
  };

  const clickViewProfile = () => {
    navigation.navigate(AppRoutes.ViewProfile);
  };

  const clickLogout = () => {
    // Click logout
    console.log('Logout tapped');
  };

  const clickChangeLanguage = () => {
    // Click change language
    console.log('Change Language tapped');
  };

  const clickForgotPin = () => {
    // Click forgot PIN
    console.log('Forgot PIN tapped');
  };

  const toggleBiometric = (value: boolean) => {
    setBiometricEnabled(value);
    console.log('Biometric toggled:', value);
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top']}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Profile */}
        <View style={styles.profileHeaderContainer}>
          <View style={styles.profileImageContainer}>
            <MaterialIcons name="person" size={48} color="#fff" />
          </View>
          <View style={styles.profileContent}>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{userData.name}</Text>
              <Text style={styles.profilePhone}>{userData.phoneNumber}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.viewProfileButton}
            onPress={clickViewProfile}
            activeOpacity={0.7}>
            <Text style={styles.viewProfileButtonText}>View Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* General Info Section */}
        <View style={styles.generalInfoSection}>
          <Text style={styles.sectionTitle}>General Info</Text>

          {/* Change Language */}
          <TouchableOpacity
            style={styles.menuItem}
            onPress={clickChangeLanguage}
            activeOpacity={0.7}>
            <Text style={styles.menuItemText}>Change Language</Text>
            <MaterialIcons name="chevron-right" size={24} color="#ccc" />
          </TouchableOpacity>

          <View style={styles.menuDivider} />

          {/* Forgot PIN */}
          <TouchableOpacity style={styles.menuItem} onPress={clickForgotPin} activeOpacity={0.7}>
            <Text style={styles.menuItemText}>Change PIN</Text>
            <MaterialIcons name="chevron-right" size={24} color="#ccc" />
          </TouchableOpacity>

          <View style={styles.menuDivider} />

          {/* Enable Biometric */}
          <View style={styles.menuItem}>
            <Text style={styles.menuItemText}>Enable Biometric</Text>
            <Switch
              value={biometricEnabled}
              onValueChange={toggleBiometric}
              trackColor={{ false: '#e0e0e0', true: '#4CAF50' }}
              thumbColor={biometricEnabled ? '#fff' : '#f4f3f4'}
            />
          </View>

          <View style={styles.menuDivider} />

          {/* Logout */}
          <TouchableOpacity
            style={[styles.menuItem, styles.logoutItem]}
            onPress={clickLogout}
            activeOpacity={0.7}>
            <Text style={[styles.menuItemText, styles.logoutText]}>Logout</Text>
            <MaterialIcons name="chevron-right" size={24} color="#FF3B30" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 20,
  },
  profileHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#f9f9f9',
  },
  profileImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: AppColors.LIGHT_GRAY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileContent: {
    flex: 1,
    marginLeft: 8,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  profilePhone: {
    fontSize: 14,
    color: '#666',
  },
  viewProfileButton: {
    borderWidth: 1,
    borderColor: AppColors.LIGHT_GRAY,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  viewProfileButtonText: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '600',
  },
  divider: {
    height: 8,
    backgroundColor: '#f0f0f0',
  },
  generalInfoSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    marginBottom: 16,
    marginTop: 8,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
  },
  menuItemText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  menuItemArrow: {
    fontSize: 18,
    color: '#ccc',
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#f0f0f0',
  },
  logoutItem: {
    marginTop: 12,
  },
  logoutText: {
    color: '#FF3B30',
  },
  logoutArrow: {
    color: '#FF3B30',
  },
});

export default ProfileScreen;
