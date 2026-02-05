import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SeaWalletColors } from '../../theme/SeaWalletColors';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { SeaWalletMainStackParamList } from '../navigation/Types';

type HomeScreenNavigationProp = NativeStackNavigationProp<SeaWalletMainStackParamList>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

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
