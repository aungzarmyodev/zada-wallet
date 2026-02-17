import React, { useCallback, useState } from 'react';

import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { useTranslation } from 'react-i18next';
import { AppColors } from '../../../theme/Colors';

import CredentialItem from './components/CredentialItem';
import EmptyCredentialList from './components/EmptyCredentialList';
import NoInternetScreen from '../../Utils/NoInternetScreen';
import { AppRoutes, useAppNavigation } from '../../navigation/Types';

import { useAppDispatch, useAppSelector } from '../../../store';
import { selectNetworkStatus } from '../../../store/app/selectors';
import { fetchCredentialsStatus, getAllCredentials } from '../../../store/credentials/selectors';
import { fetchCredentials } from '../../../store/credentials/thunk';

import { _showAlert } from '../../../helpers/Toast';
import { ICredentialObject } from '../../../store/credentials/interface';
import { CredentialStatus, CredentialStatusType } from './const/CredentialStatus';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ConnectionList = () => {
  const { t } = useTranslation();
  const navigation = useAppNavigation();
  const networkStatus = useAppSelector(selectNetworkStatus);

  const dispatch = useAppDispatch();
  const { initial, loading } = useAppSelector(fetchCredentialsStatus);
  const credentialList = useAppSelector(getAllCredentials.selectAll);
  const [selectedType, setSelectedType] = useState<CredentialStatusType>(CredentialStatus.VALID);
  const [searchText, setSearchText] = useState('');

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

  const onItemClick = useCallback((item: ICredentialObject) => {
    navigation.navigate(AppRoutes.CredentialDetail, { credentialId: item.credentialId });
  }, []);

  const credentialItem = useCallback(
    ({ item }: { item: ICredentialObject }) => {
      return (
        <CredentialItem item={item} status={selectedType} onItemClick={() => onItemClick(item)} />
      );
    },
    [selectedType, onItemClick]
  );

  const headerItem = () => {
    return (
      <TouchableOpacity style={styles.addButton} activeOpacity={0.8} onPress={() => {}}>
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
        data={credentialList}
        style={styles.credentailList}
        keyExtractor={item => item.credentialId}
        renderItem={credentialItem}
        ListEmptyComponent={emtpyList}
        ListHeaderComponent={headerItem}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 16 }}
        keyboardShouldPersistTaps="handled"
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
