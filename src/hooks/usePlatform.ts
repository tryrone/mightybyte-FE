import {Platform} from 'react-native';

export const usePlatform = () => {
  const isWeb = Platform.OS === 'web';
  const isMobile = Platform.OS === 'ios' || Platform.OS === 'android';

  return {
    isWeb,
    isMobile,
    OS: Platform.OS,
  };
};

export default usePlatform;
