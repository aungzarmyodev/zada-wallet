import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppColors } from '../../theme/Colors';
import { useTranslation } from 'react-i18next';

const EmptyCredentialScreen = ({ onClose }: { onClose: () => void }) => {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.toolbar}>
        <Text style={styles.toolbarTitle}>{t('VerificationRequestScreen.toolbar')}</Text>
      </View>
      <View style={styles.body}>
        <Image
          source={require('../../assets/images/zada_logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>{t('VerificationRequestScreen.title')}</Text>
        <Text style={styles.title2}>{t('VerificationRequestScreen.no_credentials_found')}</Text>
        <Text style={styles.message}>{t('VerificationRequestScreen.description')}</Text>
        <View style={styles.bulletList}>
          <View style={styles.bulletRow}>
            <Text style={styles.bullet}>{'\u2022'}</Text>
            <Text style={styles.bulletText}>{t('VerificationRequestScreen.description_1')}</Text>
          </View>

          <View style={styles.bulletRow}>
            <Text style={styles.bullet}>{'\u2022'}</Text>
            <Text style={styles.bulletText}>{t('VerificationRequestScreen.description_2')}</Text>
          </View>
        </View>
      </View>
      <View style={styles.bottom}>
        <Text style={styles.footerText}>{t('VerificationRequestScreen.footer')}</Text>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>{t('VerificationRequestScreen.close')}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.PRIMARY,
  },
  toolbar: {
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    backgroundColor: AppColors.WHITE,
    borderBottomColor: '#ddd',
  },
  toolbarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: AppColors.BLACK,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: AppColors.BACKGROUND,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 12,
    color: AppColors.BLACK,
  },
  title2: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: AppColors.BLACK,
  },
  message: {
    fontSize: 16,
    color: AppColors.MEDIUM_GRAY,
    marginBottom: 12,
    textAlign: 'center',
  },

  bulletList: {
    alignSelf: 'stretch',
    marginTop: 8,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  bullet: {
    fontSize: 34,
    lineHeight: 22,
    marginRight: 6,
    color: AppColors.MEDIUM_GRAY,
  },
  bulletText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 22,
    color: AppColors.MEDIUM_GRAY,
  },
  footerText: {
    fontSize: 12,
    color: AppColors.MEDIUM_GRAY,
    textAlign: 'center',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  bottom: {
    paddingHorizontal: 8,
    paddingVertical: 20,
    backgroundColor: AppColors.BACKGROUND,
  },
  closeButton: {
    backgroundColor: AppColors.PRIMARY,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default EmptyCredentialScreen;
