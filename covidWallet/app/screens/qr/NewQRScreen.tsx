import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Camera, useCameraDevice, useCodeScanner } from 'react-native-vision-camera';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/types';
import { AppColors } from '../../theme/Colors';
import { useTranslation } from 'react-i18next';
import { makeVerificationObject } from './utils';
import { convertStringToBase64 } from '../../helpers/utils';
import { VerificationAPI } from '../../gateways';
import { showOKDialog } from '../../helpers/Toast';
import CustomProgressBar from './components/CustomProgressBar';

const NewQRScreen = () => {
  const { t } = useTranslation();
  type NavigationProp = NativeStackNavigationProp<MainStackParamList, 'NewQRScreen'>;
  const navigation = useNavigation<NavigationProp>();

  const device = useCameraDevice('back');
  const [cameraActive, setCameraActive] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const checkVerificationCode = async (scanResult: string) => {
    try {
      setIsLoading(true);

      let parsedData = JSON.parse(scanResult);
      let connectionId = undefined;

      if (parsedData.data === undefined) {
        connectionId = parsedData.metadata.connectionId;
        parsedData = convertStringToBase64(JSON.stringify(parsedData));
      } else {
        parsedData = parsedData.data;
      }

      const result = await VerificationAPI.send_request_to_agency(parsedData);

      if (result.data.success) {
        const res = await makeVerificationObject(result.data.verification);
        setTimeout(() => {
          setIsLoading(false);
          navigation.replace('VerificationRequestScreen', {
            data: {
              ...res.credential,
              connectionId: connectionId,
            },
          });
        }, 500);
      } else {
        setIsLoading(false);
        showOKDialog(
          t('messages.verification_fail_title'),
          t('messages.verification_fail_message'),
          () => {
            navigation.navigate('MainScreen');
          }
        );
      }
    } catch (error) {
      setIsLoading(false);
      showOKDialog(
        t('messages.verification_fail_title_1'),
        t('messages.verification_fail_message_1'),
        () => {
          navigation.navigate('MainScreen');
        }
      );
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
      {!cameraActive && isLoading && (
        <View style={styles.progressViewStyle}>
          <CustomProgressBar isVisible={true} text={t('messages.please_wait')} />
        </View>
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
  progressViewStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
});

export default NewQRScreen;
