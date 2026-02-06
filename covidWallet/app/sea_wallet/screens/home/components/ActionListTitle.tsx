import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AppColors } from '../../../../theme/Colors';

const ActionListTitle = () => {
  return (
    <View style={styles.listTitleContainer}>
      <Text style={styles.listTitle}>Pending Actions</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  listTitleContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: AppColors.BACKGROUND,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: AppColors.BLACK,
  },
});

export default ActionListTitle;
