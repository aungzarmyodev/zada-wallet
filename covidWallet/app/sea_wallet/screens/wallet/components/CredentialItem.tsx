import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AppColors } from '../../../../theme/Colors';

type CredentialItemProp = {
  item: String;
  onItemClick: () => void;
};

const CredentialItem = ({ item, onItemClick }: CredentialItemProp) => {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.card} onPress={onItemClick}>
      <View style={styles.headerRow}>
        <View style={styles.leftContainer}>
          <View style={styles.logoContainer}>
            <Image source={{ uri: 'item.imageUrl' }} style={styles.logo} />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.name}>{''}</Text>
            <Text style={styles.organization}>{'item.organizationName'}</Text>
            <Text style={styles.description} numberOfLines={2}>
              {'item.state'}
            </Text>
          </View>
        </View>
        <Text style={styles.date}>{'timeAgo(item.createdAtUtc)'}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: AppColors.WHITE,
    marginVertical: 6,
    padding: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: 8,
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

  titleContainer: {
    flex: 1,
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
  },

  description: {
    marginTop: 10,
    fontSize: 14,
    color: AppColors.MEDIUM_GRAY,
    lineHeight: 20,
  },
});

export default CredentialItem;
