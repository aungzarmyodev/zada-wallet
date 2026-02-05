import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SeaWalletColors } from '../../theme/SeaWalletColors';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { SeaWalletMainStackParamList } from '../navigation/Types';

type navigationProp = NativeStackNavigationProp<SeaWalletMainStackParamList>;

const FloatingQRButton = () => {
  const navigation = useNavigation<navigationProp>();

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ScanQR')}
        activeOpacity={0.8}>
        <Ionicons name="qr-code" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    top: -20, // lifts the button above tab bar
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 58,
    height: 58,
    borderRadius: 30,
    backgroundColor: SeaWalletColors.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
});

export default FloatingQRButton;
