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

  console.log('ROUTES:', navigation.getState().routeNames);
  console.log('PARENT:', navigation.getParent()?.getState().routeNames);

  return (
    <SafeAreaView style={{ flex: 1, borderWidth: 2, borderColor: 'red' }} edges={['top']}>
      <View style={styles.container}>
        <Text> This is Home Screen </Text>
        <Button title="Go to Categories" onPress={() => navigation.navigate('WalletScreen')} />
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
