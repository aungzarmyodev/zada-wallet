import React, { useEffect, useState } from 'react';
import EmptyCredentialScreen from './EmptyCredentialScreen';
import CredentialListScreen from './CredentialListScreen';
import { useNavigation } from '@react-navigation/native';
import { get_all_credentials_connectionless_verification } from '../../gateways/verifications';
import { ActivityIndicator, View, Linking } from 'react-native';
import { VerificationAPI } from '../../gateways';
import { showOKDialog } from '../../helpers/Toast';

const VerificationRequestScreen = props => {
  const navigation = useNavigation();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const verificationRequestId = props?.data?.metadata?.verificationRequestId ?? null;
  const redirectCallback = props?.data?.metadata?.redirectCallback || null;

  // Get verification list
  const fetchVerificationList = async () => {
    try {
      setLoading(true);
      if (!verificationRequestId) {
        setData([]);
        setLoading(false);
        return;
      }

      const result = await get_all_credentials_connectionless_verification(verificationRequestId);

      if (result.data.success && result.data.availableCredentials.length > 0) {
        let cred = result.data.availableCredentials;
        let fullyVaccinatedCreds = [];
        cred.forEach(credItem => {
          if (
            credItem.values != undefined &&
            credItem.values.Dose != null &&
            credItem.values.Dose != undefined
          ) {
            if (credItem.values.Dose == '2/2') {
              fullyVaccinatedCreds.push(credItem);
            }
          }
        });

        if (fullyVaccinatedCreds.length) {
          setData(fullyVaccinatedCreds);
        } else {
          setData(cred);
        }
      } else {
        setData([]);
      }
    } catch (error) {
      console.log('Error fetching verification list:', error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVerificationList();
  }, [verificationRequestId]);

  const closeButtonClick = () => {
    navigation.navigate('MainScreen');
  };

  const rejectButtonClick = () => {
    if (redirectCallback && redirectCallback !== '') {
      Linking.openURL(redirectCallback);
    } else {
      navigation.navigate('MainScreen');
    }
  };

  const acceptButtonClick = async credential => {
    if (!credential) return;

    try {
      await VerificationAPI.submit_verification_connectionless(
        verificationRequestId,
        credential.policyName,
        credential.credentialId
      );

      if (redirectCallback && redirectCallback !== '') {
        Linking.openURL(redirectCallback);
      } else {
        showOKDialog('ZADA', 'Submitted Successfully!', navigateToMainScreen);
      }
    } catch (error) {
      alert('Please try again later!');
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <>
      {data.length === 0 ? (
        <EmptyCredentialScreen onClose={closeButtonClick} />
      ) : (
        <CredentialListScreen
          data={data}
          onAccept={acceptButtonClick}
          onReject={rejectButtonClick}
          onClose={closeButtonClick}
        />
      )}
    </>
  );
};

export default VerificationRequestScreen;
