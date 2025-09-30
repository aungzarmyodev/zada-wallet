import React from 'react';
import { View, Text, Modal, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import { AppColors } from '../../theme/Colors';
const { width } = Dimensions.get('window');

const LoadingDialog = ({ visible, label }) => {
  return (
    <Modal transparent={true} animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.dialog}>
          <ActivityIndicator size="large" color={AppColors.PRIMARY} />
          <Text style={styles.label}>{label}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialog: {
    width: width * 0.8,
    padding: 20,
    flexDirection: 'row',
    backgroundColor: AppColors.BACKGROUND,
    borderRadius: 8,
    alignItems: 'center',
    maxWidth: 500,
  },
  label: {
    fontSize: 16,
    marginLeft: 8,
    textAlign: 'center',
    color: AppColors.BLACK,
  },
});

export default LoadingDialog;
