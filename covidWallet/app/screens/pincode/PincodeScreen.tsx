import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Pressable } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import ReactNativeBiometrics from 'react-native-biometrics';
import { useTranslation } from 'react-i18next';
import { AppColors } from '../../theme/Colors';
import { AuthStackParamList } from '../../navigation/types';
import { useDispatch } from 'react-redux';
import { updateIsAuthorized } from '../../store/auth';
import { saveItemInLocalStorage } from '../../helpers/Storage';

type Props = NativeStackScreenProps<AuthStackParamList, 'PincodeScreen'>;

const PIN_LENGTH = 6;

const PincodeScreen = ({ navigation, route }: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { isVerifyPin = false, biometricAvailable = false } = route.params ?? {};

  const rnBiometrics = new ReactNativeBiometrics({
    allowDeviceCredentials: true,
  });

  const [pincode, setPincode] = useState('');
  const [confirmPincode, setConfirmPincode] = useState('');
  const [step, setStep] = useState<'pin' | 'confirm'>(isVerifyPin ? 'confirm' : 'pin');

  useEffect(() => {
    if (isVerifyPin && biometricAvailable) {
      checkBiometric();
    }
  }, []);

  const checkBiometric = async () => {
    try {
      const { available } = await rnBiometrics.isSensorAvailable();
      if (!available) return;

      const result = await rnBiometrics.simplePrompt({
        promptMessage: 'Authenticate',
      });

      if (result.success) {
        goToMain();
      }
    } catch {
      // silent fail
    }
  };

  useEffect(() => {
    if (!isVerifyPin && pincode.length === PIN_LENGTH) {
      setStep('confirm');
    }
  }, [pincode]);

  useEffect(() => {
    if (isVerifyPin && confirmPincode.length === PIN_LENGTH) {
      goToMain();
    }
  }, [confirmPincode]);

  useEffect(() => {
    if (!isVerifyPin && confirmPincode.length === PIN_LENGTH) {
      if (pincode !== confirmPincode) {
        Alert.alert('PIN Error', 'PIN does not match');
        setConfirmPincode('');
        return;
      }

      navigation.reset({
        index: 0,
        routes: [{ name: 'NotifyMeScreen' }],
      });
    }
  }, [confirmPincode]);

  const goToMain = async () => {
    await saveItemInLocalStorage('isAuthorized', 'true');

    dispatch(updateIsAuthorized(true));
  };

  const onKeyPress = (key: string) => {
    if (key === 'delete') {
      step === 'pin'
        ? setPincode(pincode.slice(0, -1))
        : setConfirmPincode(confirmPincode.slice(0, -1));
      return;
    }

    if (key === 'biometric' && isVerifyPin) {
      checkBiometric();
      return;
    }

    if (step === 'pin' && pincode.length < PIN_LENGTH) {
      setPincode(pincode + key);
    }

    if (step === 'confirm' && confirmPincode.length < PIN_LENGTH) {
      setConfirmPincode(confirmPincode + key);
    }
  };

  const renderDots = (value: string) => (
    <View style={styles.pinRow}>
      {Array(PIN_LENGTH)
        .fill('')
        .map((_, i) => (
          <View key={i} style={styles.dot}>
            <Text style={styles.dotText}>{value[i] ? '•' : ''}</Text>
          </View>
        ))}
    </View>
  );

  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'biometric', '0', 'delete'];

  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.title}>
        {isVerifyPin ? t('Enter PIN') : step === 'pin' ? t('Create PIN') : t('Confirm PIN')}
      </Text>

      {renderDots(step === 'pin' ? pincode : confirmPincode)}

      <View style={styles.keyboard}>
        {keys.map(k => (
          <Pressable
            key={k}
            onPress={() => onKeyPress(k)}
            style={({ pressed }) => [styles.key, pressed && styles.keyPressed]}>
            {k === 'delete' ? (
              <Text style={styles.keyText}>⌫</Text>
            ) : k === 'biometric' ? (
              isVerifyPin && biometricAvailable ? (
                <MaterialCommunityIcons name="fingerprint" size={32} color="#fff" />
              ) : null
            ) : (
              <Text style={styles.keyText}>{k}</Text>
            )}
          </Pressable>
        ))}
      </View>

      {isVerifyPin && (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ForgetPinCodeScreen');
          }}>
          <Text style={styles.forgotPinText}>{t('Forgot PIN?')}</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default PincodeScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: AppColors.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 20,
  },
  pinRow: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  dot: {
    width: 40,
    height: 40,
    borderBottomWidth: 2,
    borderColor: '#fff',
    marginHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotText: {
    color: '#fff',
    fontSize: 24,
  },
  keyboard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '80%',
    justifyContent: 'center',
  },
  key: {
    width: '30%',
    padding: 18,
    alignItems: 'center',
  },
  keyText: {
    color: '#fff',
    fontSize: 22,
  },
  keyPressed: {
    opacity: 0.5,
  },
  forgotPinText: {
    color: '#fff',
    marginTop: 30,
    fontSize: 18,
    textDecorationLine: 'underline',
    opacity: 0.9,
  },
});
