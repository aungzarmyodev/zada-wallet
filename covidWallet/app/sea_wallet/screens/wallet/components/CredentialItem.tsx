import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AppColors } from '../../../../theme/Colors';
import { ICredentialObject } from '../../../../store/credentials/interface';
import { DateUtils } from '../../../Utils/DateUtils';
import { CredentialStatus, CredentialStatusType } from '../const/CredentialStatus';

type CredentialItemProp = {
  item: ICredentialObject;
  status: CredentialStatusType;
  onItemClick: () => void;
};

const CredentialItem = ({ item, status, onItemClick }: CredentialItemProp) => {
  const isValid = status === CredentialStatus.VALID;
  const isExpired = status === CredentialStatus.EXPIRED;
  const isExpiring = status === CredentialStatus.EXPIRING;

  const statusLabel =
    status === CredentialStatus.EXPIRED
      ? 'Expired'
      : status === CredentialStatus.EXPIRING
      ? 'Expiring'
      : 'Valid';

  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.card} onPress={onItemClick}>
      <View style={styles.row}>
        <View style={styles.left}>
          <Text style={styles.name}>{item.type}</Text>
          <Text style={styles.organization}>{item.organizationName}</Text>
          <Text style={styles.date}>{DateUtils(item.issuedAtUtc)}</Text>
        </View>
        <View style={styles.right}>
          <Text
            style={[
              styles.status,
              isExpired && styles.expired,
              isExpiring && styles.expiring,
              isValid && styles.valid,
            ]}>
            {statusLabel}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
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
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  left: {
    flex: 1,
    paddingRight: 12,
  },
  right: {
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
