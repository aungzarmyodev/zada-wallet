import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppColors } from '../../theme/Colors';

const EmptyCredentialScreen = ({ navigation }: any) => {
  const handleClose = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.toolbar}>
        <Text style={styles.toolbarTitle}>Verify With ZADA</Text>
      </View>
      <View style={styles.body}>
        <Image
          source={require('../../assets/images/zada_logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>ZADA Secure Verification</Text>
        <Text style={styles.title2}>No Credentials Found</Text>

        <Text style={styles.message}>
          It looks like you don’t have any credentials available for this verification. What you can
          do:
        </Text>
        <View style={styles.bulletList}>
          <View style={styles.bulletRow}>
            <Text style={styles.bullet}>{'\u2022'}</Text>
            <Text style={styles.bulletText}>
              Go to the Credentials tab to claim or request one.
            </Text>
          </View>

          <View style={styles.bulletRow}>
            <Text style={styles.bullet}>{'\u2022'}</Text>
            <Text style={styles.bulletText}>
              If your organization provides it, connect with them and accept the credential under
              Actions.
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.bottom}>
        <Text style={styles.footerText}>
          Powered by ZADA • Your data is encrypted and only shared with your consent.
        </Text>
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  toolbar: {
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
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
    paddingVertical: 16,
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
