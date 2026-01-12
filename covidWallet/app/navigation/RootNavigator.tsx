import React, { useCallback, useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
import SpInAppUpdates, { IAUUpdateKind } from 'sp-react-native-in-app-updates';
import DeviceInfo from 'react-native-device-info';

import useInit from '../hooks/useInit';
import useNetwork from '../hooks/useNetwork';
import useWebview from '../hooks/useWebview';

import { navigationRef } from './utils';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

import LoadingScreen from '../screens/LoadingScreen';
import BiometricModal from '../components/Modal/BiometricModal';

import { useAppDispatch, useAppSelector } from '../store';
import { selectIsAuthorized } from '../store/auth/selectors';
import { selectNetworkStatus } from '../store/app/selectors';
import { updateAppSetupComplete } from '../store/app';
import { clearAllAndLogout } from '../store/utils';

import { getItemFromLocalStorage, saveItemInLocalStorage } from '../helpers/Storage';
import ConfigApp from '../helpers/ConfigApp';
import { updateIsAuthorized } from '../store/auth';

export type RootStackParamList = {
  Loading: undefined;
  Auth: undefined;
  Main: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const dispatch = useAppDispatch();
  const appStarted = useRef(true);

  const isAuthorized = useAppSelector(selectIsAuthorized);
  const networkStatus = useAppSelector(selectNetworkStatus);

  useNetwork();

  const { isAppReady, messageIndex, setMessageIndex, startApp } = useInit();

  const linking = {
    prefixes: ['https://zadanetwork.com', 'zada://'],
  };

  useEffect(() => {
    (async () => {
      setMessageIndex(0);
      SplashScreen.hide();

      const isAppSetupComplete = await getItemFromLocalStorage('isAppSetupComplete');
      dispatch(updateAppSetupComplete(isAppSetupComplete));

      checkForUpdates();
    })();
  }, [networkStatus]);

  useEffect(() => {
    const checkVersion = async () => {
      const currentVersion = DeviceInfo.getVersion();
      const storedVersion = await getItemFromLocalStorage(ConfigApp.APP_VERSION);

      if (storedVersion && storedVersion !== currentVersion) {
        clearAllAndLogout(dispatch);
      }

      await saveItemInLocalStorage(ConfigApp.APP_VERSION, currentVersion);
    };

    checkVersion();
  }, []);

  useEffect(() => {
    const restoreAuth = async () => {
      const storedAuth = await getItemFromLocalStorage('isAuthorized');

      if (storedAuth === 'true') {
        dispatch(updateIsAuthorized(true));
      }
    };

    restoreAuth();
  }, []);

  const checkForUpdates = async () => {
    const updater = new SpInAppUpdates(false);
    const result = await updater.checkNeedsUpdate();

    if (result.shouldUpdate && Platform.OS === 'android') {
      updater.startUpdate({
        updateType: IAUUpdateKind.FLEXIBLE,
      });
    }

    startApp();
  };

  return (
    <NavigationContainer ref={navigationRef} linking={linking}>
      {useWebview()}

      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAppReady && (
          <Stack.Screen name="Loading">
            {() => <LoadingScreen messageIndex={messageIndex} />}
          </Stack.Screen>
        )}

        {isAppReady && !isAuthorized && <Stack.Screen name="Auth" component={AuthNavigator} />}

        {isAppReady && isAuthorized && (
          <Stack.Screen name="Main">
            {() => (
              <>
                <MainNavigator />
                <BiometricModal appStarted={appStarted} />
              </>
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
