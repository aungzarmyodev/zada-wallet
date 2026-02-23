import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AppRoutes, useAppNavigation } from '../../navigation/Types';
import { AppColors } from '../../../theme/Colors';

import { selectNetworkStatus } from '../../../store/app/selectors';
import { useAppDispatch, useAppSelector } from '../../../store';
import { saveItem, getItem } from '../../../helpers/Storage';
import { BIOMETRIC_ENABLED } from '../../../helpers/ConfigApp';

import { selectUser } from '../../../store/auth/selectors';

import { clearAllAndLogout } from '../../../store/utils';
import AppCustomAlert from '../../../components/Alert/AppCustomAlert';
import { showMessage, showNetworkMessage } from '../../../helpers/Toast';
import { useSelector } from 'react-redux';
import UserProfileLogo from '../home/components/UserProfileLogo';

const ProfileScreen = () => {
  const { t } = useTranslation();
  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();
  const user = useSelector(selectUser);

  const networkStatus = useAppSelector(selectNetworkStatus);
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(false);

  // get biometirc status
  useEffect(() => {
    const loadBiometricStatus = async () => {
      try {
        const value = await getItem(BIOMETRIC_ENABLED);
        setBiometricEnabled(value === 'true');
      } catch (e) {
        setBiometricEnabled(false);
      }
    };
    loadBiometricStatus();
  }, []);

  const clickViewProfile = () => {
    navigation.navigate(AppRoutes.ViewProfile);
  };

  const clickLogout = () => {
    if (networkStatus === 'disconnected') {
      showNetworkMessage();
      return;
    }
    setShowLogoutAlert(true);
  };

  const confirmLogout = () => {
    clearAllAndLogout(dispatch);
    setShowLogoutAlert(false);
  };

  const clickChangeLanguage = () => {
    navigation.navigate(AppRoutes.ChangeLanguage);
  };

  const clickChangePin = () => {
    navigation.navigate(AppRoutes.ChangePin);
  };

  const toggleBiometric = async (value: boolean) => {
    await saveItem(BIOMETRIC_ENABLED, JSON.stringify(value));
    setBiometricEnabled(value);
    if (value) {
      setTimeout(() => {
        showMessage('ZADA Wallet', 'Biometric enabled!');
      }, 500);
    } else {
      setTimeout(() => {
        showMessage('ZADA Wallet', 'Biometric disabled!');
      }, 500);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: AppColors.PRIMARY }} edges={['top']}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeaderContainer}>
          <UserProfileLogo
            name={user.name}
            size={60}
            backgroundColor={AppColors.PRIMARY}
            textColor={AppColors.WHITE}
          />
          <View style={styles.profileContent}>
            <Text style={styles.profileName}>{user.name}</Text>
            <Text style={styles.profilePhone}>{user.phone}</Text>
          </View>
          <TouchableOpacity
            style={styles.viewProfileButton}
            onPress={clickViewProfile}
            activeOpacity={0.7}>
            <Text style={styles.viewProfileButtonText}>View Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />

        <View style={styles.generalInfoSection}>
          <Text style={styles.sectionTitle}>General Info</Text>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={clickChangeLanguage}
            activeOpacity={0.7}>
            <Text style={styles.menuItemText}>Change Language</Text>
            <MaterialIcons name="chevron-right" size={24} color="#ccc" />
          </TouchableOpacity>

          <View style={styles.menuDivider} />

          <TouchableOpacity style={styles.menuItem} onPress={clickChangePin} activeOpacity={0.7}>
            <Text style={styles.menuItemText}>Change PIN</Text>
            <MaterialIcons name="chevron-right" size={24} color="#ccc" />
          </TouchableOpacity>

          <View style={styles.menuDivider} />

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

          <TouchableOpacity
            style={[styles.menuItem, styles.logoutItem]}
            onPress={clickLogout}
            activeOpacity={0.7}>
            <Text style={[styles.menuItemText, styles.logoutText]}>Logout</Text>
            <MaterialIcons name="chevron-right" size={24} color="#FF3B30" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <AppCustomAlert
        isVisible={showLogoutAlert}
        title=""
        message={t('messages.logout')}
        cancelText={t('common.cancel')}
        confirmText={t('common.confirm')}
        onConfirm={confirmLogout}
        onCancel={() => {
          setShowLogoutAlert(false);
        }}
      />
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
    paddingBottom: 4,
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
