import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SeaWalletColors } from '../../theme/SeaWalletColors';
import { useAppNavigation } from '../navigation/Types';
import { AppColors } from '../../theme/Colors';

const HomeScreen = () => {
  const navigation = useAppNavigation();

  const userData = {
    name: 'John Doe',
    phoneNumber: '+1 234 567 8900',
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top']}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileHeaderContainer}>
            <View style={styles.profileImageContainer}>
              <MaterialIcons name="person" size={48} color="#fff" />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.welcomeBack}>Welcome Back,</Text>
              <Text style={styles.profileName}>{userData.name}</Text>
              <Text style={styles.profilePhone}>{userData.phoneNumber}</Text>
            </View>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        <View style={styles.summaryTitleContainer}>
          <Text style={styles.summaryTitle}>Summary</Text>
        </View>
        <View style={styles.cardsContainer}>
          <View style={styles.statusCard}>
            <Text style={styles.cardValue}>12</Text>
            <View style={styles.cardLabelContainer}>
              <MaterialIcons name="check-circle" size={16} color="#4CAF50" />
              <Text style={styles.cardLabel}>Valid</Text>
            </View>
          </View>
          <View style={styles.statusCard}>
            <Text style={styles.cardValue}>5</Text>
            <View style={styles.cardLabelContainer}>
              <MaterialIcons name="schedule" size={16} color="#FF9800" />
              <Text style={styles.cardLabel}>Expire</Text>
            </View>
          </View>
          <View style={styles.statusCard}>
            <Text style={styles.cardValue}>3</Text>
            <View style={styles.cardLabelContainer}>
              <MaterialIcons name="warning" size={16} color="#FF3B30" />
              <Text style={styles.cardLabel}>Expiring</Text>
            </View>
          </View>
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
  profileSection: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f9f9f9',
  },
  profileHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  profileImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: AppColors.LIGHT_GRAY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    flex: 1,
  },
  welcomeBack: {
    fontSize: 12,
    fontWeight: '400',
    color: '#000',
    marginBottom: 4,
  },
  profileName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  profilePhone: {
    fontSize: 12,
    color: '#666',
  },
  divider: {
    height: 8,
    backgroundColor: '#f0f0f0',
  },
  summaryTitleContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  cardsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
  },
  statusCard: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  cardValue: {
    fontSize: 24,
    fontWeight: '700',
    color: AppColors.BLACK,
  },
  cardLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
  },
  cardLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
  },
});

export default HomeScreen;
