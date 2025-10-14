import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Text, Image, Pressable, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AppColors } from '../../theme/Colors';

interface IActionItems {
  title: string;
  onPress: () => void;
  iconName?: string;
  imageSrc?: any;
  buttonColor?: string;
}

interface IProps {
  buttonColor: string;
  onPress?: () => void;
  actionItems?: IActionItems[];
}

const window = Dimensions.get('screen');

const FloatingActionButton = ({ buttonColor, onPress, actionItems }: IProps) => {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.container}>
      {open && actionItems && (
        <View style={styles.actionItemsContainer}>
          {actionItems.map((item, index) => (
            <Pressable
              key={index}
              style={[styles.actionItem, { backgroundColor: item.buttonColor || buttonColor }]}
              onPress={() => {
                item.onPress();
                setOpen(false);
              }}>
              {item.iconName ? (
                <Icon name={item.iconName} size={24} color="white" />
              ) : (
                <Image source={item.imageSrc} style={styles.actionItemImage} />
              )}
              <Text style={styles.actionItemText}>{item.title}</Text>
            </Pressable>
          ))}
        </View>
      )}
      <Pressable
        style={[styles.mainButton, { backgroundColor: buttonColor }]}
        onPress={() => {
          if (onPress) onPress();
          setOpen(!open);
        }}>
        <Icon name="plus" size={28} color="white" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    alignItems: 'center',
  },
  mainButton: {
    width: window.width / 7,
    height: window.width / 7,
    borderRadius: window.width / 14,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  actionItemsContainer: {
    marginBottom: 10,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 25,
    marginBottom: 10,
  },
  actionItemImage: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  actionItemText: {
    color: 'white',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
});

export default FloatingActionButton;
