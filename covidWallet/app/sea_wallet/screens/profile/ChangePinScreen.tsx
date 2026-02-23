import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { AppColors } from '../../../theme/Colors';

import { saveItem } from '../../../helpers/Storage';
import { PIN_CODE } from '../../../helpers/ConfigApp';
import { showMessage } from '../../../helpers';
import { useTranslation } from 'react-i18next';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ChangePinScreen = () => {
  const { t } = useTranslation();

  const [oldPin, setOldPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');

  const [showOldPin, setShowOldPin] = useState(false);
  const [showNewPin, setShowNewPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);

  const [error, setError] = useState('');

  const validate = () => {
    if (!oldPin || !newPin || !confirmPin) {
      setError('All fields are required');
      return false;
    }

    if (newPin.length < 6) {
      setError('PIN must be at least 6 digits');
      return false;
    }

    if (newPin !== confirmPin) {
      setError('New PIN and Confirm PIN do not match');
      return false;
    }

    if (!/^\d+$/.test(newPin)) {
      setError('PIN must contain numbers only');
      return false;
    }

    setError('');
    return true;
  };

  const onSubmit = async () => {
    if (!validate()) return;

    try {
      await saveItem(PIN_CODE, newPin);
      setNewPin('');
      setOldPin('');
      setConfirmPin('');
      showMessage('Zada Wallet', t('PincodeScreen.alert_message'));
    } catch (error: any) {
      showMessage('Zada Wallet', error.toString());
    }
  };

  const renderInput = (
    label: string,
    value: string,
    onChange: (text: string) => void,
    visible: boolean,
    setVisible: (v: boolean) => void
  ) => (
    <View style={styles.inputWrapper}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.inputContainer}>
        <TextInput
          value={value}
          onChangeText={text => onChange(text.replace(/[^0-9]/g, ''))}
          keyboardType="numeric"
          secureTextEntry={!visible}
          maxLength={6}
          style={styles.input}
          placeholder="Enter PIN"
        />

        <TouchableOpacity style={styles.eyeButton} onPress={() => setVisible(!visible)}>
          <MaterialIcons name={visible ? 'visibility' : 'visibility-off'} size={22} color="#666" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {renderInput('Old PIN', oldPin, setOldPin, showOldPin, setShowOldPin)}
      {renderInput('New PIN', newPin, setNewPin, showNewPin, setShowNewPin)}
      {renderInput('Confirm PIN', confirmPin, setConfirmPin, showConfirmPin, setShowConfirmPin)}

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText}>Change PIN</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: AppColors.BACKGROUND,
  },
  inputWrapper: {
    marginBottom: 20,
  },
  label: {
    fontWeight: '600',
    marginBottom: 6,
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeButton: {
    position: 'absolute',
    right: 12,
  },
  input: {
    borderWidth: 1,
    flex: 1,
    borderColor: AppColors.WHITE,
    backgroundColor: AppColors.WHITE,
    borderRadius: 8,
    padding: 12,
    paddingRight: 40,
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginBottom: 15,
  },
  button: {
    backgroundColor: AppColors.PRIMARY,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ChangePinScreen;
