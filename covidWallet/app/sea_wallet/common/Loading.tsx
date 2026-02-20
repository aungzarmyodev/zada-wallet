import React from 'react';
import { ActivityIndicator, StyleSheet, View, Text } from 'react-native';
import { AppColors } from '../../theme/Colors';

const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={AppColors.PRIMARY} />
      <Text style={styles.loadingMessage}>Loading resources...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.BACKGROUND,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingMessage: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default Loading;
