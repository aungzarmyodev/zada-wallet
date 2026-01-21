import * as React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { PRIMARY_COLOR, AppColors } from '../theme/Colors';

function LoadingScreen() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={AppColors.WHITE} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoadingScreen;
