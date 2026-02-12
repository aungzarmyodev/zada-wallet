import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  name?: string;
  size?: number;
  backgroundColor?: string;
  textColor?: string;
}

const UserProfileLogo = ({
  name,
  size = 40,
  backgroundColor = '#E0E0E0',
  textColor = '#333',
}: Props) => {
  const getFirstWords = (fullName?: string) => {
    if (!fullName) return '';

    return fullName
      ?.trim()
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase();
  };

  return (
    <View
      style={[
        styles.avatar,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor,
        },
      ]}>
      <Text style={[styles.text, { color: textColor, fontSize: size / 2.5 }]}>
        {getFirstWords(name)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
  },
});

export default UserProfileLogo;
