import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { AppColors } from '../../../../theme/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ResourceObj } from '../../../../store/services_and_resources/ServieAndResourceModels';

type ResourceCardViewProp = {
  item: ResourceObj;
  phoneCall(): void;
  learnMore(): void;
};
const ResourceCardView = ({ item, phoneCall, learnMore }: ResourceCardViewProp) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardDescription}>{item.description}</Text>
      <View style={styles.row}>
        {item.phone && (
          <TouchableOpacity style={[styles.chip, { marginRight: 8 }]} onPress={phoneCall}>
            <MaterialIcons name="phone" size={16} color={AppColors.PRIMARY} />
            <Text style={styles.label}>Call</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.chip} onPress={learnMore}>
          <MaterialIcons name="open-in-new" size={16} color={AppColors.PRIMARY} />
          <Text style={styles.label}>Learn More</Text>
        </TouchableOpacity>
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

export default ResourceCardView;
