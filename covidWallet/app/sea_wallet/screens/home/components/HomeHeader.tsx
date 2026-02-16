import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AppColors } from '../../../../theme/Colors';
import { IUserState } from '../../../../store/auth/interface';
import UserProfileLogo from './UserProfileLogo';
import QuickActions from './QuickActions';

type HomeHeaderProp = {
  user: IUserState;
  viewAll(): void;
  scanQR(): void;
  browseService(): void;
};

const HomeHeader = ({ user, viewAll, scanQR, browseService }: HomeHeaderProp) => {
  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <UserProfileLogo
          name={user.name}
          size={60}
          backgroundColor={AppColors.WHITE}
          textColor={AppColors.PRIMARY}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.welcomeBack}>Welcome Back,</Text>
          <Text style={styles.profileName}>{user.name}</Text>
        </View>
      </View>
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
            <MaterialIcons name="check-circle" size={16} color="#4CAF50" />
          </View>
          <View style={styles.cardLabelContainer}>
            <Text style={styles.cardValue}>12</Text>
            <Text style={styles.cardLabel}>Valid</Text>
          </View>
        </View>
        <View style={styles.statusCard}>
          <View style={styles.expringCircleIcon}>
            <MaterialIcons name="warning" size={16} color="#FFA000" />
          </View>
          <View style={styles.cardLabelContainer}>
            <Text style={styles.cardValue}>3</Text>
            <Text style={styles.cardLabel}>Expring</Text>
          </View>
        </View>
        <View style={styles.statusCard}>
          <View style={styles.expiredCircleIcon}>
            <MaterialIcons name="cancel" size={16} color="#F44336" />
          </View>
          <View style={styles.cardLabelContainer}>
            <Text style={styles.cardValue}>1</Text>
            <Text style={styles.cardLabel}>Expired</Text>
          </View>
        </View>
      </View>
      <QuickActions scanQR={scanQR} browseService={browseService} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileSection: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: AppColors.PRIMARY,
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
  summaryTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
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
    fontWeight: '400',
    color: AppColors.GRAY,
  },
  cardsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    gap: 12,
  },
  statusCard: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: AppColors.WHITE,
    borderRadius: 12,
    paddingVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  cardValue: {
    fontSize: 16,
    fontWeight: '600',
    color: AppColors.BLACK,
  },
  cardLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
    textAlign: 'center',
  },
  cardLabelContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4,
  },
  validCircleIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  expiredCircleIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FFEBEE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  expringCircleIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FFF8E1',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeHeader;
