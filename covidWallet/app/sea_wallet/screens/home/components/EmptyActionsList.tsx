import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AppColors } from '../../../../theme/Colors';
import { useTranslation } from 'react-i18next';

const EmptyActionList = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.label}> {t('ActionsScreen.empty_list_text')} </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    color: AppColors.TEXT_TITLE_COLOR,
  },
});

export default EmptyActionList;
