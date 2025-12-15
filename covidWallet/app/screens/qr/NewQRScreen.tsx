import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Camera, useCameraDevice, useCodeScanner } from 'react-native-vision-camera';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/types';
import { AppColors } from '../../theme/Colors';
import { useTranslation } from 'react-i18next';

const NewQRScreen = () => {
  const { t } = useTranslation();
  type NavigationProp = NativeStackNavigationProp<MainStackParamList, 'NewQRScreen'>;
  const navigation = useNavigation<NavigationProp>();

  const device = useCameraDevice('back');
  const [cameraActive, setCameraActive] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    const requestPermission = async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'granted');
    };

    requestPermission();
  }, []);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: codes => {
      if (codes.length > 0 && cameraActive) {
        const value = codes[0]?.value;
        if (value) {
          setCameraActive(false);
        }
      }
    },
  });

  const goBack = () => {
    navigation.navigate('MainScreen');
  };

  if (!hasPermission || !device) {
    return (
      <View style={styles.container2}>
        <Text style={styles.noCamerAccessLabel}>{t('QRScreen.no_access_camera')}</Text>
        <TouchableOpacity style={styles.closeButton} onPress={() => goBack()}>
          <Text style={styles.closeText}>{t('QRScreen.close')}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={cameraActive}
        codeScanner={codeScanner}
      />
      <View style={styles.overlay}>
        <Text style={styles.title}>{t('QRScreen.title')}</Text>
        <View style={styles.frame} />
        <TouchableOpacity style={styles.cancelButton} onPress={() => goBack()}>
          <Text style={styles.cancelText}>{t('QRScreen.cancel_scan')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  container2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noCamerAccessLabel: {
    color: AppColors.TEXT_LABEL_COLOR,
    fontSize: 16,
    padding: 20,
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 25,
    backgroundColor: AppColors.PRIMARY,
    borderRadius: 10,
  },
  closeText: {
    color: AppColors.WHITE,
    fontSize: 16,
    fontWeight: 'bold',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 20,
    fontWeight: '600',
  },

  frame: {
    width: 300,
    height: 300,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 10,
  },

  cancelButton: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 25,
    backgroundColor: AppColors.WHITE,
    borderRadius: 10,
  },

  cancelText: {
    color: AppColors.PRIMARY,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NewQRScreen;
