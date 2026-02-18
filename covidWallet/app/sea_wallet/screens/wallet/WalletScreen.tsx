import React, { useCallback, useState } from 'react';
import { View, Text, useWindowDimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { TabView, SceneMap, NavigationState, SceneRendererProps } from 'react-native-tab-view';
import CredentialList from './CredentialList';
import ConnectionList from './ConnectionList';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppColors } from '../../../theme/Colors';
import { useTranslation } from 'react-i18next';
import { useFocusEffect } from '@react-navigation/native';
import { _showAlert } from '../../../helpers/Toast';
import { useAppDispatch, useAppSelector } from '../../../store';
import { fetchCredentials } from '../../../store/credentials/thunk';
import { selectNetworkStatus } from '../../../store/app/selectors';
import { fetchCredentialsStatus, getAllCredentials } from '../../../store/credentials/selectors';

type TabRoute = {
  key: 'credentaiList' | 'connectionList';
  title: string;
};

const renderScene = SceneMap({
  credentaiList: CredentialList,
  connectionList: ConnectionList,
});

const routes: TabRoute[] = [
  { key: 'credentaiList', title: 'Credentials' },
  { key: 'connectionList', title: 'Connections' },
];

const WalletScreen = () => {
  const { t } = useTranslation();

  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const networkStatus = useAppSelector(selectNetworkStatus);

  const dispatch = useAppDispatch();
  const { initial } = useAppSelector(fetchCredentialsStatus);

  const credentialList = useAppSelector(getAllCredentials.selectAll);

  useFocusEffect(
    useCallback(() => {
      if (networkStatus !== 'connected') {
        _showAlert(t('errors.no_internet_title'), t('errors.no_internet_message'));
        return;
      }
      if (initial) {
        dispatch(fetchCredentials() as any);
      }
    }, [initial, networkStatus])
  );

  const renderCustomTabBar = (
    props: SceneRendererProps & { navigationState: NavigationState<TabRoute> }
  ) => {
    return (
      <View style={styles.tabBarContainer}>
        {props.navigationState.routes.map((route, i) => {
          const isActive = index === i;
          return (
            <TouchableOpacity
              key={route.key}
              style={[styles.tabItem, isActive ? styles.activeTabItem : null, { flex: 1 }]}
              onPress={() => setIndex(i)}>
              <Text style={[styles.tabLabel, isActive ? styles.activeTabLabel : null]}>
                {route.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaView} edges={['top']}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{t('sea_wallet.my_wallet')}</Text>
          <Text style={styles.subTitleText}>
            {credentialList.length} {t('common.credentials')}
          </Text>
        </View>

        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          renderTabBar={renderCustomTabBar}
          onIndexChange={setIndex}
          swipeEnabled={false}
          initialLayout={{ width: layout.width }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: AppColors.PRIMARY,
  },
  container: {
    flex: 1,
    backgroundColor: AppColors.BACKGROUND,
  },
  titleContainer: {
    padding: 16,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: AppColors.TEXT_TITLE_COLOR,
  },
  subTitleText: {
    fontSize: 14,
    fontWeight: '600',
    color: AppColors.TEXT_LABEL_COLOR,
    paddingTop: 4,
  },

  tabBarContainer: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: AppColors.BACKGROUND,
  },
  tabItem: {
    paddingVertical: 10,
    backgroundColor: AppColors.LIGHT_GRAY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTabItem: {
    backgroundColor: AppColors.PRIMARY,
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: AppColors.TEXT_LABEL_COLOR,
  },
  activeTabLabel: {
    color: AppColors.WHITE,
  },
  countText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default WalletScreen;
