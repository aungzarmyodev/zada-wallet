import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AppColors } from '../../../../theme/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {
  scanQR(): void;
  browseService(): void;
};

const QuickActions = ({ scanQR, browseService }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}> Quick Actions </Text>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={scanQR}
          style={[styles.card, { backgroundColor: AppColors.PRIMARY }]}>
          <Ionicons name="scan" size={20} color={AppColors.WHITE} />
          <Text style={styles.scanlabel}>Scan QR code</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={browseService}
          style={[styles.card, { backgroundColor: AppColors.WHITE }]}>
          <Ionicons name="globe" size={20} color={AppColors.GRAY} />
          <Text style={styles.browselabel}>Browse Services</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: AppColors.TEXT_TITLE_COLOR,
    paddingVertical: 10,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  card: {
    flex: 1,
    height: 80,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 4,
  },
  scanlabel: {
    fontSize: 12,
    fontWeight: '600',
    color: AppColors.WHITE,
  },
  browselabel: {
    fontSize: 12,
    fontWeight: '600',
    color: AppColors.TEXT_LABEL_COLOR,
  },
});

export default QuickActions;
