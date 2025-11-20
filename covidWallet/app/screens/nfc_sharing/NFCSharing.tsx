import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Animated, Easing, Image } from 'react-native';
import { AppColors } from '../../theme/Colors';

const NFCSharing = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Please hold your phone close to the NFC scanner to enter.</Text>
      <View style={styles.card}>
        <View style={styles.cardLeft}>
          <Image style={styles.image} source={require('../../assets/images/wifi.png')} />
          <Text style={styles.textNFC}> NFC </Text>
        </View>
        <View style={styles.cardRight}>
          <Text style={styles.textID}> ID : 00123456789</Text>
          <Text style={styles.textOrganization}> ZADA </Text>
          <Text style={styles.textIssueDate}>Issue Date : 12/12/2025</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },

  label: {
    color: AppColors.TEXT_LABEL_COLOR,
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center',
  },

  card: {
    height: 200,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: AppColors.PRIMARY,
    shadowColor: AppColors.BLACK,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    elevation: 8,
    borderRadius: 20,
    marginTop: 20,
  },

  cardLeft: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },

  image: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    transform: [{ rotate: '25deg' }],
  },

  textNFC: {
    fontSize: 28,
    fontWeight: 'bold',
    color: AppColors.WHITE,
  },

  cardRight: {
    flex: 4,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 10,
  },

  textID: {
    fontSize: 24,
    fontWeight: 'bold',
    color: AppColors.WHITE,
  },

  textOrganization: {
    fontSize: 24,
    fontWeight: 'bold',
    color: AppColors.WHITE,
    marginTop: 20,
  },

  textIssueDate: {
    fontSize: 18,
    fontWeight: 'bold',
    color: AppColors.WHITE,
    marginTop: 20,
  },
  button: {
    backgroundColor: AppColors.PRIMARY,
    paddingVertical: 12,
    paddingHorizontal: 60,
    marginTop: 50,
    borderRadius: 20,
  },

  buttonText: {
    color: AppColors.WHITE,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default NFCSharing;
