import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Camera, useCameraDevice, useCodeScanner } from 'react-native-vision-camera';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/types';
import { AppColors } from '../../theme/Colors';
import { useTranslation } from 'react-i18next';
import { getType } from './utils';
import { CONN_REQ, CONNLESS_VER_REQ } from '../../helpers/ConfigApp';

const NewQRScreen = () => {
  // localization
  const { t } = useTranslation();

  // navigation
  type NavigationProp = NativeStackNavigationProp<MainStackParamList, 'NewQRScreen'>;
  const navigation = useNavigation<NavigationProp>();

  // camera
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
        const scanResult = codes[0]?.value;
        if (scanResult) {
          setCameraActive(false);
          checkVerificationCode(scanResult);
        }
      }
    },
  });

  const checkVerificationCode = async (scanResult: any) => {
    let type = getType(scanResult);
    if (type === CONNLESS_VER_REQ) {
      // Navigate to VerificationRequestScreen with scan data
      navigation.replace('VerificationRequestScreen', {
        data: {
          scanData: scanResult,
        },
      });
    } else if (type === CONN_REQ) {
      // Navigate to ConnectionAccept screen with QR data
      let qrJSON = JSON.parse(scanResult);
      navigation.replace('ConnectionAccept', {
        qrJSON: qrJSON,
      });
    }
  };

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
      {cameraActive && (
        <>
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
        </>
      )}
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
    backgroundColor: AppColors.DANGER,
    borderRadius: 10,
  },

  cancelText: {
    color: AppColors.WHITE,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NewQRScreen;
