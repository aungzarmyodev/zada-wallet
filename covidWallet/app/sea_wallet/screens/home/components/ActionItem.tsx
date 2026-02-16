import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AppColors } from '../../../../theme/Colors';
import { IActionObject } from '../../../../store/actions/interface';
import { getActionHeader } from '../../../../helpers/ActionList';
import { DateUtils } from '../../../Utils/DateUtils';
import Ionicons from 'react-native-vector-icons/Ionicons';

type ActionItemProp = {
  item: IActionObject;
  onItemClick: () => void;
  onDeleteItem: () => void;
};

const ActionItem = ({ item, onItemClick, onDeleteItem }: ActionItemProp) => {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.card} onPress={onItemClick}>
      <View style={styles.headerRow}>
        <View style={styles.leftContainer}>
          <View style={styles.logoContainer}>
            <Image source={{ uri: item.imageUrl }} style={styles.logo} />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.name}>{getActionHeader(item.type)}</Text>
            <Text style={styles.organization}>{item.organizationName}</Text>
            <Text style={styles.date}>{DateUtils(item.createdAtUtc)}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={onDeleteItem}>
          <Ionicons
            name="trash-outline"
            size={20}
            color={AppColors.DANGER}
            style={{ padding: 8 }}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: AppColors.WHITE,
    marginHorizontal: 12,
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

export default ActionItem;
