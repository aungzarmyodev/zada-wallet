import * as React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { BLACK_COLOR, WHITE_COLOR, SECONDARY_COLOR, AppColors } from '../theme/Colors';
import TouchableComponent from './Buttons/TouchableComponent';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function FlatCard(props) {
  return (
    <View style={{ paddingHorizontal: 4 }}>
      <View style={styles.card}>
        <TouchableComponent
          android_ripple={{ borderless: true }}
          style={styles.touchableStyle}
          onPress={() => props.onPress()}>
          <View style={styles.container}>
            <View style={styles.logoContainer}>
              <Image source={{ uri: props.imageURL }} style={styles.logo} />
            </View>
            <View style={styles.textContainer}>
              <Text numberOfLines={2} style={styles.heading}>
                {props.heading}
              </Text>
              {props.text ? (
                <Text numberOfLines={3} style={styles.text}>
                  {props.text}
                </Text>
              ) : null}
            </View>
            <MaterialCommunityIcons
              size={24}
              name="check-circle"
              color={AppColors.BRIGHT_GREEN}
              style={styles.icon}
            />
          </View>
        </TouchableComponent>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: WHITE_COLOR,
    borderRadius: 16,
    shadowColor: SECONDARY_COLOR,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 5,
    marginBottom: 8,
  },
  touchableStyle: {
    overflow: 'hidden',
    paddingVertical: 12,
    borderRadius: 16,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
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
  textContainer: {
    flex: 1,
  },
  heading: {
    color: BLACK_COLOR,
    fontWeight: 'bold',
    fontSize: 16,
  },
  icon: {
    marginLeft: 12,
  },
});

export default FlatCard;
