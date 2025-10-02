import { AppColors } from '../../theme/Colors';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';

const CommonErrorView = ({ onRetry }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>{t('errors.something_went_wrong')}</Text>
      {onRetry && (
        <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
          <Text style={styles.retryText}>{t('common.try_again')}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100 %',
    backgroundColor: AppColors.BACKGROUND,
  },
  errorText: {
    fontSize: 16,
    color: AppColors.BLACK,
    marginBottom: 12,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: AppColors.PRIMARY,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryText: {
    color: AppColors.WHITE,
    fontWeight: '600',
  },
});

export default CommonErrorView;
