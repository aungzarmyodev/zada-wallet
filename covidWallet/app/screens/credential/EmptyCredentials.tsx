import { View, Text, StyleSheet } from 'react-native';
import { AppColors } from '../../theme/Colors';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface EmptyCredentialsProps {
  title: string;
  message: string;
  iconName: string;
}

const EmptyCredentials: React.FC<EmptyCredentialsProps> = ({ title, message, iconName }) => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Icon size={40} name={iconName} color={AppColors.PRIMARY} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.BACKGROUND,
    alignItems: 'center',
    padding: 10,
  },
  logoContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: AppColors.LIGHT_GRAY,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    color: AppColors.TEXT_TITLE_COLOR,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 8,
  },
  message: {
    color: AppColors.TEXT_LABEL_COLOR,
    fontSize: 14,
    fontWeight: 500,
    marginTop: 8,
    textAlign: 'center',
  },
});

export default EmptyCredentials;
