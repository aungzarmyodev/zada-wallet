import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AppColors } from '../../theme/Colors';

interface Props {
  title?: string;
  message?: string;
  onRetry: () => void;
}

const ErrorView = ({
  title = 'Something went wrong',
  message = 'We couldn’t load the resources. Please check your internet connection and try again.',
  onRetry,
}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <Text style={styles.message}>{message}</Text>

      <TouchableOpacity style={styles.button} onPress={onRetry}>
        <Text style={styles.buttonText}>Try Again</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    backgroundColor: AppColors.BACKGROUND,
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    color: AppColors.TEXT_TITLE_COLOR,
    marginBottom: 12,
    textAlign: 'center',
  },

  message: {
    fontSize: 16,
    color: AppColors.TEXT_LABEL_COLOR,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },

  button: {
    backgroundColor: AppColors.PRIMARY,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 10,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ErrorView;
