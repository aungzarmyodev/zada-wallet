import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Linking, Alert, FlatList, ActivityIndicator } from 'react-native';
import { AppColors } from '../../../theme/Colors';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../../store';
import { selectNetworkStatus } from '../../../store/app/selectors';
import { selectResourcesState } from '../../../store/services_and_resources/selector';
import { useFocusEffect } from '@react-navigation/native';
import { fetchResources } from '../../../store/services_and_resources/Thunk';
import { _showAlert } from '../../../helpers';
import { ResourceObj } from '../../../store/services_and_resources/ServieAndResourceModels';
import ResourceCardView from './component/ResourceCardView';
import EmptyView from '../../common/EmptyView';
import ErrorView from '../../common/ErrorView';
import Loading from '../../common/Loading';

const Resources = () => {
  const { t } = useTranslation();

  const networkStatus = useAppSelector(selectNetworkStatus);
  const dispatch = useAppDispatch();
  const { resources: resourceList, loading, error } = useAppSelector(selectResourcesState);

  useFocusEffect(
    useCallback(() => {
      if (networkStatus !== 'connected') {
        _showAlert(t('errors.no_internet_title'), t('errors.no_internet_message'));
        return;
      }
      dispatch(fetchResources() as any);
    }, [networkStatus])
  );

  const onPhoneCall = () => {
    const url = 'tel:+442074032733';
    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          Alert.alert('Error', 'Phone calls are not supported on this device');
        }
      })
      .catch(err => console.error('An error occurred', err));
  };

  const onLearnMore = (webUrl: string | null) => {
    if (webUrl) {
      Linking.openURL(webUrl).catch(err => Alert.alert('Error', 'Unable to open the website'));
    } else {
      Alert.alert('Error', 'Unable to open the website');
    }
  };

  const onRetry = async () => {
    dispatch(fetchResources() as any);
  };

  const renderItem = ({ item }: { item: ResourceObj }) => {
    return (
      <ResourceCardView
        item={item}
        phoneCall={onPhoneCall}
        learnMore={() => {
          onLearnMore(item.url);
        }}
      />
    );
  };

  const emptyList = () => {
    return <EmptyView message="No resources available right now" />;
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorView onRetry={onRetry} />;
  }

  return (
    <FlatList
      data={resourceList}
      style={styles.container}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      ListEmptyComponent={emptyList}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 16 }}
      keyboardShouldPersistTaps="handled"
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.BACKGROUND,
    padding: 10,
  },
});

export default Resources;
