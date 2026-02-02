import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCopilot } from 'react-native-copilot';

const WALKTHROUGH_KEY = '@app_walkthrough_completed';

const useAppWalkThrough = () => {
  const { start, copilotEvents } = useCopilot();

  useEffect(() => {
    const checkAndStartWalkthrough = async () => {
      try {
        // 1. Check if the user has already seen it
        const hasSeenWalkthrough = await AsyncStorage.getItem(WALKTHROUGH_KEY);

        if (hasSeenWalkthrough !== 'true') {
          // 2. Start the walkthrough
          start();

          // 3. Save to storage so it never runs again
          await AsyncStorage.setItem(WALKTHROUGH_KEY, 'true');
        }
      } catch (error) {
        console.error('Error checking walkthrough status:', error);
      }
    };

    const handleStepChange = (step: any) => {
      console.log('Moving to step:', step.name);
    };

    copilotEvents.on('stepChange', handleStepChange);

    // Small delay to ensure the UI is fully mounted
    const timer = setTimeout(() => {
      checkAndStartWalkthrough();
    }, 500);

    return () => {
      copilotEvents.off('stepChange', handleStepChange);
      clearTimeout(timer);
    };
  }, [start, copilotEvents]);
};

export default useAppWalkThrough;
