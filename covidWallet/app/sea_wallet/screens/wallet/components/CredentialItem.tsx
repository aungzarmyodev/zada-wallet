import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AppColors } from '../../../../theme/Colors';
import { ICredentialObject } from '../../../../store/credentials/interface';
import { DateUtils } from '../../../Utils/DateUtils';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type CredentialItemProp = {
  item: ICredentialObject;
  onItemClick: () => void;
  shareItem: () => void;
};

const CredentialItem = ({ item, onItemClick, shareItem }: CredentialItemProp) => {
  const renderLogo = () => {
    if (item.imageUrl) {
      return (
        <View style={styles.logoContainer}>
          <Image source={{ uri: item.imageUrl }} style={styles.logo} resizeMode="cover" />
        </View>
      );
    }

    return <View style={styles.logoContainer} />;
  };

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <TouchableOpacity style={styles.leftContainer} activeOpacity={0.8} onPress={onItemClick}>
          {item.imageUrl ? (
            <View style={styles.logoContainer}>
              <Image source={{ uri: item.imageUrl }} style={styles.logo} />
            </View>
          ) : (
            <View style={styles.logoContainer} />
          )}

          <View style={styles.left}>
            <Text style={styles.name}>{item.type}</Text>
            <Text style={styles.organization}>{item.organizationName}</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.right}>
          <Text style={styles.date}>{DateUtils(item.issuedAtUtc)}</Text>

          <TouchableOpacity style={styles.shareIcon} onPress={shareItem}>
            <MaterialIcons name="share" size={22} color={AppColors.PRIMARY} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: AppColors.WHITE,
    marginVertical: 6,
    padding: 14,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  logoContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: AppColors.LIGHT_GRAY,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  logo: {
    width: 56,
    height: 56,
    borderRadius: 32,
    resizeMode: 'contain',
  },

  logoPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: AppColors.PRIMARY,
  },

  left: {
    flex: 1,
    paddingRight: 12,
  },

  right: {
    marginLeft: 'auto',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },

  name: {
    fontSize: 16,
    fontWeight: '600',
    color: AppColors.BLACK,
  },

  organization: {
    fontSize: 13,
    color: AppColors.MEDIUM_GRAY,
    marginTop: 2,
  },

  date: {
    fontSize: 12,
    color: AppColors.MEDIUM_GRAY,
    marginTop: 6,
  },
  shareIcon: {
    margin: 10,
  },

  status: {
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    overflow: 'hidden',
  },

  valid: {
    color: '#1E7E34',
    backgroundColor: '#E6F4EA',
  },

  expired: {
    color: '#B00020',
    backgroundColor: '#FDECEA',
  },

  expiring: {
    color: '#B26A00',
    backgroundColor: '#FFF4E5',
  },
});

export default CredentialItem;
