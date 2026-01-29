import { useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCopilot } from 'react-native-copilot';

const useAppWalkThrough = () => {
  const { start, copilotEvents } = useCopilot();
  const hasStarted = useRef(false);

  useEffect(() => {
    if (hasStarted.current) return;

    const handleStepChange = (step: any) => {
      console.log('Moving to step:', step.name);
    };

    copilotEvents.on('stepChange', handleStepChange);

    const timer = setTimeout(() => {
      if (!hasStarted.current) {
        hasStarted.current = true;
        start();
      }
    }, 1500);

    return () => {
      copilotEvents.off('stepChange', handleStepChange);
      clearTimeout(timer);
    };
  }, [start]);
};

export default useAppWalkThrough;
