import React, { useCallback, useState } from 'react';

import { View, Text, StyleSheet, TextInput, FlatList, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { AppColors } from '../../../theme/Colors';

import CredentialItem from './components/CredentialItem';
import EmptyCredentialList from './components/EmptyCredentialList';
import NoInternetScreen from '../../Utils/NoInternetScreen';

import { useAppDispatch, useAppSelector } from '../../../store';
import { selectNetworkStatus } from '../../../store/app/selectors';
import { fetchCredentialsStatus, getAllCredentials } from '../../../store/credentials/selectors';
import { fetchCredentials } from '../../../store/credentials/thunk';

import { _showAlert } from '../../../helpers/Toast';
import { ICredentialObject } from '../../../store/credentials/interface';
import FilterChip from './components/FilterChip';
import { CredentialStatus, CredentialStatusType } from './const/CredentialStatus';

const WalletScreen = () => {
  const { t } = useTranslation();
  const networkStatus = useAppSelector(selectNetworkStatus);

  const dispatch = useAppDispatch();
  const { initial, loading } = useAppSelector(fetchCredentialsStatus);
  const credentialList = useAppSelector(getAllCredentials.selectAll);
  const [selectedType, setSelectedType] = useState<CredentialStatusType>(CredentialStatus.VALID);

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

  const onItemClick = useCallback((item: any) => {
    Alert.alert('Item clicked', `You clicked item: ${item.type}`, [{ text: 'OK' }]);
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
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <Text style={styles.titleText}> {t('My Wallet')}</Text>
        <View style={styles.chipRow}>
          <FilterChip
            count={100}
            label={t('Valid')}
            active={selectedType === CredentialStatus.VALID}
            activeColor={AppColors.PRIMARY}
            onPress={() => setSelectedType(CredentialStatus.VALID)}
          />

          <FilterChip
            count={0}
            label={t('Expiring')}
            active={selectedType === CredentialStatus.EXPIRING}
            activeColor={AppColors.PRIMARY}
            onPress={() => setSelectedType(CredentialStatus.EXPIRING)}
          />

          <FilterChip
            count={0}
            label={t('Expired')}
            active={selectedType === CredentialStatus.EXPIRED}
            activeColor={AppColors.PRIMARY}
            onPress={() => setSelectedType(CredentialStatus.EXPIRED)}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: AppColors.PRIMARY,
  },
  container: {
    flex: 1,
    backgroundColor: AppColors.BACKGROUND,
    paddingHorizontal: 16,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: AppColors.TEXT_TITLE_COLOR,
    paddingVertical: 16,
  },
  chipRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  credentailList: {
    backgroundColor: AppColors.BACKGROUND,
  },
});

export default WalletScreen;
