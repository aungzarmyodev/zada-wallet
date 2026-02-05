import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SeaWalletColors } from '../../theme/SeaWalletColors';
import { useAppNavigation } from '../navigation/Types';

const HomeScreen = () => {
  const navigation = useAppNavigation();

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top']}>
      <View style={styles.container}>
        <Text> This is Home Screen </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SeaWalletColors.BACKGROUND,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
