import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const LogoAnimation = () => {
  // Constants
  const [animatedValue, setAnimatedValue] = useState(new Animated.Value(1.1));

  // UseEffects
  React.useEffect(() => {
    handleAnimation();
  }, []);

  //Functions
  const handleAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 0.9,
          duration: 1000,
          delay: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
      {
        iterations: 10,
      }
    ).start();
  };

  const memoizedAnimation = useMemo(() => {
    return (
      <Animated.Image
        source={require('../../assets/images/splash_logo.png')}
        style={{
          width: 120,
          height: 120,
          transform: [
            {
              scale: animatedValue,
            },
          ],
        }}
      />
    );
  }, [animatedValue]);

  return <View style={styles.zadaLogoStyle}>{memoizedAnimation}</View>;
};

const styles = StyleSheet.create({
  zadaLogoStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LogoAnimation;
