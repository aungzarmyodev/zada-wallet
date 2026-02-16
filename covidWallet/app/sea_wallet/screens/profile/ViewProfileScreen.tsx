import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AppColors } from '../../../theme/Colors';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../../../store/auth/selectors';
import OverlayLoader from '../../../components/OverlayLoader';
import { _showAlert } from '../../../helpers/Toast';
import { _updateProfileAPI } from '../../../gateways/auth';
import { useNavigation } from '@react-navigation/native';
import { getUserProfile } from '../../../store/auth/thunk';

interface UserProfile {
  name: string;
  phone: string;
  email: string;
}

const ViewProfileScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const user = useSelector(selectUser) as UserProfile;

  const [tempData, setTempData] = useState<UserProfile>(user);
  const [isLoading, setLoading] = useState(false);

  // Detect if anything changed
  const hasChanges = JSON.stringify(user) !== JSON.stringify(tempData);

  const getInitials = (name: string) => {
    const parts = name.split(' ');
    return parts.length > 1 ? parts[0][0] + parts[1][0] : name.substring(0, 2);
  };

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setTempData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateProfile = async () => {
    if (!tempData.name.trim()) {
      _showAlert('Error', 'Name is required');
      return;
    }

    if (!tempData.phone.trim()) {
      _showAlert('Error', 'Phone is required');
      return;
    }

    if (!tempData.email.trim()) {
      _showAlert('Error', 'Email is required');
      return;
    }

    try {
      setLoading(true);

      const result = await _updateProfileAPI({
        name: tempData.name.trim(),
        phone: tempData.phone.trim(),
        email: tempData.email.trim(),
      });
      if (result.data.success) {
        await dispatch(getUserProfile() as any);
        _showAlert('Success', t('success.updated_profile'));
        navigation.goBack();
      } else {
        _showAlert('Error', result.data.error);
      }
    } catch (error) {
      _showAlert('Error', 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const renderField = (label: string, field: keyof UserProfile) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        style={styles.fieldInput}
        value={tempData[field]}
        onChangeText={text => handleInputChange(field, text)}
      />
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile Details</Text>
        </View>

        <View style={styles.profileImageSection}>
          <View style={styles.profileImageContainer}>
            <Text style={styles.profileInitials}>{getInitials(tempData.name)}</Text>
          </View>
        </View>

        <View style={styles.infoSection}>
          {renderField('Full Name', 'name')}
          {renderField('Phone Number', 'phone')}
          {renderField('Email', 'email')}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.updateButton, !hasChanges && { opacity: 0.5 }]}
            disabled={!hasChanges}
            onPress={updateProfile}>
            <Text style={styles.updateButtonText}>Update Profile</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {isLoading && <OverlayLoader text={t('messages.updating_profile')} />}
    </SafeAreaView>
  );
};

export default ViewProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 20,
  },
  profileImageSection: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: '#f9f9f9',
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: AppColors.LIGHT_GRAY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitials: {
    fontSize: 36,
    fontWeight: '700',
    color: '#fff',
  },
  infoSection: {
    padding: 16,
  },
  fieldContainer: {
    marginBottom: 18,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 6,
  },
  fieldInput: {
    fontSize: 16,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: AppColors.PRIMARY,
    backgroundColor: '#f5f5f5',
  },
  buttonContainer: {
    padding: 16,
  },
  updateButton: {
    backgroundColor: AppColors.PRIMARY,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  updateButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
