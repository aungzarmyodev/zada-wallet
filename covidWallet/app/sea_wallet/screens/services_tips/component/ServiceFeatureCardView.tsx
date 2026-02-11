import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { AppColors } from '../../../../theme/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type ServiceFeatureProp = {
  title: string;
  description: string;
  phoneCall(): void;
  learnMore(): void;
  showPhoneCall: boolean;
};
const ServiceFeatureCardView = ({
  title,
  description,
  phoneCall,
  learnMore,
  showPhoneCall,
}: ServiceFeatureProp) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardRow}>
        <View style={styles.leftView}>
          <Text style={styles.mainLabel}>S</Text>
        </View>
        <View style={styles.rightView}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardDescription}>{description}</Text>
          <View style={styles.row}>
            {showPhoneCall && (
              <TouchableOpacity style={[styles.chip, { marginRight: 8 }]} onPress={phoneCall}>
                <MaterialIcons name="phone" size={16} color={AppColors.PRIMARY} />
                <Text style={styles.label}>Call</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity style={styles.chip} onPress={learnMore}>
              <MaterialIcons name="open-in-new" size={16} color={AppColors.PRIMARY} />
              <Text style={styles.label}>Visit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: AppColors.WHITE,
    width: '100%',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardRow: {
    flexDirection: 'row',
  },
  leftView: {
    backgroundColor: AppColors.LIGHT_GRAY,
    borderRadius: 12,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainLabel: {
    fontSize: 24,
    fontWeight: 'bold',
    color: AppColors.PRIMARY,
  },
  rightView: {
    paddingLeft: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: AppColors.TEXT_TITLE_COLOR,
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: AppColors.TEXT_LABEL_COLOR,
    lineHeight: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  chip: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 4,
    marginTop: 8,
    paddingHorizontal: 10,
    borderColor: AppColors.LIGHT_GRAY,
    backgroundColor: AppColors.BACKGROUND,
  },
  label: {
    paddingHorizontal: 8,
    fontSize: 14,
    fontWeight: 'bold',
    color: AppColors.TEXT_LABEL_COLOR,
  },
});

export default ServiceFeatureCardView;
