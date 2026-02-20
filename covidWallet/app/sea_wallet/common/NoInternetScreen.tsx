import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AppColors } from '../../theme/Colors';

const NoInternetScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>No Internet Connection</Text>
      <Text style={styles.subtitle}>Please check your connection and try again.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: AppColors.BACKGROUND,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: AppColors.BLACK,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

export default NoInternetScreen;
