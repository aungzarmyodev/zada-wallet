import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AppColors } from '../../../../theme/Colors';

type ServiceChipProp = {
  icon: string;
  label: string;
  active: boolean;
  onPress(): void;
};

const ServiceChip = ({ icon, label, active, onPress }: ServiceChipProp) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, active && { backgroundColor: AppColors.PRIMARY }]}>
        <MaterialIcons
          name={icon}
          size={20}
          style={[styles.icon, active && { color: AppColors.WHITE }]}
        />
        <Text style={[styles.label, active && { color: AppColors.WHITE }]}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: AppColors.WHITE,
    borderWidth: 1,
    borderColor: AppColors.LIGHT_GRAY,
  },
  icon: {
    color: AppColors.GRAY,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: AppColors.GRAY,
    paddingLeft: 6,
  },
});
export default ServiceChip;
