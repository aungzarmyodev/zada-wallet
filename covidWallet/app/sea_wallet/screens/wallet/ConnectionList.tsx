import React, { useCallback, useState } from 'react';

import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { useTranslation } from 'react-i18next';
import { AppColors } from '../../../theme/Colors';

import EmptyCredentialList from './components/EmptyCredentialList';
import NoInternetScreen from '../../Utils/NoInternetScreen';

import { useAppDispatch, useAppSelector } from '../../../store';
import { selectNetworkStatus } from '../../../store/app/selectors';
import { selectConnectionsStatus } from '../../../store/connections/selectors';
import { _showAlert, showOKDialog } from '../../../helpers/Toast';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useConnections from '../../../hooks/useConnections';
import { IConnectionObject } from '../../../store/connections/interface';
import ConnectionItem from './components/ConnectionItem';
import AppCustomAlert, { AlertType } from '../../../components/Alert/AppCustomAlert';
import SelectModal from '../../../components/Modal/SelectModal';

const ConnectionList = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const networkStatus = useAppSelector(selectNetworkStatus);
  const {
    acceptConnections,
    connectionlist,
    onAcceptConnection,
    onDeleteConnection,
    refreshConnections,
    fetchAcceptConnections,
  } = useConnections();
  const connectionStatus = useAppSelector(selectConnectionsStatus);

  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [selectedConnection, setSelectedConnection] = useState<IConnectionObject | null>(null);

  useFocusEffect(
    useCallback(() => {
      if (networkStatus !== 'connected') {
        _showAlert(t('errors.no_internet_title'), t('errors.no_internet_message'));
        return;
      }
      if (connectionStatus === 'initial') {
        fetchAcceptConnections();
      }
    }, [connectionStatus, networkStatus])
  );

  const addNewConnection = () => {
    setShowBottomSheet(true);
  };
  const onConnectionSelect = (label: string, value: string) => {
    onAcceptConnection(value);
    setShowBottomSheet(false);
  };

  const onItemClick = useCallback((item: IConnectionObject) => {
    setSelectedConnection(item);
    setShowDeleteAlert(true);
  }, []);

  async function onSuccessPress(connection: IConnectionObject) {
    try {
      const result = await onDeleteConnection(connection.connectionId);
      if (result.success) {
        showOKDialog('', t(result.message), () => {});
      } else {
        showOKDialog('', t(result.message), () => {});
      }
    } catch (error) {
      showOKDialog('', t('errors.something_went_wrong'), () => {});
    }
  }

  const credentialItem = useCallback(
    ({ item }: { item: IConnectionObject }) => {
      return <ConnectionItem item={item} deleteItem={() => onItemClick(item)} />;
    },
    [onItemClick]
  );

  const headerItem = () => {
    return (
      <TouchableOpacity
        style={styles.addButton}
        activeOpacity={0.8}
        onPress={() => {
          addNewConnection();
        }}>
        <Ionicons name="add-circle" size={24} color={AppColors.TEXT_LABEL_COLOR} />

        <Text style={styles.addText}>{t('Add Connection')}</Text>
      </TouchableOpacity>
    );
  };

  const emtpyList = () => {
    return <EmptyCredentialList />;
  };

  if (networkStatus === 'disconnected') {
    return <NoInternetScreen />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={acceptConnections}
        style={styles.credentailList}
        keyExtractor={item => item.connectionId}
        renderItem={credentialItem}
        ListEmptyComponent={emtpyList}
        ListHeaderComponent={headerItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 16 }}
        keyboardShouldPersistTaps="handled"
      />
      {/* Add new connection */}
      <SelectModal
        title={t('ConnectionsScreen.select_connections')}
        subTitle="Select a connection to add"
        isVisible={showBottomSheet}
        data={connectionlist}
        onSelect={onConnectionSelect}
        onClose={() => setShowBottomSheet(false)}
      />
      {/* delete alert dialog */}
      <AppCustomAlert
        isVisible={showDeleteAlert}
        title={t('messages.delete_connection_title')}
        message={t('messages.delete_connection_message')}
        cancelText={t('common.cancel')}
        confirmText={t('common.confirm')}
        type={AlertType.DANGER}
        onConfirm={() => {
          if (selectedConnection != null) {
            onSuccessPress(selectedConnection);
          }
          setShowDeleteAlert(false);
        }}
        onCancel={() => {
          setShowDeleteAlert(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.BACKGROUND,
    paddingHorizontal: 10,
    marginTop: 8,
  },
  credentailList: {
    backgroundColor: AppColors.BACKGROUND,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.WHITE,
    paddingVertical: 10,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: AppColors.GRAY,
    gap: 8,
  },
  addText: {
    color: AppColors.TEXT_LABEL_COLOR,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ConnectionList;
