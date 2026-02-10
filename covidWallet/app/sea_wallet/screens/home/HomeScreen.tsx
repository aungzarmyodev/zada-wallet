import React, { useCallback } from 'react';
import { StyleSheet, FlatList, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { AppColors } from '../../../theme/Colors';

import { useAppNavigation, useTabNavigation } from '../../navigation/Types';

import { selectUser } from '../../../store/auth/selectors';
import { useSelector } from 'react-redux';
import HomeHeader from './components/HomeHeader';
import ActionItem from './components/ActionItem';

//Get action
import { fetchActions } from '../../../store/actions/thunk';
import { useFocusEffect } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../../store';
import { selectNetworkStatus } from '../../../store/app/selectors';
import { selectActions, selectActionsStatus } from '../../../store/actions/selectors';
import { _showAlert } from '../../../helpers/Toast';
import EmptyActionList from './components/EmptyActionsList';
import { IActionObject } from '../../../store/actions/interface';
import ActionListTitle from './components/ActionListTitle';

const HomeScreen = () => {
  const navigation = useAppNavigation();
  const tabNavigation = useTabNavigation();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const user = useSelector(selectUser);
  const actionList = useAppSelector(selectActions.selectAll);

  const actionStatus = useAppSelector(selectActionsStatus);
  const networkStatus = useAppSelector(selectNetworkStatus);

  useFocusEffect(
    useCallback(() => {
      if (networkStatus !== 'connected') {
        _showAlert(t('errors.no_internet_title'), t('errors.no_internet_message'));
        return;
      }
      if (actionStatus === 'initial') {
        dispatch(fetchActions() as any);
      }
    }, [actionStatus, networkStatus])
  );

  const viewAll = () => {
    tabNavigation.navigate('Wallet');
  };

  const onItemClick = useCallback((item: IActionObject) => {
    Alert.alert('Item clicked', `You clicked item: ${item.type}`, [{ text: 'OK' }]);
  }, []);

  const header = useCallback(() => {
    const hasActions = actionList && actionList.length > 0;

    return (
      <>
        <HomeHeader user={user} viewAll={viewAll} />
        {hasActions && <ActionListTitle />}
      </>
    );
  }, [user, viewAll]);

  const actionItem = useCallback(({ item }: { item: IActionObject }) => {
    return (
      <ActionItem
        item={item}
        onItemClick={() => {
          onItemClick(item);
        }}
      />
    );
  }, []);

  const emptyList = () => {
    return <EmptyActionList />;
  };

  return (
    <SafeAreaView style={styles.safeAreaView} edges={['top']}>
      <FlatList
        style={styles.container}
        contentContainerStyle={{ flexGrow: 1 }}
        ListHeaderComponent={header}
        data={actionList}
        renderItem={actionItem}
        ListEmptyComponent={emptyList}
      />
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
});

export default HomeScreen;
