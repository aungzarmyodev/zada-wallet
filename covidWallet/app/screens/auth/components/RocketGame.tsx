import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface IProps {
  started: boolean;
  onStart: () => void;
  setScore: (prev: any) => any;
}

const RocketGame = ({ started, onStart, setScore }: IProps) => {
  // const [started, setStarted] = useState(false);

  // Animations
  const bounceValue = new Animated.Value(0); // For idle bouncing animation
  const rocketPositionX = new Animated.Value(0); // Horizontal movement
  const rocketPositionY = new Animated.Value(0); // Vertical movement

  // Idle bouncing animation for the rocket
  useEffect(() => {
    let idleAnimation: Animated.CompositeAnimation;

    if (!started) {
      idleAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(bounceValue, {
            toValue: -10, // Move up
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(bounceValue, {
            toValue: 0, // Move back to original position
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      );
      idleAnimation.start();
    } else {
      bounceValue.stopAnimation(); // Stop the idle bouncing animation
    }

    return () => {
      if (idleAnimation) {
        idleAnimation.stop(); // Cleanup the idle animation
      }
    };
  }, [started]);

  // Randomized rocket movement after the game starts
  useEffect(() => {
    let animation: Animated.CompositeAnimation;

    const startRocketMovement = () => {
      const animateRocket = () => {
        const randomX = Math.random() * 200 - 150; // Random horizontal movement
        const randomY = Math.random() * 200 - 100; // Random vertical movement

        animation = Animated.parallel([
          Animated.timing(rocketPositionX, {
            toValue: randomX,
            duration: 100 + Math.random() * 500, // Random speed
            useNativeDriver: true,
          }),
          Animated.timing(rocketPositionY, {
            toValue: randomY,
            duration: 300 + Math.random() * 500, // Random speed
            useNativeDriver: true,
          }),
        ]);

        animation.start(() => {
          if (started) {
            animateRocket(); // Continue animating only if the game is still active
          }
        });
      };

      if (started) {
        animateRocket();
      }
    };

    startRocketMovement();

    return () => {
      if (animation) {
        animation.stop(); // Cleanup the animation when the component unmounts or `started` changes
      }
    };
  }, [started]);

  const handleTapGame = useCallback(() => {
    if (!started) {
      onStart(); // Notify the parent component that the game has started
    }
    setScore((prev: any) => prev + 1); // Increase score
  }, [started]);

  const rocketComponent = useMemo(() => {
    return (
      <View style={styles.gameSection}>
        <Animated.View
          style={[
            styles.rocket,
            {
              transform: [
                { translateX: started ? rocketPositionX : 0 },
                { translateY: started ? rocketPositionY : bounceValue },
              ],
            },
          ]}>
          <TouchableOpacity onPress={handleTapGame} activeOpacity={0.7}>
            <MaterialCommunityIcons name="rocket" size={40} color="#FFF" />
          </TouchableOpacity>
        </Animated.View>
        <Text style={styles.gameInstruction}>Tap the rocket to score!</Text>
      </View>
    );
  }, [started]);

  return rocketComponent;
};

const styles = StyleSheet.create({
  gameSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  gameTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
  },
  gameScore: {
    fontSize: 18,
    color: '#FFF',
    marginBottom: 10,
  },
  rocket: {
    padding: 20,
  },
  gameInstruction: {
    fontSize: 14,
    color: '#FFF',
    opacity: 0.8,
    textAlign: 'center',
    marginTop: 10,
  },
});

export default RocketGame;
