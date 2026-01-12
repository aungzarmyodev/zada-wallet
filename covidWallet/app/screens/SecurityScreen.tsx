import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import { BACKGROUND_COLOR } from '../theme/Colors';
import { AuthStackParamList } from '../navigation/types';
import ImageBoxComponent from '../components/ImageBoxComponent';
import TextComponent from '../components/TextComponent';
import GreenPrimaryButton from '../components/GreenPrimaryButton';
import { useTranslation } from 'react-i18next';

const img = require('../assets/images/security.png');

interface Props {
  navigation: NativeStackNavigationProp<AuthStackParamList>;
}

const SecurityScreen = ({ navigation }: Props) => {
  const { t } = useTranslation();
  const [isSensorAvailable, setIsSensorAvailable] = useState(false);

  useEffect(() => {
    FingerprintScanner.isSensorAvailable()
      .then(() => setIsSensorAvailable(true))
      .catch(() => setIsSensorAvailable(false));

    return () => FingerprintScanner.release();
  }, []);

  const onEnableSecurity = () => {
    // Always go to Create PIN
    // Biometric is OPTIONAL and enabled later
    navigation.navigate('PincodeScreen', {
      biometricAvailable: isSensorAvailable,
      isVerifyPin: false,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.title}>{t('SecurityScreen.title')}</Text>
        <TextComponent text={t('SecurityScreen.sub_title')} />
      </View>

      <View style={styles.middle}>
        <ImageBoxComponent source={img} />
      </View>

      <View style={styles.bottom}>
        <GreenPrimaryButton text={t('SecurityScreen.enable_btn')} nextHandler={onEnableSecurity} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    alignItems: 'center',
  },
  top: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middle: {
    flex: 2,
    justifyContent: 'center',
  },
  bottom: {
    flex: 3,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default SecurityScreen;
