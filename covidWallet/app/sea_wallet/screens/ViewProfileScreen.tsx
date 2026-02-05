import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AppColors } from '../../theme/Colors';

const ViewProfileScreen = ({ navigation }: any) => {
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    phoneNumber: '+1 234 567 8900',
    email: 'john.doe@example.com',
  });

  const [tempData, setTempData] = useState(profileData);

  const getInitials = (name: string) => {
    const names = name.split(' ');
    return names.length > 1 ? names[0].charAt(0) + names[1].charAt(0) : names[0].substring(0, 2);
  };

  const handleEditPress = () => {
    setTempData(profileData);
  };

  const handleSavePress = () => {
    if (!tempData.name.trim()) {
      Alert.alert('Validation Error', 'Name cannot be empty');
      return;
    }
    if (!tempData.phoneNumber.trim()) {
      Alert.alert('Validation Error', 'Phone number cannot be empty');
      return;
    }
    if (!tempData.email.trim()) {
      Alert.alert('Validation Error', 'Email cannot be empty');
      return;
    }

    setProfileData(tempData);
    Alert.alert('Success', 'Profile updated successfully');
  };

  const handleInputChange = (field: string, value: string) => {
    setTempData({
      ...tempData,
      [field]: value,
    });
  };

  const renderProfileField = (label: string, value: string, field: string) => {
    return (
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>{label}</Text>
        <TextInput
          style={styles.fieldInput}
          value={tempData[field as keyof typeof tempData] as string}
          onChangeText={text => handleInputChange(field, text)}
          placeholderTextColor="#999"
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top']}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation?.goBack()} style={styles.backButtonContainer}>
            <MaterialIcons name="arrow-back" size={24} color={AppColors.BLACK} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile Details</Text>
        </View>

        <View style={styles.profileImageSection}>
          <View style={styles.profileImageContainer}>
            <Text style={styles.profileInitials}>{getInitials(profileData.name)}</Text>
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          {renderProfileField('Full Name', profileData.name, 'name')}
          {renderProfileField('Phone Number', profileData.phoneNumber, 'phoneNumber')}
          {renderProfileField('Email', profileData.email, 'email')}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.updateButton}
            onPress={handleEditPress}
            activeOpacity={0.7}>
            <Text style={styles.updateButtonText}>Update Profile</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButtonContainer: {
    marginRight: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
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
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 20,
  },
  fieldContainer: {
    marginBottom: 18,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  fieldInput: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: AppColors.PRIMARY,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  updateButton: {
    backgroundColor: AppColors.PRIMARY,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  updateButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});

export default ViewProfileScreen;
