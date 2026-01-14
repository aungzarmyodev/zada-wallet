import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { AppColors } from '../../theme/Colors';
import { HeaderLeftButton } from '../auth/components/buttons/HeaderButtons';
import { AuthStackParamList, RootStackParamList } from '../../navigation/types';

type ForgetPinNavigation = CompositeNavigationProp<
  NativeStackNavigationProp<AuthStackParamList, 'ForgetPinCodeScreen'>,
  NativeStackNavigationProp<RootStackParamList>
>;

const ForgetPinCodeScreen = () => {
  const navigation = useNavigation<ForgetPinNavigation>();

  const goBack = () => {
    navigation.navigate('PincodeScreen', { isVerifyPin: true });
  };

  const onRequestByEmail = () => {
    navigation.navigate('ResetPinByEmailScreen');
  };

  const onUseSecretCode = () => {
    navigation.navigate('ResetPinBySecretCodeScreen');
  };

  const onContactSupport = () => {
    navigation.navigate('Main', {
      screen: 'ContactUs',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderLeftButton onPress={goBack} />

      <Text style={styles.title}>Forgot PIN Code</Text>
      <Text style={styles.description}>Choose one of the options below to reset your PIN.</Text>

      <TouchableOpacity style={styles.card} onPress={onRequestByEmail}>
        <Text style={styles.cardTitle}>Request by Email</Text>
        <Text style={styles.cardDesc}>Receive an OTP via email to reset your PIN.</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={onUseSecretCode}>
        <Text style={styles.cardTitle}>Use Secret Code</Text>
        <Text style={styles.cardDesc}>Enter your secret code and create a new PIN.</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={onContactSupport}>
        <Text style={styles.cardTitle}>Contact Customer Support</Text>
        <Text style={styles.cardDesc}>Get help from our support team to reset your PIN.</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.WHITE,
  },
  title: {
    fontSize: 24,
    color: AppColors.TEXT_TITLE_COLOR,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    color: AppColors.TEXT_LABEL_COLOR,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardDesc: {
    fontSize: 14,
    color: '#555',
  },
});

export default ForgetPinCodeScreen;
