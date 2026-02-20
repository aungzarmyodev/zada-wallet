import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AppColors } from '../../theme/Colors';

type Props = {
  message: string;
};

const EmptyView = ({ message }: Props) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <MaterialIcons name="folder-off" size={64} color={AppColors.LIGHT_GRAY} style={styles.icon} />
      <Text style={styles.label}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  icon: {
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: AppColors.TEXT_LABEL_COLOR,
    textAlign: 'center',
  },
});

export default EmptyView;
