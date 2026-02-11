import React from 'react';
import { View, Text, StyleSheet, ScrollView, Linking, Alert } from 'react-native';
import { AppColors } from '../../../theme/Colors';
import ResourceCardView from './component/ResourceCardView';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const TipScreen = () => {
  const onPhoneCall = () => {
    const url = 'tel:+442074032733';
    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          Alert.alert('Error', 'Phone calls are not supported on this device');
        }
      })
      .catch(err => console.error('An error occurred', err));
  };

  const onLearnMore = (webUrl: string) => {
    Linking.openURL(webUrl).catch(err => Alert.alert('Error', 'Unable to open the website'));
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.section}>
        <View style={styles.sectionRow}>
          <MaterialIcons name="info-outline" size={20} color={AppColors.DANGER} />
          <Text style={styles.sectionTitle}>Emergency</Text>
        </View>
        <ResourceCardView
          title="ITF Inspector Contacts"
          description="Contact ITF inspectors for wage disputes, contract issues, or unsafe conditions."
          phoneCall={() => onPhoneCall()}
          learnMore={() => onLearnMore('https://www.itfseafarers.org/en')}
          showPhoneCall={true}
        />

        <ResourceCardView
          title="P&I Emergency Line"
          description="24/7 emergency assistance for insured seafarers."
          phoneCall={() => onPhoneCall()}
          learnMore={() => onLearnMore('https://www.itfseafarers.org/en/look-up')}
          showPhoneCall={false}
        />
      </View>

      <View style={styles.section}>
        <View style={styles.sectionRow}>
          <MaterialIcons name="favorite-border" size={20} color={AppColors.GREEN} />
          <Text style={styles.sectionTitle}>Welfare</Text>
        </View>
        <ResourceCardView
          title="Mission to Seafarers"
          description="Port chaplains and welfare centers in over 200 ports worldwide."
          phoneCall={() => onPhoneCall()}
          learnMore={() => onLearnMore('https://www.missiontoseafarers.org/')}
          showPhoneCall={false}
        />
        <ResourceCardView
          title="Seafarer Happiness Index"
          description="Report your wellbeing and help improve conditions for all seafarers."
          phoneCall={() => onPhoneCall()}
          learnMore={() => onLearnMore('https://www.seafarershappinessindex.org/')}
          showPhoneCall={false}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.BACKGROUND,
  },
  contentContainer: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: AppColors.TEXT_TITLE_COLOR,
    paddingLeft: 6,
  },
});

export default TipScreen;
