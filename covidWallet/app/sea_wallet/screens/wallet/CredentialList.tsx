import React, { useCallback, useState } from 'react';

import { View, StyleSheet, TextInput, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { useTranslation } from 'react-i18next';
import { AppColors } from '../../../theme/Colors';

import CredentialItem from './components/CredentialItem';
import EmptyCredentialList from './components/EmptyCredentialList';
import NoInternetScreen from '../../common/NoInternetScreen';
import { AppRoutes, useAppNavigation } from '../../navigation/Types';

import { RootState, useAppDispatch, useAppSelector } from '../../../store';
import { selectNetworkStatus } from '../../../store/app/selectors';
import {
  fetchCredentialsStatus,
  selectSearchedCredentials,
} from '../../../store/credentials/selectors';
import { fetchCredentials } from '../../../store/credentials/thunk';

import { _showAlert } from '../../../helpers/Toast';
import { ICredentialObject } from '../../../store/credentials/interface';
import { CredentialStatus, CredentialStatusType } from './const/CredentialStatus';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CredentialList = () => {
  const { t } = useTranslation();
  const navigation = useAppNavigation();
  const networkStatus = useAppSelector(selectNetworkStatus);

  const dispatch = useAppDispatch();
  const { initial, loading } = useAppSelector(fetchCredentialsStatus);

  const [searchKeyword, setSearchKeyword] = useState('');
  const credentialList = useAppSelector((state: RootState) =>
    selectSearchedCredentials(state, searchKeyword)
  );

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
        <CredentialItem
          item={item}
          status={CredentialStatus.VALID}
          onItemClick={() => onItemClick(item)}
        />
      );
    },
    [onItemClick]
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
          value={searchKeyword}
          onChangeText={setSearchKeyword}
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
