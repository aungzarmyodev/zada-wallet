import { View, Text, StyleSheet } from 'react-native';
import { AppColors } from '../../theme/Colors';
import { useTranslation } from 'react-i18next';

const EmptyConnections = () => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('EmptyConnections.title')}</Text>
      <Text style={styles.label}>{t('EmptyConnections.label_1')}</Text>
      <Text style={styles.label2}>{t('EmptyConnections.label_2')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.BACKGROUND,
    alignItems: 'center',
  },
  title: {
    color: AppColors.TEXT_TITLE_COLOR,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 48,
  },
  label: {
    color: AppColors.TEXT_LABEL_COLOR,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  label2: {
    color: AppColors.TEXT_LABEL_COLOR,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default EmptyConnections;
