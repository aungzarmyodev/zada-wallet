import React from 'react';
import EmptyCredentialScreen from './EmptyCredentialScreen';
import CredentialListScreen from './CredentialListScreen';
import { useNavigation } from '@react-navigation/native';

const VerificationRequestScreen = () => {
  const navigation = useNavigation();

  const data = [{ id: '1', title: 'ZADA' }];

  const isEmpty = data.length === 0;

  const closeButtonClick = () => {
    navigation.navigate('MainScreen');
  };

  const rejectButtonClick = () => {
    navigation.navigate('MainScreen');
  };

  const acceptButtonClick = () => {
    navigation.navigate('MainScreen');
  };

  return isEmpty ? (
    <EmptyCredentialScreen onClose={closeButtonClick} />
  ) : (
    <CredentialListScreen data={data} />
  );
};

export default VerificationRequestScreen;
