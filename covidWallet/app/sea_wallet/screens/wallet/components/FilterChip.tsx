import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { AppColors } from '../../../../theme/Colors';

type FilterChipProp = {
  count: number;
  label: string;
  active: boolean;
  onPress(): void;
  activeColor: string;
};

const FilterChip = ({ count, label, active, onPress, activeColor }: FilterChipProp) => {
  return (
    <Text
      onPress={onPress}
      style={[styles.chip, active && { backgroundColor: activeColor, color: AppColors.WHITE }]}>
      {label}
      {'  '}
      <Text
        style={[styles.count, active && { backgroundColor: activeColor, color: AppColors.WHITE }]}>
        ({count})
      </Text>
    </Text>
  );
};

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: AppColors.WHITE,
    marginRight: 8,
    fontSize: 14,
    fontWeight: '600',
    borderWidth: 1,
    borderColor: AppColors.LIGHT_GRAY,
    color: AppColors.TEXT_TITLE_COLOR,
  },
  count: {
    fontSize: 16,
    fontWeight: 'bold',
    color: AppColors.TEXT_TITLE_COLOR,
    backgroundColor: AppColors.WHITE,
  },
});

export default FilterChip;
