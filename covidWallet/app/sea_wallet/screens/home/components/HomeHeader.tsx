import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AppColors } from '../../../../theme/Colors';
import { SeaWalletColors } from '../../../../theme/SeaWalletColors';
import { IUserState } from '../../../../store/auth/interface';

type HomeHeaderProp = {
  user: IUserState;
  viewAll(): void;
};

const HomeHeader = ({ user, viewAll }: HomeHeaderProp) => {
  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <View style={styles.profileHeaderContainer}>
          <View style={styles.profileImageContainer}>
            <MaterialIcons name="person" size={48} color="#fff" />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.welcomeBack}>Welcome Back,</Text>
            <Text style={styles.profileName}>{user.name}</Text>
          </View>
        </View>
      </View>
      <View style={styles.divider} />
      <View style={styles.summaryTitleContainer}>
        <Text style={styles.summaryTitle}>Credential Summary</Text>
        <TouchableOpacity
          style={styles.viewAllContainer}
          onPress={() => {
            viewAll();
          }}>
          <Text style={styles.viewAllText}>View All </Text>
          <MaterialIcons name="chevron-right" size={24} color={AppColors.MEDIUM_GRAY} />
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        <View style={styles.statusCard}>
          <View style={styles.validCircleIcon}>
            <MaterialIcons name="check-circle" size={20} color="#4CAF50" />
          </View>
          <View style={styles.cardLabelContainer}>
            <Text style={styles.cardValue}>12</Text>
            <Text style={styles.cardLabel}>Valid</Text>
          </View>
        </View>
        <View style={styles.statusCard}>
          <View style={styles.expringCircleIcon}>
            <MaterialIcons name="warning" size={20} color="#FFA000" />
          </View>
          <View style={styles.cardLabelContainer}>
            <Text style={styles.cardValue}>3</Text>
            <Text style={styles.cardLabel}>Valid</Text>
          </View>
        </View>
        <View style={styles.statusCard}>
          <View style={styles.expiredCircleIcon}>
            <MaterialIcons name="cancel" size={20} color="#F44336" />
          </View>
          <View style={styles.cardLabelContainer}>
            <Text style={styles.cardValue}>1</Text>
            <Text style={styles.cardLabel}>Expired</Text>
          </View>
        </View>
      </View>
    </View>
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
    backgroundColor: SeaWalletColors.PRIMARY,
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
    color: AppColors.WHITE,
    marginBottom: 4,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '600',
    color: AppColors.WHITE,
    marginBottom: 4,
  },
  profilePhone: {
    fontSize: 12,
    color: AppColors.WHITE,
  },
  divider: {
    height: 8,
    backgroundColor: '#f0f0f0',
  },
  summaryTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  viewAllContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '500',
    color: AppColors.MEDIUM_GRAY,
  },
  cardsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
  },
  statusCard: {
    flex: 1,
    flexDirection: 'row',
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
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4,
  },
  validCircleIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  expiredCircleIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFEBEE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  expringCircleIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF8E1',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeHeader;
