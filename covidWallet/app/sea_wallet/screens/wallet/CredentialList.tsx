import React, { useCallback, useState } from 'react';

import { View, Text, StyleSheet, TextInput, FlatList, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { SafeAreaView } from 'react-native-safe-area-context';
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
import FilterChip from './components/FilterChip';
import { CredentialStatus, CredentialStatusType } from './const/CredentialStatus';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CredentialList = () => {
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

  const emtpyList = () => {
    return <EmptyCredentialList />;
  };

  if (networkStatus === 'disconnected') {
    return <NoInternetScreen />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />

        <TextInput
          placeholder={t('Search')}
          value={searchText}
          onChangeText={setSearchText}
          style={styles.searchInput}
          placeholderTextColor="#999"
        />
      </View>
      <FlatList
        data={credentialList}
        style={styles.credentailList}
        keyExtractor={item => item.credentialId}
        renderItem={credentialItem}
        ListEmptyComponent={emtpyList}
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
  searchContainer: {
    position: 'relative',
    justifyContent: 'center',
    marginBottom: 12,
  },

  searchIcon: {
    position: 'absolute',
    left: 12,
    zIndex: 1,
  },
  searchInput: {
    height: 44,
    borderRadius: 12,
    backgroundColor: AppColors.WHITE,
    paddingLeft: 40,
    paddingRight: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: AppColors.LIGHT_GRAY,
  },
});

export default CredentialList;
