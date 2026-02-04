import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import Config from 'react-native-config';
import NetworkContext from './app/context/NetworkContext';
import RootNavigator from './app/navigation/RootNavigator';
import { PRIMARY_COLOR } from './app/theme/Colors';
import ErrorBoundary from 'react-native-error-boundary';
import { analytics_log_app_error } from './app/helpers/analytics';
import ErrorFallback from './app/components/ErrorFallback';
import BootstrapPersistance from './app/BootstrapPersistance';
import './app/locales/index';
import HomeScreen from './app/sea_wallet/screens/HomeScreen';

const App = () => {
  const isSeaWallet = Config.APP_TYPE === 'SEA_WALLET';
  console.log('is sea wallet', isSeaWallet);
  const ActiveNavigator = isSeaWallet ? HomeScreen : RootNavigator;

  const errorHandler = (error, stackTrace) => {
    analytics_log_app_error(stackTrace.toString());
  };

  return (
    <NetworkContext>
      <ErrorBoundary FallbackComponent={ErrorFallback} onError={errorHandler}>
        <StatusBar barStyle="light-content" backgroundColor={PRIMARY_COLOR} />
        <BootstrapPersistance>
          <ActiveNavigator />
        </BootstrapPersistance>
      </ErrorBoundary>
    </NetworkContext>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR,
  },
});
export default App;
