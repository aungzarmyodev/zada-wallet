import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, FlatList, Alert, ActivityIndicator, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { AppColors } from '../../../theme/Colors';

import { AppRoutes, TabRoutes, useAppNavigation, useTabNavigation } from '../../navigation/Types';

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
import { getAllCredentials } from '../../../store/credentials/selectors';
import { selectConnections } from '../../../store/connections/selectors';

// accept / reject
import { accept_connection, delete_connection } from '../../../gateways/connections';
import { accept_credential, delete_credential } from '../../../gateways/credentials';
import { deleteAction } from '../../../store/actions';
import { fetchCredentials } from '../../../store/credentials/thunk';
import { fetchAcceptConnectionList } from '../../../store/connections/thunk';

import { _showAlert, showMessage } from '../../../helpers/Toast';
import EmptyActionList from './components/EmptyActionsList';
import { IActionObject } from '../../../store/actions/interface';
import ActionListTitle from './components/ActionListTitle';
import { CONN_REQ, CRED_OFFER, VER_REQ } from '../../../helpers/ConfigApp';
import ActionDialog from '../../../components/Dialogs/ActionDialog';
import OverlayLoader from '../../../components/OverlayLoader';
import AppCustomAlert, { AlertType } from '../../../components/Alert/AppCustomAlert';
import { delete_verification } from '../../../gateways/verifications';

const HomeScreen = () => {
  const navigation = useAppNavigation();
  const tabNavigation = useTabNavigation();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const user = useSelector(selectUser);
  const actionList = useAppSelector(selectActions.selectAll);

  const actionStatus = useAppSelector(selectActionsStatus);
  const existingCredentialList = useAppSelector(getAllCredentials.selectAll);
  const existingConnectionList = useAppSelector(selectConnections.selectAll);

  const networkStatus = useAppSelector(selectNetworkStatus);

  // pull to refresh
  const [isRefreshing, setIsRefreshing] = useState(false);
  const isLoading = actionStatus === 'loading' && actionList.length === 0;

  //selected action
  const [showActionDialog, setShowActionDialog] = useState(false);
  const [selectedAction, setSelectedAction] = useState<IActionObject | null>(null);
  const [isProcessingAction, setIsProcessingAction] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const [processingActionMessage, setProcessingActionMessage] = useState('Loading...');

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

  const onRefresh = useCallback(async () => {
    if (networkStatus !== 'connected') {
      _showAlert(t('errors.no_internet_title'), t('errors.no_internet_message'));
      return;
    }

    try {
      setIsRefreshing(true);
      await dispatch(fetchActions() as any);
    } finally {
      setIsRefreshing(false);
    }
  }, [networkStatus]);

  const viewAll = () => {
    tabNavigation.navigate(TabRoutes.Wallet);
  };

  const scanQR = () => {
    navigation.navigate(AppRoutes.ScanQR);
  };

  const browseServie = () => {
    tabNavigation.navigate(TabRoutes.ServiceAndTip);
  };

  const onItemClick = (item: IActionObject) => {
    if (item.type === VER_REQ) {
      navigation.navigate(AppRoutes.ConnectionBaseVerification, { data: item });
      return;
    }

    setSelectedAction(item);
    setShowActionDialog(true);
  };

  const onDeleteItem = (item: IActionObject) => {
    setSelectedAction(item);
    setShowDeleteAlert(true);
  };

  const onReject = async (item: IActionObject) => {
    try {
      setShowActionDialog(false);
      setIsProcessingAction(true);
      setProcessingActionMessage(t('messages.deleting'));

      if (item.type === CONN_REQ) {
        await delete_connection(item.connectionId);
        dispatch(deleteAction(item.connectionId));
      } else if (item.type === CRED_OFFER) {
        await delete_credential(item.credentialId, item.correlationId);
        dispatch(deleteAction(item.connectionId + item.credentialId));
      } else if (item.type === VER_REQ) {
        // Deleting Verification from action list
        dispatch(deleteAction(item.connectionId + item.verificationId));
        // Deleting Verification
        await delete_verification(item.verificationId!);
      }
    } catch (error) {
      console.log('Reject failed:', error);
      _showAlert(t('errors.something_wrong_title'), t('errors.something_wrong_message'));
    } finally {
      setIsProcessingAction(false);
      setProcessingActionMessage('');
    }
  };

  const onAccept = async (item: IActionObject) => {
    if (!isProcessingAction) {
      if (item.type === CRED_OFFER) {
        setProcessingActionMessage(t('messages.receiving_certificate'));
        acceptCredentialRequests(item);
      } else if (item.type === CONN_REQ) {
        setProcessingActionMessage(t('messages.creating_connection'));
        acceptConnectionRequest(item);
      }
    }
  };

  const acceptCredentialRequests = async (item: IActionObject) => {
    // let selectedItemObj = JSON.parse(selectedItem);
    try {
      setShowActionDialog(false);
      setIsProcessingAction(true);
      // // Check if crendential already exist
      let credArr = existingCredentialList.find(x => x.credentialId === item.credentialId);

      if (credArr === undefined) {
        if (item) {
          // Accept credentials Api call.
          let result = await accept_credential(item.credentialId);

          if (result.data.success) {
            // Delete Credential from list.
            dispatch(deleteAction(item.connectionId + item.credentialId));

            setTimeout(() => {
              showSuccessAlert('cred');
              dispatch(fetchCredentials() as any);
            }, 500);
          } else {
            showMessage('ZADA Wallet', t('errors.invalid_credential_offer'));
          }
          setIsProcessingAction(false);
        }
      } else {
        setShowActionDialog(false);
        setIsProcessingAction(false);
        showMessage('ZADA Wallet', t('errors.accept_credential_offer'));
      }
    } catch (e) {
      setShowActionDialog(false);
      setIsProcessingAction(false);
    }
  };

  const acceptConnectionRequest = async (item: IActionObject) => {
    if (networkStatus === 'connected') {
      setIsProcessingAction(true);

      if (!(await _isConnectionAlreadyExist(item))) {
        // Connection do not exist
        setShowActionDialog(false);

        try {
          // Accept connection Api call.
          let result = await accept_connection(item.connectionId);

          if (result.data.success) {
            // Adding Connection
            dispatch(fetchAcceptConnectionList() as any);

            // Deleting Action
            dispatch(deleteAction(item.connectionId));

            setTimeout(() => {
              showSuccessAlert('conn');
            }, 500);
          } else {
            showMessage('ZADA Wallet', result.data.error);
            return;
          }
          setIsProcessingAction(false);
        } catch (e) {
          setIsProcessingAction(false);
        }
      } else {
        // Connection is already exists
        setShowActionDialog(false);
        setIsProcessingAction(false);
        showMessage('ZADA Wallet', t('errors.accept_connection'));
      }
    } else {
      showMessage('ZADA Wallet', t('errors.invalid_internet'));
    }
  };

  const _isConnectionAlreadyExist = async (item: IActionObject) => {
    let find = false;

    for (let i = 0; i < existingConnectionList.length; ++i) {
      if (existingConnectionList[i].name.toLowerCase() === item.organizationName.toLowerCase())
        find = true;
    }

    // Delete connection action
    if (find) {
      dispatch(deleteAction(item.connectionId));
    }

    return find;
  };

  const showSuccessAlert = (actionType: string) => {
    let message = '';
    if (actionType == 'conn') message = t('messages.success_connection');
    else if (actionType == 'cred') message = t('messages.success_certificate');
    else if (actionType == 'ver') message = t('messages.success_verification_request');

    Alert.alert(
      'Zada Wallet',
      `${message}`,
      [
        {
          text: 'Okay',
          onPress: () => {},
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  const onDismiss = () => {
    setShowActionDialog(false);
  };

  const header = useCallback(() => {
    const hasActions = actionList && actionList.length > 0;

    return (
      <>
        <HomeHeader user={user} viewAll={viewAll} scanQR={scanQR} browseService={browseServie} />
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
        onDeleteItem={() => {
          onDeleteItem(item);
        }}
      />
    );
  }, []);

  const emptyList = () => {
    if (isLoading) {
      return (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={AppColors.PRIMARY} />
        </View>
      );
    }
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
        refreshing={isRefreshing}
        onRefresh={onRefresh}
      />
      {showActionDialog && (
        <ActionDialog
          isVisible={showActionDialog}
          toggleModal={() => {}}
          rejectModal={() => {
            onReject(selectedAction!);
          }}
          dismissModal={() => {
            onDismiss();
          }}
          acceptModal={() => {
            onAccept(selectedAction!);
          }}
          data={selectedAction}
          modalType="action"
          isIconVisible={true}
        />
      )}
      {showDeleteAlert && (
        <AppCustomAlert
          isVisible={showDeleteAlert}
          title={t('messages.delete_action_title')}
          message={t('messages.delete_request')}
          cancelText={t('common.cancel')}
          confirmText={t('common.confirm')}
          type={AlertType.DANGER}
          onConfirm={() => {
            if (selectedAction != null) {
              onReject(selectedAction);
            }
            setShowDeleteAlert(false);
          }}
          onCancel={() => {
            setShowDeleteAlert(false);
          }}
        />
      )}
      {isProcessingAction ? <OverlayLoader text={processingActionMessage} /> : null}
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
  loaderContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
});

export default HomeScreen;
