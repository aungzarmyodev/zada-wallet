import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { AppColors } from '../../../theme/Colors';
import ServiceChip from './component/ServiceChip';
import { ServiceStatusType, ServiceTypes } from './const/ServiceTypes';
import ServiceFeatureCardView from './component/ServiceFeatureCardView';

const ServiceScreen = () => {
  const [selectedType, setSelectedType] = useState<ServiceStatusType>(ServiceTypes.INSURANCE);

  const selectedServiceTypes = (type: ServiceStatusType) => {
    setSelectedType(type);
  };

  return (
    <ScrollView style={styles.mainContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.chipWrapper}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          <ServiceChip
            icon="scan"
            label="Insurance"
            onPress={() => selectedServiceTypes(ServiceTypes.INSURANCE)}
            active={selectedType == ServiceTypes.INSURANCE}
          />
          <ServiceChip
            icon="scan"
            label="Healthcare"
            onPress={() => selectedServiceTypes(ServiceTypes.HEALTHCARE)}
            active={selectedType == ServiceTypes.HEALTHCARE}
          />
          <ServiceChip
            icon="scan"
            label="Financial"
            onPress={() => selectedServiceTypes(ServiceTypes.FINANCIAL)}
            active={selectedType == ServiceTypes.FINANCIAL}
          />
          <ServiceChip
            icon="scan"
            label="Career"
            onPress={() => selectedServiceTypes(ServiceTypes.CAREER)}
            active={selectedType == ServiceTypes.CAREER}
          />
        </ScrollView>
      </View>

      <View style={styles.contentPadding}>
        <Text style={styles.featureLabel}>Featured</Text>
        <ServiceFeatureCardView
          title="P&I Emergency Line"
          description="24/7 emergency assistance for insured seafarers."
          phoneCall={() => {}}
          learnMore={() => {}}
          showPhoneCall={false}
        />

        <Text style={styles.featureLabel}>All Insurance</Text>
        <ServiceFeatureCardView
          title="P&I Emergency Line"
          description="24/7 emergency assistance for insured seafarers."
          phoneCall={() => {}}
          learnMore={() => {}}
          showPhoneCall={false}
        />
      </View>
    </ScrollView>
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

export default ServiceScreen;
