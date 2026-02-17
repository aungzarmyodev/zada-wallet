import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AppColors } from '../../../../theme/Colors';
import { IConnectionObject } from '../../../../store/connections/interface';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {
  item: IConnectionObject;
  deleteItem: () => void;
};

const ConnectionItem = ({ item, deleteItem }: Props) => {
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
    <TouchableOpacity activeOpacity={0.8} style={styles.card} onPress={() => {}}>
      <View style={styles.row}>
        {renderLogo()}
        <View style={styles.left}>
          <Text style={styles.name}>{item.name}</Text>
        </View>
        <View style={styles.right}>
          <TouchableOpacity onPress={deleteItem}>
            <Ionicons
              name="trash-outline"
              size={20}
              color={AppColors.DANGER}
              style={{ padding: 8 }}
            />
          </TouchableOpacity>
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
    alignItems: 'center',
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

export default ConnectionItem;
