import React, { useEffect, useState, useCallback } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  BackHandler,
  Platform,
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppColors } from '../../theme/Colors';
import { AppDispatch, useAppDispatch, useAppSelector } from '../../store';
import { selectUser } from '../../store/auth/selectors';
import FadeView from '../../components/FadeView';
import { validateUserOTP } from '../../store/auth/thunk';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/types';
import AnimatedLoading from '../../components/Animations/AnimatedLoading';
import InputPinComponent from '../../components/Input/InputPinComponent';
import ResendCode from './components/ResendCode';
import { useTranslation } from 'react-i18next';
import { saveItemInLocalStorage, showMessage } from '../../helpers';
import ConstantsList from '../../helpers/ConfigApp';

const OTP_LENGTH = 6;

interface INProps {
  navigation: NativeStackNavigationProp<AuthStackParamList>;
}

const VerifyOTPScreen = ({ navigation }: INProps) => {
  const dispatch = useAppDispatch<AppDispatch>();
  const user = useAppSelector(selectUser);
  const { t } = useTranslation();

  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle Android back button
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.navigate('PhoneNumberScreen');
      return true;
    });

    return () => backHandler.remove();
  }, [navigation]);

  // Auto verify OTP when completed
  useEffect(() => {
    if (code.length === OTP_LENGTH && user.phone) {
      verifyOTP();
    }
  }, [code, user.phone]);

  const verifyOTP = useCallback(async () => {
    try {
      Keyboard.dismiss();
      setLoading(true);

      const response = await dispatch(validateUserOTP({ phone: user.phone!, code })).unwrap();

      handleOTPResult(response);
    } catch (error: any) {
      showMessage('ZADA Wallet', error.message);
    } finally {
      setLoading(false);
    }
  }, [dispatch, code, user.phone]);

  const handleOTPResult = (response: any) => {
    // reset auth attempt count
    saveItemInLocalStorage(ConstantsList.AUTH_COUNT, 0);

    if (!response.isRegistered) {
      navigation.navigate('RegistrationScreen');
      return;
    }

    if (!user.isMigrated) {
      navigation.navigate('MigrationScreen');
      return;
    }

    // Existing user
    if (!response.hasPin) {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'PincodeScreen',
            params: { isVerifyPin: true },
          },
        ],
      });
    } else {
      navigation.navigate('SecurityScreen');
    }
  };

  const renderEmptyDigit = () => (
    <View style={styles.digitBox}>
      <Text style={styles.digitPlaceholder}>*</Text>
    </View>
  );

  const renderFilledDigit = (digit: string) => (
    <View style={styles.digitBox}>
      <Text style={styles.digitText}>{digit}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.root}>
      <FadeView style={styles.fade}>
        <View style={styles.imageContainer}>
          <Image
            resizeMode="contain"
            source={require('../../assets/images/otp.gif')}
            style={styles.image}
          />
        </View>

        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
          <Text style={styles.title}>{t('VerifyOTPScreen.title')}</Text>

          <Text style={styles.subtitle}>
            {t('VerifyOTPScreen.sub_title_1')} {user.phone}, {t('VerifyOTPScreen.sub_title_2')}
          </Text>

          <View style={styles.inputContainer}>
            <InputPinComponent
              OTP
              onPincodeChange={setCode}
              pincodeError=""
              emptyComponent={renderEmptyDigit}
              filledComponent={renderFilledDigit}
            />
          </View>
        </KeyboardAvoidingView>

        {loading && <AnimatedLoading type="FadingCircleAlt" color={AppColors.PRIMARY} />}

        <View style={styles.resendContainer}>
          <ResendCode navigation={navigation} />
        </View>
      </FadeView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: AppColors.WHITE,
  },
  fade: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  imageContainer: {
    flex: 0.5,
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: AppColors.PRIMARY,
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: AppColors.GRAY,
    marginBottom: 8,
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  inputContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  digitBox: {
    height: 30,
    width: 30,
    borderBottomWidth: 2,
    borderColor: AppColors.BLACK,
    alignItems: 'center',
    justifyContent: 'center',
  },
  digitText: {
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
    color: AppColors.BLACK,
  },
  digitPlaceholder: {
    fontSize: 20,
    color: AppColors.BLACK,
  },
  resendContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 40 : 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});

export default VerifyOTPScreen;
