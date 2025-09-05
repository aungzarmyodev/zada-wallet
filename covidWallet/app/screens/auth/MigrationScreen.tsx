import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'react-native-linear-gradient';
import * as Progress from 'react-native-progress';
import RocketGame from './components/RocketGame';
import { selectToken, selectUser } from '../../store/auth/selectors';
import { useAppSelector } from '../../store';
import { selectBaseUrl } from '../../store/app/selectors';
import { AuthenticateUser } from '../utils';
import { _showAlert, showOKDialog } from '../../helpers';
import { useNavigation } from '@react-navigation/native';
import { navigationRef } from '../../navigation/utils';

const MigrationScreen = () => {
  // Selectors
  const user = useAppSelector(selectUser);
  const baseUrl = useAppSelector(selectBaseUrl);
  const token = useAppSelector(selectToken);

  const {} = useNavigation();

  // States
  const [score, setScore] = useState(0);
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30); // Countdown timer
  const [started, setStarted] = useState(false);

  // Continuous rotation animation
  const spinValue = new Animated.Value(0);
  useEffect(() => {
    const startSpinAnimation = () => {
      Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        })
      ).start();
    };
    startSpinAnimation();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const handleTapGame = useCallback(() => {
    if (!started) {
      setStarted(true); // Start the game
    }
  }, [started]);

  useEffect(() => {
    if (!started) {
      setScore(0);
      setTimeLeft(30);
    }
  }, [started]);

  // Countdown timer
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (timeLeft > 0 && started) {
      timer = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
        if (timeLeft === 1) {
          setStarted(false);
        }
      }, 1000);
    }

    return () => {
      clearTimeout(timer); // Cleanup the timer to prevent memory leaks
    };
  }, [timeLeft, started]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const startMigration = async () => {
      try {
        // Migrate Wallet
        let res1 = await fetch(baseUrl + '/api/migrate/wallet', {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
        });

        if (!res1.ok) {
          throw 'Failed to migrate wallet';
        }

        // Get fresh token
        let freshToken = await AuthenticateUser(token);

        // Migrate Connections and Credentials
        let res2 = await fetch(baseUrl + '/api/migrate/connections-and-credentials', {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + freshToken,
            'Content-Type': 'application/json',
          },
        });

        if (!res2.ok) {
          throw 'Failed to migrate connections and credentials';
        }

        setProgress(1);

        showOKDialog('ZADA', 'Migration Complete! Please login again.', () => {
          navigationRef.navigate('PhoneNumberScreen');
        });
      } catch (e) {
        _showAlert('Error', e);
        clearInterval(timer);
      }
    };

    setTimeout(() => {
      const duration = 60000; // 1 minute
      const interval = 100; // update every 100ms
      const totalSteps = duration / interval;
      let currentStep = 0;

      timer = setInterval(() => {
        setProgress(prev => {
          currentStep++;
          if (currentStep >= totalSteps || prev >= 1) {
            clearInterval(timer);
            return 1;
          }

          // Slow down as we approach the end
          const progressRemaining = 1 - prev;
          const step = (1 / totalSteps) * progressRemaining * 1.8; // Multiplier adds slow finish
          const next = prev + step;

          return next >= 1 ? 1 : next;
        });
      }, interval);
    }, 1000);

    startMigration();

    return () => clearInterval(timer);
  }, []);

  return (
    <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.container}>
      <View style={styles.content}>
        {/* Migration Status Section */}
        <View style={styles.statusSection}>
          <Animated.View style={[styles.iconContainer, { transform: [{ rotate: spin }] }]}>
            <MaterialCommunityIcons name="database-sync" size={40} color="#FFF" />
          </Animated.View>
          <Text style={styles.title}>Migration in Progress</Text>
          <Text style={styles.subtitle}>We're updating our systems to serve you better</Text>
          <View style={styles.divider} />
          <Progress.Bar progress={progress} width={300} />
        </View>

        {/* Info Section */}
        <View style={styles.infoSection}>
          <Text style={styles.infoText}>
            This won't take long! In the meantime, try our tap game below!
          </Text>
          <View style={styles.notificationButton}>
            <MaterialCommunityIcons name={'bell'} size={24} color="#FFF" />
            <Text style={styles.notificationText}>We Will Notify When Complete</Text>
          </View>
        </View>

        {/* Rocket Tap Game */}
        <View style={styles.gameSection}>
          {/* <Text style={styles.gameTitle}>Tap Game</Text> */}
          <Text style={styles.gameScore}>Score: {score}</Text>
          <Text style={styles.timer}>Time Left: {timeLeft}s</Text>
          <RocketGame started={started} onStart={handleTapGame} setScore={setScore} />
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusSection: {
    alignItems: 'center',
    marginTop: 50,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
    opacity: 0.8,
  },
  divider: {
    width: '80%',
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginVertical: 20,
  },
  infoSection: {
    alignItems: 'center',
    padding: 20,
  },
  infoText: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 20,
    opacity: 0.9,
  },
  notificationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 15,
    borderRadius: 25,
    gap: 10,
  },
  notificationText: {
    color: '#FFF',
    fontSize: 16,
  },
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
  timer: {
    fontSize: 18,
    color: '#FFF',
    marginBottom: 20,
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

export default MigrationScreen;
