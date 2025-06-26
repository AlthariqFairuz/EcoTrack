import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Poppins: require('../assets/fonts/Poppins-Regular.ttf'),
  });

  useEffect(() => {
    checkAppState();
  }, []);

  const checkAppState = async () => {
    try {
      const seenOnboarding = await AsyncStorage.getItem('hasSeenOnboarding');
      const loggedIn = await AsyncStorage.getItem('isLoggedIn');
      console.log('Onboarding:', seenOnboarding, 'Logged In:', loggedIn);
      
      setHasSeenOnboarding(seenOnboarding === 'true');
      setIsLoggedIn(loggedIn === 'true');
    } catch (error) {
      setHasSeenOnboarding(false);
      setIsLoggedIn(false);
      console.error('Error checking app state:', error);
    }
  };

  if (!loaded || hasSeenOnboarding === null || isLoggedIn === null) {
    return null;
  }

  return (
    <>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(splash)" />
          <Stack.Screen name="(onboarding)" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
      <Toast />
    </>
  );
}