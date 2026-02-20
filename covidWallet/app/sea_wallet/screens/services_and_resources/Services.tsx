import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Linking, Alert } from 'react-native';
import { AppColors } from '../../../theme/Colors';
import ServiceChip from './component/ServiceChip';
import { ServiceStatusType, ServiceTypes } from './const/ServiceTypes';
import ServiceFeatureCardView from './component/ServiceFeatureCardView';

import { fetchServicesAndCategories } from '../../../store/services_and_resources/Thunk';
import { useFocusEffect } from '@react-navigation/native';
import { _showAlert } from '../../../helpers';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../../store';
import { selectNetworkStatus } from '../../../store/app/selectors';
import { selectServiceState } from '../../../store/services_and_resources/selector';
import Loading from '../../common/Loading';
import ErrorView from '../../common/ErrorView';
import EmptyView from '../../common/EmptyView';
import { CategoryObj } from '../../../store/services_and_resources/ServieAndResourceModels';

const Services = () => {
  const { t } = useTranslation();

  const networkStatus = useAppSelector(selectNetworkStatus);
  const dispatch = useAppDispatch();
  const { categories, services, loading, error } = useAppSelector(selectServiceState);
  const [selectedCategory, setSelectedCategory] = useState<CategoryObj | null>(null);

  console.log('categories', categories);
  console.log('servies', services);

  useFocusEffect(
    useCallback(() => {
      if (networkStatus !== 'connected') {
        _showAlert(t('errors.no_internet_title'), t('errors.no_internet_message'));
        return;
      }
      dispatch(fetchServicesAndCategories() as any);
    }, [networkStatus])
  );

  useEffect(() => {
    if (categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0]);
    }
  }, [categories]);

  const onPhoneCall = (phone: string) => {
    Linking.canOpenURL(phone)
      .then(supported => {
        if (supported) {
          return Linking.openURL(phone);
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

  const filteredServices = useMemo(() => {
    if (!selectedCategory) return [];

    return services.filter(s => s.category?.name === selectedCategory.name && s.isActive);
  }, [services, selectedCategory]);

  const onRetry = async () => {
    dispatch(fetchServicesAndCategories() as any);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorView onRetry={onRetry} />;
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.chipWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          {categories.map(cat => (
            <ServiceChip
              key={cat.id}
              icon={cat.icon || 'grid'}
              label={cat.name}
              active={selectedCategory === cat}
              onPress={() => setSelectedCategory(cat)}
            />
          ))}
        </ScrollView>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentPadding}>
        {filteredServices.length === 0 ? (
          <EmptyView message="No services available" />
        ) : (
          filteredServices.map(service => (
            <ServiceFeatureCardView
              key={service.id}
              service={service}
              phoneCall={() => {
                onPhoneCall(service.phone);
              }}
              learnMore={() => {
                onLearnMore(service.url);
              }}
            />
          ))
        )}
      </ScrollView>
      {categories.length === 0 && services.length === 0 && (
        <EmptyView message="No services available" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: AppColors.BACKGROUND,
  },
  chipWrapper: {
    paddingVertical: 10,
    height: 60,
  },
  scrollContent: {
    paddingHorizontal: 8,
    gap: 10,
  },
  contentPadding: {
    paddingHorizontal: 8,
  },
  featureLabel: {
    fontSize: 18,
    fontWeight: '800',
    paddingVertical: 12,
    color: AppColors.TEXT_TITLE_COLOR,
  },
});

export default Services;
