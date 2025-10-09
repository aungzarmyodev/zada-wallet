import { StyleSheet, View, Text, Image, Pressable } from 'react-native';
import { AppColors } from '../../../theme/Colors';
import moment from 'moment';
import { get_local_issue_date } from '../../../helpers/time';

interface CredentialInfo {
  title: string;
  imageUrl: string;
  subtitle: string;
  issueDate: string;
}

const CredentialCard = ({
  credentialInfo,
  onPress,
}: {
  credentialInfo: CredentialInfo;
  onPress?: () => void;
}) => {
  const issueDate = credentialInfo.issueDate ? get_local_issue_date(credentialInfo.issueDate) : '';
  return (
    <Pressable onPress={onPress}>
      <View style={styles.card}>
        <View style={styles.logoContainer}>
          <Image
            source={
              credentialInfo.imageUrl
                ? typeof credentialInfo.imageUrl === 'string' &&
                  credentialInfo.imageUrl.startsWith('http')
                  ? { uri: credentialInfo.imageUrl }
                  : credentialInfo.imageUrl
                : require('../../../assets/images/splash_logo.png')
            }
            style={styles.logo}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
            {credentialInfo.title}
          </Text>
          <Text style={styles.subTitle} numberOfLines={2} ellipsizeMode="tail">
            {credentialInfo.subtitle}
          </Text>
        </View>
        <Text style={styles.date}> {issueDate} </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: AppColors.WHITE,
    borderRadius: 16,
    shadowColor: AppColors.GRAY,
    shadowOpacity: 0.8,
    shadowRadius: 1,
    padding: 10,
    elevation: 5,
    marginBottom: 8,
  },
  logoContainer: {
    width: 60,
    height: 60,
    borderRadius: 32,
    backgroundColor: AppColors.LIGHT_GRAY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 56,
    height: 56,
    borderRadius: 32,
  },
  textContainer: {
    flex: 1,
    marginLeft: 8,
    marginRight: 8,
    justifyContent: 'center',
  },
  title: {
    color: AppColors.TEXT_TITLE_COLOR,
    fontWeight: 'bold',
    fontSize: 16,
  },
  subTitle: {
    color: AppColors.TEXT_LABEL_COLOR,
    fontWeight: '500',
    fontSize: 14,
    marginTop: 4,
  },
  date: {
    color: AppColors.TEXT_LABEL_COLOR,
    fontWeight: '400',
    fontSize: 13,
  },
});

export default CredentialCard;
