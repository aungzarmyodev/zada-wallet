import * as React from 'react';
import { Animated, View, Text, Image, StyleSheet, ActivityIndicator, Easing } from 'react-native';
import ChangingText from '../components/Animations/ChangingText';
import LogoAnimation from '../components/Animations/LogoAnimation';
import { PRIMARY_COLOR, BACKGROUND_COLOR } from '../theme/Colors';

function LoadingScreen(props) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: PRIMARY_COLOR,
      }}>
      <View
        style={{
          alignItems: 'center',
        }}>
        {/* <LogoAnimation /> */}
        <View style={styles.textViewStyle}>
          <ChangingText messageIndex={props.messageIndex} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textViewStyle: {
    marginTop: 24, // space between logo and text
  },
  textStyle: {
    color: 'white',
  },
  activityIndicatorStyle: {
    marginTop: 16,
  },
});

export default LoadingScreen;
